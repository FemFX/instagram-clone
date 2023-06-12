import { IsString, IsEmail, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @MinLength(4, {
    message: 'Full name is too short',
  })
  fullName: string;
  @IsString()
  @MinLength(4, {
    message: 'Username is too short',
  })
  username: string;
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(3, {
    message: 'Username is too short',
  })
  password: string;
}
