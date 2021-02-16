import { Entity, Column, PrimaryGeneratedColumn, JoinTable, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Units } from "./Units";


@Entity()
export class Dimension {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(type => Units, unit => unit.dimension, { onDelete: 'NO ACTION' })
    @JoinColumn({ name: "unitId" })
    units?: Units[]
}