'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AuthCallback() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('인증 정보를 처리하는 중입니다...');

    useEffect(() => {
        const token = searchParams.get('token');

        if (token) {
            try {
                // 토큰을 로컬 스토리지에 저장
                localStorage.setItem('auth_token', token);
                setStatus('success');
                setMessage('로그인 성공! 홈 페이지로 이동합니다.');

                // 홈페이지로 리디렉션
                setTimeout(() => {
                    router.push('/');
                }, 1500);
            } catch (error) {
                setStatus('error');
                setMessage('토큰 저장 중 오류가 발생했습니다.');
                console.error('토큰 저장 오류:', error);
            }
        } else {
            setStatus('error');
            setMessage('인증 토큰을 찾을 수 없습니다.');
        }
    }, [router, searchParams]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <div className={`text-center p-8 rounded-lg shadow-md max-w-md 
        ${status === 'loading' ? 'bg-blue-50' :
                    status === 'success' ? 'bg-green-50' : 'bg-red-50'}`}>

                {status === 'loading' && (
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
                )}

                {status === 'success' && (
                    <div className="text-green-500 text-5xl mb-4">✓</div>
                )}

                {status === 'error' && (
                    <div className="text-red-500 text-5xl mb-4">✗</div>
                )}

                <h2 className={`text-xl font-semibold mb-2
          ${status === 'loading' ? 'text-blue-700' :
                        status === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                    {status === 'loading' ? '로그인 처리 중' :
                        status === 'success' ? '로그인 성공!' : '오류 발생'}
                </h2>

                <p className="text-gray-600">{message}</p>
            </div>
        </div>
    );
} 