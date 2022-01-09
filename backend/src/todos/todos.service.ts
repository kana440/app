import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { TodoRepository } from 'src/entities/repositories/todo.repository';
import { Todo } from 'src/entities/todo.entity';
import { User } from 'src/entities/user.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
    constructor(
        @InjectRepository(TodoRepository)
        private todoRepository: TodoRepository,
    ) {}

    async createTodo(createTodoDto: CreateTodoDto, user: User): Promise<Todo> {
        return await this.todoRepository.createTodo(createTodoDto, user);
    }

    async getTodos(): Promise<Todo[]> {
        return await this.todoRepository.find({
            relations: ['user'],
        });
    }

    async getTodo(id: number): Promise<Todo> {
        const todo = this.todoRepository.findOne({
            where: { id },
            relations: ['user'],
        })
        if(!todo) {
            throw new NotFoundException('そのタスクは存在しません');
        }
        return todo;
    }

    async updateTodo(
        id: number,
        { title, category }: UpdateTodoDto,
        user: User,
    ): Promise<Todo> {
        const todo = await this.todoRepository.getOwnTodo(id, user);
        todo.title = title;
        todo.category = category;
        return await todo.save();
    }

    async deleteTodo(
        id: number,
        user
    ): Promise<void> {
        const todo = await this.todoRepository.getOwnTodo(id, user);
        await todo.remove();
    }
}