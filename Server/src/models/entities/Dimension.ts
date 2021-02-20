import { Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToOne, JoinColumn, BaseEntity, OneToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { IDimensionModel } from "../interfaces/IDimension";
import { Units } from "./Units";


@Entity()
export class Dimension extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ nullable: true })
    baseUnitId?: number

    @OneToOne(type => Units)
    @JoinColumn()
    baseUnit?: Units

    @CreateDateColumn()
    created: Date

    @UpdateDateColumn()
    updated: Date

    static convertToModel(dimension: Dimension, units?: Units[]): IDimensionModel {
        return {
            id: dimension.id,
            name: dimension.name,
            baseUnitId: dimension.baseUnitId,
            units: units.map(eachUnit => {
                return {
                    id: eachUnit.id,
                    name: eachUnit.name,
                    conversionFormula: eachUnit.conversionFormula,
                    dimensionId: dimension.id
                }
            })
        }
    }

    static convertToDimension(dimensionModel: IDimensionModel): Dimension {
        let dimension = new Dimension();
        dimension.id = dimensionModel.id;
        dimension.name = dimensionModel.name;
        dimension.baseUnitId = dimensionModel.baseUnitId;
        return dimension;
    }
}