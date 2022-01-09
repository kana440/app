import { Body, Controller, HttpCode, Post, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { UsersService } from './users.service';
import {
    ApiBadRequestResponse,
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
  } from '@nestjs/swagger';
import { SignInUserDto } from './dto/sign-in-user.dto';
  

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post('sign_up')
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
        await this.usersService.createUser(signUpUserDto);
    }

    @Post('sign_in')
    @HttpCode(200)
    @ApiOkResponse({
        type: String,
        description: 'ユーザーログイン完了',
    })
    @ApiUnauthorizedResponse({
        description:
        'メールアドレスまたはパスワードが異なることによるログインエラー',
    })
    async signIn(
        @Body(ValidationPipe) signInUserDto: SignInUserDto,
    ): Promise<string> {
    return await this.usersService.signIn(signInUserDto);
  }
}
