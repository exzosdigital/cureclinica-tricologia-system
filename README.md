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

Sistema de gestão completo para clínicas de tricologia, incluindo gestão de pacientes, análises capilares, tratamentos, agenda e muito mais.

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
│   └── web/                    # Site institucional
├── packages/
│   ├── supabase/              # Queries e mutations
│   ├── ui/                    # Componentes compartilhados
│   ├── email/                 # Templates de email
│   ├── analytics/             # Analytics
│   └── jobs/                  # Background jobs
├── tooling/
│   └── typescript/            # Configurações TypeScript
└── ...
```

## Pré-requisitos

- Bun
- Docker
- Supabase
- Upstash
- Resend
- Sentry
- OpenPanel

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
cp apps/api/.env.example apps/api/.env
cp apps/app/.env.example apps/app/.env
cp apps/web/.env.example apps/web/.env
```

4. Inicie o banco de dados:

```bash
bun dev:api
```

5. Execute as migrações:

```bash
bun migrate
bun seed
```

6. Inicie o desenvolvimento:

```bash
bun dev
```

## Comandos Disponíveis

```bash
bun dev          # Inicia tudo em modo desenvolvimento
bun dev:app      # Inicia apenas o sistema principal
bun dev:web      # Inicia apenas o site institucional
bun dev:api      # Inicia apenas o Supabase
bun migrate      # Executa migrações do banco
bun seed         # Executa seed do banco
bun build        # Build para produção
bun test         # Executa testes
```

## Especialidades da Tricologia

O sistema foi desenvolvido especificamente para clínicas de tricologia, incluindo:

- **Análise Capilar Completa**: Tipo de cabelo, densidade, espessura, condições do couro cabeludo
- **Diagnósticos Especializados**: Alopecia androgenética, areata, difusa, cicatricial, etc.
- **Tratamentos Específicos**: Medicamentosos, procedimentais, cosméticos
- **Escalas de Avaliação**: Ludwig, Norwood-Hamilton, SALT, etc.
- **Protocolos de Acompanhamento**: Fotografias padronizadas, medições, progressos
- **Produtos Capilares**: Controle de estoque de dermocosméticos

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