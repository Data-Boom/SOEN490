export interface ICategory {
    name: string
    id?: number
    subcategories?: ISubcategory[]
}

export interface ISubcategory {
    name: string
    id?: number
    categoryId?: number
}