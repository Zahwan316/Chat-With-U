import Swal from "sweetalert2"

const ShowNotification = (title: string,message: string) => {
   Swal.fire({
    text:message,
    title:title,
    icon:"success"
  })
}

export default ShowNotification