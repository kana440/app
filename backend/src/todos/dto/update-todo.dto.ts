import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { CATEGORY } from "src/entities/todo.entity";

export class UpdateTodoDto {
    @ApiProperty({
        example: 'XXXを実施する',
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        example: CATEGORY.GENERAL,
        type: 'enum',
    })
    @IsNotEmpty()
    category: CATEGORY;
}