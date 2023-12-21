import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
// import { PartialType } from '@nestjs/mapped-types'; 
import { PartialType, ApiProperty } from '@nestjs/swagger'; //* Lo tomo de acá para poder mostrarlo en la documentación

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({description: 'Name of user'})
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @IsNotEmpty()
  @IsString()
  readonly paymentMethod: string;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
