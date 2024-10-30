import axios from "axios"
import { useEffect, useState } from "react"
import ErrorNotification from "../function/errorSwal"
import Cookies from 'js-cookie';

const useFetch = <T,>(url:string):{data: string | null,error: string | null, loading: boolean} => {
    const [data,setdata] = useState<T | null>(null)
    const [error,seterror] = useState<string | null>(null)
    const [loading,setloading] = useState<boolean>(true)
    const token = Cookies.get("token")

    useEffect(() => {
        const fetchData = async() => {
            try{
                const res = await axios.get(`${import.meta.env.VITE_APP_URL}api/${url}`,{
                    "headers":{
                      "Authorization":`Bearer ${token}`
                    }
                  })
                const data = res.data?.data
                setdata(data)
            }
            catch(e){
                ErrorNotification(e)
            }
            finally{
                setloading(false)
            }
        }
        fetchData()
    },[])

    return {data,error,loading}
} 

export default useFetch