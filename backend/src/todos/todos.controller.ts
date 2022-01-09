import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Todo } from 'src/entities/todo.entity';
import { User } from 'src/entities/user.entity';
import { GetUser } from 'src/users/get-user.decorator';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
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
    
    @Get()
    @ApiOkResponse({
        description: 'タスク一覧取得完了',
        type: [Todo],
    })
    async getTodos() {
        const todos = await this.todosService.getTodos();
        return todos.map(todo =>{
            delete todo.user.password;
            return todo;
        });
    }

    @Get(':id')
    @ApiOkResponse({
        description: 'タスク単体取得完了',
        type: Todo,
    })
    @ApiNotFoundResponse({
        description: 'そのタスクが存在しない'
    })
    async getTodo(@Param('id',ParseIntPipe) id: number) {
        const todo = await this.todosService.getTodo(id);
        delete todo.user.password;
        return todo;
    }

    @Put(':id')
    @ApiOkResponse({
        description: 'タスク更新完了',
        type: Todo,
    })
    @ApiNotFoundResponse({
        description: '指定のタスクが存在しない',
    })
    @ApiUnauthorizedResponse({
        description: '投稿者本人以外による操作',
    })
    async updateTodo(
        @Param('id', ParseIntPipe) id: number,
        @Body(ValidationPipe) updateTodoDto: UpdateTodoDto,
        @GetUser() user: User,
    ): Promise<Todo> {
        return await this.todosService.updateTodo(id, updateTodoDto, user);
    }

    @Delete(':id')
    @ApiNoContentResponse({
        description: 'タスク削除完了',
    })
    @ApiNotFoundResponse({
        description: '指定のタスクが存在しない',
    })
     @ApiUnauthorizedResponse({
        description: '投稿者本人以外による操作',
    })
    @HttpCode(204)
    async deleteTodo(
        @Param('id',ParseIntPipe) id: number,
        @GetUser() user: User,
    ): Promise<void> {
        await this.todosService.deleteTodo(id, user)
    }


}
