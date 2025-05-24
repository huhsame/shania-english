import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { N8nWebhookDto } from './dto/n8n-webhook.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @UseGuards(JwtAuthGuard)
  @Post('send-to-n8n')
  async sendToN8n(@Request() req, @Body() webhookDto: N8nWebhookDto) {
    // 현재 로그인된 사용자의 ID를 자동으로 설정
    const userId = req.user.id;
    const webhookData = {
      ...webhookDto,
      userId: userId
    };
    
    return this.webhookService.sendToN8N(webhookData);
  }
} 