# Testes Automatizados

## Sugestão de Melhorias para Testes Unitários
* Usar `beforeEach` ao invés de `beforeAll` para garantir que mocks e instâncias sejam limpos antes de cada teste em todos os arquivos, evitando que a execução de um teste afete o outro. 
* Adotar o padrão **AAA** (Arrange, Act e Assert) com o intuito de facilitar a leitura dos testes, mesmo para quem não possui familiaridade.
    * Arrange (Organizar) -> o teste é preparado
    * Act (Agir) -> é a execução da ação que se deseja testar
    * Assert (Verificar) -> etapa em que se verifica se o resultado da ação foi o esperado.
* Inclusão de mais testes para capturar erros. Apesar dos mesmos estarem presentes, a maioria dos testes está focada nos cenários ideias, onde, por exemplo, as entradas estão corretas.
    * Testar mais casos de erro
    * Testar mais casos com entradas inválidas ou campos obrigatórios ausentes

## Testes de Aceitação

### Ferramenta Utilizada
- **Cypress v14.5.4** - Framework de testes end-to-end
- **Browser**: Electron 130 (headless)

### Cenários de Teste Implementados

#### 1. Funcionalidade de Login (`cypress/e2e/login.cy.js`)

**Descrição**: Suite de testes que valida o sistema de autenticação da aplicação, cobrindo desde cenários de sucesso até validações de entrada e tratamento de erros.

##### Cenário Principal: Login com Sucesso
- **Objetivo**: Verificar se um usuário pode se autenticar com credenciais válidas
- **Pré-condições**: Sistema deve estar rodando em localhost:3000
- **Passos**:
  1. Navegar para a página de cadastro
  2. Criar um novo usuário com dados válidos (nome, email, senha)
  3. Confirmar o cadastro
  4. Navegar para a página de login
  5. Inserir as credenciais criadas
  6. Clicar no botão "Login"
- **Resultado Esperado**: Usuário é redirecionado para `/area_logada/animais_disponiveis`
- **Status**: ✅ Passing

##### Cenários Alternativos:

###### Cenário 2: Login com Senha Incorreta
- **Objetivo**: Verificar se o sistema impede login com senha inválida
- **Passos**:
  1. Inserir email válido
  2. Inserir senha incorreta
  3. Tentar fazer login
- **Resultado Esperado**: 
  - Sistema exibe mensagem de erro via alert
  - Usuário permanece na página de login
- **Status**: ✅ Passing

###### Cenário 3: Login com Email Não Cadastrado
- **Objetivo**: Verificar se o sistema impede login com email inexistente
- **Passos**:
  1. Inserir email não cadastrado
  2. Inserir qualquer senha
  3. Tentar fazer login
- **Resultado Esperado**: 
  - Sistema exibe mensagem de erro via alert
  - Usuário permanece na página de login
- **Status**: ✅ Passing

###### Cenário 4: Validação de Campos Obrigatórios
- **Objetivo**: Verificar se o sistema valida campos obrigatórios
- **Passos**:
  1. Deixar campos de email e senha vazios
  2. Tentar submeter o formulário
- **Resultado Esperado**: 
  - Sistema exibe mensagens de validação para campos obrigatórios
  - Usuário permanece na página de login
- **Status**: ✅ Passing

###### Cenário 5: Validação de Email Inválido
- **Objetivo**: Verificar se o sistema impede login com email mal formatado
- **Passos**:
  1. Inserir email sem formato válido
  2. Inserir senha válida
  3. Tentar fazer login
- **Resultado Esperado**: 
  - Sistema impede o login
  - Usuário permanece na página de login
- **Status**: ✅ Passing

###### Cenário 6: Validação de Senha Muito Curta
- **Objetivo**: Verificar se o sistema valida o tamanho mínimo da senha
- **Passos**:
  1. Inserir email válido
  2. Inserir senha com menos de 8 caracteres
  3. Tentar submeter o formulário
- **Resultado Esperado**: 
  - Sistema exibe mensagem "A senha deve conter no mínimo 8 caracteres"
  - Usuário permanece na página de login
- **Status**: ✅ Passing

### Resumo dos Resultados
- **Total de Testes**: 6
- **Testes Passando**: 6 ✅
- **Testes Falhando**: 0 ❌
- **Taxa de Sucesso**: 100%
- **Tempo de Execução**: ~25 segundos

## Instruções de Execução

### Pré-requisitos
1. Node.js instalado
2. Sistema da aplicação rodando:
   ```bash
   docker compose up -d
   ```
3. Aplicação acessível em `http://localhost:3000`

### Instalação do Cypress
```bash
# Instalar Cypress como dependência de desenvolvimento
npm install --save-dev cypress
```

### Executando os Testes

#### Modo Interativo (Interface Gráfica)
```bash
npx cypress open
```
- Abre a interface gráfica do Cypress
- Permite ver os testes executando em tempo real
- Útil para debug e desenvolvimento

#### Modo Headless (Linha de Comando)
```bash
# Executar todos os testes
npx cypress run

# Executar apenas o teste de login
npx cypress run --spec "cypress/e2e/login.cy.js"
```

#### Opções Avançadas
```bash
# Executar em browser específico
npx cypress run --browser chrome

# Executar com vídeo
npx cypress run --record

# Executar com relatório detalhado
npx cypress run --reporter spec
```

### Estrutura dos Arquivos
```
├── cypress/
│   ├── e2e/
│   │   └── login.cy.js          # Testes de login
│   └── screenshots/             # Screenshots de falhas
├── cypress.config.js            # Configuração do Cypress
└── package.json                 # Dependências
```

### Configuração do Ambiente
O arquivo `cypress.config.js` contém as configurações:
- **baseUrl**: `http://localhost:3000`
- **Viewport**: 1280x720
- **Timeouts**: 10 segundos
- **Screenshots**: Habilitado para falhas
- **Vídeo**: Desabilitado para performance

### Interpretando os Resultados
- **Screenshots**: Gerados automaticamente quando um teste falha
- **Logs**: Disponíveis no terminal durante execução
- **Relatórios**: Incluem tempo de execução e status de cada teste

### Melhores Práticas Implementadas
1. **Padrão AAA**: Todos os testes seguem Arrange-Act-Assert
2. **Seletores Robustos**: Uso de seletores semânticos e estáveis
3. **Waits Adequados**: Tempos de espera para garantir estabilidade
4. **Isolamento**: Cada teste é independente
5. **Cobertura Abrangente**: Cenários positivos e negativos