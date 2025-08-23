# Padrões de Projeto

## Padrões Identificados

### 1. **Singleton Pattern** 

**Descrição**: Garante que uma classe tenha apenas uma instância e fornece um ponto de acesso global a ela.

**Implementação Atual**: O projeto utiliza uma variação do Singleton através de instâncias exportadas.

**Exemplos no Código**:

```typescript
// backend/src/providers/encrypter.ts
export class Encrypter {
  encrypt(value: string): string {
    return bcrypt.hashSync(value, 10)
  }

  compare(value: string, hash: string): boolean {
    return bcrypt.compareSync(value, hash)
  }
}

// Instância única exportada
export const encrypterInstance = new Encrypter()
```

```typescript
// backend/src/database.ts
import { PrismaClient } from '@prisma/client'

// Instância única do Prisma
export const prisma = new PrismaClient()
```

**Uso no Projeto**:
```typescript
// backend/src/services/user/create-user.ts
import { encrypterInstance } from '../../providers/encrypter.js'

export const createUserServiceInstance = new CreateUserService(
  encrypterInstance,
  userRepositoryInstance,
)
```

### 2. **Dependency Injection Pattern** 

**Descrição**: Injeta dependências em uma classe ao invés de criá-las internamente, promovendo desacoplamento.

**Implementação**: Uso consistente de injeção via construtor.

**Exemplos no Código**:

```typescript
// backend/src/controllers/user/create-user.ts
class CreateUserController {
  constructor(private readonly createUser: CreateUserService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    // Usa a dependência injetada
    const result = await this.createUser.execute({ name, email, password })
    // ...
  }
}
```

```typescript
// backend/src/services/user/create-user.ts
export class CreateUserService {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(params: CreateUserDTO.Params): Promise<CreateUserDTO.Result> {
    // Usa as dependências injetadas
    const hashedPassword = this.encrypter.encrypt(password)
    const user = await this.userRepository.create({ name, email, password: hashedPassword })
    // ...
  }
}
```

### 3. **Repository Pattern** 

**Descrição**: Abstrai a lógica de acesso a dados, centralizando operações de persistência.

**Implementação**: Cada entidade tem seu próprio repository.

**Exemplos no Código**:

```typescript
// backend/src/repositories/user.ts
export class UserRepository {
  constructor(private readonly repository: PrismaClient) {}

  async create(params: CreateUserRepositoryDTO.Params): Promise<CreateUserRepositoryDTO.Result> {
    return this.repository.user.create({ data: params })
  }

  async findByEmail(email: string) {
    return this.repository.user.findUnique({ where: { email } })
  }

  async findById(id: string) {
    return this.repository.user.findUnique({ where: { id } })
  }
}
```

**Uso no Projeto**:
```typescript
// backend/src/services/user/create-user.ts
async execute(params: CreateUserDTO.Params): Promise<CreateUserDTO.Result> {
  const userAlreadyExists = await this.userRepository.findByEmail(email)

  if (userAlreadyExists) {
    return Failure.create({ message: 'Email já cadastrado.' })
  }

  const user = await this.userRepository.create({ name, email, password: hashedPassword })
  return Success.create(user)
}
```

### 5. **Strategy Pattern** 

**Descrição**: Permite definir uma família de algoritmos, encapsulá-los e torná-los intercambiáveis.

**Implementação**: Providers como `Encrypter` e `Authenticator` podem ter diferentes implementações.

**Exemplos no Código**:

```typescript
// backend/src/providers/encrypter.ts
export class Encrypter {
  encrypt(value: string): string {
    return bcrypt.hashSync(value, 10)
  }

  compare(value: string, hash: string): boolean {
    return bcrypt.compareSync(value, hash)
  }
}
```

```typescript
// backend/src/providers/authenticator.ts
export class Authenticator {
  private secret = process.env.JWT_SECRET || 'secret'

  generateToken(payload: object): string {
    return jwt.sign(payload, this.secret, { expiresIn: '1h' })
  }

  validateToken<T = object>(token: string): T | null {
    try {
      return jwt.verify(token, this.secret) as T
    } catch (err) {
      return null
    }
  }
}
```

### 6. **Context Pattern (Frontend)** 

**Descrição**: Padrão do React para compartilhar dados entre componentes sem prop drilling.

**Implementação**: Uso do Context API do React.

**Exemplos no Código**:

```typescript
// frontend/src/contexts/animals.tsx
export const AnimalsContext = createContext({} as AnimalsContextType)

export function AnimalsContextProvider({ children }: { children: ReactNode }) {
  const [availableAnimals, setAvailableAnimals] = useState<Animal[]>([])
  const [userAnimals, setUserAnimals] = useState<Animal[]>([])

  const getAnimalById = (id: string) => {
    return availableAnimals.find((animal) => animal.id === id) || null
  }

  return (
    <AnimalsContext.Provider
      value={{
        availableAnimals,
        setAvailableAnimals,
        getAnimalById,
        userAnimals,
        setUserAnimals,
      }}
    >
      {children}
    </AnimalsContext.Provider>
  )
}
```

## Padrões Sugeridos

### 1. **Factory Pattern** 

**Descrição**: Cria objetos sem especificar suas classes concretas.

**Sugestão**: Criar factories para diferentes tipos de validação ou criação de objetos.

**Exemplo de Implementação**:

```typescript
// backend/src/factories/validation-factory.ts
interface ValidationRule {
  validate(value: any): boolean
  getMessage(): string
}

class EmailValidationRule implements ValidationRule {
  validate(value: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value)
  }

  getMessage(): string {
    return 'Email inválido'
  }
}

class PasswordValidationRule implements ValidationRule {
  validate(value: string): boolean {
    return value.length >= 6
  }

  getMessage(): string {
    return 'Senha deve ter pelo menos 6 caracteres'
  }
}

export class ValidationFactory {
  static createEmailValidator(): ValidationRule {
    return new EmailValidationRule()
  }

  static createPasswordValidator(): ValidationRule {
    return new PasswordValidationRule()
  }

  static createAnimalNameValidator(): ValidationRule {
    return new AnimalNameValidationRule()
  }
}
```

### 2. **Template Method Pattern** 🔄

**Descrição**: Define o esqueleto de um algoritmo, delegando alguns passos para subclasses.

**Sugestão**: Implementar para diferentes tipos de validação de formulários.

**Exemplo de Implementação**:

```typescript
// frontend/src/components/forms/BaseForm.tsx
abstract class BaseForm<T> {
  protected abstract validate(data: T): boolean
  protected abstract submit(data: T): Promise<void>
  protected abstract getInitialData(): T

  async handleSubmit(data: T): Promise<void> {
    if (this.validate(data)) {
      await this.submit(data)
      this.onSuccess()
    } else {
      this.onError()
    }
  }

  protected onSuccess(): void {
    // Comportamento padrão
  }

  protected onError(): void {
    // Comportamento padrão
  }
}

class AnimalForm extends BaseForm<AnimalFormData> {
  protected validate(data: AnimalFormData): boolean {
    return data.name.length > 0 && data.type.length > 0
  }

  protected async submit(data: AnimalFormData): Promise<void> {
    await registerAnimal(data)
  }

  protected getInitialData(): AnimalFormData {
    return { name: '', type: '', gender: '', race: '', description: '' }
  }

  protected onSuccess(): void {
    alert('Animal registrado com sucesso!')
  }
}
```

### 3. **Adapter Pattern** 🔄

**Descrição**: Permite que classes com interfaces incompatíveis trabalhem juntas.

**Sugestão**: Implementar para diferentes provedores de autenticação ou criptografia.

**Exemplo de Implementação**:

```typescript
// backend/src/adapters/auth-provider-adapter.ts
interface AuthProvider {
  authenticate(credentials: any): Promise<boolean>
  getUserInfo(token: string): Promise<any>
}

class GoogleAuthAdapter implements AuthProvider {
  constructor(private googleAuth: GoogleAuthService) {}

  async authenticate(credentials: any): Promise<boolean> {
    return this.googleAuth.signIn(credentials)
  }

  async getUserInfo(token: string): Promise<any> {
    return this.googleAuth.getUserProfile(token)
  }
}

class FacebookAuthAdapter implements AuthProvider {
  constructor(private facebookAuth: FacebookAuthService) {}

  async authenticate(credentials: any): Promise<boolean> {
    return this.facebookAuth.login(credentials)
  }

  async getUserInfo(token: string): Promise<any> {
    return this.facebookAuth.getUserData(token)
  }
}
```
