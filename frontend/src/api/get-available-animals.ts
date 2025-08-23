import { AnimalFilterFormData } from '@/components/AnimalFilterForm'
import { makeRequest } from '.'

export function getAvailableAnimals(
  filter: AnimalFilterFormData | null,
  token: string,
) {
  const params = filter ? { ...filter } : {}

  return makeRequest({
    url: '/animals/available',
    method: 'GET',
    params,
    headers: { Authorization: `Bearer ${token}` },
  })
}
