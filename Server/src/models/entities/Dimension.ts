import { Entity, Column, PrimaryGeneratedColumn, JoinTable, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Units } from "./Units";


@Entity()
export class Dimension {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ default: 1 })
    unitId: number

    @OneToMany(type => Units, unit => unit.dimension)
    @JoinColumn({ name: "unitId" })
    units: Units[]
}