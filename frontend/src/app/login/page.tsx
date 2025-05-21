'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

    // 구글 로그인 핸들러
    const handleGoogleLogin = () => {
        // 백엔드 구글 인증 URL로 리디렉션
        window.location.href = `${apiUrl}/auth/google`;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6">로그인</h1>

                <div className="space-y-4">
                    {/* 소셜 로그인 버튼 */}
                    <button
                        onClick={handleGoogleLogin}
                        className="flex items-center justify-center w-full py-3 px-4 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition duration-150"
                    >
                        <div className="mr-2 flex items-center">
                            <svg width="24" height="24" viewBox="0 0 24 24">
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
                        </div>
                        <span className="text-gray-700 font-medium">Google 계정으로 로그인</span>
                    </button>
                </div>

                <div className="mt-6 text-center text-sm text-gray-600">
                    <Link href="/" className="text-blue-600 hover:underline">
                        홈으로 돌아가기
                    </Link>
                </div>
            </div>
        </div>
    );
} 