import { AnimalStatus } from '@/enums/animal-status'
import { makeRequest } from '.'

export async function updateAnimalStatus({
  animalId,
  token,
  data,
}: {
  animalId: string
  token: string
  data: { status: AnimalStatus }
}) {
  return makeRequest({
    url: `${process.env.NEXT_PUBLIC_API_URL}/animals/${animalId}`,
    headers: { Authorization: `Bearer ${token}` },
    method: 'PATCH',
    data,
  })
}
