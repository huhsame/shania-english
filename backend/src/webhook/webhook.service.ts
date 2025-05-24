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
      
      // URL 유효성 검사
      if (n8nWebhookUrl.includes('your-n8n-instance.com')) {
        throw new Error('N8N_WEBHOOK_URL이 기본값으로 설정되어 있습니다. 실제 N8N 인스턴스 URL을 설정해주세요.');
      }
      
      this.logger.log(`웹훅 전송 시작 - 사용자: ${data.userId}, URL: ${data.url}, 대상: ${n8nWebhookUrl}`);
      
      // AbortController를 사용한 타임아웃 설정
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30초 타임아웃
      
      const response = await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookPayload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unknown error');
        throw new Error(`N8N 웹훅 전송 실패: ${response.status} - ${errorText}`);
      }

      const responseData = await response.json().catch(() => null);
      this.logger.log(`웹훅이 성공적으로 N8N으로 전송되었습니다 - 사용자: ${data.userId}, URL: ${data.url}`);

      return {
        success: true,
        message: 'AI 분석이 시작되었습니다!',
        estimatedTime: '약 1시간',
        userId: data.userId,
        n8nResponse: responseData
      };
    } catch (error) {
      // 구체적인 오류 메시지 제공
      let errorMessage = error.message;
      
      if (error.name === 'AbortError') {
        errorMessage = 'N8N 서버 응답 시간 초과 (30초)';
      } else if (error.code === 'ECONNREFUSED') {
        errorMessage = 'N8N 서버가 실행되지 않거나 접근할 수 없습니다';
      } else if (error.code === 'ENOTFOUND') {
        errorMessage = 'N8N 서버 주소를 찾을 수 없습니다. URL을 확인해주세요';
      }
      
      this.logger.error(`N8N 웹훅 전송 오류 - 사용자: ${data.userId}, 오류: ${errorMessage}`);
      this.logger.error(`오류 세부사항:`, error);
      
      throw new Error(`N8N 서버 연결 오류: ${errorMessage}`);
    }
  }
} 