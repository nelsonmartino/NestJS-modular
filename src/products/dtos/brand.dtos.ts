import { IsString, IsUrl, IsNotEmpty } from 'class-validator';
// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger'; //* Lo tomo de acá para poder mostrarlo en la documentación

export class CreateBrandDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
