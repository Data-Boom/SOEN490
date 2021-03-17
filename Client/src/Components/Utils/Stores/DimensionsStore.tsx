import { callGetAllDimensions } from "../../../Remote/Endpoints/DimensionsEndpoint"

export class DimensionsStore {
  dimensions = []

  async loadDimensions() {
    this.dimensions = await callGetAllDimensions()
  }
}