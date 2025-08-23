/// <reference types="cypress" />

// cypress/e2e/login.cy.js

describe('Funcionalidade de Login', () => {
  // Antes de cada teste, visita a página de login
  beforeEach(() => {
    // Visita a página de login do seu projeto
    cy.visit('/login');
    // Aguarda a página carregar completamente
    cy.wait(1000);
  });

    // Cenário 1: Teste de sucesso - primeiro precisa criar um usuário
  it('deve realizar o login com sucesso ao usar credenciais válidas', () => {
    // Primeiro, vamos criar um usuário para testar
    cy.visit('/cadastro');
    cy.wait(1000);
    
    // Cadastra um usuário
    cy.get('label').contains('Nome').find('input').type('Usuario');
    cy.get('label').contains('Email').find('input').type('usuario@teste.com');
    cy.get('label').contains('Senha').find('input').type('senha123');
    cy.get('label').contains('Confirme a senha').find('input').type('senha123');
    cy.get('button').contains('Cadastrar').click();
    
    // Aguarda o cadastro completar e possível redirect
    cy.wait(3000);
    
    // Agora vai para o login
    cy.visit('/login');
    cy.wait(1000);

    // Act (Agir) - Faz o login usando os seletores corretos
    cy.get('input[type="email"]').type('usuario@teste.com');
    cy.get('input[type="password"]').type('senha123');
    cy.get('button').contains('Login').click();

    // Aguarda a requisição de login completar
    cy.wait(3000);

    // Assert (Verificar)
    // Verifica se foi redirecionado para a área logada
    cy.url({ timeout: 10000 }).should('include', '/area_logada/animais_disponiveis');
  });

  // Cenário 2: Senha incorreta
  it('deve exibir uma mensagem de erro ao usar uma senha incorreta', () => {
    // Spy no alert para capturar a mensagem
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('windowAlert');
    });

    // Act
    cy.get('input[type="email"]').type('usuario@teste.com');
    cy.get('input[type="password"]').type('senha_errada');
    cy.get('button').contains('Login').click();

    // Aguarda a tentativa de login
    cy.wait(2000);

    // Assert
    // Verifica se a URL não mudou (permanece na página de login)
    cy.url().should('include', '/login');
    // Verifica se o alert foi chamado
    cy.get('@windowAlert').should('have.been.called');
  });

  // Cenário 3: Email não cadastrado
  it('deve exibir uma mensagem de erro ao usar um email não cadastrado', () => {
    // Spy no alert para capturar a mensagem
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('windowAlert');
    });

    // Act
    cy.get('input[type="email"]').type('naoexisto@teste.com');
    cy.get('input[type="password"]').type('qualquer_senha');
    cy.get('button').contains('Login').click();

    // Aguarda a tentativa de login
    cy.wait(2000);

    // Assert
    // Verifica se a URL não mudou (permanece na página de login)
    cy.url().should('include', '/login');
    // Verifica se o alert foi chamado
    cy.get('@windowAlert').should('have.been.called');
  });

  // Cenário 4: Campos obrigatórios vazios
  it('deve mostrar mensagens de validação quando os campos estão vazios', () => {
    // Act - tenta submeter o formulário sem preencher
    cy.get('button').contains('Login').click();

    // Assert - verifica se as mensagens de validação aparecem
    cy.contains('O email é obrigatório').should('be.visible');
    cy.contains('A senha é obrigatória').should('be.visible');
    
    // Verifica se permanece na página de login
    cy.url().should('include', '/login');
  });

  // Cenário 5: Email inválido - deve impedir o login
  it('deve impedir o login com email inválido', () => {
    // Act
    cy.get('input[type="email"]').type('email_sem_arroba');
    cy.get('input[type="password"]').type('senha123');
    cy.get('button').contains('Login').click();

    // Aguarda a tentativa de login
    cy.wait(2000);

    // Assert - verifica se permanece na página de login (não conseguiu fazer login)
    cy.url().should('include', '/login');
  });

  // Cenário 6: Senha muito curta
  it('deve mostrar mensagem de validação para senha muito curta', () => {
    // Act
    cy.get('input[type="email"]').type('usuario@teste.com');
    cy.get('input[type="password"]').type('123');
    cy.get('button').contains('Login').click();

    // Assert
    cy.contains('A senha deve conter no mínimo 8 caracteres').should('be.visible');
    cy.url().should('include', '/login');
  });
});
