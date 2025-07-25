import React from 'react'

import { useState } from 'react';

export default function Signup() {
  const [showModal, setShowModal] = useState(false);

 const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault(); // 회원가입 로직 추가
  setShowModal(true);
};

  const handleModalClose = () => {
    setShowModal(false);
    // 로그인 페이지로 이동하거나 다른 처리
  };
  return (
    <div className="flex justify-center min-h-screen bg-gradient-to-br from-[#F7F4EF] to-[#BF7990] py-10">
      <div className="bg-[#F7F4EF] w-full max-w-[800px] min-h-[600px] p-10 rounded-2xl" style={{boxShadow: '12px 12px 30px #893B3A'}}>
        <h1 className="text-[#AB3130] text-2xl font-bold mb-3">회원가입</h1>
        <p className="text-base text-[#66191F] mb-12">
          CHICCHIC 회원가입 후 다양한 서비스를 경험해보세요.
        </p>
        <hr className="border-t border-[#AB3130] mb-12" />

        <form className="space-y-4" onSubmit={handleSubmit}>

          <div>
            <label className="text-sm font-semibold text-[#AB3130]">
              아이디 *
            </label>
            <div className="flex gap-2 mt-1 text-[#AB3130]">
              <input
                type="text"
                placeholder="6~12자 이내 입력"
                className="text-sm flex-1 px-4 py-1 border-1 border-[#AB3130] text-[#AB3130] rounded-full focus:outline-none placeholder-[#AB3130] placeholder-opacity-60"
              />
              <button
                type="button"
                className="px-8 py-1 text-sm font-bold border-1 border-[#AB3130] text-[#AB3130] rounded-full hover:bg-[#a8342f] hover:text-white transition"
              >
                중복확인
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-[#AB3130]">
              비밀번호 *
            </label>
            <input
              type="password"
              placeholder="영문, 숫자, 특수문자 중 2가지 이상 조합 / 8~20자 이내 입력"
              className="w-full text-sm px-4 py-1 border-1 border-[#AB3130] text-[#AB3130] rounded-full mt-1 focus:outline-none placeholder-[#AB3130] placeholder-opacity-60"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-[#AB3130]">
              비밀번호 확인 *
            </label>
            <input
              type="password"
              placeholder="비밀번호 확인 입력"
              className="w-full px-4 py-1 text-sm border-1 border-[#AB3130] rounded-full mt-1 focus:outline-none placeholder-[#AB3130] placeholder-opacity-60"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-[#AB3130]">
              이메일 *
            </label>
            <input
              type="email"
              placeholder="이메일 주소 입력"
              className="w-full px-4 py-1 text-sm border-1 border-[#AB3130] text-[#AB3130] rounded-full mt-1 focus:outline-none placeholder-[#AB3130] placeholder-opacity-60"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-[#AB3130]">
              휴대폰 번호 *
            </label>
            <input
              type="tel"
              placeholder="휴대폰 번호 입력"
              className="w-full px-4 py-1 text-sm border-1 border-[#AB3130] text-[#AB3130] rounded-full mt-1 focus:outline-none placeholder-[#AB3130] placeholder-opacity-60"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-[#AB3130]">
              닉네임 *
            </label>
            <input
              type="text"
              placeholder="닉네임 입력"
              className="w-full px-4 py-1 text-sm border-1 border-[#AB3130] text-[#AB3130] rounded-full mt-1 focus:outline-none placeholder-[#AB3130] placeholder-opacity-60"
            />
          </div>
          
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-[#AB3130] text-[#F7F4EF] text-sm px-30 py-2 mt-10 rounded-full hover:bg-[#922e2a] transition mb-5 cursor-pointer"
            >
              가입하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
