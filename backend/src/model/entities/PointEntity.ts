import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "./UserEntity";

@Entity({ name: 'point' })
export class PointEntity {

    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({
        type: 'date'
    })
    date: string

    @Column({
        type: 'time'
    })
    hour: string

    @ManyToOne(() => UserEntity, (user) => user.points)    
    user!: UserEntity

    constructor(date: string, hour: string, user: UserEntity) {
        this.date = date;
        this.hour = hour;
        this.user = user;
    }

}