import { Helmet } from "react-helmet"
import LoginViewPage from "../section/login/view"

const LoginPage = () => {
  return(
    <>
        <Helmet>
            <title>Chat With U | Login</title>
        </Helmet>

        <LoginViewPage />
    </>
  )
}

export default LoginPage