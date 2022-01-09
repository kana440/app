import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoRepository } from 'src/entities/repositories/todo.repository';
import { Todo } from 'src/entities/todo.entity';
import { User } from 'src/entities/user.entity';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodosService {
    constructor(
        @InjectRepository(TodoRepository)
        private todoRepository: TodoRepository,
    ) {}

    async createTodo(createTodoDto: CreateTodoDto, user: User): Promise<Todo> {
        return await this.todoRepository.createTodo(createTodoDto, user);
    }
}
