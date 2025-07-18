// email.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './result-email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  async send(@Body() body) {
    const { to, subject, message } = body;
    await this.mailService.sendMail(to, subject, message);
    return { message: 'Email sent successfully!' };
  }
}
