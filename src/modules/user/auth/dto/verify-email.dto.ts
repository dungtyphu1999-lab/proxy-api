import { EmailField } from '../decorators/email-field.decorator';
import { CodeField } from '../decorators/code-field.decorator';

export class VerifyEmailDto {
  @EmailField()
  email: string;

  @CodeField()
  code: string;
}
