import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { AppConfigService } from '@/config/app-config.service';
import { EmailOptions, EmailRecipient } from './types/email.types';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly mailerService: MailerService,
  ) {}

  // Hàm gửi email chung
  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      const {
        to,
        subject,
        text,
        html,
        template, // Tên file template
        context, // Data truyền vào template
        attachments,
        replyTo,
        fromEmail,
        fromName,
      } = options;
      // Xử lý danh sách người nhận
      const recipients = Array.isArray(to) ? to.map((r) => r.email) : to.email;

      // Xử lý người gửi (Nếu không truyền thì lấy mặc định từ config)
      const senderEmail = fromEmail || this.appConfigService.email.noReplyEmail;
      const senderName =
        fromName || this.appConfigService.email.noReplyFromName;
      const fromAddress = senderName
        ? `"${senderName}" <${senderEmail}>`
        : senderEmail;

      // Gửi email
      await this.mailerService.sendMail({
        to: recipients,
        from: fromAddress,
        replyTo: replyTo?.email,
        subject: subject,
        text: text,
        html: html,
        template: template,
        context: context,
        attachments: attachments,
      });
      // Ghi log
      this.logger.log(
        `Email sent successfully to ${Array.isArray(recipients) ? recipients.join(', ') : recipients}`,
      );
      return true;
    } catch (error) {
      // Ghi log lỗi
      this.logger.error('Failed to send email:', error);
      return false;
    }
  }

  // Hàm gửi email xác thực
  async sendVerificationCodeEmail(
    recipient: EmailRecipient,
    data: { verificationCode: string },
  ): Promise<boolean> {
    return this.sendEmail({
      to: recipient,
      subject: 'Mã xác thực email - BACHHOAMMO',
      template: 'verification-code', // Tên file trong folder templates
      context: {
        // Data truyền vào
        verificationCode: data.verificationCode,
      },
      fromEmail: this.appConfigService.email.noReplyEmail,
      fromName: this.appConfigService.email.noReplyFromName,
    });
  }

  // Hàm gửi email quên mật khẩu
  async sendPasswordResetCodeEmail(
    recipient: EmailRecipient,
    data: { resetCode: string },
  ): Promise<boolean> {
    return this.sendEmail({
      to: recipient,
      subject: 'Mã đặt lại mật khẩu - BACHHOAMMO',
      template: 'password-reset-code',
      context: {
        resetCode: data.resetCode,
      },
      fromEmail: this.appConfigService.email.noReplyEmail,
      fromName: this.appConfigService.email.noReplyFromName,
    });
  }

  // Hàm gửi email phản hồi liên hệ hỗ trợ
  async sendSupportContactReplyEmail(
    recipient: EmailRecipient,
    data: {
      fullName: string;
      originalContent: string;
      replyContent: string;
      createdAt: Date;
      repliedAt: Date;
    },
  ): Promise<boolean> {
    return this.sendEmail({
      to: recipient,
      subject: 'Phản hồi yêu cầu hỗ trợ - BACHHOAMMO',
      template: 'support-contact-reply',
      context: {
        fullName: data.fullName,
        originalContent: data.originalContent,
        replyContent: data.replyContent,
        createdAt: data.createdAt,
        repliedAt: data.repliedAt,
      },
      fromEmail: this.appConfigService.email.supportEmail,
      fromName: this.appConfigService.email.supportFromName,
    });
  }

  // Hàm gửi email thông báo đặt lại mật khẩu thành công
  async sendPasswordResetEndUser(
    recipient: EmailRecipient,
    data: { fullName: string; newPassword: string },
  ): Promise<boolean> {
    return this.sendEmail({
      to: recipient,
      subject: '[BACHHOAMMO] Mật khẩu tài khoản của bạn đã được đặt lại',
      template: 'reset-password',
      context: {
        fullName: data.fullName,
        newPassword: data.newPassword,
        year: new Date().getFullYear(),
      },
      fromEmail: this.appConfigService.email.noReplyEmail,
      fromName: this.appConfigService.email.noReplyFromName,
    });
  }
}
