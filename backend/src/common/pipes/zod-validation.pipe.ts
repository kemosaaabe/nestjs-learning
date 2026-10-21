import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ZodType } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: ZodType) {}

  transform(value: unknown) {
    const parseResult = this.schema.safeParse(value);

    if (!parseResult.success) {
      throw new BadRequestException(parseResult.error.issues);
    }

    return parseResult.data;
  }
}
