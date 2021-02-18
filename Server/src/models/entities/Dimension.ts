import { Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToOne, JoinColumn, BaseEntity, OneToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
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

}