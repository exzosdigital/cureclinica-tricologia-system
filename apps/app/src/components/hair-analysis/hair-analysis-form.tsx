'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { format } from 'date-fns'
import { CalendarIcon, Loader2, Search } from 'lucide-react'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@cureclinica/ui/select'
import { cn } from '@cureclinica/ui/cn'
import { createHairAnalysis } from '@cureclinica/supabase/mutations'
import { searchPatients } from '@cureclinica/supabase/queries'
import { toast } from 'sonner'

const hairAnalysisSchema = z.object({
  // Patient Selection
  patient_id: z.string().min(1, 'Paciente é obrigatório'),
  
  // Basic Analysis Info
  analysis_date: z.date().default(() => new Date()),
  analysis_type: z.enum(['tricoscopy', 'microscopy', 'pull_test', 'densitometry', 'phototrichogram']),
  
  // Clinical Assessment
  diagnosis: z.string().optional(),
  severity: z.enum(['mild', 'moderate', 'severe', 'very_severe']).optional(),
  
  // Measurements
  hair_density_per_cm2: z.number().positive().optional(),
  hair_thickness_micrometers: z.number().positive().optional(),
  terminal_to_vellus_ratio: z.number().positive().optional(),
  
  // Pull Test
  pull_test_positive: z.boolean().optional(),
  pull_test_hair_count: z.number().nonnegative().optional(),
  
  // Scales
  ludwig_scale: z.number().min(1).max(3).optional(),
  norwood_scale: z.number().min(1).max(7).optional(),
  salt_score: z.number().min(0).max(100).optional(),
  
  // Detailed Assessments
  scalp_condition_assessment: z.string().optional(),
  sebum_production: z.enum(['low', 'normal', 'high', 'very_high']).optional(),
  inflammation_level: z.enum(['none', 'mild', 'moderate', 'severe']).optional(),
  
  // Findings
  follicular_findings: z.string().optional(),
  perifollicular_changes: z.string().optional(),
  hair_shaft_abnormalities: z.string().optional(),
  
  // Clinical Notes
  notes: z.string().optional(),
  recommendations: z.string().optional(),
  prognosis: z.string().optional(),
})

type HairAnalysisFormData = z.infer<typeof hairAnalysisSchema>

export function HairAnalysisForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [searchingPatients, setSearchingPatients] = useState(false)
  const [patientSearch, setPatientSearch] = useState('')
  const [patientResults, setPatientResults] = useState<any[]>([])
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<HairAnalysisFormData>({
    resolver: zodResolver(hairAnalysisSchema),
    defaultValues: {
      analysis_date: new Date(),
      pull_test_positive: false,
    },
  })

  const selectedDate = watch('analysis_date')
  const selectedPatient = watch('patient_id')

  const searchForPatients = async (query: string) => {
    if (query.length < 2) {
      setPatientResults([])
      return
    }

    setSearchingPatients(true)
    try {
      const results = await searchPatients(query)
      setPatientResults(results)
    } catch (error) {
      toast.error('Erro ao buscar pacientes')
    } finally {
      setSearchingPatients(false)
    }
  }

  const selectPatient = (patient: any) => {
    setValue('patient_id', patient.id)
    setPatientSearch(`${patient.first_name} ${patient.last_name}`)
    setPatientResults([])
  }

  const onSubmit = async (data: HairAnalysisFormData) => {
    setIsLoading(true)
    
    try {
      await createHairAnalysis({
        ...data,
        analysis_date: data.analysis_date.toISOString().split('T')[0],
      })
      
      toast.success('Análise capilar registrada com sucesso!')
      router.push('/dashboard/hair-analysis')
    } catch (error) {
      toast.error(
        error instanceof Error 
          ? error.message 
          : 'Erro ao registrar análise capilar'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Patient Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Seleção do Paciente</h3>
        <div className="relative">
          <Label htmlFor="patient_search">Buscar Paciente *</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="patient_search"
              value={patientSearch}
              onChange={(e) => {
                setPatientSearch(e.target.value)
                searchForPatients(e.target.value)
              }}
              placeholder="Digite o nome do paciente..."
              className="pl-10"
            />
          </div>
          
          {patientResults.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
              {patientResults.map((patient) => (
                <button
                  key={patient.id}
                  type="button"
                  onClick={() => selectPatient(patient)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center justify-between"
                >
                  <div>
                    <div className="font-medium">{patient.first_name} {patient.last_name}</div>
                    <div className="text-sm text-gray-500">{patient.phone}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
          
          {errors.patient_id && (
            <p className="text-sm text-red-600 mt-1">{errors.patient_id.message}</p>
          )}
        </div>
      </div>

      {/* Basic Analysis Info */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Informações da Análise</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Data da Análise *</Label>
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
                  onSelect={(date) => setValue('analysis_date', date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label htmlFor="analysis_type">Tipo de Análise *</Label>
            <Select onValueChange={(value) => setValue('analysis_type', value as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tricoscopy">Tricoscopia</SelectItem>
                <SelectItem value="microscopy">Microscopia</SelectItem>
                <SelectItem value="pull_test">Pull Test</SelectItem>
                <SelectItem value="densitometry">Densitometria</SelectItem>
                <SelectItem value="phototrichogram">Fototricograma</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Clinical Assessment */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Avaliação Clínica</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="diagnosis">Diagnóstico</Label>
            <Textarea
              id="diagnosis"
              {...register('diagnosis')}
              placeholder="Diagnóstico tricológico..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="severity">Gravidade</Label>
              <Select onValueChange={(value) => setValue('severity', value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mild">Leve</SelectItem>
                  <SelectItem value="moderate">Moderada</SelectItem>
                  <SelectItem value="severe">Grave</SelectItem>
                  <SelectItem value="very_severe">Muito Grave</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="sebum_production">Produção Sebácea</Label>
              <Select onValueChange={(value) => setValue('sebum_production', value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Baixa</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                  <SelectItem value="very_high">Muito Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="inflammation_level">Nível de Inflamação</Label>
              <Select onValueChange={(value) => setValue('inflammation_level', value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Nenhuma</SelectItem>
                  <SelectItem value="mild">Leve</SelectItem>
                  <SelectItem value="moderate">Moderada</SelectItem>
                  <SelectItem value="severe">Grave</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Measurements */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Medições Tricológicas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="hair_density">Densidade Capilar (fios/cm²)</Label>
            <Input
              id="hair_density"
              type="number"
              {...register('hair_density_per_cm2', { valueAsNumber: true })}
              placeholder="180"
            />
          </div>

          <div>
            <Label htmlFor="hair_thickness">Espessura do Fio (μm)</Label>
            <Input
              id="hair_thickness"
              type="number"
              {...register('hair_thickness_micrometers', { valueAsNumber: true })}
              placeholder="70"
            />
          </div>

          <div>
            <Label htmlFor="terminal_vellus_ratio">Ratio Terminal/Vellus</Label>
            <Input
              id="terminal_vellus_ratio"
              type="number"
              step="0.1"
              {...register('terminal_to_vellus_ratio', { valueAsNumber: true })}
              placeholder="4.5"
            />
          </div>
        </div>
      </div>

      {/* Pull Test */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Pull Test</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="pull_test_positive"
              {...register('pull_test_positive')}
            />
            <Label htmlFor="pull_test_positive" className="font-normal">
              Pull Test Positivo
            </Label>
          </div>

          <div>
            <Label htmlFor="pull_test_count">Número de Fios Extraídos</Label>
            <Input
              id="pull_test_count"
              type="number"
              {...register('pull_test_hair_count', { valueAsNumber: true })}
              placeholder="8"
            />
          </div>
        </div>
      </div>

      {/* Scales */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Escalas de Avaliação</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="ludwig_scale">Escala Ludwig (1-3)</Label>
            <Input
              id="ludwig_scale"
              type="number"
              min="1"
              max="3"
              {...register('ludwig_scale', { valueAsNumber: true })}
              placeholder="2"
            />
          </div>

          <div>
            <Label htmlFor="norwood_scale">Escala Norwood (1-7)</Label>
            <Input
              id="norwood_scale"
              type="number"
              min="1"
              max="7"
              {...register('norwood_scale', { valueAsNumber: true })}
              placeholder="3"
            />
          </div>

          <div>
            <Label htmlFor="salt_score">Score SALT (0-100)</Label>
            <Input
              id="salt_score"
              type="number"
              min="0"
              max="100"
              {...register('salt_score', { valueAsNumber: true })}
              placeholder="25"
            />
          </div>
        </div>
      </div>

      {/* Detailed Findings */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Achados Detalhados</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="scalp_condition">Avaliação do Couro Cabeludo</Label>
            <Textarea
              id="scalp_condition"
              {...register('scalp_condition_assessment')}
              placeholder="Descrição das condições do couro cabeludo..."
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="follicular_findings">Achados Foliculares</Label>
            <Textarea
              id="follicular_findings"
              {...register('follicular_findings')}
              placeholder="Descrição dos achados foliculares..."
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="perifollicular_changes">Alterações Perifoliculares</Label>
            <Textarea
              id="perifollicular_changes"
              {...register('perifollicular_changes')}
              placeholder="Descrição das alterações perifoliculares..."
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="hair_shaft_abnormalities">Anormalidades da Haste Capilar</Label>
            <Textarea
              id="hair_shaft_abnormalities"
              {...register('hair_shaft_abnormalities')}
              placeholder="Descrição das anormalidades da haste..."
              rows={2}
            />
          </div>
        </div>
      </div>

      {/* Clinical Notes */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Observações Clínicas</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="notes">Observações Gerais</Label>
            <Textarea
              id="notes"
              {...register('notes')}
              placeholder="Observações adicionais sobre a análise..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="recommendations">Recomendações</Label>
            <Textarea
              id="recommendations"
              {...register('recommendations')}
              placeholder="Recomendações de tratamento..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="prognosis">Prognóstico</Label>
            <Textarea
              id="prognosis"
              {...register('prognosis')}
              placeholder="Prognóstico do caso..."
              rows={2}
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/dashboard/hair-analysis')}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Registrar Análise
        </Button>
      </div>
    </form>
  )
}