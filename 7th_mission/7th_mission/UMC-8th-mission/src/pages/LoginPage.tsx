import { useNavigate } from "react-router-dom"
import useForm from "../hooks/useForm"
import validateSignin, { UserSigninInformation } from "../utills/validate"
import { useAuth } from "../week5/context/AuthContext"
import { useEffect } from "react"

const LoginPage = () => {
    const {login,accessToken} = useAuth()
    const navigate = useNavigate()

    useEffect(()=> {
        if(accessToken){
            navigate("/")
        }
    },[accessToken,navigate])
    
    const {values,errors,touched,getInputProps } = useForm<UserSigninInformation>({
        initialValues: {email: "", password: ""},
        validate: validateSignin
    })

    const handleSubmit = async () => {
        try {
            await login(values)
            navigate("my")
        }catch(error){
            alert("로그인 실패")
            navigate("/")
        }
    }

    const handleGoogleLogin = () => {
        window.location.href= import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login"
    }

    const isDisabled = 
        Object.values(errors || {}).some((error) => error.length >0) ||
        Object.values(values).some((value)=>value === '')     //에러가 있는지 확인하는 함수
    
    return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="flex flex-col gap-3">
                <input
                {...getInputProps("email")}
                type={"emial"} 
                className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] ${errors?.email && touched?.email ? 'border-red-500' : 'border-gray-300'}`}
                placeholder={'이메일'}
                />
                {errors?.email && touched?.email && (<div className="text-red">{errors.email}</div>)}
                <input 
                {...getInputProps("password")}
                type={"password"} 
                className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] ${errors?.password && touched?.password ? 'border-red-500' : 'border-gray-300'}`}
                placeholder={'비밀번호'}/>
                {errors?.password && touched?.password && (<div className="text-red">{errors.password}</div>)}
                <button type="button" onClick={handleSubmit} disabled={isDisabled} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed">
                    로그인
                </button>
                <button type="button" onClick={handleGoogleLogin} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed">
                    <div>
                        <img src="/assets/google.png" alt="google" className="w-5 h-5 inline-block mr-2" />
                        <span>구글 로그인</span>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default LoginPage

