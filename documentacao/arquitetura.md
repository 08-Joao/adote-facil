O **Adote Fácil** é uma plataforma de adoção de animais construída com uma arquitetura bem organizada e pensada para ser fácil de manter, escalar e evoluir.

## Visão Geral
- **Backend**: Arquitetura em camadas com padrão **MVC** usando **Node.js**, **Express** e **Prisma**.
- **Frontend**: Arquitetura de componentes com **Next.js** e **React**.
- **Banco de Dados**: **PostgreSQL**.
- Estrutura **monolítica distribuída** com serviços rodando em containers Docker.

## Backend - Camadas
1. **Controllers**: Recebem as requisições, validam dados e chamam os serviços.
2. **Services**: Contêm a lógica de negócio e validam regras complexas.
3. **Repositories**: Fazem a comunicação com o banco usando Prisma.
4. **Providers**: Serviços externos (JWT, criptografia, upload).
5. **Middlewares**: Autenticação, validações e tratamento de erros.

## Frontend - Organização
- **Pages e Components**: Interface do usuário com Next.js e Radix UI.
- **Contexts**: Estado global usando React Context API.
- **API Layer**: Comunicação com o backend via Axios.

## Banco de Dados
- Entidades principais: **Users**, **Animals**, **AnimalImages**, **Chats** e **UserMessages**.
- Mapeado com Prisma ORM para garantir segurança de tipos e fácil manutenção.

## Containerização
- **Docker Compose** orquestra três serviços:
  - Banco PostgreSQL
  - Backend (API Node.js)
  - Frontend (Next.js)
- Rede isolada, volumes persistentes e variáveis de ambiente configuráveis.

## Benefícios da Arquitetura
- **Separação de responsabilidades**: Facilita manutenção e testes.
- **Testabilidade**: Fácil criar testes unitários e de integração.
- **Escalabilidade**: Cada parte pode crescer de forma independente.
- **Flexibilidade**: Substituição de tecnologias sem quebrar o sistema.
- **Uso de padrões consagrados**: MVC, Repository, Injeção de Dependência.

## Tecnologias-Chave
- **Backend**: Node.js, Express, TypeScript, Prisma, JWT, Multer, Jest.
- **Frontend**: Next.js 15, React 19, Styled Components, Axios, Radix UI.
- **Infra**: PostgreSQL, Docker, Docker Compose.

## Segurança
- **Backend**: Autenticação JWT, bcrypt para senhas, validação de entrada.
- **Frontend**: Tokens seguros em cookies, validação com Zod, sanitização de dados.

## Monitoramento e Logs
- Backend: Logs centralizados, tratamento global de erros, códigos HTTP corretos.
- Frontend: Logs para debugging, tratamento de erros de API, feedback visual.

## Conclusão
Essa arquitetura combina clareza, escalabilidade e boas práticas, tornando o Adote Fácil robusto, seguro e pronto para crescer. O uso de tecnologias modernas e padrões sólidos garante produtividade no desenvolvimento e manutenção a longo prazo.
