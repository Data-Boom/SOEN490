import { Entity, Column, PrimaryGeneratedColumn, getRepository } from "typeorm";

@Entity()
export default class DatasetEntity {

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
}

export const getDatasets = () => {
    return getRepository(DatasetEntity).find();
}

export const postDataset = async (req) => {
    console.log(req.body)
    const dataset = getRepository(DatasetEntity).create(req.body);
    const results = await getRepository(DatasetEntity).save(dataset);
    return results;
}