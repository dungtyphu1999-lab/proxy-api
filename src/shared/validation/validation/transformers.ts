import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose as _Expose, ExposeOptions, Transform } from 'class-transformer';

export const Default = (defaultValue: unknown): PropertyDecorator => {
  return applyDecorators(
    _Expose(),
    Transform(({ value }): any => {
      return typeof value === 'undefined' ? defaultValue : value;
    }),
    ApiProperty({
      required: false,
      default: defaultValue,
    }),
  );
};

export const ToBoolean = (): PropertyDecorator => {
  return Transform(({ value }): any => {
    if (['true', '1', 1].includes(value)) {
      return true;
    }
    if (['false', '0', 0].includes(value)) {
      return false;
    }
    return value;
  });
};

export const ToMultilines = (): PropertyDecorator => {
  return Transform(({ value }): any => {
    if (typeof value === 'string') {
      return value.replace(/\\n/g, '\n');
    }
    return value;
  });
};

export const Expose = (options?: ExposeOptions): PropertyDecorator => {
  return applyDecorators(
    _Expose(options),
    ...(options?.name ? [ApiProperty({ name: options.name })] : []),
  );
};

export const TransformDateStringOnly = (): PropertyDecorator => {
  return Transform(({ value }): any => {
    if (typeof value !== 'string') {
      return value;
    }
    return value.replace(/\//g, '-').trim();
  });
};

export const TransformTimeString = (): PropertyDecorator => {
  return Transform(({ value }): any => {
    if (typeof value !== 'string') {
      return value;
    }
    const [dateString, timeString = '00:00:00'] = value.split(' ');
    return `${dateString} ${timeString}`;
  });
};
