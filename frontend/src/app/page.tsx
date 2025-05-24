'use client';

import Link from "next/link";
import { useAuth } from "@/auth/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import PersonalizationDialog from "@/components/PersonalizationDialog";
import EmailSetupDialog from "@/components/EmailSetupDialog";

export default function Home() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  
  // 다이얼로그 상태 관리 추가
  const [linkUrl, setLinkUrl] = useState<string>('');
  const [showPersonalizationDialog, setShowPersonalizationDialog] = useState<boolean>(false);
  const [showEmailDialog, setShowEmailDialog] = useState<boolean>(false);
  const [personalizationInfo, setPersonalizationInfo] = useState<string>('');
  
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  useEffect(() => {
    // 인증된 상태라면 사용자 정보 가져오기
    if (isAuthenticated && typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');

      if (token) {
        fetch(`${apiUrl}/auth/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('인증 실패');
            }
            return response.json();
          })
          .then(data => {
            setUserName(data.name);
          })
          .catch(error => {
            console.error('사용자 정보 조회 오류:', error);
            logout(); // 토큰이 유효하지 않으면 로그아웃
          });
      }
      
      // 로그인 후 pending_link 확인
      const pendingLink = localStorage.getItem('pending_link');
      if (pendingLink) {
        setLinkUrl(pendingLink);
        setShowPersonalizationDialog(true);
        localStorage.removeItem('pending_link');
      }
    }
  }, [isAuthenticated, logout, apiUrl]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleLogin = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    window.location.href = `${apiUrl}/auth/google`;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setLinkUrl(inputValue);
  };

  const handleStartWithEmail = () => {
    if (linkUrl) {
      if (isAuthenticated) {
        // 이미 로그인된 경우 바로 개인화 다이얼로그 열기
        setShowPersonalizationDialog(true);
      } else {
        // 로그인 후 개인화 다이얼로그 열기
        localStorage.setItem('pending_link', linkUrl);
        handleLogin();
      }
    }
  };

  // 다이얼로그 핸들러 함수들
  const handlePersonalizationNext = (personalization: string) => {
    setPersonalizationInfo(personalization);
    setShowPersonalizationDialog(false);
    setShowEmailDialog(true);
  };

  const handlePersonalizationClose = () => {
    setShowPersonalizationDialog(false);
  };

  const handleEmailDialogClose = () => {
    setShowEmailDialog(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 헤더 */}
      <header className="bg-background border-b shadow-sm py-4 sticky top-0 z-10">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xl font-semibold text-primary flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M22 7.7c0-.6-.4-1.2-.8-1.5l-6.3-3.9c-.5-.3-1.2-.3-1.7 0l-10.3 6c-.5.3-.9.9-.9 1.5v7.4c0 .6.4 1.2.8 1.5l6.3 3.9c.5.3 1.2.3 1.7 0l10.3-6c.5-.3.9-.9.9-1.5V7.7z"/>
                <path d="M10 21.9V14L2.1 9.1"/>
                <path d="m10 14 11.9-6.9"/>
                <path d="M14 19.8v-8.1"/>
                <path d="M18 15.5v-4.6"/>
              </svg>
              Shania English
            </Link>
            
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>학습하기</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] lg:w-[600px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary to-primary/80 p-6 no-underline outline-none focus:shadow-md"
                            href="#"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium text-primary-foreground">
                              나만의 학습 코스
                            </div>
                            <p className="text-sm leading-tight text-primary-foreground/90">
                              맞춤형 영어 학습 코스로 효과적인 영어 실력 향상을 경험하세요.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted focus:bg-muted"
                            href="#"
                          >
                            <div className="text-sm font-medium leading-none">기초 회화</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              기본적인 영어 회화를 배워보세요.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted focus:bg-muted"
                            href="#"
                          >
                            <div className="text-sm font-medium leading-none">비즈니스 영어</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              업무에 필요한 비즈니스 영어를 학습하세요.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="#" className={navigationMenuTriggerStyle()}>
                      커뮤니티
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/components" className={navigationMenuTriggerStyle()}>
                      컴포넌트
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="#" className={navigationMenuTriggerStyle()}>
                      리소스
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div>
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <div className="flex items-center gap-2 cursor-pointer">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/avatar-placeholder.png" alt={userName || '사용자'} />
                        <AvatarFallback>{userName ? userName.charAt(0).toUpperCase() : 'U'}</AvatarFallback>
                      </Avatar>
                      <span className="text-foreground hidden md:inline">안녕하세요, {userName || '사용자'}님!</span>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="flex justify-between space-x-4">
                      <Avatar>
                        <AvatarImage src="/avatar-placeholder.png" />
                        <AvatarFallback>{userName ? userName.charAt(0).toUpperCase() : 'U'}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">{userName || '사용자'}</h4>
                        <div className="flex items-center pt-2">
                          <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                          <span className="text-xs text-muted-foreground">
                            가입일: 2023년 12월
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button
                        onClick={handleLogout}
                        variant="outline"
                        size="sm"
                        className="w-full"
                      >
                        로그아웃
                      </Button>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
            ) : (
              <Button
                onClick={handleLogin}
                variant="default"
                size="sm"
                className="flex items-center gap-2"
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Sign In
              </Button>
            )}
          </div>
        </div>
      </header>
      {/* 메인 콘텐츠 */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* 히어로 섹션 */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 text-primary">
              Shania English와 함께하는 영어 학습
            </h1>
            <p className="text-xl text-muted-foreground max-w-[700px] mx-auto">
              맞춤형 학습 경험으로 영어 실력을 효과적으로 향상시켜 보세요.
            </p>
            
            {!isAuthenticated && (
              <div className="mt-8 flex items-center justify-center max-w-3xl mx-auto px-4">
                <div className="flex w-full flex-col sm:flex-row gap-2">
                  <Input 
                    type="text"
                    placeholder="학습할 유튜브나 웹페이지 링크를 입력하세요"
                    className="h-12 text-base flex-grow rounded-full sm:rounded-l-full sm:rounded-r-none px-4 focus:border-primary focus:ring-2 focus:ring-primary/30"
                    value={linkUrl}
                    onChange={handleEmailChange}
                    onKeyDown={(e) => e.key === 'Enter' && handleStartWithEmail()}
                  />
                  <Button
                    onClick={handleStartWithEmail}
                    variant="default"
                    size="lg"
                    className="rounded-full sm:rounded-r-full sm:rounded-l-none px-8 mt-2 sm:mt-0 h-12 text-base"
                    disabled={!linkUrl}
                  >
                    시작하기
                  </Button>
                </div>
              </div>
            )}

            {isAuthenticated && (
              <div className="mt-8 flex items-center justify-center max-w-3xl mx-auto px-4">
                <div className="flex w-full flex-col sm:flex-row gap-2">
                  <Input 
                    type="text"
                    placeholder="학습할 유튜브나 웹페이지 링크를 입력하세요"
                    className="h-12 text-base flex-grow rounded-full sm:rounded-l-full sm:rounded-r-none px-4 focus:border-primary focus:ring-2 focus:ring-primary/30"
                    value={linkUrl}
                    onChange={handleEmailChange}
                    onKeyDown={(e) => e.key === 'Enter' && handleStartWithEmail()}
                  />
                  <Button
                    onClick={handleStartWithEmail}
                    variant="default"
                    size="lg"
                    className="rounded-full sm:rounded-r-full sm:rounded-l-none px-8 mt-2 sm:mt-0 h-12 text-base"
                    disabled={!linkUrl}
                  >
                    시작하기
                  </Button>
                </div>
              </div>
            )}
          </div>
          
        </div>
      </main>
      
      {/* 다이얼로그들 */}
      <PersonalizationDialog
        open={showPersonalizationDialog}
        onClose={handlePersonalizationClose}
        onNext={handlePersonalizationNext}
      />
      
      <EmailSetupDialog
        open={showEmailDialog}
        onClose={handleEmailDialogClose}
        linkUrl={linkUrl}
        personalizationInfo={personalizationInfo}
      />
    </div>
  );
}
