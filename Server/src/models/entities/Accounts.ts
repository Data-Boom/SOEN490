import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinTable, ManyToMany, Connection } from "typeorm";
import { Dataset } from "./Dataset";


@Entity()
export class Accounts {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    dateOfBirth: Date

    @Column()
    organizationName: string

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ default: 0 })
    admin: boolean

    @Column({ nullable: true })
    resetToken: string;

    /*
    * This ManyToMany and JoinTable snippet is used to link the Accounts table and the
    * Dataset table together. This will generate a new third table that contains
    * Foreign Keys of linked Dataset and Accounts IDs.
    * The 'material => material.datasets' line is added for use in query building
    * for it defines the direction of the "link" with the Material table
    * 
    * Specifically this is being used to track the 'favorited' datasets of a user
    */
    @ManyToMany(type => Dataset, dataset => dataset.accounts)
    @JoinTable()
    datasets: Dataset[];
}