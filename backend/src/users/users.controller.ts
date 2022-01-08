import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { UsersService } from './users.service';
import {
    ApiBadRequestResponse,
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
  } from '@nestjs/swagger';
  

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Post()
    @ApiCreatedResponse({
        description: 'ユーザー登録完了',
    })
    @ApiBadRequestResponse({
        description: '入力値のフォーマットエラー',
    })
    @ApiConflictResponse({
        description: 'メールアドレスの重複エラー',
    })
    @ApiInternalServerErrorResponse({
        description: 'DBサーバ接続エラー',
    })
    async signUp(@Body(ValidationPipe) signUpUserDto: SignUpUserDto,
    ): Promise<void>{
        await this.userService.createUser(signUpUserDto);
    }
}
