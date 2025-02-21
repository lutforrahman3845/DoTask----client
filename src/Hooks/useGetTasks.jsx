import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";

const useGetTasks = () => {
  const axiosPublic = useAxiosPublic();
  const {user} = useAuth();
  const { data:tasks, isLoading:taskLoading, refetch:taskRefetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/tasks?userId=${user?.uid}`);
      return data;
    },
  });
  return { tasks, taskLoading, taskRefetch };
};

export default useGetTasks;
