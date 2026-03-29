export interface EmailRecipient {
  email: string;
  name?: string;
}

export interface EmailAttachment {
  content: string;
  filename: string;
  type?: string;
  disposition?: string;
}

export interface EmailOptions {
  to: EmailRecipient | EmailRecipient[];
  subject: string;
  text?: string;
  html?: string;
  template?: string;
  context?: Record<string, any>;
  attachments?: EmailAttachment[];
  replyTo?: EmailRecipient;
  fromEmail: string;
  fromName: string;
}
