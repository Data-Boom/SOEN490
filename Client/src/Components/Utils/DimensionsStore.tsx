import { callGetAllDimensions } from "../../Remote/Endpoints/DimensionsEndpoint"
import { makeAutoObservable } from "mobx"

class DimensionsStore {
  dimensions = []

  constructor() {
    makeAutoObservable(this)
  }

  async loadDimensions() {
    this.dimensions = await callGetAllDimensions()
  }
}