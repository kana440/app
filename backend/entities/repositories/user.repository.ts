import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { User } from "src/entities/user.entity";
import { SignUpUserDto } from "src/users/dto/sign-up-user.dto";
import { EntityRepository, Repository } from "typeorm";

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
}