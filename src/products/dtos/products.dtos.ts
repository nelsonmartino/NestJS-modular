import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  Min,
  ValidateIf,
  ValidateNested,
  IsMongoId
} from 'class-validator';
// import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, PartialType } from '@nestjs/swagger'; //* Lo tomo de acá para poder mostrarlo en la documentación

import { CreateCategoryDto } from './category.dtos'; //* Para crear relación 1:1 embebida

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `product's name` })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty() //* Lo agregué en todas porque en el tutorial no funcionaba el update sin esto, aunque en esta aplicación no fue necesario agregarlo para que funcione.
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  readonly image: string;

  @IsNotEmpty()
  @ValidateNested()
  @ApiProperty()
  readonly category: CreateCategoryDto;

  @IsNotEmpty()
  @IsMongoId()
  readonly brand: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductsDto {
  @IsOptional()
  @IsPositive() //*Mayor a cero
  limit: number;

  @IsOptional()
  @Min(0) //* de cero en adelante
  offset: number;

  @IsOptional()
  @Min(0)
  minPrice: number;

  @ValidateIf((paramns) => paramns.minPrice) //* Solo es obligatorio si existe un precio mínimo (obligatoriedad condicional)
  @IsPositive()
  maxPrice: number;
}
