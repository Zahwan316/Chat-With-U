import axios from "axios"
import { useEffect, useState } from "react"

const useFetch = <T,>(url:string):{data: string | null,error: string | null, loading: boolean} => {
    const [data,setdata] = useState<T | null>(null)
    const [error,seterror] = useState<string | null>(null)
    const [loading,setloading] = useState<boolean>(true)

    useEffect(() => {
        const fetchData = async() => {
            try{
                const res = await axios.get(`${import.meta.env.VITE_APP_URL}${url}`)
                const data = res.data?.data
                setdata(data)
            }
            catch(e){
                seterror(e.message)
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