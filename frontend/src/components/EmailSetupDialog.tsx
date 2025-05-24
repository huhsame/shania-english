'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface EmailSetupDialogProps {
  open: boolean;
  onClose: () => void;
  linkUrl: string;
  personalizationInfo: string;
}

export default function EmailSetupDialog({
  open,
  onClose,
  linkUrl,
  personalizationInfo,
}: EmailSetupDialogProps) {
  const [goodNoteEmail, setGoodNoteEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  // 기존 GoodNote 이메일 불러오기
  useEffect(() => {
    if (open && typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (token) {
        setIsLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        
        fetch(`${apiUrl}/api/user/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('프로필 조회 실패');
            }
            return response.json();
          })
          .then(data => {
            if (data.goodNoteEmail) {
              setGoodNoteEmail(data.goodNoteEmail);
            }
          })
          .catch(error => {
            console.error('이메일 정보 조회 오류:', error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    }
  }, [open]);

  const handleSubmit = async (skipEmail: boolean = false) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        throw new Error('인증 토큰이 없습니다');
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
      
      // 1. 개인화 정보 저장
      await fetch(`${apiUrl}/api/user/personalization`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          personalizationInfo,
          goodNoteEmail: skipEmail ? undefined : goodNoteEmail
        })
      });

      // 2. 현재 사용자 정보 가져오기
      const userResponse = await fetch(`${apiUrl}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!userResponse.ok) {
        throw new Error('사용자 정보 조회 실패');
      }
      
      const userData = await userResponse.json();

      // 3. N8N 웹훅 전송
      await fetch(`${apiUrl}/api/webhook/send-to-n8n`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url: linkUrl,
          personalization: personalizationInfo,
          googleEmail: userData.email,
          goodNoteEmail: skipEmail ? undefined : goodNoteEmail
        })
      });

      // 4. 완료 페이지로 이동
      router.push('/processing');
      onClose();
      
    } catch (error) {
      console.error('전송 오류:', error);
      alert('전송 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirm = () => {
    handleSubmit(false);
  };

  const handleSkip = () => {
    handleSubmit(true);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>GoodNote 이메일 설정</DialogTitle>
          <DialogDescription>
            생성된 영어 학습 자료를 받을 GoodNote 이메일을 입력해주세요. (선택사항)
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="goodNoteEmail">GoodNote 이메일</Label>
            <Input
              id="goodNoteEmail"
              type="email"
              placeholder="your-goodnote@email.com"
              value={goodNoteEmail}
              onChange={(e) => setGoodNoteEmail(e.target.value)}
              disabled={isLoading || isSubmitting}
            />
            <p className="text-xs text-muted-foreground">
              GoodNote로 직접 학습 자료를 받고 싶다면 이메일을 입력해주세요.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={handleSkip}
            disabled={isSubmitting}
          >
            {isSubmitting ? '전송 중...' : '스킵'}
          </Button>
          <Button 
            onClick={handleConfirm}
            disabled={isSubmitting || (goodNoteEmail && !goodNoteEmail.includes('@'))}
          >
            {isSubmitting ? '전송 중...' : '확인'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 