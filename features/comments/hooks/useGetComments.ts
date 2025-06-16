// features/comments/hooks/useGetComments.ts
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { commentsService } from "../service";

interface Comment {
  id: number;
  text: string;
}

export const commentQueryKeys = {
  all: ["comments"] as const,
  list: () => [...commentQueryKeys.all, "list"] as const,
};

export const useGetComments = (): UseQueryResult<
  Comment[],
  AxiosError<any>
> => {
  return useQuery<Comment[], AxiosError<any>>({
    queryKey: commentQueryKeys.list(),
    queryFn: () => commentsService.getComments(),
  });
};
