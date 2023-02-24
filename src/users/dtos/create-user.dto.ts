import {
  IsString,
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsPhoneNumber,
  IsOptional,
} from 'class-validator';

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

  @MaxLength(100)
  @MinLength(2)
  @IsString()
  @IsOptional()
  readonly name_of_organization: string;

  @MaxLength(80)
  @MinLength(8)
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsMobilePhone('en-NG')
  @IsPhoneNumber('NG')
  readonly phone_number: string;
}
