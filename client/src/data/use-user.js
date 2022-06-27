import useSWR from "swr";
import clienteAxios from "../utilities/axios.js";

function useUser() {
  const fetcher = async (url) => await clienteAxios.get(url).then(res => res.data);

  const { data, error } = useSWR("/getCurrentUserData", fetcher);
  const loading = !data && !error;
  const loggedOut = error && error.response.status === 403;
  
  return {
    loading,
    loggedOut,
    user: data,
  };
}

export default useUser;
