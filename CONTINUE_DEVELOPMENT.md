# Prompt para Continuar o Desenvolvimento

## Status Atual do Projeto

Estamos desenvolvendo o **CureClinica - Sistema de Gestão de Tricologia** baseado no v1 starter kit (midday-ai/v1). 

### ✅ O que já foi criado:

1. **Estrutura Base do Projeto**
   - Repositório: `exzosdigital/cureclinica-tricologia-system`
   - Configuração do Turborepo
   - Package.json principal com workspaces
   - Configurações do Biome, TypeScript, etc.

2. **Aplicação Principal (apps/app)**
   - Configuração Next.js 14 com App Router
   - Tailwind CSS + shadcn/ui
   - Configurações de ambiente
   - TypeScript setup

3. **Banco de Dados Supabase (apps/api)**
   - 9 migrações completas especializadas em tricologia:
     - Triggers de autenticação
     - Tabela de usuários com roles
     - Pacientes com dados médicos
     - Consultas médicas
     - Análises capilares detalhadas
     - Fotos capilares
     - Tratamentos e sessões
     - Produtos e prescrições
     - Pagamentos
   - Seed com dados demo
   - RLS (Row Level Security) configurado

### 🚧 Próximos Passos:

1. **Packages do Monorepo**
   - `packages/supabase` - Queries, mutations, types
   - `packages/ui` - Componentes shadcn/ui compartilhados
   - `packages/email` - Templates React Email
   - `packages/analytics` - OpenPanel integration
   - `tooling/typescript` - Configs compartilhadas

2. **Aplicação Frontend**
   - Layout principal com sidebar
   - Dashboard com estatísticas
   - CRUD de pacientes
   - Sistema de análise capilar
   - Upload de fotos
   - Agenda de consultas
   - Gestão de tratamentos
   - Sistema financeiro

3. **Website Institucional (apps/web)**
   - Landing page da CureClinica
   - Páginas informativas
   - Sistema de contato

## Comando para Continuar

```
Estou desenvolvendo o sistema CureClinica de gestão de tricologia baseado no v1 starter kit. Já criamos:

1. Estrutura do monorepo (Turborepo + Next.js 14)
2. Repositório GitHub: exzosdigital/cureclinica-tricologia-system
3. Configuração apps/app (Next.js principal)
4. Configuração apps/api (Supabase com 9 migrações especializadas)
5. Schema completo de banco para tricologia (usuários, pacientes, consultas, análises capilares, tratamentos, etc.)

Agora preciso continuar criando:
- packages/supabase (queries/mutations)
- packages/ui (componentes shadcn/ui)
- packages/email (templates)
- tooling/typescript (configs)
- Frontend da aplicação principal
- Sistema de autenticação
- Dashboard e CRUD completos

Siga as regras de desenvolvimento fornecidas anteriormente (functional programming, TypeScript, server components, etc.)
```

## Tecnologias em Uso

- **Framework**: Next.js 14 (App Router)
- **Monorepo**: Turborepo
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS + shadcn/ui
- **Language**: TypeScript
- **Auth**: Supabase Auth
- **State**: nuqs (URL state)
- **Forms**: react-hook-form + zod
- **Email**: React Email + Resend
- **Upload**: UploadThing
- **Analytics**: OpenPanel
- **Monitoring**: Sentry

## Regras de Desenvolvimento

- Functional programming patterns
- Server Components como padrão
- Minimizar 'use client'
- TypeScript em tudo
- Zod para validação
- Naming: kebab-case para diretórios
- Error handling proativo
- Responsive design (mobile-first)
- Acessibilidade