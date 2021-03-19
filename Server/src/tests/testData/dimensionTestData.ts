export const validDimensionData = {
  "name": "Velocity",
  "units": [
    {
      "name": "m/s",
      "conversionFormula": "{u}"
    }
  ]
}
export const invalidDimensionData =
{
  "unit": 0
}
export const duplicateDimensionData =
{
  "name": "Velocity",
  "units": [
    {
      "name": "m/s",
      "conversionFormula": "{u}"
    }
  ]
}
export const validUpdateDimensionData =
{
  "baseUnitId": 7,
  "id": 3,
  "name": "Updated",
  "units": [
    {
      "conversionFormula": "{u}",
      "dimensionId": 3,
      "id": 7,
      "name": "Updated unit",
    },
  ],
}
export const validDeleteDimensionData =
{
  "id": 4
}
export const invalidDeleteDimensionDataUnitInUse =
{
  "id": 1
}
export const availableDBDimensions =
  [
    {
      "baseUnitId": 4,
      "id": 1,
      "name": "Temperature",
      "units": [
        {
          "conversionFormula": "{u}",
          "dimensionId": 1,
          "id": 2,
          "name": "No Units",
        },
        {
          "conversionFormula": "{u}",
          "dimensionId": 1,
          "id": 4,
          "name": "K",
        },
      ],
    },
    {
      "baseUnitId": 1,
      "id": 2,
      "name": "Density",
      "units": [
        {
          "conversionFormula": "{u}",
          "dimensionId": 2,
          "id": 1,
          "name": "g/cc",
        },
        {
          "conversionFormula": "{u}",
          "dimensionId": 2,
          "id": 3,
          "name": "cc/g",
        },
        {
          "conversionFormula": "{u}",
          "dimensionId": 2,
          "id": 5,
          "name": "GPa",
        },
        {
          "conversionFormula": "{u}",
          "dimensionId": 2,
          "id": 6,
          "name": "km/s",
        },
      ],
    },
    {
      "baseUnitId": null,
      "id": 3,
      "name": "Delete",
      "units": [
        {
          "conversionFormula": "{u}",
          "dimensionId": 3,
          "id": 7,
          "name": "Deleted",
        },
      ],
    }, {
      "baseUnitId": null,
      "id": 4,
      "name": "Delete No Units In Use",
      "units": [
        {
          "conversionFormula": "{u}",
          "dimensionId": 4,
          "id": 10,
          "name": "To delete",
        },
      ],
    }
  ]