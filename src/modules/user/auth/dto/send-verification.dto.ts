import { EmailField } from '../decorators/email-field.decorator';

export class SendVerificationDto {
  @EmailField()
  email: string;
}
