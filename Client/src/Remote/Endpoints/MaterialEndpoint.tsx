import { get } from "../FluentRequest"

interface IMaterialModel {
  details: string,
  composition: string,
  id: number
}

const materialRoute = '/material'

export const listMaterials = async (): Promise<IMaterialModel[]> => {
  const materials = await get(materialRoute).json()
  return materials
}