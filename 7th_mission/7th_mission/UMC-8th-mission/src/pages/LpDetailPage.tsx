import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";// Adjust the path as necessary
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useAuth } from "../week5/context/AuthContext";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";
import { Heart } from "lucide-react";

const LpDetailPage = () => {
  const lpId = useParams() // 어떻게 받아오는 것인가... ?? 
  const {accessToken} = useAuth()
  const { data: lp, isPending, isError } = useGetLpDetail({ lpId: Number(lpId.id)});
  const{data:me} = useGetMyInfo(accessToken)
  const{mutate:likeMutate}=usePostLike()
  const{mutate:disLikeMutate}=useDeleteLike()

  const isLiked =lp?.data.likes.map((like)=> like.userId).includes(me?.data.id as number)


  const handleLikeLp = () => {
    me?.data.id && likeMutate({ lpId:Number(lpId.id)});
  }

  const handleUnlikeLp = () => {
    me?.data.id && disLikeMutate({ lpId:Number(lpId.id)});
  }


    if(isPending){
        return(
            <div className="mt-12">
                Loading...
            </div>
        )
    }

    if(isError){
        return(
            <div className="mt-12">
                Error
            </div>
        )
    }

    return(
        <div className="mt-12">
            <h1>{lp.data.title}</h1>
            <img src={lp.data.thumbnail} alt={lp.data.title} className="w-full h-48 object-cover" />
            <p>{lp.data.content}</p>
            <button onClick={isLiked ? handleUnlikeLp : handleLikeLp} className="flex items-center mt-4">
                <Heart color={isLiked ? "red":"black"} fill={isLiked? "red":"transparent"}/>
            </button>

        </div>
    )
}

export default LpDetailPage;