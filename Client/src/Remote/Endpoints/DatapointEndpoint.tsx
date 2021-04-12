import { get } from "../FluentRequest"

const datapointRoute = '/api/v1/variables'

export interface IDatapointModel {
  name: string
  id?: number
}
export const listDatapoints = async (): Promise<IDatapointModel[]> => {
  const result = await get(datapointRoute).json()
  return result || []
}