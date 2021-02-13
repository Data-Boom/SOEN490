import { Entity, Column, PrimaryGeneratedColumn, JoinTable } from "typeorm";
import { Units } from "./Units";


@Entity()
export class Dimension {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    //TODO: NEED TO ASK SEAN ABOUT THIS
    // @ManyToMany(type => Units, units => units.dimension)
    @JoinTable()
    units: Units[];
}