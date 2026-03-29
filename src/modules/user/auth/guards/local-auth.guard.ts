import {
  Injectable,
  ExecutionContext,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request } from 'express';
import { SignInDto } from '../dto/sign-in.dto';
import { flattenValidationErrors } from '@/shared/helpers/flattenValidationErrors';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    await this.validateRequestBody(request.body);

    return super.canActivate(context) as Promise<boolean>;
  }

  private async validateRequestBody(body: any): Promise<void> {
    const dto = plainToInstance(SignInDto, body);
    const errors = await validate(dto);

    if (errors.length > 0) {
      throw new BadRequestException({
        status_code: HttpStatus.BAD_REQUEST,
        message: 'Validation failed',
        errors: flattenValidationErrors(errors),
      });
    }
  }
}
