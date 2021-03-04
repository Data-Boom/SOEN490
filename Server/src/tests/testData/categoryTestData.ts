export const validUploadData = {
    "name": "new category",
    "subcategories": [
        {
            "name": "created subcategory"
        }
    ]
}
export const invalidUpdateData1 =
{
    "id": 2,
    "name": "cell size",
    "subcategories": [
    ]
}
export const validUpdateData1 =
{
    "id": 3,
    "name": "category",
    "subcategories": [{
        "id": 3,
        "name": "updated subcategory",
        "categoryId": 3
    }]
}
export const validUpdateData2 =
{
    "id": 3,
    "name": "category",
    "subcategories": []
}