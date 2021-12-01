import { PipeTransform, Injectable, ArgumentMetadata, ValidationError } from '@nestjs/common';
import { UserInputError } from 'apollo-server-fastify';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class GraphQLRequestValidator implements PipeTransform<any> {
  public async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;

    if (typeof value === 'string') {
      return value;
    }

    if (!metatype || !value) {
      return value;
    }

    const object: object = plainToClass(metatype, value);

    let errors: Array<ValidationError>;

    try {
      errors = await validate(object);
    } catch (err) {
      console.log('InvalidRequestException could not validate request:', JSON.stringify(object, null, 2));
      console.error(err);

      throw new UserInputError(err.message);
    }

    if (errors.length > 0) {
      console.log('InvalidRequestException: ', JSON.stringify(errors, null, 2));

      throw new UserInputError('Validation errors', errors);
    }

    return object;
  }
}