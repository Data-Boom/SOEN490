import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IUnitModel } from "../interfaces/IDimension";

import { Dimension } from "./Dimension";

/**
 * The entity annotation indicates that a table is being created
 * This entity handles units (ex. GPa, km/s) of data points
 */
@Entity()
export class Units extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 10 })
    name: string

    @Column({ nullable: true })
    dimensionId?: number

    @ManyToOne(type => Dimension)
    @JoinColumn()
    dimension?: Dimension

    @Column({ length: 100, default: "{u}" })
    conversionFormula: string

    @CreateDateColumn()
    created: Date

    @UpdateDateColumn()
    updated: Date

    static convertToModel(units: Units[]): IUnitModel[] {
        return units.map(eachUnit => {
            return {
                id: eachUnit.id,
                name: eachUnit.name,
                conversionFormula: eachUnit.conversionFormula,
                dimensionId: eachUnit.dimensionId
            };
        });
    }

    static convertToUnits(unitModel: IUnitModel[], dimensionId: number): Units[] {
        return unitModel.map(eachUnit => {
            let unit = new Units();
            unit.id = eachUnit.id;
            unit.name = eachUnit.name;
            unit.dimensionId = dimensionId;
            unit.conversionFormula = eachUnit.conversionFormula;
            return unit;
        });
    }

    static convertToNewUnits(unitModel: IUnitModel[], dimensionId: number): Units[] {
        return unitModel.map(eachUnit => {
            let unit = new Units();
            unit.id;
            unit.name = eachUnit.name;
            unit.dimensionId = dimensionId;
            unit.conversionFormula = eachUnit.conversionFormula;
            return unit;
        });
    }
}