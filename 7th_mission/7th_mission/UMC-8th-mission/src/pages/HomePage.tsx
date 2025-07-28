import { useEffect, useState } from "react"
import useGetLpList from "../hooks/queries/useGetLpList"
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList"
import { PaginationOrder } from "../types/common"
import { useInView } from "react-intersection-observer"
import LpCard from "../components/LpCard/LpCard"
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList"

const HomePage = () => {
    const [search,setSearch] = useState("")
    const {data,isFetching,isError,isPending,hasNextPage,fetchNextPage} = useGetInfiniteLpList({ limit:10, search, order: PaginationOrder.asc })
    //const {data,isLoading,isPending,isError}= useGetLpList({search,limit:50})
    const lps = data

    const{ref,inView} = useInView()

    useEffect(()=>{
        if(inView&&!isFetching&&hasNextPage){
            fetchNextPage();
        }
    },[inView,isFetching,hasNextPage,fetchNextPage])

    return (
        <div className="mt-20">
            <input value={search} onChange={(e)=>setSearch(e.target.value)} className=""/>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {isPending && <LpCardSkeletonList count={20}/>}         
            {lps?.pages?.map((page)=>page.data.data)
            ?.flat()
            ?.map((lp)=>(
            <LpCard key={lp.id} lp={lp}/>
            ))}
            {isFetching && <LpCardSkeletonList count={20}/>}
            </div>
            <div ref={ref} className="h-10 w-full bg-red-500">
            </div>
        </div>
    )
}

export default HomePage