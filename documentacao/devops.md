# Análise DevOps


## Pipeline CI/ CD
O projeto já possui um pipeline configurado no GitHub actions, localizado na pasta `.github/workflows/.` 
O workflow definido é acionado sempre que é criado um pull request para a branch main. 
Ele contempla diferentes etapas, como execução de testes, build das imagens Docker, 
verificação da subida dos containers e geração de artefatos.
Portanto, há pipeline CI/ CD implementado no repositório.

## Testes Automatizados
O pipeline inclui a etapa unit-test, responsável por instalar as dependências do backend 
e executar os testes unitários utilizando Jest, incluindo a geração de relatório de cobertura. 
Dessa forma, o projeto possui testes automatizados integrados ao processo de integração contínua.

## Uso de Containers
O workflow utiliza Docker e Docker Compose para construção e execução dos serviços da aplicação. 
Durante o processo de CI, as imagens são buildadas com docker compose build
e os containers são temporariamente iniciados para validação básica da infraestrutura. 
Isso demonstra que o projeto já adota práticas relacionadas a containers.


# Melhorias Implementadas

## Cache de dependências no GitHub actions
O workflow reinstalava todas as dependências do backend a cada execução, 
tornando o processo lento e ineficiente.
Foi feita implementação de cache para a pasta node_modules usando actions/cache@v3. 
O cache é restaurado quando o package-lock.json não sofre alterações, 
reduzindo significativamente o tempo de execução do pipeline.

```yaml
- name: Cache de dependências do npm
  uses: actions/cache@v3
  with:
    path: backend/node_modules
    key: ${{ runner.os }}-npm-${{ hashFiles('backend/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-npm-
```

## Healthcheck para PostgreSQL no Docker Compose
O serviço do backend tentava conectar ao PostgreSQL antes do banco estar realmente pronto, 
causando falhas intermitentes.
Foi realizada a adição de healthcheck no serviço do PostgreSQL para verificar periodicamente 
se o banco está pronto para aceitar conexões. 
O backend agora só inicia após o PostgreSQL reportar status "healthy".

```yaml
healthcheck:
  test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
  interval: 3s
  timeout: 3s
  retries: 5
```

## Multi-stage build no dockerfile do backend
A imagem Docker do backend continha dependências de desenvolvimento desnecessárias para produção, 
resultando em imagem excessivamente grande.
Implementação de multi-stage build separando o ambiente de construção do ambiente de execução. 
A imagem final contém apenas o necessário para produção, 
reduzindo drasticamente seu tamanho e surface de ataque.

```dockerfile
# build
FROM node:20-alpine AS builder
# ... (instalação e build)

# (produção)
FROM node:20-alpine AS production

# (copia apenas o necessário do estágio builder)
RUN npm prune --production
```

## Impacto das Melhorias
- **Performance:**
- **Confiabilidade:**
- **Segurança:**
- **Manutenibilidade:**