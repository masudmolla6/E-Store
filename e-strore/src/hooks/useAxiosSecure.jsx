import axios from 'axios'
import { useNavigate } from 'react-router';
import useAuth from './useAuth';

const axiosSecure=axios.create({
    baseURL:"http://localhost:5000"
})
const useAxiosSecure = () => {

  const navigate = useNavigate();
  const { logOut } = useAuth();
  
    // Request Interceptors
    axiosSecure.interceptors.request.use(async(config)=>{
      const token=localStorage.getItem("access-token");
      config.headers.authorization=`Bearer ${token}`;
      return config;
    }, (error)=>{
      return Promise.reject(error);
    })

    // Response Interceptors
    axiosSecure.interceptors.response.use(async(response)=>{
      return response;
    }, async(error)=>{
      console.error(error.response.status);
      const status=(error.response.status);
      if(status=== 401 || status===403){
        await logOut();
        navigate("/login");
      }
      return Promise.reject(error);
    })

  return axiosSecure;
}

export default useAxiosSecure;
