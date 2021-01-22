import { get } from "../RemoteHelper"
interface IMaterialModel {
    details: string,
    composition: string,
    id: number
}


export const listMaterials = async (): Promise<IMaterialModel[]> => {
    const materials = await get('/material')
    return materials
}