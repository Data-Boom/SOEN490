import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";


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
}