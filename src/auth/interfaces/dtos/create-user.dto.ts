import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { DESCRIPTION_PASSWORD } from 'src/common/enums/description-passwprd.enum';
import { Role } from 'src/common/enums/roles.enum';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d|.*\W).{6,}$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  @ApiProperty({
    description: DESCRIPTION_PASSWORD.DESCRIPTION,
  })
  password: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @ApiProperty()
  fullName: string;

  @IsArray()
  @IsEnum(Role, { each: true })
  @ApiProperty({
    description: 'Array of user roles',
    enum: Role,
    isArray: true,
    example: [Role.USER],
  })
  roles: Role[];
}
