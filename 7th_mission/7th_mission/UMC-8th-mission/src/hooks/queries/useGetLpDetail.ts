import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { RequestLpDetailDto } from "../../types/lp";
import { getLpDetail } from "../../apis/lp";

function useGetLpDetail({lpId}:RequestLpDetailDto) {
    return useQuery({
        queryKey:[QUERY_KEY.lps,lpId],
        queryFn: () => getLpDetail({lpId}),
    })
}

export default useGetLpDetail