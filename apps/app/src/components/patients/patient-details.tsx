import type { Patient } from '@cureclinica/supabase/types'
import { Card, CardHeader, CardTitle, CardContent } from '@cureclinica/ui/card'
import { Badge } from '@cureclinica/ui/badge'
import { 
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  AlertCircle,
  Pill,
  Activity,
  FileText,
  Users
} from 'lucide-react'
import { formatDate, getHairTypeLabel, getScalpConditionLabel } from '@cureclinica/ui/cn'

interface PatientDetailsProps {
  patient: Patient
}

export function PatientDetails({ patient }: PatientDetailsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="h-5 w-5 mr-2" />
            Informações Pessoais
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Nome Completo</label>
            <p className="text-gray-900">{patient.first_name} {patient.last_name}</p>
          </div>
          
          {patient.email && (
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="text-gray-900">{patient.email}</p>
            </div>
          )}
          
          {patient.phone && (
            <div>
              <label className="text-sm font-medium text-gray-500">Telefone</label>
              <p className="text-gray-900">{patient.phone}</p>
            </div>
          )}
          
          {patient.date_of_birth && (
            <div>
              <label className="text-sm font-medium text-gray-500">Data de Nascimento</label>
              <p className="text-gray-900">{formatDate(patient.date_of_birth)}</p>
            </div>
          )}
          
          {patient.gender && (
            <div>
              <label className="text-sm font-medium text-gray-500">Gênero</label>
              <p className="text-gray-900">
                {patient.gender === 'male' && 'Masculino'}
                {patient.gender === 'female' && 'Feminino'}
                {patient.gender === 'other' && 'Outro'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Address */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Endereço
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {patient.address && (
            <div>
              <label className="text-sm font-medium text-gray-500">Endereço</label>
              <p className="text-gray-900">{patient.address}</p>
            </div>
          )}
          
          {patient.city && (
            <div>
              <label className="text-sm font-medium text-gray-500">Cidade</label>
              <p className="text-gray-900">{patient.city}</p>
            </div>
          )}
          
          {patient.state && (
            <div>
              <label className="text-sm font-medium text-gray-500">Estado</label>
              <p className="text-gray-900">{patient.state}</p>
            </div>
          )}
          
          {patient.zip_code && (
            <div>
              <label className="text-sm font-medium text-gray-500">CEP</label>
              <p className="text-gray-900">{patient.zip_code}</p>
            </div>
          )}
          
          {!patient.address && !patient.city && !patient.state && !patient.zip_code && (
            <p className="text-gray-500 text-sm">Nenhum endereço cadastrado</p>
          )}
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Contato de Emergência
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {patient.emergency_contact_name && (
            <div>
              <label className="text-sm font-medium text-gray-500">Nome</label>
              <p className="text-gray-900">{patient.emergency_contact_name}</p>
            </div>
          )}
          
          {patient.emergency_contact_phone && (
            <div>
              <label className="text-sm font-medium text-gray-500">Telefone</label>
              <p className="text-gray-900">{patient.emergency_contact_phone}</p>
            </div>
          )}
          
          {!patient.emergency_contact_name && !patient.emergency_contact_phone && (
            <p className="text-gray-500 text-sm">Nenhum contato de emergência cadastrado</p>
          )}
        </CardContent>
      </Card>

      {/* Medical Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Informações Médicas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {patient.medical_history && (
            <div>
              <label className="text-sm font-medium text-gray-500">Histórico Médico</label>
              <p className="text-gray-900 whitespace-pre-wrap">{patient.medical_history}</p>
            </div>
          )}
          
          {patient.allergies && (
            <div>
              <label className="text-sm font-medium text-gray-500 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                Alergias
              </label>
              <p className="text-gray-900 whitespace-pre-wrap">{patient.allergies}</p>
            </div>
          )}
          
          {patient.current_medications && (
            <div>
              <label className="text-sm font-medium text-gray-500 flex items-center">
                <Pill className="h-4 w-4 mr-1" />
                Medicamentos em Uso
              </label>
              <p className="text-gray-900 whitespace-pre-wrap">{patient.current_medications}</p>
            </div>
          )}
          
          {!patient.medical_history && !patient.allergies && !patient.current_medications && (
            <p className="text-gray-500 text-sm">Nenhuma informação médica cadastrada</p>
          )}
        </CardContent>
      </Card>

      {/* Hair Information */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Informações Capilares
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {patient.hair_type && (
              <div>
                <label className="text-sm font-medium text-gray-500">Tipo de Cabelo</label>
                <p className="text-gray-900">{getHairTypeLabel(patient.hair_type)}</p>
              </div>
            )}
            
            {patient.scalp_condition && (
              <div>
                <label className="text-sm font-medium text-gray-500">Condição do Couro Cabeludo</label>
                <p className="text-gray-900">{getScalpConditionLabel(patient.scalp_condition)}</p>
              </div>
            )}
            
            {patient.hair_loss_duration && (
              <div>
                <label className="text-sm font-medium text-gray-500">Duração da Queda</label>
                <p className="text-gray-900">{patient.hair_loss_duration}</p>
              </div>
            )}
            
            {patient.hair_loss_pattern && (
              <div>
                <label className="text-sm font-medium text-gray-500">Padrão de Queda</label>
                <p className="text-gray-900">{patient.hair_loss_pattern}</p>
              </div>
            )}
            
            <div>
              <label className="text-sm font-medium text-gray-500">Histórico Familiar</label>
              <Badge variant={patient.family_history_hair_loss ? 'destructive' : 'secondary'}>
                {patient.family_history_hair_loss ? 'Sim' : 'Não'}
              </Badge>
            </div>
            
            {patient.previous_treatments && (
              <div className="md:col-span-2 lg:col-span-3">
                <label className="text-sm font-medium text-gray-500">Tratamentos Anteriores</label>
                <p className="text-gray-900 whitespace-pre-wrap">{patient.previous_treatments}</p>
              </div>
            )}
          </div>
          
          {!patient.hair_type && !patient.scalp_condition && !patient.hair_loss_duration && 
           !patient.hair_loss_pattern && !patient.previous_treatments && (
            <p className="text-gray-500 text-sm">Nenhuma informação capilar cadastrada</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}