# 🚀 Deploy CureClinica na Vercel - Passo a Passo

## ✅ **Pré-requisitos Prontos**
- ✅ Código corrigido (PR #1 aplicado)
- ✅ Supabase em produção (`gvuaslecbrhieyonnufz.supabase.co`)
- ✅ Monorepo configurado
- ✅ Vercel.json criado

---

## 🚀 **DEPLOY EM 3 PASSOS**

### **Passo 1: Fazer Deploy na Vercel**

#### Via GitHub (Recomendado):
1. **Acesse**: [vercel.com](https://vercel.com)
2. **Login** com GitHub
3. **Import Project** → Selecione `exzosdigital/cureclinica-tricologia-system`
4. **Configure**:
   - **Framework**: Next.js
   - **Root Directory**: `apps/app`
   - **Build Command**: `npm run build`
   - **Install Command**: `bun install`

#### Via CLI:
```bash
# Instalar Vercel CLI
npm i -g vercel

# Navegar para o app
cd apps/app

# Deploy
vercel --prod

# Seguir o wizard:
# - Set up and deploy "~/cureclinica-tricologia-system/apps/app"? [Y/n] y
# - Which scope do you want to deploy to? [Select your account]
# - Link to existing project? [Y/n] n
# - What's your project's name? cureclinica-tricologia-system
# - In which directory is your code located? ./
```

---

### **Passo 2: Configurar Variáveis de Ambiente**

No **Dashboard da Vercel** → **Settings** → **Environment Variables**, adicionar:

#### 🔐 **Variáveis OBRIGATÓRIAS:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://gvuaslecbrhieyonnufz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[GET_FROM_SUPABASE_DASHBOARD]
SUPABASE_SERVICE_ROLE_KEY=[GET_FROM_SUPABASE_DASHBOARD]
NEXTAUTH_SECRET=[GENERATE_RANDOM_32_CHARS]
NEXTAUTH_URL=https://your-project.vercel.app
```

#### 📋 **Como obter as chaves Supabase:**
1. Acesse [app.supabase.com](https://app.supabase.com)
2. Projeto: `gvuaslecbrhieyonnufz`
3. **Settings** → **API**
4. **Copiar**:
   - `anon/public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

#### 🔑 **Gerar NEXTAUTH_SECRET:**
```bash
# Comando para gerar secret
openssl rand -base64 32

# OU online:
# https://generate-secret.vercel.app/32
```

#### 📱 **Variáveis Opcionais:**
```env
NEXT_PUBLIC_VERCEL_ANALYTICS=true
NEXT_PUBLIC_APP_NAME=CureClinica - Sistema de Tricologia
```

---

### **Passo 3: Verificar Deploy**

#### ✅ **Checklist Pós-Deploy:**
1. **URL gerada**: https://cureclinica-tricologia-system.vercel.app
2. **Login funcional**:
   - Admin: `admin@cureclinica.com.br` / `admin123`
   - Médico: `dr.silva@cureclinica.com.br` / `doctor123`
3. **Navegação**: Sidebar funcional
4. **Pacientes**: CRUD completo
5. **Análises**: Sistema tricológico
6. **Performance**: < 3s load time

---

## 🎯 **URLs Importantes**

### **Produção:**
- **App**: https://your-project.vercel.app
- **Dashboard**: https://your-project.vercel.app/dashboard
- **Login**: https://your-project.vercel.app/auth/signin

### **Admin:**
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Supabase Dashboard**: https://app.supabase.com/project/gvuaslecbrhieyonnufz

---

## 🔧 **Configurações Avançadas**

### **Domínio Customizado:**
```bash
# Via CLI
vercel domains add cureclinica.com.br

# Via Dashboard
# Settings → Domains → Add → cureclinica.com.br
```

### **Monitoramento:**
```env
# Adicionar no .env
NEXT_PUBLIC_VERCEL_ANALYTICS=true
SENTRY_DSN=your_sentry_dsn
```

### **Performance:**
- **Edge Runtime**: Automático
- **Image Optimization**: Built-in
- **CDN**: Global
- **SSL**: Automático

---

## 🐛 **Troubleshooting**

### **Build Errors:**
```bash
# Se der erro de dependências
cd apps/app
rm -rf node_modules .next
bun install
bun build
```

### **Supabase Connection:**
```bash
# Verificar variáveis no dashboard Vercel
# Verificar RLS policies no Supabase
```

### **Authentication Issues:**
```bash
# Verificar NEXTAUTH_URL
# Verificar NEXTAUTH_SECRET (min 32 chars)
```

---

## ✅ **Resultado Final**

Após deploy bem-sucedido:
- 🚀 **CureClinica rodando** em produção
- 🏥 **Sistema médico** especializado em tricologia
- 💰 **Custo**: ~$45/mês (Vercel Pro + Supabase Pro)
- 📈 **Performance**: Enterprise-grade
- 🔒 **Segurança**: LGPD compliant

**Pronto para atender clínicas de tricologia!** 🎉

---

## 🆘 **Suporte**

**Se precisar de ajuda:**
1. **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
2. **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
3. **GitHub Issues**: [Criar issue](https://github.com/exzosdigital/cureclinica-tricologia-system/issues)

**O CureClinica está pronto para o mundo!** 🌍🚀