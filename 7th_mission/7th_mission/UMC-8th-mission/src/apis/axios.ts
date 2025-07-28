import axios,{InternalAxiosRequestConfig} from "axios"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { LOCAL_STORAGE_KEY } from "../constants/key"

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean //요청 재시도 여부를 나타내는 플래그 

}

//전역 변수로 refresh 요청의 primise를 저장해 중복 요청을 방지함
let refreshPromise:Promise<string>|null = null

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API_URL,
})

//요청 인터셉터: 모든 요청 전에 accesstoken을 Authorization 헤더에 추가함.
axiosInstance.interceptors.request.use((config) => {
    const {getItem}=useLocalStorage(LOCAL_STORAGE_KEY.accessToken)
    const accessToken = getItem() //localStorage에서 accessToken을 가져옴

    //accessToken이 존재하면 Authorization 헤더에 Bearer 토큰을 추가함
    if(accessToken){
        config.headers = config.headers || {}
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
},
(error)=> Promise.reject(error) //요청 인터셉터가 실패하면 에러를 반환함
)

//응답 인터셉터: 401에러 발생 --> refreshToken을 이용해 accessToken을 재발급 받음
axiosInstance.interceptors.response.use(
    (response)=> response, //정상 응답 반환 
    async(error)=> {
        const originalRequest:CustomAxiosRequestConfig = error.config
        //401에러 이면서 재시도 하지 않은 요청 처리 
        if(error.response && error.response.status === 401&& !originalRequest._retry){
            //refresh 엔드포인트 401에러 발생시(unauthorized), 중복 재시도 방지를 위해 로그아웃 처리
            if(originalRequest.url === "/v1/auth/refresh"){
                const {removeItem:removeAccessToken} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken)
                const {removeItem:removeRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken)
                removeAccessToken()
                removeRefreshToken()
                window.location.href = "/login"
                return Promise.reject(error)
            }
            originalRequest._retry = true //재시도 플래그를 true로 설정

            //이미 refresh요청이 진행중이면 그 promise를 재사용
            if(!refreshPromise){
                refreshPromise =(async() => {
                    const{getItem:getRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken)
                    const refreshToken = getRefreshToken()

                    const {data} = await axiosInstance.post("/v1/auth/refresh",{
                        refresh: refreshToken
                    })
                    const {setItem:setAccessToken} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken)
                    const {setItem:setRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken)
                    setAccessToken(data.data.accessToken) //새로운 accessToken을 localStorage에 저장
                    setRefreshToken(data.data.refreshToken) //새로운 refreshToken을 localStorage에 저장
    
                    return data.data.accessToken //새로운 accessToken을 반환
                })().catch((error) => {
                    const{removeItem:removeAccessToken} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken)
                    const{removeItem:removeRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken)
                    removeAccessToken()
                    removeRefreshToken()
                }).finally(()=>{
                    refreshPromise = null
                })
            }
            return refreshPromise.then((newAccessToken) => {
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}` //새로운 accessToken을 Authorization 헤더에 추가
                return axiosInstance(originalRequest) //원래 요청을 새로운 accessToken으로 재전송
            })
    }
    return Promise.reject(error) //그 외의 에러는 그대로 반환
}
)
