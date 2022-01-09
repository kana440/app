import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Todo } from 'src/entities/todo.entity';
import { User } from 'src/entities/user.entity';
import { GetUser } from 'src/users/get-user.decorator';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodosService } from './todos.service';

@ApiTags('todos')
@Controller('todos')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class TodosController {
    constructor(private todosService: TodosService) {
    }
    @Post()
    @ApiCreatedResponse({
        description: 'タスク作成完了',
        type: Todo,
    })

    @Post()
    @ApiCreatedResponse({
        description: 'タスク作成完了',
        type: Todo,
    })
    async createTodo(
        @Body(ValidationPipe) createTodoDto: CreateTodoDto,
        @GetUser() user: User,
    ): Promise<Todo> {
        return await this.todosService.createTodo(createTodoDto, user);
    }
}
