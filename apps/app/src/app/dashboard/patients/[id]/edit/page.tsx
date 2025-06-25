import { notFound } from 'next/navigation'
import { getPatientById } from '@cureclinica/supabase/queries'
import { PatientEditForm } from '@/components/patients/patient-edit-form'
import { Card } from '@cureclinica/ui/card'
import { Button } from '@cureclinica/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export async function generateMetadata({ params }: { params: { id: string } }) {
  const patient = await getPatientById(params.id)
  
  if (!patient) {
    return {
      title: 'Paciente não encontrado',
    }
  }

  return {
    title: `Editar ${patient.first_name} ${patient.last_name} - CureClinica`,
    description: `Editar dados do paciente ${patient.first_name} ${patient.last_name}`,
  }
}

export default async function EditPatientPage({ params }: { params: { id: string } }) {
  const patient = await getPatientById(params.id)
  
  if (!patient) {
    notFound()
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Editar Paciente</h1>
          <p className="mt-1 text-sm text-gray-500">
            Atualize os dados de {patient.first_name} {patient.last_name}
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href={`/dashboard/patients/${params.id}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Link>
        </Button>
      </div>

      {/* Form Card */}
      <Card className="p-6">
        <PatientEditForm patient={patient} />
      </Card>
    </div>
  )
}