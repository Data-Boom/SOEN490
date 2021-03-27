export interface ICategoryModel {
  name: string
  id: number
  subCategories: ISubCategoryModel[]
}

export interface ISubCategoryModel {
  name: string
  id: number
  categoryId?: number
}

export const testSubcategory1: ISubCategoryModel[] = [
  {
    name: 'subcategory1',
    id: 3,
    categoryId: 1
  },
  {
    name: 'subcategory2',
    id: 4,
    categoryId: 1
  }
]

export const testSubcategory2: ISubCategoryModel[] = [
  {
    name: 'subcategory3',
    id: 5,
    categoryId: 2
  },
  {
    name: 'subcategory4',
    id: 6,
    categoryId: 2
  }
]

export const testCategory: ICategoryModel = {
  name: 'category1324234234',
  id: 1,
  subCategories: testSubcategory1
}

export const testCategory2: ICategoryModel = {
  name: 'category257567',
  id: 2,
  subCategories: testSubcategory2
}

export const allCategory: ICategoryModel[] = [
  testCategory,
  testCategory2
]


export const newCategory: ICategoryModel = {
  name: '',
  id: -1,
  subCategories: []
}

export const newSubcategory: ISubCategoryModel = {
  name: "",
  id: -1,
  categoryId: -1
}