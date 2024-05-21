import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PointEntity } from "./PointEntity";

@Entity({ name: 'user' })
export class UserEntity {

    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ unique: true, type: 'text' })
    code!: string

    @OneToMany(() => PointEntity, (point) => point.user)
    points!: PointEntity[]

    constructor(
        code: string
    ) {
        this.code = code;
    }

}