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
