import useSWR from "swr";
import clienteAxios from "../utilities/axios.js";

function useUsers() {
  const fetcher = async (url) => await clienteAxios.get(url).then(res => res.data);

  const { data, mutate, error } = useSWR("/getUsers", fetcher);
  const loadingUsers = !data && !error;
  const noDataUsers = error && error.response.status === 403;
  
  return {
    loadingUsers,
    noDataUsers,
    users: data,
  };
}

export default useUsers;