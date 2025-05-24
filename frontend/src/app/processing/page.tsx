'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProcessingPage() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="pb-4">
          <div className="mx-auto mb-4">
            {/* 로딩 스피너 애니메이션 */}
            <div className="relative">
              <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                🤖
              </div>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-primary">
            AI가 열심히 만드는 중입니다!
          </CardTitle>
          <CardDescription className="text-lg mt-2">
            맞춤형 영어 학습 자료를 생성하고 있어요
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p className="text-muted-foreground">
              곧 메일로 보내드릴게요! 📧
            </p>
            <p className="text-sm text-muted-foreground">
              보통 2-3분 정도 소요됩니다
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="bg-primary/5 p-4 rounded-lg">
              <p className="text-sm text-foreground">
                ✨ 개인화된 영어 예문 생성 중...
              </p>
            </div>
            <div className="bg-primary/5 p-4 rounded-lg">
              <p className="text-sm text-foreground">
                📚 학습 자료 최적화 중...
              </p>
            </div>
            <div className="bg-primary/5 p-4 rounded-lg">
              <p className="text-sm text-foreground">
                📧 이메일 준비 중...
              </p>
            </div>
          </div>
          
          <Button 
            onClick={handleGoHome}
            variant="outline"
            className="w-full mt-6"
          >
            홈으로 이동
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 