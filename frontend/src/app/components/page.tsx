'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

export default function ComponentsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const handleShowToast = () => {
    toast({
      title: "알림 메시지",
      description: "이것은 토스트 알림 예시입니다.",
    });
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">UI 컴포넌트 예시</h1>
        <p className="text-muted-foreground">
          Shania English에서 사용 중인 UI 컴포넌트 모음입니다.
        </p>
      </div>

      <Tabs defaultValue="basic" className="mb-10">
        <TabsList className="mb-6">
          <TabsTrigger value="basic">기본 컴포넌트</TabsTrigger>
          <TabsTrigger value="form">폼 컴포넌트</TabsTrigger>
          <TabsTrigger value="complex">복합 컴포넌트</TabsTrigger>
          <TabsTrigger value="feedback">피드백 컴포넌트</TabsTrigger>
        </TabsList>

        {/* 기본 컴포넌트 */}
        <TabsContent value="basic">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 버튼 */}
            <Card>
              <CardHeader>
                <CardTitle>버튼</CardTitle>
                <CardDescription>
                  다양한 스타일의 버튼 컴포넌트입니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Button variant="default">기본</Button>
                  <Button variant="destructive">삭제</Button>
                  <Button variant="outline">아웃라인</Button>
                  <Button variant="secondary">보조</Button>
                  <Button variant="ghost">고스트</Button>
                  <Button variant="link">링크</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm">작게</Button>
                  <Button>기본 크기</Button>
                  <Button size="lg">크게</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button disabled>비활성화</Button>
                  <Button variant="outline" disabled>
                    비활성화
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 배지 */}
            <Card>
              <CardHeader>
                <CardTitle>배지</CardTitle>
                <CardDescription>
                  상태나 카테고리를 표시하는 배지 컴포넌트입니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge>기본</Badge>
                  <Badge variant="secondary">보조</Badge>
                  <Badge variant="outline">아웃라인</Badge>
                  <Badge variant="destructive">삭제</Badge>
                </div>
              </CardContent>
            </Card>

            {/* 아바타 */}
            <Card>
              <CardHeader>
                <CardTitle>아바타</CardTitle>
                <CardDescription>
                  사용자 프로필 이미지를 표시하는 아바타 컴포넌트입니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-4 items-end">
                  <Avatar>
                    <AvatarImage src="/avatar-placeholder.png" />
                    <AvatarFallback>김</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/avatar-placeholder.png" />
                    <AvatarFallback>이</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/avatar-placeholder.png" />
                    <AvatarFallback>박</AvatarFallback>
                  </Avatar>
                </div>
              </CardContent>
            </Card>

            {/* 구분선 */}
            <Card>
              <CardHeader>
                <CardTitle>구분선</CardTitle>
                <CardDescription>
                  콘텐츠를 시각적으로 구분하는 구분선 컴포넌트입니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p>첫 번째 항목</p>
                  <Separator className="my-4" />
                  <p>두 번째 항목</p>
                </div>
                <div className="flex h-5 items-center space-x-4 text-sm">
                  <div>항목 1</div>
                  <Separator orientation="vertical" />
                  <div>항목 2</div>
                  <Separator orientation="vertical" />
                  <div>항목 3</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 폼 컴포넌트 */}
        <TabsContent value="form">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 텍스트 입력 */}
            <Card>
              <CardHeader>
                <CardTitle>텍스트 입력</CardTitle>
                <CardDescription>
                  텍스트 입력을 위한 컴포넌트입니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="email">이메일</Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="이메일을 입력하세요"
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="password">비밀번호</Label>
                  <Input
                    type="password"
                    id="password"
                    placeholder="비밀번호를 입력하세요"
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="disabled">비활성화 입력</Label>
                  <Input
                    type="text"
                    id="disabled"
                    disabled
                    placeholder="비활성화 상태"
                  />
                </div>
              </CardContent>
            </Card>

            {/* 체크박스 & 라디오 */}
            <Card>
              <CardHeader>
                <CardTitle>체크박스 & 라디오</CardTitle>
                <CardDescription>
                  선택 옵션을 위한 컴포넌트입니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms">이용약관에 동의합니다</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="marketing" defaultChecked />
                    <Label htmlFor="marketing">마케팅 정보를 수신합니다</Label>
                  </div>
                </div>

                <RadioGroup defaultValue="standard">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="standard" id="r1" />
                    <Label htmlFor="r1">표준 플랜</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="premium" id="r2" />
                    <Label htmlFor="r2">프리미엄 플랜</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pro" id="r3" />
                    <Label htmlFor="r3">전문가 플랜</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* 스위치 & 슬라이더 */}
            <Card>
              <CardHeader>
                <CardTitle>스위치 & 슬라이더</CardTitle>
                <CardDescription>
                  토글 및 범위 선택을 위한 컴포넌트입니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="airplane-mode" />
                    <Label htmlFor="airplane-mode">알림 활성화</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="darkmode" defaultChecked />
                    <Label htmlFor="darkmode">다크 모드</Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>볼륨 조절</Label>
                  <Slider defaultValue={[50]} max={100} step={1} />
                </div>
              </CardContent>
            </Card>

            {/* 셀렉트 */}
            <Card>
              <CardHeader>
                <CardTitle>셀렉트</CardTitle>
                <CardDescription>
                  드롭다운 선택을 위한 컴포넌트입니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="language">언어 선택</Label>
                  <Select>
                    <SelectTrigger id="language">
                      <SelectValue placeholder="언어를 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ko">한국어</SelectItem>
                      <SelectItem value="en">영어</SelectItem>
                      <SelectItem value="jp">일본어</SelectItem>
                      <SelectItem value="cn">중국어</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 복합 컴포넌트 */}
        <TabsContent value="complex">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 아코디언 */}
            <Card>
              <CardHeader>
                <CardTitle>아코디언</CardTitle>
                <CardDescription>
                  확장 가능한 콘텐츠 패널 컴포넌트입니다.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>첫 번째 항목</AccordionTrigger>
                    <AccordionContent>
                      첫 번째 항목에 대한 상세 설명입니다. 아코디언은 공간을
                      효율적으로 사용하면서 많은 정보를 표시할 수 있습니다.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>두 번째 항목</AccordionTrigger>
                    <AccordionContent>
                      두 번째 항목에 대한 상세 설명입니다. 필요에 따라 내용을
                      펼치고 접을 수 있습니다.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>세 번째 항목</AccordionTrigger>
                    <AccordionContent>
                      세 번째 항목에 대한 상세 설명입니다. 사용자가 원하는
                      정보만 볼 수 있도록 합니다.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* 카드 */}
            <Card>
              <CardHeader>
                <CardTitle>카드</CardTitle>
                <CardDescription>
                  정보를 구조화하여 표시하는 카드 컴포넌트입니다.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Card>
                  <CardHeader>
                    <CardTitle>학습 프로그램</CardTitle>
                    <CardDescription>
                      기초부터 시작하는 영어 회화
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      이 프로그램은 영어 초보자를 위한 맞춤형 커리큘럼을
                      제공합니다. 일상 회화에 필요한 기본적인 표현과 문법을
                      학습합니다.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">자세히</Button>
                    <Button>시작하기</Button>
                  </CardFooter>
                </Card>
              </CardContent>
            </Card>

            {/* 드롭다운 메뉴 */}
            <Card>
              <CardHeader>
                <CardTitle>드롭다운 메뉴</CardTitle>
                <CardDescription>
                  컨텍스트 메뉴를 제공하는 드롭다운 컴포넌트입니다.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">메뉴 열기</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>내 계정</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>프로필</DropdownMenuItem>
                    <DropdownMenuItem>설정</DropdownMenuItem>
                    <DropdownMenuItem>학습 기록</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>로그아웃</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardContent>
            </Card>

            {/* 툴팁 */}
            <Card>
              <CardHeader>
                <CardTitle>툴팁</CardTitle>
                <CardDescription>
                  추가 정보를 제공하는 툴팁 컴포넌트입니다.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">버튼에 마우스를 올려보세요</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>이것은 툴팁입니다!</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 피드백 컴포넌트 */}
        <TabsContent value="feedback">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 다이얼로그 */}
            <Card>
              <CardHeader>
                <CardTitle>다이얼로그</CardTitle>
                <CardDescription>
                  모달 창을 표시하는 다이얼로그 컴포넌트입니다.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>다이얼로그 열기</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>학습 확인</DialogTitle>
                      <DialogDescription>
                        지금 학습을 시작하시겠습니까?
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <p>
                        학습을 시작하면 진행 상황이 자동으로 저장됩니다. 언제든지
                        중단하고 나중에 다시 돌아올 수 있습니다.
                      </p>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">취소</Button>
                      <Button>시작하기</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* 토스트 */}
            <Card>
              <CardHeader>
                <CardTitle>토스트</CardTitle>
                <CardDescription>
                  알림 메시지를 표시하는 토스트 컴포넌트입니다.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={handleShowToast}>토스트 메시지 표시</Button>
                <Toaster />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-10 text-center">
        <Button onClick={() => router.push('/')} variant="outline">
          홈으로 돌아가기
        </Button>
      </div>
    </div>
  );
} 