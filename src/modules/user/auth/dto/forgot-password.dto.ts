import { EmailField } from '../decorators/email-field.decorator';

export class ForgotPasswordDto {
  @EmailField()
  email: string;
}
