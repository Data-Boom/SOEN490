import IDataPointModel from "./DataPointModel";

export default interface IDatasetModel {
    data_set_id: number
    set_name: string
    publication: string
    material: string
    data_type: string
    comments: string
	category: string
	subcategory: string
	fuel: string
	oxidizer: string
    diluent: string
    datapoints: IDataPointModel[]
}
