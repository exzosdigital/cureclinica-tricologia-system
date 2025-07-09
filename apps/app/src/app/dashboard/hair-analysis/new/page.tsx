import type { Metadata } from 'next'
import { HairAnalysisForm } from '@/components/hair-analysis/hair-analysis-form'
import { Card } from '@cureclinica/ui/card'
import { Button } from '@cureclinica/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Nova Análise Capilar - CureClinica',
  description: 'Registrar nova análise tricológica',
}

export default function NewHairAnalysisPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nova Análise Capilar</h1>
          <p className="mt-1 text-sm text-gray-500">
            Registre uma nova análise tricológica detalhada
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/dashboard/hair-analysis">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Link>
        </Button>
      </div>

      {/* Form Card */}
      <Card className="p-6">
        <HairAnalysisForm />
      </Card>
    </div>
  )
}