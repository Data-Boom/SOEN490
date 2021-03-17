import { callGetAllDimensions } from "../../../Remote/Endpoints/DimensionsEndpoint"

export class DimensionsStore {
  constructor() {
  }

  dimensions = []

  async loadDimensions() {
    this.dimensions = await callGetAllDimensions()
  }
}