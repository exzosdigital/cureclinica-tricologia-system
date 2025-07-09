# Guia de Arquitetura Híbrida CureClinica

Este guia descreve a arquitetura híbrida da plataforma CureClinica, integrando três componentes principais: CureClinica (Next.js), Supabase (Banco de Dados e Autenticação) e Directus (CMS Headless).

## Visão Geral

A arquitetura híbrida permite combinar o melhor de cada plataforma:

- **CureClinica (apps/app)**: Aplicação principal em Next.js para médicos e pacientes
- **API (apps/api)**: API para integração externa e serviços
- **Painel Admin (apps/admin)**: Interface de administração e configuração do sistema
- **Supabase (self-hosted)**: Gerenciamento de banco de dados, autenticação e storage
- **Directus (headless CMS)**: Gerenciamento flexível de conteúdo e configurações

## Estrutura do Projeto

```
cureclinica-tricologia-system/
├── apps/
│   ├── app/             # Aplicação principal (Next.js)
│   ├── api/             # API para integrações externas
│   └── admin/           # Painel administrativo (Next.js)
├── packages/
│   └── ui/              # Componentes compartilhados
└── tooling/             # Ferramentas de desenvolvimento
```

## Componentes da Arquitetura

### 1. CureClinica (Next.js)

A aplicação principal desenvolvida em Next.js, seguindo as boas práticas do boilerplate midday-ai/v1:

- Server Components para melhor performance
- API Routes e Server Actions para operações de dados
- Implementação do CRUD completo de pacientes
- Internacionalização com i18n
- Gestão de estado via URL usando nuqs

### 2. Supabase (Self-Hosted no Railway)

Plataforma open-source para gerenciamento de banco de dados PostgreSQL, autenticação e storage:

- **Autenticação**: Gerenciamento de usuários, permissões e roles
- **Banco de Dados**: Armazenamento estruturado de dados de pacientes, consultas, etc.
- **Storage**: Armazenamento de arquivos e imagens
- **Serverless Functions**: (opcional) Para lógica de negócio específica

Para deploy no Railway, utilizamos o template oficial do Supabase: https://railway.com/deploy/supabase

### 3. Directus (Headless CMS no Railway)

Sistema de gerenciamento de conteúdo headless para configurações dinâmicas e conteúdo administrável:

- **Campos Personalizados**: Definição de campos para pacientes, consultas, etc.
- **Conteúdo Dinâmico**: Artigos, FAQs, páginas informativas
- **Configuração do Sistema**: Parâmetros, opções e regras de negócio
- **Workflow**: Configuração de fluxos de trabalho personalizados

Para deploy no Railway, utilizamos o template oficial do Directus: https://railway.com/deploy/2fy758

## Integração dos Componentes

### Integração CureClinica → Supabase

```typescript
// Em apps/app
import { supabase } from '@/lib/supabase';

// Autenticação
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'usuario@exemplo.com',
  password: 'senha123'
});

// Acesso a dados
const { data: patients } = await supabase
  .from('patients')
  .select('*')
  .order('created_at', { ascending: false });
```

### Integração CureClinica → Directus

```typescript
// Em apps/app
import { directus } from '@/lib/directus';

// Buscar configurações
const { data: configs } = await directus.items('app_config').readByQuery({
  filter: { active: { _eq: true } },
});

// Buscar conteúdo dinâmico
const { data: articles } = await directus.items('articles').readByQuery({
  filter: { status: { _eq: 'published' } },
  sort: ['-date_published'],
});
```

### Integração Supabase ↔ Directus (via Painel Admin)

O painel administrativo (apps/admin) atua como ponte entre o Supabase e o Directus:

- Define campos personalizados no Directus 
- Mapeia esses campos para as tabelas no Supabase
- Sincroniza conteúdo e configurações entre as plataformas
- Oferece interface para gerenciamento centralizado

## Configuração de Ambientes

### Variáveis de Ambiente

Cada aplicação requer configuração de variáveis de ambiente:

1. **apps/app/.env**:
```
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon
NEXT_PUBLIC_DIRECTUS_URL=https://seu-directus.railway.app
```

2. **apps/admin/.env**:
```
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon
NEXT_PUBLIC_DIRECTUS_URL=https://seu-directus.railway.app
DIRECTUS_ADMIN_EMAIL=admin@exemplo.com
DIRECTUS_ADMIN_PASSWORD=senha-segura
```

## Deploy no Railway

### Deploy do Supabase

1. Acesse https://railway.com/deploy/supabase
2. Clique em "Deploy on Railway"
3. Configure as variáveis de ambiente (JWT_SECRET, ANON_KEY, etc.)
4. Após o deploy, copie a URL e as chaves para seus arquivos .env

### Deploy do Directus

1. Acesse https://railway.com/deploy/2fy758
2. Clique em "Deploy on Railway"
3. Configure as variáveis de ambiente (KEY, SECRET, ADMIN_EMAIL, ADMIN_PASSWORD)
4. Após o deploy, copie a URL para seus arquivos .env

### Deploy das Aplicações CureClinica

Cada aplicação (app, api, admin) pode ser deployada como um serviço separado no Railway:

```bash
railway up --service app
railway up --service api
railway up --service admin
```

## Considerações de Segurança

- Configure Network Peering no Railway para comunicação segura entre serviços
- Use JWT para autenticação entre Supabase e aplicações
- Não exponha chaves de administrador em código cliente
- Mantenha backup regular do banco de dados Supabase
- Use roles e permissões no Directus para limitar acesso a recursos

## Recursos e Documentação

- [Documentação do Supabase](https://supabase.io/docs)
- [Documentação do Directus](https://docs.directus.io)
- [Template Railway para Supabase](https://railway.com/deploy/supabase)
- [Template Railway para Directus](https://railway.com/deploy/2fy758)
