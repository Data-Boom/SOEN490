import { Entity, Column, PrimaryGeneratedColumn, JoinTable, OneToMany, JoinColumn, BaseEntity } from "typeorm";
import { Units } from "./Units";


@Entity()
export class Dimension extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(type => Units, unit => unit.dimension, { onDelete: 'NO ACTION' })
    @JoinColumn()
    units?: Units[]
}