import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";


/**
 * The entity annotation indicates that a table is being created
 */
@Entity()
export class AnimeRank {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: String

    @Column()
    rank: number

}