/**
 * Configuração central para Server Actions usando react-safe-action
 * 
 * Este arquivo exporta a função createSafeAction que será usada para criar
 * todas as Server Actions no sistema, garantindo validação com Zod,
 * tratamento de erros padronizado e tipagem forte.
 */

import { z } from 'zod';
import { createSafeActionClient } from 'react-safe-action';

// Tipo padrão para respostas de sucesso
export type SuccessResponse<Data> = {
  success: true;
  data: Data;
};

// Tipo padrão para respostas de erro
export type ErrorResponse = {
  success: false;
  error: {
    message: string;
    code?: string;
    field?: string;
    issues?: any[];
  };
};

// Tipo de resposta unificado para todas as actions
export type ActionResponse<Data> = SuccessResponse<Data> | ErrorResponse;

// Classe auxiliar para gerar respostas padronizadas
export class ActionResult {
  // Método para gerar resposta de sucesso
  static success = <Data>(data: Data): SuccessResponse<Data> => {
    return {
      success: true,
      data,
    };
  };

  // Método para gerar resposta de erro
  static error = (
    message: string,
    code?: string,
    field?: string,
    issues?: any[]
  ): ErrorResponse => {
    return {
      success: false,
      error: {
        message,
        ...(code && { code }),
        ...(field && { field }),
        ...(issues && { issues }),
      },
    };
  };
}

// Cliente para criar actions seguras com validação Zod
export const createSafeAction = createSafeActionClient();
