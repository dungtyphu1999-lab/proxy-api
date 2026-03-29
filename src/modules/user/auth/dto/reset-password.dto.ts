import { EmailField } from '../decorators/email-field.decorator';
import { PasswordField } from '../decorators/password-field.decorator';
import { CodeField } from '../decorators/code-field.decorator';

export class ResetPasswordDto {
  @EmailField()
  email: string;

  @CodeField()
  code: string;

  @PasswordField()
  new_password: string;
}
