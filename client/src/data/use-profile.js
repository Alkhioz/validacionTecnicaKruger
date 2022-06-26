import useSWR from "swr";
import clienteAxios from "../utilities/axios.js";

function useProfile(userId) {
  const fetcher = async (url) => await clienteAxios.get(url).then(res => res.data);

  const { data, mutate, error } = useSWR(`/user/${userId}`, fetcher);
  const loading = !data && !error;
  const noData = error && error.response.status === 403;
  
  return {
    loading,
    noData,
    profile: data,
    mutateProfile: mutate
  };
}

export default useProfile;
