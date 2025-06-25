import { notFound } from 'next/navigation'
import { getPatientById, getPatientHairAnalyses } from '@cureclinica/supabase/queries'
import { getConsultations } from '@cureclinica/supabase/queries'
import { PatientDetails } from '@/components/patients/patient-details'
import { PatientHeader } from '@/components/patients/patient-header'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@cureclinica/ui/tabs'
import { Card } from '@cureclinica/ui/card'
import { ConsultationsList } from '@/components/consultations/consultations-list'
import { HairAnalysisList } from '@/components/hair-analysis/hair-analysis-list'

export async function generateMetadata({ params }: { params: { id: string } }) {
  const patient = await getPatientById(params.id)
  
  if (!patient) {
    return {
      title: 'Paciente não encontrado',
    }
  }

  return {
    title: `${patient.first_name} ${patient.last_name} - CureClinica`,
    description: `Perfil do paciente ${patient.first_name} ${patient.last_name}`,
  }
}

export default async function PatientDetailsPage({ params }: { params: { id: string } }) {
  const patient = await getPatientById(params.id)
  
  if (!patient) {
    notFound()
  }

  const [consultations, hairAnalyses] = await Promise.all([
    getConsultations({ patientId: params.id }),
    getPatientHairAnalyses(params.id),
  ])

  return (
    <div className="space-y-6">
      {/* Patient Header */}
      <PatientHeader patient={patient} />

      {/* Tabs */}
      <Tabs defaultValue="info" className="space-y-4">
        <TabsList>
          <TabsTrigger value="info">Informações</TabsTrigger>
          <TabsTrigger value="consultations">
            Consultas ({consultations.length})
          </TabsTrigger>
          <TabsTrigger value="hair-analysis">
            Análises Capilares ({hairAnalyses.length})
          </TabsTrigger>
          <TabsTrigger value="treatments">Tratamentos</TabsTrigger>
          <TabsTrigger value="photos">Fotos</TabsTrigger>
          <TabsTrigger value="payments">Pagamentos</TabsTrigger>
        </TabsList>

        {/* Patient Info Tab */}
        <TabsContent value="info">
          <PatientDetails patient={patient} />
        </TabsContent>

        {/* Consultations Tab */}
        <TabsContent value="consultations">
          <ConsultationsList consultations={consultations} />
        </TabsContent>

        {/* Hair Analysis Tab */}
        <TabsContent value="hair-analysis">
          <HairAnalysisList analyses={hairAnalyses} />
        </TabsContent>

        {/* Treatments Tab */}
        <TabsContent value="treatments">
          <Card className="p-6">
            <p className="text-gray-500 text-center">
              Nenhum tratamento registrado ainda.
            </p>
          </Card>
        </TabsContent>

        {/* Photos Tab */}
        <TabsContent value="photos">
          <Card className="p-6">
            <p className="text-gray-500 text-center">
              Nenhuma foto registrada ainda.
            </p>
          </Card>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments">
          <Card className="p-6">
            <p className="text-gray-500 text-center">
              Nenhum pagamento registrado ainda.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
