# Almoxarifado de Enfermagem - React Native + Expo

Este projeto é um aplicativo mobile simples em React Native com Expo para controle de estoque de materiais de enfermagem. Ele consome uma API REST externa fornecida pela MockAPI para listar e cadastrar materiais sem necessidade de banco de dados local.

## Funcionalidades do App

- Lista de materiais cadastrados exibida em um FlatList.
- Cadastro de novo material com os campos:
  - Nome do material (`testID="input-nome"`)
  - Quantidade (`testID="input-quantidade"`, `keyboardType="numeric"`)
- Botão de cadastro com `testID="btn-cadastrar"`.
- Carregamento inicial dos materiais via GET em `/materiais`.
- Inclusão de material via POST em `/materiais`.
- Limpeza automática dos campos após cadastro.
- Validação de quantidade para aceitar apenas valores numéricos maiores que zero.
- Retirada de estoque em cada item com `input-retirada` e `btn-baixar`.
- Exclusão de material direto na lista com `btn-excluir`.
- Implementação de baixa de estoque com validação de regra de negócio para impedir estoque negativo.
- Atualização de estoque em tempo real via requisição PUT/PATCH na MockAPI após retirada.
- Garantia de consistência de estado entre interface e backend após operações de baixa e exclusão.

## Estrutura do Código

- `App.js`: tela principal com estado local, integração com API e UI simples.
- `constants/api.js`: define a URL base da MockAPI em constante separada.

## Como executar

1. Instale dependências:
   ```bash
   npm install
   ```
2. Inicie o Expo:
   ```bash
   npm start
   ```
3. Abra o app no Android, iOS ou Web pelo Expo DevTools.

## Clonar e executar com Expo Go

1. Clone o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd prova-2b-dev-mobile-Gabs-bertolini
   ```
2. Instale dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor do Expo:
   ```bash
   npx expo start
   ```
4. Abra o projeto no seu celular usando o aplicativo Expo Go (leia o QR code exibido no terminal/Expo DevTools).

> Dica: use a câmera do celular ou o scanner integrado do Expo Go para abrir o projeto rapidamente.

## Screenshots
<img width="776" height="917" alt="2026-06-24_16-51-47" src="https://github.com/user-attachments/assets/3a94adba-6b41-4c3e-8a7b-43ae3db189df" />

