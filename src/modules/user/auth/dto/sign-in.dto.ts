import { PasswordField } from '../decorators/password-field.decorator';
import { EmailField } from '../decorators/email-field.decorator';

export class SignInDto {
  @EmailField()
  email: string;

  @PasswordField()
  password: string;
}
