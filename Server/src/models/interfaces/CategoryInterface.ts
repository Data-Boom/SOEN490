interface ICategory {
    name: string
    id?: number
    subcategories?: ISubcategory[]
}

interface ISubcategory {
    name: string
    id?: number
    categoryId?: number
}