import { callGetAllDimensions } from "../../../Remote/Endpoints/DimensionsEndpoint"
import { makeAutoObservable } from "mobx"

export class DimensionsStore {
  constructor() {
    makeAutoObservable(this)
  }

  dimensions = []

  async loadDimensions() {
    this.dimensions = await callGetAllDimensions()
  }
}