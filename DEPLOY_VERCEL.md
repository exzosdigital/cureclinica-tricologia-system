# Deploy na Vercel - CureClinica

## 🚀 Configuração do Deploy

### 1. **Importar Projeto na Vercel**

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Import Git Repository"
3. Selecione: `exzosdigital/cureclinica-tricologia-system`

### 2. **Configurações do Projeto**

```
Framework Preset: Next.js
Root Directory: apps/app
Build Command: cd ../.. && bun install && bun build --filter=@cureclinica/app
Output Directory: .next
Install Command: bun install
```

### 3. **Variáveis de Ambiente**

Adicione as seguintes variáveis no painel da Vercel:

```env
# Supabase - PRODUÇÃO
NEXT_PUBLIC_SUPABASE_URL=https://gvuaslecbrhieyonnufz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2dWFzbGVjYnJoaWV5b25udWZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1NjgzNTAsImV4cCI6MjA2NjE0NDM1MH0.39KFb789Mq0vQO6GcGtgctlf2Nu03yS

# IMPORTANTE: Adicionar o Service Role Key do Supabase
SUPABASE_SERVICE_ROLE_KEY=seu_service_role_key_aqui

# Authentication (gerar uma secret key segura)
NEXTAUTH_SECRET=gerar_uma_chave_segura_aqui
NEXTAUTH_URL=https://seu-dominio.vercel.app

# App Config
NEXT_PUBLIC_APP_URL=https://seu-dominio.vercel.app
NEXT_PUBLIC_APP_NAME=CureClinica - Sistema de Tricologia

# Opcional - se quiser usar essas features
# UPLOADTHING_SECRET=
# UPLOADTHING_APP_ID=
# RESEND_API_KEY=
# NEXT_PUBLIC_OPENPANEL_CLIENT_ID=
# OPENPANEL_SECRET_KEY=
# NEXT_PUBLIC_SENTRY_DSN=
# SENTRY_ORG=
# SENTRY_PROJECT=
# SENTRY_AUTH_TOKEN=
# UPSTASH_REDIS_REST_URL=
# UPSTASH_REDIS_REST_TOKEN=
```

### 4. **Obter Service Role Key do Supabase**

1. Acesse o [Dashboard do Supabase](https://supabase.com/dashboard/project/gvuaslecbrhieyonnufz)
2. Vá em Settings → API
3. Copie a "service_role" key (mantê-la segura!)
4. Cole na variável `SUPABASE_SERVICE_ROLE_KEY` na Vercel

### 5. **Gerar NEXTAUTH_SECRET**

Execute este comando no terminal para gerar uma chave segura:

```bash
openssl rand -base64 32
```

Ou use um gerador online: https://generate-secret.vercel.app/32

### 6. **Deploy**

Após configurar tudo:
1. Clique em "Deploy"
2. Aguarde o build completar
3. Acesse o URL gerado pela Vercel

### 7. **Domínio Customizado (Opcional)**

1. Em Settings → Domains
2. Adicione seu domínio: `app.cureclinica.com.br`
3. Configure o DNS conforme instruções da Vercel

## 🔧 Troubleshooting

### Se o build falhar:

1. **Verificar logs** no dashboard da Vercel
2. **Limpar cache** em Settings → Functions → Clear Cache
3. **Verificar variáveis** de ambiente estão corretas
4. **Atualizar** este repositório se necessário

### Comandos úteis localmente:

```bash
# Testar build local
cd apps/app
bun run build

# Verificar tipos
bun run typecheck

# Limpar cache
bun run clean
```

## 📱 Acesso ao Sistema

Após o deploy bem-sucedido:

- **URL**: https://seu-dominio.vercel.app
- **Login**: admin@cureclinica.com.br
- **Senha**: admin123

## 🔐 Segurança

**IMPORTANTE**: 
- Nunca commitar as chaves secretas no repositório
- Manter o Service Role Key seguro
- Usar senhas fortes em produção
- Ativar 2FA nas contas importantes

## 📞 Suporte

Em caso de problemas:
- GitHub Issues: https://github.com/exzosdigital/cureclinica-tricologia-system/issues
- Email: contato@cureclinica.com.br
