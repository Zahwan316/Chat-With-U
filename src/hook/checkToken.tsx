import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

const useCheckTokenHook = () => {
  const token = Cookies.get("token")
  const [isAvailableToken,setIsAvailableToken] = useState<boolean>(true)

  useEffect(() => {
      if(!token){
        setIsAvailableToken(false)
      }
      else{
        setIsAvailableToken(true)
      }
  },[])

  return isAvailableToken
}

export default useCheckTokenHook