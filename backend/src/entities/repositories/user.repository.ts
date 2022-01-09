import { ConflictException, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { User } from "src/entities/user.entity";
import { SignUpUserDto } from "src/users/dto/sign-up-user.dto";
import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from 'bcrypt'
import { SignInUserDto } from "src/users/dto/sign-in-user.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createUser({email,password}: SignUpUserDto): Promise<void> {
        const user = new User();
        user.email = email;
        user.password = password;
        try {
            await user.save();
        } catch(err) {
            if(err.code === 'ER_DUP_ENTRY') {
                throw new ConflictException(
                    'メールアドレスが登録済です',
                );
            }
            throw new InternalServerErrorException();
        }
    }

    async validatePassword({email, password}: SignInUserDto) {
        const user = await this.findOne({ email });
        if(user && (await bcrypt.compare(password, user.password))) {
            return user.email;
        }
        throw new UnauthorizedException('メールアドレスまたはパスワードが違います');
    }
}