import { useState } from 'react'
import { getCookie } from 'cookies-next'
import { animalRegister } from '@/api/register-animal'
import { AnimalRegisterFormData } from '@/components/AnimalRegisterForm/AnimalRegisterForm'

export function useAnimalRegistration() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const registerAnimal = async (data: AnimalRegisterFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      const token = getCookie('token')
      const response = await animalRegister(data, token)

      if (response.status === 201) {
        return { success: true }
      } else {
        const errorMessage =
          response.data.message ||
          'Ocorreu um erro ao tentar registrar o animal.'
        setError(errorMessage)
        return { success: false, error: errorMessage }
      }
    } catch (err) {
      const error = err as Error
      console.error('Erro no registro do animal:', error)
      const errorMessage =
        error.message || 'Ocorreu um erro ao tentar registrar o animal.'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }

  return { registerAnimal, isLoading, error }
}