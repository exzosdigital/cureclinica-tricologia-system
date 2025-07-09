# Configuração do Railway via MCP para CureClinica Tricologia System

Este guia descreve como utilizar MCPs (Model Context Protocols) para configurar e fazer o deploy do sistema CureClinica Tricologia no Railway.

## Arquivos de Configuração Criados

Foram criados os seguintes arquivos para suportar o deploy no Railway:

1. `railway.json` - Configuração principal do Railway
2. `.railway.toml` - Configurações adicionais para o build e deploy
3. `apps/app/.env.railway` - Variáveis de ambiente para o ambiente Railway
4. `apps/app/src/app/api/health/route.ts` - Endpoint de health check
5. `railway-setup.js` - Script para verificar a configuração

## Passo a Passo para Deploy via MCP

### 1. Utilizar o MCP Filesystem para Manipulação de Arquivos

O MCP `filesystem` permite manipular arquivos e diretórios. Todos os arquivos necessários já foram criados.

### 2. Utilizar o MCP @smithery/toolbox para Orquestração

O MCP `@smithery/toolbox` atua como um roteador dinâmico para outros MCPs registrados:

```javascript
// Exemplo de uso do @smithery/toolbox
const toolbox = require('@smithery/toolbox');

// Conectar com outros MCPs para deploy
toolbox.connect('railway-deploy', {
  projectPath: '/Users/willrulli/CascadeProjects/cureclinica-tricologia-system',
  configFiles: ['railway.json', '.railway.toml']
});
```

### 3. Deploy com Railway CLI via MCP

Para realizar o deploy utilizando a Railway CLI:

1. **Instalação da Railway CLI**:
   ```bash
   npm install -g @railway/cli
   ```

2. **Login no Railway**:
   ```bash
   railway login
   ```

3. **Inicialização do projeto**:
   ```bash
   railway init
   ```

4. **Configuração das variáveis de ambiente**:
   ```bash
   railway variables set SUPABASE_URL=sua_url_do_supabase
   railway variables set SUPABASE_ANON_KEY=sua_chave_anon
   # Adicione outras variáveis necessárias
   ```

5. **Deploy do projeto**:
   ```bash
   railway up
   ```

### 4. Integração com o MCP Browser Automation (Hyperbrowser)

O MCP `@hyperbrowserai/mcp` pode ser utilizado para automação do processo de deploy:

```javascript
// Exemplo de automação com @hyperbrowserai/mcp
const hyperbrowser = require('@hyperbrowserai/mcp');

// Automatizar processo de deploy no dashboard do Railway
hyperbrowser.automateDeployment({
  projectName: 'cureclinica-tricologia-system',
  deployCommand: 'railway up',
  healthCheckEndpoint: '/api/health'
});
```

## Monitoramento e Logs

Para monitorar o deploy e visualizar logs:

1. **Via Railway CLI**:
   ```bash
   railway logs
   ```

2. **Via Dashboard do Railway**:
   Acesse o dashboard do projeto em https://railway.app/dashboard

## Troubleshooting

Se encontrar problemas durante o deploy:

1. Verifique os logs utilizando `railway logs`
2. Confirme se todas as variáveis de ambiente foram configuradas
3. Verifique se o endpoint de health check está respondendo corretamente
4. Consulte a documentação do Railway em https://docs.railway.app/

## Próximos Passos

Após o deploy bem-sucedido:

1. Configure o domínio personalizado (se necessário)
2. Configure o Supabase para o ambiente de produção
3. Configure monitoramento e alertas
4. Realize testes de integração e performance
