interface ICategoryModel {
  name: string
  id: number
  subCategories: ISubCategoryModel[]
}

interface ISubCategoryModel {
  name: string
  id: number
}

export const testSubcategory1: ISubCategoryModel[] = [
  {
    name: 'subcategory1',
    id: 1
  },
  {
    name: 'subcategory2',
    id: 2
  }
]

export const testSubcategory2: ISubCategoryModel[] = [
  {
    name: 'subcategory3',
    id: 3
  },
  {
    name: 'subcategory4',
    id: 4
  }
]

export const testCategory: ICategoryModel = {
  name: 'category1',
  id: 1,
  subCategories: testSubcategory1
}

export const testCategory2: ICategoryModel = {
  name: 'category2',
  id: 3,
  subCategories: testSubcategory2
}

export const allCategory: ICategoryModel[] = [
  testCategory,
  testCategory2
]
