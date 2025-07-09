/**
 * Script de configuração para Railway
 * Este script é usado para configurar o ambiente do Railway para o projeto CureClinica Tricologia System
 */

console.log('🚂 Iniciando configuração do Railway para CureClinica Tricologia System');
console.log('🔍 Verificando arquivos de configuração...');

// Verificações de arquivos de configuração
const fs = require('fs');
const path = require('path');

const configFiles = [
  { path: './railway.json', name: 'Railway JSON' },
  { path: './.railway.toml', name: 'Railway TOML' },
  { path: './apps/app/.env.railway', name: 'Variáveis de ambiente Railway' },
  { path: './apps/app/src/app/api/health/route.ts', name: 'Endpoint de health check' }
];

let allFilesExist = true;

configFiles.forEach(file => {
  if (fs.existsSync(path.resolve(file.path))) {
    console.log(`✅ ${file.name} encontrado`);
  } else {
    console.log(`❌ ${file.name} não encontrado`);
    allFilesExist = false;
  }
});

if (allFilesExist) {
  console.log('✅ Todos os arquivos de configuração para Railway estão presentes');
  console.log('🚀 O projeto está pronto para deploy no Railway');
  console.log('\n📋 Próximos passos:');
  console.log('1. Instale a CLI do Railway executando: npm install -g @railway/cli');
  console.log('2. Faça login na sua conta: railway login');
  console.log('3. Crie um novo projeto: railway init');
  console.log('4. Configure as variáveis de ambiente: railway variables set SUPABASE_URL=sua_url ...');
  console.log('5. Faça o deploy: railway up');
} else {
  console.log('❌ Alguns arquivos de configuração para Railway estão faltando');
  console.log('Por favor, crie os arquivos faltantes antes de continuar com o deploy');
}
