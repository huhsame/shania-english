'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface PersonalizationDialogProps {
  open: boolean;
  onClose: () => void;
  onNext: (personalizationInfo: string) => void;
}

export default function PersonalizationDialog({
  open,
  onClose,
  onNext,
}: PersonalizationDialogProps) {
  const [personalizationInfo, setPersonalizationInfo] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 기존 개인화 정보 불러오기
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
            if (data.personalizationInfo) {
              setPersonalizationInfo(data.personalizationInfo);
            }
          })
          .catch(error => {
            console.error('개인화 정보 조회 오류:', error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    }
  }, [open]);

  const handleNext = () => {
    if (personalizationInfo.trim()) {
      onNext(personalizationInfo.trim());
    }
  };

  const placeholderText = `예문 생성을 위한 개인화 정보를 입력해주세요.

예시:
• 영어 수준: 중급 (토익 700점)
• 직업: 소프트웨어 개발자
• 관심 분야: 기술, 프로그래밍, AI
• 학습 목표: 비즈니스 영어 회화 향상
• 선호하는 학습 스타일: 실무 중심의 실용적인 표현`;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>개인화 정보 입력</DialogTitle>
          <DialogDescription>
            AI가 당신에게 맞춤형 영어 예문을 생성하기 위한 정보를 입력해주세요.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="personalization">개인화 정보</Label>
            <Textarea
              id="personalization"
              placeholder={placeholderText}
              value={personalizationInfo}
              onChange={(e) => setPersonalizationInfo(e.target.value)}
              className="min-h-[200px] text-sm"
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground">
              영어 수준, 직업, 관심사, 학습 목표 등을 자유롭게 입력해주세요.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            취소
          </Button>
          <Button 
            onClick={handleNext}
            disabled={!personalizationInfo.trim() || isLoading}
          >
            {isLoading ? '불러오는 중...' : '다음'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 