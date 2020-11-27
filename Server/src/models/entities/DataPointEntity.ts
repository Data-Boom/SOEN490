import { Entity, Column, PrimaryGeneratedColumn, getRepository } from "typeorm";

@Entity()
export default class DataPointEntity {
    @PrimaryGeneratedColumn()
    datapoint_id: number
    @Column()
    dataset_id: number
    @Column()
    initial_density: number
    @Column()
    initial_temperature: number
    @Column()
    initial_pressure: number
    @Column()
    shock_velocity: number
    @Column()
    particle_velocity: number
    @Column()
    density: number
    @Column()
    temperature: number
    @Column()
    pressure: number
    @Column()
    specific_volume: number
    @Column()
    compression_ratio: number
    @Column()
    comments: string

    public static getDataPoints = (id: number): Promise<DataPointEntity[]> => {
        return getRepository(DataPointEntity).find({ dataset_id: id });
    }

    public static createDataPoints = (dataPoints: DataPointEntity[]): DataPointEntity[] => {
        return getRepository(DataPointEntity).create(dataPoints);
    }
}
