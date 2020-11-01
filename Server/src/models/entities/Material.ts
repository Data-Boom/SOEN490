import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from "typeorm";
import { Composition } from "./Composition";


/**
 * The entity annotation indicates that a table is being created
 * This entity handles materials and has a foreign key for it's chemical compositon
 */
@Entity()
export class Material {

    @PrimaryGeneratedColumn()
    id: number

    @Column({default: 1})
    compositionId: number

    @ManyToOne(type => Composition)
    @JoinColumn()
    composition?: Composition

    @Column({nullable: true})
    details: String

    @CreateDateColumn()  
    created: Date

    @UpdateDateColumn()
    updated: Date
}