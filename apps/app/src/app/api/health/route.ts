import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Você pode adicionar verificações adicionais aqui se necessário
    // Por exemplo, verificar a conexão com o Supabase

    return NextResponse.json(
      {
        status: 'ok',
        message: 'Sistema CureClinica operando normalmente',
        timestamp: new Date().toISOString(),
        version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Health check falhou:', error);
    
    return NextResponse.json(
      {
        status: 'error',
        message: 'Sistema CureClinica com problemas',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
