import { createContext, PropsWithChildren, useContext, useState } from "react"
import { RequestSigninDto } from "../../types/auth"
import { LOCAL_STORAGE_KEY } from "../../constants/key"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import { postSignin,postLogout } from "../../apis/auth"

interface AuthContextType {
    accessToken: string|null
    refreshToken: string|null
    login:(signinData:RequestSigninDto)=>Promise<void>
    logout:()=>Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    refreshToken: null,
    login: async () => {},
    logout: async () => {}
})

export const AuthProvider = ({children}:PropsWithChildren) => {
    const { getItem:getAccessTokenfromStorage,
         setItem:setAccessTokeninStorage,
          removeItem:removeAccessTokenfromStorage} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken)
    const {getItem:getRefreshTokenfromStorage,
         setItem:setRefreshTokeninStorage,
          removeItem:removeRefreshTokenfromStorage} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken)

    const [accessToken, setAccessToken] = useState<string|null>(getAccessTokenfromStorage())
    const [refreshToken, setRefreshToken] = useState<string|null>(getRefreshTokenfromStorage())

    const login = async (signinData: RequestSigninDto) => {
        const {data}=await postSignin(signinData)
        try{
            if(data){
                const newAccessToken = data.accessToken
                const newRefreshToken = data.refreshToken
    
                setAccessTokeninStorage(newAccessToken)
                setRefreshTokeninStorage(newRefreshToken)
    
                setAccessToken(newAccessToken)
                setRefreshToken(newRefreshToken)
            }
        }catch(error){
        console.error("로그인 오류",error)
        alert("로그인 실패")
        }
        alert("로그인 성공")
    }

    const logout = async ()=> {
        try{
            await postLogout()
            removeAccessTokenfromStorage()
            removeRefreshTokenfromStorage()

            setAccessToken(null)
            setRefreshToken(null)
        }catch(error){
            console.error("로그아웃 오류",error)
            alert("로그아웃 실패")
        }
        alert("로그아웃 성공")
    }
    return (
        <AuthContext.Provider value={{accessToken,refreshToken,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}