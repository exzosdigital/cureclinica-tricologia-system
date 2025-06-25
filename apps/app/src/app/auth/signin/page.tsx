import { Metadata } from 'next'
import { SignInForm } from '@/components/auth/signin-form'
import { getCurrentUser } from '@cureclinica/supabase/queries'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Entrar - CureClinica',
  description: 'Faça login na sua conta CureClinica',
}

export default async function SignInPage() {
  const user = await getCurrentUser()
  
  if (user) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-auto">
            <img
              className="h-12 w-auto"
              src="/logo.png"
              alt="CureClinica"
            />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Faça login na sua conta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sistema de Gestão de Tricologia CureClinica
          </p>
        </div>
        <SignInForm />
      </div>
    </div>
  )
}
