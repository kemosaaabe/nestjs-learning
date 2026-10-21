import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class PositiveIntPipe implements PipeTransform<string, number> {
  transform(value: string): number {
    const valueInt = Number(value);

    if (Number.isInteger(valueInt) && valueInt > 0) {
      return valueInt;
    }

    throw new BadRequestException();
  }
}
