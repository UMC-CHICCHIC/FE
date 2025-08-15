import React, { useState, useEffect, useRef } from "react";
import { postSignup } from "../apis/auth";
import { z } from "zod";
import { InputField } from "../components/SignUp/InputField";
import signupmodal from "../assets/icons/signup-modal.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const signupSchema = z
  .object({
    password: z.string(),
    passwordConfirm: z.string(),
    email: z.string().email("이메일 형식이 올바르지 않습니다."),
    phoneNumber: z
      .string()
      .regex(/^01[0-9]{8,9}$/, "휴대폰 번호 형식이 올바르지 않습니다."),
    nickname: z.string().min(1, "닉네임을 입력해주세요."),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  }); //프론트에서 유효성 검사

export default function Signup() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    phoneNumber: "",
    nickname: "",
  });
  const [pwError, setPwError] = useState<string | null>(null); // 비밀번호 불일치 에러 디바운싱(바로)
  const debounceTimer = useRef<number | null>(null);
  const [fieldErrors, setFieldErrors] = useState<
    Record<string, string> | string
  >({});

  useEffect(() => {
    if (
      form.password &&
      form.passwordConfirm &&
      form.password !== form.passwordConfirm
    ) {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      debounceTimer.current = window.setTimeout(() => {
        setPwError("비밀번호가 일치하지 않습니다.");
      }, 400);
    } else {
      setPwError(null);
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    }
  }, [form.password, form.passwordConfirm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFieldErrors({});

    const result = signupSchema.safeParse(form);
    if (!result.success) {
      // zod 에러 띄우기
      const errors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path && issue.path.length > 0) {
          errors[issue.path[0] as string] = issue.message;
        }
      });
      setFieldErrors(errors);
      return;
    }

    try {
      await postSignup(form);
      setShowModal(true);
    } catch (err: any) {
      console.error("회원가입 실패", err);

      if (axios.isAxiosError(err)) {
        const resData = err.response?.data;

        if (
          resData?.result &&
          typeof resData.result === "string" &&
          resData.result.includes("Duplicate entry") &&
          resData.result.includes("nickname")
        ) {
          setFieldErrors({
            nickname: "이미 사용 중인 닉네임입니다.",
          });
          return;
        }

        // 필드별 에러
        if (resData?.result) {
          const errors = resData.result;
          setFieldErrors(errors);
        }
      }
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate("/");
  };

  return (
    <div className="px-2 sm:px-0 flex justify-center min-h-screen bg-gradient-to-br from-[#F7F4EF] to-[#BF7990] py-10">
      <div
        className="bg-[#F7F4EF] w-full max-w-[800px] min-h-[600px] p-10 rounded-2xl"
        style={{ boxShadow: "12px 12px 30px #893B3A" }}
      >
        <h1 className="text-[#AB3130] text-3xl font-bold mb-3 mt-8">
          회원가입
        </h1>
        <p className="text-lg text-[#66191F] mb-8">
          CHICCHIC 회원가입 후 다양한 서비스를 경험해보세요.
        </p>
        <hr className="border-t border-[#AB3130] mb-12" />

        <form className="space-y-5" onSubmit={handleSubmit}>
          <InputField
            label="이메일 *"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="이메일 주소 입력"
            required
          />
          {/* 이메일 중복 */}
          {typeof fieldErrors === "object" && fieldErrors.email && (
            <div className="pl-2 mb-3 -mt-3 text-sm text-red-500">
              {fieldErrors.email}
            </div>
          )}
          {typeof fieldErrors === "string" &&
            fieldErrors.includes("이메일") && (
              <div className="pl-2 mb-3 -mt-3 text-sm text-red-500">
                {fieldErrors}
              </div>
            )}

          <InputField
            label="비밀번호 *"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="영문, 숫자, 특수문자 중 2가지 이상 조합 / 8~20자 이내 입력"
            required
          />
          {/* 비밀번호 에러 */}
          {typeof fieldErrors === "object" && fieldErrors.password && (
            <div className="pl-2 mb-3 -mt-3 text-sm text-red-500">
              {fieldErrors.password}
            </div>
          )}

          <InputField
            label="비밀번호 확인 *"
            name="passwordConfirm"
            type="password"
            value={form.passwordConfirm}
            onChange={handleChange}
            placeholder="비밀번호 확인 입력"
            required
          />
          {pwError && (
            <div className="pl-2 mb-3 -mt-3 text-sm text-red-500">
              {pwError}
            </div>
          )}

          <InputField
            label="휴대폰 번호 *"
            name="phoneNumber"
            type="tel"
            value={form.phoneNumber}
            onChange={handleChange}
            placeholder="휴대폰 번호 입력"
            required
          />
          {typeof fieldErrors === "object" && fieldErrors.phoneNumber && (
            <div className="pl-2 mb-3 -mt-3 text-sm text-red-500">
              {fieldErrors.phoneNumber}
            </div>
          )}
          {typeof fieldErrors === "string" &&
            fieldErrors.includes("휴대폰") && (
              <div className="pl-2 mb-3 -mt-3 text-sm text-red-500">
                {fieldErrors}
              </div>
            )}

          <InputField
            label="닉네임 *"
            name="nickname"
            value={form.nickname}
            onChange={handleChange}
            placeholder="닉네임 입력"
            required
          />
          {typeof fieldErrors === "object" && fieldErrors.nickname && (
            <div className="pl-2 mb-3 -mt-3 text-sm text-red-500">
              {fieldErrors.nickname}
            </div>
          )}

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-[#AB3130] text-[#F7F4EF] text-base px-18 py-2 mt-10 rounded-full hover:bg-[#922e2a] transition mb-5 cursor-pointer"
            >
              가입하기
            </button>
          </div>
        </form>

        {showModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: "rgba(0, 0, 0, 0.5)" }}
          >
            <div className="pl-8 pr-8 pb-8 pt-2 text-center shadow-lg rounded-xl flex-col items-center justify-center bg-[#F7F4EF]">
              <img
                src={signupmodal}
                alt="signup modal"
                className="w-20 m-auto"
              />
              <div className="text-2xl mt-1 text-[#66191F] font-semibold">
                회원가입이 완료되었습니다.
              </div>
              <div className="text-lg mt-2 mb-10 text-[#66191F]">
                CHICCHIC에서 더 많은 서비스를 경험하세요!
              </div>
              <button
                onClick={handleModalClose}
                className="bg-[#AB3130] text-white font-light cursor-pointer px-20 py-2 rounded-full hover:bg-[#922e2a] transition"
              >
                홈으로 이동
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
