import { post } from "../FluentRequest"

const fileParserRoute = 'http://localhost:4001/api/v1/fileParser'

export const parseFromFile = async (file: File): Promise<any> => {
  const result = await post(fileParserRoute).withFile(file).json()
  return result
}