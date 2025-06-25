'use client'

import type { Patient } from '@cureclinica/supabase/types'
import { Button } from '@cureclinica/ui/button'
import { Badge } from '@cureclinica/ui/badge'
import { Avatar } from '@cureclinica/ui/avatar'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  Edit,
  MoreHorizontal,
  User
} from 'lucide-react'
import Link from 'next/link'
import { calculateAge } from '@cureclinica/ui/cn'

interface PatientHeaderProps {
  patient: Patient
}

export function PatientHeader({ patient }: PatientHeaderProps) {
  const age = patient.date_of_birth 
    ? calculateAge(patient.date_of_birth)
    : null

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <Avatar className="h-20 w-20">
            <div className="bg-blue-100 text-blue-600 w-full h-full flex items-center justify-center text-2xl font-semibold">
              {patient.first_name.charAt(0)}{patient.last_name.charAt(0)}
            </div>
          </Avatar>
          
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-gray-900">
                {patient.first_name} {patient.last_name}
              </h1>
              <Badge variant={patient.is_active ? 'success' : 'secondary'}>
                {patient.is_active ? 'Ativo' : 'Inativo'}
              </Badge>
              {patient.gender && (
                <Badge variant="outline">
                  {patient.gender === 'male' && 'Masculino'}
                  {patient.gender === 'female' && 'Feminino'}
                  {patient.gender === 'other' && 'Outro'}
                </Badge>
              )}
            </div>
            
            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-600">
              {age && (
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {age} anos
                </div>
              )}
              
              {patient.email && (
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-1" />
                  <a href={`mailto:${patient.email}`} className="hover:text-blue-600">
                    {patient.email}
                  </a>
                </div>
              )}
              
              {patient.phone && (
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-1" />
                  <a href={`tel:${patient.phone}`} className="hover:text-blue-600">
                    {patient.phone}
                  </a>
                </div>
              )}
              
              {patient.address && (
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {patient.address}
                </div>
              )}
              
              {patient.date_of_birth && (
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(patient.date_of_birth).toLocaleDateString('pt-BR')}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" asChild>
            <Link href={`/dashboard/patients/${patient.id}/edit`}>
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Link>
          </Button>
          
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}