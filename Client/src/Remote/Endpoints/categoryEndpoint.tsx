import React from 'react'
import { get } from "../RemoteHelper"


interface ICategoryModel {
    id: number,
    name: string
}
export const listCategories = async (): Promise<ICategoryModel[]> => {
    const categories = await get('/category')
    return categories
}