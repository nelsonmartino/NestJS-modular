import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import {IsMongoId, isMongoId} from 'class-validator'

@Injectable()
export class MongoIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if(!isMongoId(value)){
      throw new BadRequestException(`${value} is not mongoId`)
    }
    return value;
  }
}
