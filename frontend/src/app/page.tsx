'use client';

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/auth/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon } from "lucide-react";

export default function Home() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
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
    }
  }, [isAuthenticated, logout, apiUrl]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 헤더 */}
      <header className="bg-background border-b shadow-sm py-4 sticky top-0 z-10">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-semibold text-primary flex items-center gap-2">
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
                  <Link href="#" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      커뮤니티
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="#" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      리소스
                    </NavigationMenuLink>
                  </Link>
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
              >
                로그인
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
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Shania English와 함께하는 영어 학습
            </h1>
            <p className="text-xl text-muted-foreground max-w-[700px] mx-auto">
              맞춤형 학습 경험으로 영어 실력을 효과적으로 향상시켜 보세요.
            </p>
            
            {!isAuthenticated && (
              <div className="mt-8">
                <Button
                  asChild
                  variant="default"
                  size="lg"
                  className="rounded-full px-8"
                >
                  <Link href="/login">
                    무료로 시작하기
                  </Link>
                </Button>
              </div>
            )}
          </div>
          
          {isAuthenticated && (
            <Card className="mb-10 border-primary/20 shadow-md">
              <CardHeader>
                <CardTitle>환영합니다, {userName || '사용자'}님!</CardTitle>
                <CardDescription>최근 학습 현황과 추천 과정을 확인하세요.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-primary/5 rounded-md">
                  <p className="text-foreground">지금 바로 학습을 시작해보세요!</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">대시보드</Button>
                <Button>학습 계속하기</Button>
              </CardFooter>
            </Card>
          )}

          {/* 탭 콘텐츠 */}
          <Tabs defaultValue="features" className="mb-12">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="features">주요 기능</TabsTrigger>
              <TabsTrigger value="courses">추천 코스</TabsTrigger>
              <TabsTrigger value="testimonials">사용자 후기</TabsTrigger>
            </TabsList>
            
            <TabsContent value="features" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>AI 기반 학습</CardTitle>
                    <CardDescription>
                      인공지능 기술을 활용한 맞춤형 학습
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>AI가 사용자의 학습 패턴을 분석하여 최적화된 학습 경로를 제공합니다.</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>실시간 피드백</CardTitle>
                    <CardDescription>
                      즉각적인 피드백으로 효과적인 학습
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>발음, 문법, 어휘 사용에 대한 실시간 피드백으로 빠른 실력 향상을 경험하세요.</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>다양한 학습 자료</CardTitle>
                    <CardDescription>
                      풍부한 컨텐츠로 재미있는 학습
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>다양한 주제와 레벨의 학습 자료로 지루하지 않게 영어를 배울 수 있습니다.</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="courses" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>초급 회화 마스터</CardTitle>
                    <CardDescription>
                      기초부터 탄탄하게 영어 회화 학습
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>일상 생활에 필요한 기본적인 영어 표현과 문법을 학습합니다.</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">자세히 보기</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>비즈니스 영어</CardTitle>
                    <CardDescription>
                      직장에서 필요한 영어 표현 학습
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>회의, 프레젠테이션, 이메일 작성 등 비즈니스 환경에 필요한 영어를 배웁니다.</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">자세히 보기</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="testimonials" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/testimonial-1.png" />
                        <AvatarFallback>JK</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">김지훈</CardTitle>
                        <CardDescription>회사원, 32세</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="italic">"Shania English 덕분에 회사에서 영어 미팅에 자신감을 갖게 되었습니다. 특히 비즈니스 영어 코스가 실무에 많은 도움이 되었어요."</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/testimonial-2.png" />
                        <AvatarFallback>SL</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">이수민</CardTitle>
                        <CardDescription>대학생, 24세</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="italic">"AI 발음 피드백 기능이 정말 좋아요. 제가 잘못 발음하는 부분을 정확히 짚어주고 개선 방법도 알려줘서 발음이 많이 좋아졌어요."</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
          
          <Separator className="my-12" />
          
          {/* FAQ 섹션 */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">자주 묻는 질문</h2>
            <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
              <AccordionItem value="item-1">
                <AccordionTrigger>Shania English는 어떤 서비스인가요?</AccordionTrigger>
                <AccordionContent>
                  Shania English는 AI 기술을 활용한 영어 학습 플랫폼입니다. 맞춤형 학습 경로, 실시간 피드백, 
                  다양한 학습 자료를 통해 효과적인 영어 학습을 도와드립니다.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>어떻게 시작하나요?</AccordionTrigger>
                <AccordionContent>
                  Google 계정으로 간편하게 로그인하시면 바로 서비스를 이용하실 수 있습니다. 로그인 후에는 
                  레벨 테스트를 통해 개인화된 학습 경험을 제공받을 수 있습니다.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>무료로 이용할 수 있나요?</AccordionTrigger>
                <AccordionContent>
                  네, 기본적인 기능은 무료로 제공됩니다. 기본 학습 과정, 커뮤니티 참여 등의 서비스를 무료로 이용하실 수 있습니다.
                  추가적인 고급 기능은 향후 구독 서비스로 제공될 예정입니다.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>모바일에서도 사용할 수 있나요?</AccordionTrigger>
                <AccordionContent>
                  네, Shania English는 반응형 웹으로 설계되어 모바일, 태블릿, 데스크톱 등 다양한 기기에서 
                  최적화된 환경으로 이용하실 수 있습니다.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="bg-muted py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-3">Shania English</h3>
              <p className="text-sm text-muted-foreground">
                효과적인 영어 학습을 위한 최고의 온라인 플랫폼
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">학습</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">코스 둘러보기</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">학습 가이드</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">자주 묻는 질문</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">회사 소개</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">소개</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">채용 정보</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">보도자료</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">문의</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">고객센터</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">이메일</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">제휴 문의</Link></li>
              </ul>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-sm text-muted-foreground">© 2023 Shania English. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
