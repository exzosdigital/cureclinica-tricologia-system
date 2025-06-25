# Guia de Deploy na Vercel - CureClinica

## 🚀 Passo a Passo para Deploy

### 1. Configuração Inicial na Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em "New Project"
3. Importe o repositório: `exzosdigital/cureclinica-tricologia-system`

### 2. Configurações do Build

Na tela de configuração do projeto, use:

- **Framework Preset**: Next.js
- **Root Directory**: `apps/app`
- **Build Command**: (deixar vazio - vai usar vercel.json)
- **Output Directory**: (deixar vazio - vai usar vercel.json)
- **Install Command**: (deixar vazio - vai usar vercel.json)

### 3. Variáveis de Ambiente

Adicione as seguintes variáveis de ambiente:

```env
# Supabase - PRODUÇÃO
NEXT_PUBLIC_SUPABASE_URL=https://gvuaslecbrhieyonnufz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2dWFzbGVjYnJoaWV5b25udWZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1NjgzNTAsImV4cCI6MjA2NjE0NDM1MH0.39KFb789Mq0vQO6GcGtgctlf2Nu03yS

# Obter do painel Supabase: Settings > API
SUPABASE_SERVICE_ROLE_KEY=seu_service_role_key_aqui

# Autenticação
NEXTAUTH_SECRET=gerar_uma_chave_segura_aqui
NEXTAUTH_URL=https://seu-dominio.vercel.app

# Aplicação
NEXT_PUBLIC_APP_URL=https://seu-dominio.vercel.app
NEXT_PUBLIC_APP_NAME="CureClinica - Sistema de Tricologia"

# Opcional - Adicionar conforme necessário
# UPLOADTHING_SECRET=
# UPLOADTHING_APP_ID=
# RESEND_API_KEY=
# UPSTASH_REDIS_REST_URL=
# UPSTASH_REDIS_REST_TOKEN=
```

### 4. Deploy

1. Clique em "Deploy"
2. Aguarde o build completar
3. Acesse a URL gerada pela Vercel

### 5. Domínio Customizado (Opcional)

1. No painel do projeto na Vercel
2. Vá em "Settings" > "Domains"
3. Adicione seu domínio: `app.cureclinica.com.br`
4. Configure o DNS conforme instruções da Vercel

## 📝 Notas Importantes

### Banco de Dados Supabase

O projeto já está configurado com o banco de dados em produção:
- **URL**: https://gvuaslecbrhieyonnufz.supabase.co
- **Região**: us-east-1
- **Tabelas**: 10 especializadas em tricologia

### Usuários Demo

Após o deploy, você pode acessar com:
- **Admin**: admin@cureclinica.com.br / admin123
- **Médico**: dr.silva@cureclinica.com.br / doctor123

### Service Role Key

Para obter o `SUPABASE_SERVICE_ROLE_KEY`:
1. Acesse o painel do Supabase
2. Vá em Settings > API
3. Copie a "service_role" key (JWT secret)

### Gerando NEXTAUTH_SECRET

Para gerar uma chave segura:
```bash
openssl rand -base64 32
```

## 🐛 Troubleshooting

### Erro de Build

Se houver erro no build:
1. Verifique se todas as variáveis de ambiente foram adicionadas
2. Certifique-se que o Root Directory está como `apps/app`
3. Verifique os logs de build na Vercel

### Erro 500 após Deploy

1. Verifique as Function Logs na Vercel
2. Confirme que o `SUPABASE_SERVICE_ROLE_KEY` está correto
3. Verifique se o `NEXTAUTH_URL` corresponde ao domínio do deploy

## 📞 Suporte

Em caso de dúvidas:
- Issues: https://github.com/exzosdigital/cureclinica-tricologia-system/issues
- Email: contato@cureclinica.com.br
