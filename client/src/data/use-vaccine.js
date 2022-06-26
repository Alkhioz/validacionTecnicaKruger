import useSWR from "swr";
import clienteAxios from "../utilities/axios.js";

function useVaccine() {
  const fetcher = async (url) => await clienteAxios.get(url).then(res => res.data);

  const { data, mutate, error } = useSWR("/vaccine", fetcher);
  const loading = !data && !error;
  const noData = error && error.response.status === 403;
  
  return {
    loadingVaccine: loading,
    noDataVaccine: noData,
    vaccine: data,
    mutateVaccine: mutate
  };
}

export default useVaccine;
