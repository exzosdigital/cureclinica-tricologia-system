# CureClinica - Sistema de Gestão de Tricologia

![CureClinica](https://cureclinica.com.br/logo.png)

<p align="center">
	<h1 align="center"><b>CureClinica Tricologia System</b></h1>
<p align="center">
    Sistema completo de gestão para clínicas especializadas em tricologia.
    <br />
    Baseado no <a href="https://github.com/midday-ai/v1">v1 starter kit</a>.
    <br />
    <br />
    <a href="https://cureclinica.com.br"><strong>Website</strong></a> · 
    <a href="https://github.com/exzosdigital/cureclinica-tricologia-system/issues"><strong>Issues</strong></a> · 
    <a href="#funcionalidades"><strong>Funcionalidades</strong></a> ·
    <a href="#tecnologias"><strong>Tecnologias</strong></a>
  </p>
</p>

Sistema de gestão completo para clínicas de tricologia, incluindo gestão de pacientes, análises capilares, tratamentos, agenda e muito mais. Desenvolvido com tecnologias modernas como Next.js 14, TypeScript, Tailwind CSS e Supabase.

## 🚨 Status do Deploy

**Pull Request #1 aberto**: [Correção dos erros de deploy na Vercel](https://github.com/exzosdigital/cureclinica-tricologia-system/pull/1)

## Funcionalidades

✅ **Gestão de Pacientes** - Cadastro completo com histórico médico  
✅ **Análises Capilares** - Diagnósticos detalhados com fotos e medições  
✅ **Agenda Inteligente** - Agendamento e controle de consultas  
✅ **Tratamentos** - Planos terapêuticos e acompanhamento  
✅ **Prontuário Digital** - Registros clínicos completos  
✅ **Financeiro** - Controle de pagamentos e faturamento  
✅ **Relatórios** - Analytics e dashboards personalizados  
✅ **Upload de Imagens** - Fotos capilares com comparativo de evolução  
✅ **Sistema de Notificações** - Lembretes e alertas automáticos  
✅ **Multi-usuário** - Diferentes níveis de acesso (admin, médico, recepção)  

## 🎯 Status do Desenvolvimento

### ✅ Concluído
- [x] Estrutura base do monorepo (Turborepo)
- [x] Configuração Next.js 14 + TypeScript
- [x] Schema completo do banco Supabase (10 tabelas)
- [x] Sistema de Autenticação com Supabase Auth
- [x] Layout principal com sidebar responsiva
- [x] Dashboard com estatísticas e widgets
- [x] CRUD de Pacientes (listagem com filtros)
- [x] Packages compartilhados:
  - [x] @cureclinica/supabase (queries, mutations, types)
  - [x] @cureclinica/ui (componentes shadcn/ui)
  - [x] @cureclinica/analytics (provider básico)
  - [x] @cureclinica/typescript (configurações)

### 🚧 Em Desenvolvimento
- [ ] Formulário de cadastro de pacientes
- [ ] Página de detalhes do paciente
- [ ] Sistema de análise capilar
- [ ] Upload de fotos capilares
- [ ] Agenda de consultas

### 📋 Próximas Etapas
- [ ] Deploy na Vercel (aguardando merge do PR #1)
- [ ] Gestão de tratamentos
- [ ] Sistema financeiro
- [ ] Relatórios e analytics
- [ ] Website institucional (apps/web)
- [ ] Testes automatizados
- [ ] CI/CD completo

## Tecnologias

[Next.js](https://nextjs.org/) - Framework  
[Turborepo](https://turbo.build) - Monorepo  
[TypeScript](https://www.typescriptlang.org/) - Type safety  
[Tailwind CSS](https://tailwindcss.com/) - Styling  
[shadcn/ui](https://ui.shadcn.com/) - UI components  
[Supabase](https://supabase.com/) - Database, Auth, Storage  
[Upstash](https://upstash.com/) - Cache e rate limiting  
[React Email](https://react.email/) - Email templates  
[Resend](https://resend.com/) - Email delivery  
[Sentry](https://sentry.io/) - Error monitoring  
[Trigger.dev](https://trigger.dev/) - Background jobs  
[OpenPanel](https://openpanel.dev/) - Analytics  
[nuqs](https://nuqs.47ng.com/) - URL state management  
[react-safe-action](https://next-safe-action.dev) - Server Actions  

## Estrutura do Projeto

```
.
├── apps/
│   ├── api/                    # Supabase (Database, Auth, Functions)
│   ├── app/                    # Sistema principal da clínica
│   └── web/                    # Site institucional (não iniciado)
├── packages/
│   ├── supabase/              # Queries e mutations ✅
│   ├── ui/                    # Componentes compartilhados ✅
│   ├── email/                 # Templates de email
│   ├── analytics/             # Analytics ✅
│   └── jobs/                  # Background jobs
├── tooling/
│   └── typescript/            # Configurações TypeScript ✅
└── ...
```

## Database Schema (Especializado em Tricologia)

### Banco de Dados em Produção
- **Projeto Supabase**: `gvuaslecbrhieyonnufz`
- **URL**: `https://gvuaslecbrhieyonnufz.supabase.co`
- **Região**: `us-east-1`

### Tabelas Principais
- **users** - Usuários do sistema (admin, doctor, receptionist)
- **patients** - Pacientes com dados médicos completos
- **consultations** - Consultas médicas
- **hair_analysis** - Análises capilares detalhadas
- **hair_photos** - Fotos capilares com metadata
- **treatments** - Tratamentos prescritos
- **treatment_sessions** - Sessões de tratamento
- **products** - Produtos dermocosméticos
- **prescriptions** - Prescrições médicas
- **payments** - Controle financeiro

### Características Específicas
- **Escalas de Avaliação**: Ludwig, Norwood-Hamilton, SALT
- **Tipos Capilares**: Straight, Wavy, Curly, Coily
- **Condições do Couro Cabeludo**: Normal, Dry, Oily, Sensitive, Irritated
- **Análises Detalhadas**: Densidade, espessura, sensibilidade, oleosidade
- **Protocolos Tricológicos**: Pull test, tricoscopia, microscopia

## Pré-requisitos

- Bun >= 1.1.26
- Node.js >= 18
- Conta na Vercel (para deploy)
- Conta no Supabase (já configurado)

## Começando

1. Clone o repositório:

```bash
git clone https://github.com/exzosdigital/cureclinica-tricologia-system.git
cd cureclinica-tricologia-system
```

2. Instale as dependências:

```bash
bun install
```

3. Configure as variáveis de ambiente:

```bash
cp apps/app/.env.example apps/app/.env
```

4. Inicie o desenvolvimento:

```bash
bun dev
```

## Comandos Disponíveis

```bash
bun dev          # Inicia tudo em modo desenvolvimento
bun dev:app      # Inicia apenas o sistema principal
bun build        # Build para produção
bun clean        # Limpa caches e node_modules
bun lint         # Verifica código
bun typecheck    # Verifica tipos TypeScript
```

## Usuários Demo

- **Admin**: admin@cureclinica.com.br / admin123
- **Médico**: dr.silva@cureclinica.com.br / doctor123

## Deploy

1. Faça merge do PR #1
2. Configure o projeto na Vercel
3. Adicione as variáveis de ambiente
4. Deploy automático após push na main

Veja [DEPLOY_VERCEL.md](DEPLOY_VERCEL.md) para instruções detalhadas.

## Contribuição

Contribuições são bem-vindas! Por favor, leia as [diretrizes de contribuição](CONTRIBUTING.md) antes de enviar um PR.

## Licença

MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## Suporte

Para suporte, entre em contato:
- Email: contato@cureclinica.com.br
- Website: [cureclinica.com.br](https://cureclinica.com.br)
- GitHub Issues: [Issues](https://github.com/exzosdigital/cureclinica-tricologia-system/issues)

---

**Desenvolvido com ❤️ para clínicas de tricologia**

---

## Padrões de Código e Desenvolvimento

Este projeto segue rigorosamente as convenções e padrões definidos no boilerplate midday-ai/v1 e nas cursor rules para garantir código de alta qualidade:

### Padrões Principais
- **TypeScript**: Tipagem estrita, interfaces em vez de types, sem uso de enums
- **Componentes**: React Server Components quando possível, minimizando `use client`
- **Estado**: `nuqs` para gerenciamento de estado via URL search parameters
- **Validação**: Zod para validação de formulários e entradas
- **Error Handling**: Tratamento robusto de erros com retorno early
- **Estilo**: Tailwind CSS com shadcn/ui para componentes consistentes
- **Código**: Funcional e declarativo, evitando classes e duplicação
