import { IsString, IsEmail, IsMobilePhone, IsNotEmpty, MinLength, MaxLength } from "class-validator";

export class CreateUserDto {
    @MaxLength(40)
    @MinLength(2)
    @IsString()
    @IsNotEmpty()
    readonly first_name: string;

    @MaxLength(40)
    @MinLength(2)
    @IsString()
    @IsNotEmpty()
    readonly last_name: string;


}