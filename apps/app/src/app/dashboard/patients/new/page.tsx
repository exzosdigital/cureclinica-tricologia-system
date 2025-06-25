import { Metadata } from 'next'
import { PatientForm } from '@/components/patients/patient-form'
import { Card } from '@cureclinica/ui/card'
import { Button } from '@cureclinica/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Novo Paciente - CureClinica',
  description: 'Cadastrar novo paciente',
}

export default function NewPatientPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Novo Paciente</h1>
          <p className="mt-1 text-sm text-gray-500">
            Preencha os dados para cadastrar um novo paciente
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/dashboard/patients">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Link>
        </Button>
      </div>

      {/* Form Card */}
      <Card className="p-6">
        <PatientForm />
      </Card>
    </div>
  )
}
