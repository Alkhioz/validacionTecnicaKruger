import useSWR from "swr";
import clienteAxios from "../utilities/axios.js";

function useUsers() {
  const fetcher = async (url) => await clienteAxios.get(url).then(res => res.data);

  const { data, mutate, error } = useSWR(`/user`, fetcher);
  const loadingUsers = !data && !error;
  const noData = error && error.response.status === 403;
  
  return {
    loadingUsers,
    noDataUsers:noData,
    users: data,
    mutateUsers: mutate
  };
}

export default useUsers;