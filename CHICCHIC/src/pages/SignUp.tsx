import React, { useState } from 'react';
import { postSignup } from '../apis/postApi';
import { z } from 'zod';

const signupSchema = z.object({
  username: z.string().min(6, "아이디는 6자 이상").max(12, "아이디는 12자 이하"),
  password: z.string().min(8, "비밀번호는 8자 이상").max(20, "비밀번호는 18자 이하"),
  passwordConfirm: z.string(),
  email: z.string().email("이메일 형식이 올바르지 않습니다."),
  phoneNumber: z.string().regex(/^01[0-9]{8,9}$/, "휴대폰 번호 형식이 올바르지 않습니다."),
  nickname: z.string().min(1, "닉네임을 입력해주세요."),
}).refine((data) => data.password === data.passwordConfirm, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["passwordConfirm"],
});

export default function Signup() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
    email: '',
    phoneNumber: '',
    nickname: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const result = signupSchema.safeParse(form);
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    try {
      await postSignup(form);
      setShowModal(true);
    } catch (err: any) {
      setError('회원가입에 실패했습니다.');
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
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
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="6~12자 이내 입력"
                className="text-sm flex-1 px-4 py-1 border-1 border-[#AB3130] text-[#AB3130] rounded-full focus:outline-none placeholder-[#AB3130] placeholder-opacity-60"
                required
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
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="영문, 숫자, 특수문자 중 2가지 이상 조합 / 8~20자 이내 입력"
              className="w-full text-sm px-4 py-1 border-1 border-[#AB3130] text-[#AB3130] rounded-full mt-1 focus:outline-none placeholder-[#AB3130] placeholder-opacity-60"
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-[#AB3130]">
              비밀번호 확인 *
            </label>
            <input
              type="password"
              name="passwordConfirm"
              value={form.passwordConfirm}
              onChange={handleChange}
              placeholder="비밀번호 확인 입력"
              className="w-full px-4 py-1 text-sm border-1 border-[#AB3130] rounded-full mt-1 focus:outline-none placeholder-[#AB3130] placeholder-opacity-60"
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-[#AB3130]">
              이메일 *
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="이메일 주소 입력"
              className="w-full px-4 py-1 text-sm border-1 border-[#AB3130] text-[#AB3130] rounded-full mt-1 focus:outline-none placeholder-[#AB3130] placeholder-opacity-60"
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-[#AB3130]">
              휴대폰 번호 *
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              placeholder="휴대폰 번호 입력"
              className="w-full px-4 py-1 text-sm border-1 border-[#AB3130] text-[#AB3130] rounded-full mt-1 focus:outline-none placeholder-[#AB3130] placeholder-opacity-60"
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-[#AB3130]">
              닉네임 *
            </label>
            <input
              type="text"
              name="nickname"
              value={form.nickname}
              onChange={handleChange}
              placeholder="닉네임 입력"
              className="w-full px-4 py-1 text-sm border-1 border-[#AB3130] text-[#AB3130] rounded-full mt-1 focus:outline-none placeholder-[#AB3130] placeholder-opacity-60"
              required
            />
          </div>
          
          {error && (
            <div className="text-red-500 text-sm mt-2">{error}</div>
          )}

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-[#AB3130] text-[#F7F4EF] text-sm px-30 py-2 mt-10 rounded-full hover:bg-[#922e2a] transition mb-5 cursor-pointer"
            >
              가입하기
            </button>
          </div>
        </form>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="text-lg mb-4 text-[#AB3130]">회원가입이 완료되었습니다!</div>
              <button
                onClick={handleModalClose}
                className="bg-[#AB3130] text-white px-6 py-2 rounded-full hover:bg-[#922e2a] transition"
              >
                확인
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
