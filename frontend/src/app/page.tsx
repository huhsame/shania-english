'use client';

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/auth/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
    <div className="flex flex-col min-h-screen">
      {/* 헤더 */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-semibold text-blue-600">
            Shania English
          </Link>

          <div>
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-700">안녕하세요, {userName || '사용자'}님!</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
              >
                로그인
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Shania English에 오신 것을 환영합니다!</h1>
          <p className="text-gray-600 mb-6">
            영어 학습을 시작하려면 로그인해 주세요. Google 계정으로 간편하게 시작할 수 있습니다.
          </p>

          {!isAuthenticated && (
            <div className="mt-6">
              <Link
                href="/login"
                className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition"
              >
                시작하기
              </Link>
            </div>
          )}

          {isAuthenticated && (
            <div className="mt-6 p-4 bg-blue-50 rounded-md">
              <p className="text-blue-800 font-medium">
                {userName || '사용자'}님, 로그인되었습니다! 이제 학습을 시작할 수 있습니다.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* 푸터 */}
      <footer className="bg-gray-50 py-6">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© 2023 Shania English. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
