import { getPatients } from '@cureclinica/supabase/queries'
import { Card } from '@cureclinica/ui/card'
import { Badge } from '@cureclinica/ui/badge'
import { Avatar } from '@cureclinica/ui/avatar'
import { Button } from '@cureclinica/ui/button'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  Eye,
  Edit,
  MoreHorizontal,
  Users,
  Plus
} from 'lucide-react'
import Link from 'next/link'

interface PatientsListProps {
  search?: string
  page?: number
  status?: string
  gender?: string
}

export async function PatientsList({ 
  search, 
  page = 1, 
  status, 
  gender 
}: PatientsListProps) {
  const limit = 20
  const offset = (page - 1) * limit
  
  const { data: patients, count } = await getPatients({
    search,
    limit,
    offset,
    ...(status && status !== 'all' && { status: status === 'active' }),
    ...(gender && gender !== 'all' && { gender })
  })

  const totalPages = Math.ceil((count || 0) / limit)

  if (patients.length === 0) {
    return (
      <Card className="p-12 text-center">
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Users className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {search ? 'Nenhum paciente encontrado' : 'Nenhum paciente cadastrado'}
        </h3>
        <p className="text-gray-500 mb-6">
          {search 
            ? `Não encontramos pacientes com "${search}"`
            : 'Comece cadastrando seu primeiro paciente'
          }
        </p>
        <Button asChild>
          <Link href="/dashboard/patients/new">
            <Plus className="h-4 w-4 mr-2" />
            Novo Paciente
          </Link>
        </Button>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <p>
          Mostrando {((page - 1) * limit) + 1} a {Math.min(page * limit, count || 0)} de {count || 0} pacientes
        </p>
        {totalPages > 1 && (
          <p>
            Página {page} de {totalPages}
          </p>
        )}
      </div>

      {/* Patients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients.map((patient) => (
          <Card key={patient.id} className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-4">
              <Avatar className="h-12 w-12">
                <div className="bg-blue-100 text-blue-600 w-full h-full flex items-center justify-center text-lg font-semibold">
                  {patient.first_name.charAt(0)}{patient.last_name.charAt(0)}
                </div>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {patient.first_name} {patient.last_name}
                  </h3>
                  <Badge 
                    variant={patient.is_active ? 'success' : 'secondary'}
                    className="ml-2"
                  >
                    {patient.is_active ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>
                
                <div className="mt-2 space-y-1">
                  {patient.email && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="truncate">{patient.email}</span>
                    </div>
                  )}
                  
                  {patient.phone && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{patient.phone}</span>
                    </div>
                  )}
                  
                  {patient.date_of_birth && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      <span>
                        {new Date().getFullYear() - new Date(patient.date_of_birth).getFullYear()} anos
                      </span>
                    </div>
                  )}
                  
                  {patient.address && (
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="truncate">{patient.address}</span>
                    </div>
                  )}
                </div>

                {/* Medical Info */}
                {(patient.hair_type || patient.scalp_condition) && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex flex-wrap gap-1">
                      {patient.hair_type && (
                        <Badge variant="outline" className="text-xs">
                          {patient.hair_type === 'straight' && 'Liso'}
                          {patient.hair_type === 'wavy' && 'Ondulado'}
                          {patient.hair_type === 'curly' && 'Cacheado'}
                          {patient.hair_type === 'coily' && 'Crespo'}
                        </Badge>
                      )}
                      {patient.scalp_condition && (
                        <Badge variant="outline" className="text-xs">
                          {patient.scalp_condition === 'normal' && 'Normal'}
                          {patient.scalp_condition === 'dry' && 'Seco'}
                          {patient.scalp_condition === 'oily' && 'Oleoso'}
                          {patient.scalp_condition === 'sensitive' && 'Sensível'}
                          {patient.scalp_condition === 'irritated' && 'Irritado'}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="mt-4 flex items-center space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/patients/${patient.id}`}>
                      <Eye className="h-4 w-4 mr-1" />
                      Ver
                    </Link>
                  </Button>
                  
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/patients/${patient.id}/edit`}>
                      <Edit className="h-4 w-4 mr-1" />
                      Editar
                    </Link>
                  </Button>
                  
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 mt-8">
          <Button 
            variant="outline" 
            disabled={page <= 1}
            asChild={page > 1}
          >
            {page > 1 ? (
              <Link href={`?page=${page - 1}&search=${search || ''}`}>
                Anterior
              </Link>
            ) : (
              'Anterior'
            )}
          </Button>
          
          <div className="flex space-x-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNumber = page <= 3 ? i + 1 : page - 2 + i
              if (pageNumber > totalPages) return null
              
              return (
                <Button
                  key={pageNumber}
                  variant={pageNumber === page ? 'default' : 'outline'}
                  size="sm"
                  asChild
                >
                  <Link href={`?page=${pageNumber}&search=${search || ''}`}>
                    {pageNumber}
                  </Link>
                </Button>
              )
            })}
          </div>
          
          <Button 
            variant="outline" 
            disabled={page >= totalPages}
            asChild={page < totalPages}
          >
            {page < totalPages ? (
              <Link href={`?page=${page + 1}&search=${search || ''}`}>
                Próxima
              </Link>
            ) : (
              'Próxima'
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
