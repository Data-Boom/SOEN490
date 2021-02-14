import { Entity, Column, PrimaryGeneratedColumn, JoinTable, OneToMany } from "typeorm";
import { Units } from "./Units";


@Entity()
export class Dimension {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(type => Units, unit => unit.dimension)
    units: Units[];
}