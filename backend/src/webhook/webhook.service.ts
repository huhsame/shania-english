import { Injectable, Logger } from '@nestjs/common';
import { N8nWebhookDto } from './dto/n8n-webhook.dto';

@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);
  
  async sendToN8N(data: N8nWebhookDto): Promise<any> {
    const webhookPayload = {
      url: data.url,
      personalization: data.personalization,
      googleEmail: data.googleEmail,
      goodNoteEmail: data.goodNoteEmail,
      userId: data.userId,
      timestamp: new Date().toISOString()
    };

    try {
      const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
      
      if (!n8nWebhookUrl) {
        throw new Error('N8N_WEBHOOK_URL 환경 변수가 설정되지 않았습니다.');
      }
      
      this.logger.log(`웹훅 전송 시작 - 사용자: ${data.userId}, URL: ${data.url}`);
      
      const response = await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookPayload)
      });

      if (!response.ok) {
        throw new Error(`N8N 웹훅 전송 실패: ${response.status}`);
      }

      this.logger.log(`웹훅이 성공적으로 N8N으로 전송되었습니다 - 사용자: ${data.userId}, URL: ${data.url}`);

      return {
        success: true,
        message: 'AI 분석이 시작되었습니다!',
        estimatedTime: '약 1시간',
        userId: data.userId
      };
    } catch (error) {
      this.logger.error(`N8N 웹훅 전송 오류 - 사용자: ${data.userId}, 오류: ${error.message}`);
      throw new Error('N8N 서버에 연결할 수 없습니다: ' + error.message);
    }
  }
} 