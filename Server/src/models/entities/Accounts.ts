import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinTable, ManyToMany, Connection, BaseEntity } from "typeorm";
import { Dataset } from "./Dataset";


@Entity()
export class Accounts extends BaseEntity {

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

    @Column({ type: "bigint" })
    orcID: number

    @Column()
    organizationName: string

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ default: 0, type: "tinyint" })
    admin: number

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

export const selectAccountIdFromEmailQuery = (connection: Connection, email: string) =>
    connection.createQueryBuilder(Accounts, 'account')
        .select('account.id', 'id')
        .addSelect('account.admin', 'permissionLevel')
        .where('account.email = :email', { email: email })
        .getRawOne();