import { PaginationDto } from "../types/common";
import { RequestLpDetailDto, ResponseLpDetailDto, ResponseLpListDto, ResponsetLikeLpDto } from "../types/lp.ts";
import { axiosInstance } from "./axios.ts";

export const getLpList = async(PaginationDto:PaginationDto):Promise<ResponseLpListDto> => {
    const {data} = await axiosInstance.get("v1/lps",{
        params:PaginationDto
    })

    return data
}

export const getLpDetail = async({lpId}:RequestLpDetailDto):Promise<ResponseLpDetailDto> => {
    const {data} = await axiosInstance.get(`v1/lps/${lpId}`)
    return data
}

export const postLike = async ({lpId}:RequestLpDetailDto):Promise<ResponsetLikeLpDto> => {
    const {data} = await axiosInstance.post(`/v1/lps/${lpId}/likes`)
    return data
}

export const deleteLike = async ({lpId}:RequestLpDetailDto):Promise<ResponsetLikeLpDto> => {
    const {data} = await axiosInstance.delete(`/v1/lps/${lpId}/likes`)
    return data
}