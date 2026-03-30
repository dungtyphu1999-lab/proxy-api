import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/adapters/handlebars.adapter';
import { join } from 'path';
import { EmailService } from './email.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        // 1. Cấu hình Server gửi mail (Transport)
        transport: {
          host: configService.get('email.host'),
          port: configService.get('email.port'),
          secure: configService.get('email.secure'),
          auth: {
            user: configService.get('email.user'),
            pass: configService.get('email.pass'),
            encryption: configService.get('email.encryption'),
          },
        },
        // 2. Cấu hình người gửi mặc định
        defaults: {
          from: `"${configService.get('email.fromName')}" <${configService.get('email.fromEmail')}>`,
        },
        // 3. Cấu hình Template & Helpers
        template: {
          dir: join(__dirname, 'templates'), 
          adapter: new HandlebarsAdapter({
            formatDate: (date: any) => {
              if (!date) return '';
              const d = new Date(date);
              const day = String(d.getDate()).padStart(2, '0');
              const month = String(d.getMonth() + 1).padStart(2, '0');
              const year = d.getFullYear();
              return `${day}-${month}-${year}`;
            },
            formatCurrency: (amount: number, currency: string = 'VND') => {
              return new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: currency,
              }).format(amount);
            },
            uppercase: (str: string) => (str ? str.toUpperCase() : ''),
            lowercase: (str: string) => (str ? str.toLowerCase() : ''),
          }),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}