import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Todo } from "src/entities/todo.entity";

@Entity({
    name: 'users',
})
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
        nullable: false,
        length: 255,
    })

    @Column({
        nullable: false,
        length: 255,
        transformer: {
            to: (raw: string) => bcrypt.hashSync(raw, 5),
            from: (hashed: string) => hashed,
        }
    })
    password: string;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    createAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    updateAt: Date;

    @OneToMany(
        () => Todo,
        todo => todo.user,
    )
    todos: Todo[];
}