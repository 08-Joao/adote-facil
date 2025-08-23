import { AnimalRegisterFormData } from '@/components/AnimalRegisterForm'
import { makeRequest } from '.'

export function animalRegister(data: AnimalRegisterFormData, token?: string) {
  const formData = new FormData()

  formData.append('name', data.name)
  formData.append('type', data.type)
  formData.append('gender', data.gender)
  if (data.race) formData.append('race', data.race)
  if (data.description) formData.append('description', data.description)

  data.pictures.forEach((file) => {
    formData.append('pictures', file)
  })

  return makeRequest({
    url: '/animals',
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
    data: formData,
  })
}
