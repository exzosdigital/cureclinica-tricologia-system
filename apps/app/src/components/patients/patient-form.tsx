'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { format } from 'date-fns'
import { CalendarIcon, Loader2 } from 'lucide-react'
import { Button } from '@cureclinica/ui/button'
import { Input } from '@cureclinica/ui/input'
import { Label } from '@cureclinica/ui/label'
import { Checkbox } from '@cureclinica/ui/checkbox'
import { Textarea } from '@cureclinica/ui/textarea'
import { Calendar } from '@cureclinica/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@cureclinica/ui/popover'
import { cn } from '@cureclinica/ui/cn'
import { createPatient } from '@cureclinica/supabase/mutations'
import { toast } from 'sonner'

const patientSchema = z.object({
  // Dados Pessoais
  first_name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  last_name: z.string().min(2, 'Sobrenome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
  phone: z.string().min(10, 'Telefone inválido'),
  date_of_birth: z.date().optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
  
  // Endereço
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip_code: z.string().optional(),
  
  // Contato de Emergência
  emergency_contact_name: z.string().optional(),
  emergency_contact_phone: z.string().optional(),
  
  // Dados Médicos
  medical_history: z.string().optional(),
  allergies: z.string().optional(),
  current_medications: z.string().optional(),
  
  // Dados Capilares
  hair_type: z.enum(['straight', 'wavy', 'curly', 'coily']).optional(),
  scalp_condition: z.enum(['normal', 'dry', 'oily', 'sensitive', 'irritated']).optional(),
  hair_loss_duration: z.string().optional(),
  hair_loss_pattern: z.string().optional(),
  family_history_hair_loss: z.boolean().optional(),
  previous_treatments: z.string().optional(),
})

type PatientFormData = z.infer<typeof patientSchema>

export function PatientForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      family_history_hair_loss: false,
    },
  })

  const selectedDate = watch('date_of_birth')

  const onSubmit = async (data: PatientFormData) => {
    setIsLoading(true)
    
    try {
      await createPatient({
        ...data,
        email: data.email || null,
        date_of_birth: data.date_of_birth?.toISOString().split('T')[0] || null,
      })
      
      toast.success('Paciente cadastrado com sucesso!')
      router.push('/dashboard/patients')
    } catch (error) {
      toast.error(
        error instanceof Error 
          ? error.message 
          : 'Erro ao cadastrar paciente'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Dados Pessoais */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Dados Pessoais</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="first_name">Nome *</Label>
            <Input
              id="first_name"
              {...register('first_name')}
              placeholder="João"
            />
            {errors.first_name && (
              <p className="text-sm text-red-600 mt-1">{errors.first_name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="last_name">Sobrenome *</Label>
            <Input
              id="last_name"
              {...register('last_name')}
              placeholder="Silva"
            />
            {errors.last_name && (
              <p className="text-sm text-red-600 mt-1">{errors.last_name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="joao.silva@email.com"
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">Telefone *</Label>
            <Input
              id="phone"
              {...register('phone')}
              placeholder="(11) 99999-9999"
            />
            {errors.phone && (
              <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <Label>Data de Nascimento</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !selectedDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, 'dd/MM/yyyy') : 'Selecione a data'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => setValue('date_of_birth', date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label htmlFor="gender">Gênero</Label>
            <select 
              {...register('gender')}
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">Selecione</option>
              <option value="male">Masculino</option>
              <option value="female">Feminino</option>
              <option value="other">Outro</option>
            </select>
          </div>
        </div>
      </div>

      {/* Endereço */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Endereço</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Label htmlFor="address">Endereço</Label>
            <Input
              id="address"
              {...register('address')}
              placeholder="Rua das Flores, 123"
            />
          </div>

          <div>
            <Label htmlFor="city">Cidade</Label>
            <Input
              id="city"
              {...register('city')}
              placeholder="São Paulo"
            />
          </div>

          <div>
            <Label htmlFor="state">Estado</Label>
            <Input
              id="state"
              {...register('state')}
              placeholder="SP"
              maxLength={2}
            />
          </div>

          <div>
            <Label htmlFor="zip_code">CEP</Label>
            <Input
              id="zip_code"
              {...register('zip_code')}
              placeholder="00000-000"
            />
          </div>
        </div>
      </div>

      {/* Contato de Emergência */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Contato de Emergência</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="emergency_contact_name">Nome</Label>
            <Input
              id="emergency_contact_name"
              {...register('emergency_contact_name')}
              placeholder="Maria Silva"
            />
          </div>

          <div>
            <Label htmlFor="emergency_contact_phone">Telefone</Label>
            <Input
              id="emergency_contact_phone"
              {...register('emergency_contact_phone')}
              placeholder="(11) 88888-8888"
            />
          </div>
        </div>
      </div>

      {/* Dados Médicos */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Dados Médicos</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="medical_history">Histórico Médico</Label>
            <Textarea
              id="medical_history"
              {...register('medical_history')}
              placeholder="Descreva condições médicas relevantes..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="allergies">Alergias</Label>
            <Textarea
              id="allergies"
              {...register('allergies')}
              placeholder="Liste alergias conhecidas..."
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="current_medications">Medicamentos em Uso</Label>
            <Textarea
              id="current_medications"
              {...register('current_medications')}
              placeholder="Liste medicamentos atuais..."
              rows={2}
            />
          </div>
        </div>
      </div>

      {/* Dados Capilares */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Dados Capilares</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="hair_type">Tipo de Cabelo</Label>
            <select 
              {...register('hair_type')}
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">Selecione</option>
              <option value="straight">Liso</option>
              <option value="wavy">Ondulado</option>
              <option value="curly">Cacheado</option>
              <option value="coily">Crespo</option>
            </select>
          </div>

          <div>
            <Label htmlFor="scalp_condition">Condição do Couro Cabeludo</Label>
            <select 
              {...register('scalp_condition')}
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">Selecione</option>
              <option value="normal">Normal</option>
              <option value="dry">Seco</option>
              <option value="oily">Oleoso</option>
              <option value="sensitive">Sensível</option>
              <option value="irritated">Irritado</option>
            </select>
          </div>

          <div>
            <Label htmlFor="hair_loss_duration">Duração da Queda Capilar</Label>
            <Input
              id="hair_loss_duration"
              {...register('hair_loss_duration')}
              placeholder="Ex: 6 meses, 2 anos..."
            />
          </div>

          <div>
            <Label htmlFor="hair_loss_pattern">Padrão de Queda</Label>
            <Input
              id="hair_loss_pattern"
              {...register('hair_loss_pattern')}
              placeholder="Ex: Difusa, localizada..."
            />
          </div>

          <div className="md:col-span-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="family_history"
                {...register('family_history_hair_loss')}
              />
              <Label htmlFor="family_history" className="font-normal">
                Histórico familiar de queda capilar
              </Label>
            </div>
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="previous_treatments">Tratamentos Anteriores</Label>
            <Textarea
              id="previous_treatments"
              {...register('previous_treatments')}
              placeholder="Descreva tratamentos capilares anteriores..."
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/dashboard/patients')}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Cadastrar Paciente
        </Button>
      </div>
    </form>
  )
}