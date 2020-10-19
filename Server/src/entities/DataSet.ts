import { Entity, Column, PrimaryGeneratedColumn, getRepository } from "typeorm";

@Entity()
export default class DataSet {

    @PrimaryGeneratedColumn()
    dataset_id: number

    @Column()
    set_name: string
    @Column()
    publication_id: number
    @Column()
    material_id: number
    @Column()
    data_type_id: number
    @Column()
    comments: string
    @Column()
    category_id: number
    @Column()
	subcategory_id: number
    @Column()
	fuel_id: number
    @Column()
	oxidizer_id: number
    @Column()
    diluent_id: number

    public static getDatasetByCategoryId = (category_id: number): Promise<DataSet[]> => {
        return getRepository(DataSet).find({category_id: category_id});
    }

    public static createDataset = (dataset: DataSet): DataSet => {
        return getRepository(DataSet).create(dataset);
    }
}