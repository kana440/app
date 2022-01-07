import { User } from "src/entities/user.entity";
import { text } from "stream/consumers";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum CATEGORY {
    SCHOOL = 'school',
    OFFICE = 'office',
    GENERAL = 'general',
}

@Entity({
    name: 'todos',
})
export class Todo extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        type: 'text',
    })
    title: string;

    @Column({
        type: 'enum',
        enum: CATEGORY,
    })
    category: CATEGORY;

    @Column({
        nullable: false
    })
    userId: number;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    createdAt!: Date;
    
    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    updatedAt!: Date;

    @ManyToOne(
        () => User,
        user => user.todos,
    )
    @JoinColumn({
        name: 'userId'
    })
    user: User;
}