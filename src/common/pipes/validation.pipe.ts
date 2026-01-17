import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import type { ObjectSchema } from 'joi';
@Injectable()
export class ValidationPipe implements PipeTransform {
  private schema: ObjectSchema;

  constructor(schema: ObjectSchema) {
    this.schema = schema;
  }

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);

    if (error) {
      throw new BadRequestException('Validation failed');
    }

    return value;
  }
}
