import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import { queryclient } from "../../App";
import { Likes, ResponseLpDetailDto } from "../../types/lp";
import { ResponseMyInfoDto } from "../../types/auth";

function usePostLike(){
    return useMutation({
        mutationFn:postLike,
        //data -> api 성공 응답 데이터
        //variables -> mutate에 전달한 데이터
        //context ->  onMutate에서 반환한 데이터
onMutate: async ({lpId})=> {
            await queryclient.cancelQueries({
                queryKey:[QUERY_KEY.lps, lpId],
            })
            const previousLpPost = queryclient.getQueryData<ResponseLpDetailDto>([QUERY_KEY.lps,lpId])

            const newLpPost = {... previousLpPost}
            console.log(lpId)

            const me =queryclient.getQueryData<ResponseMyInfoDto>([QUERY_KEY.myInfo])
            const userId = Number(me?.data.id)

            const likeIndex = previousLpPost?.data.likes.findIndex(
                (like) => like.userId === userId,
            )?? -1

            if(likeIndex >= 0){
                previousLpPost?.data.likes.splice(likeIndex,1)
            }else{
                const newLike = {userId,lpId:lpId} as Likes
                previousLpPost?.data.likes.push(newLike)
            }

            queryclient.setQueryData([QUERY_KEY.lps, lpId],newLpPost)

            return {previousLpPost, newLpPost}
        },

        onError: (err,newLp,context) => {
            console.log(err,newLp)
            queryclient.setQueryData([QUERY_KEY.lps, newLp.lpId],context?.previousLpPost)
        },

        onSettled: async(data,error,variables,context)=>{
            await queryclient.invalidateQueries({
                queryKey: [QUERY_KEY.lps, variables.lpId],
            })
        }
})
}

export default usePostLike