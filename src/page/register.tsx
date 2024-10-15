import { Helmet } from "react-helmet"
import RegisterViewPage from "../section/register/view/index";

const RegisterPage = () => {
  return(
    <>
        <Helmet>
            <title>Chat With U | Register</title>
        </Helmet>

        <RegisterViewPage />
    </>
  )
}

export default RegisterPage