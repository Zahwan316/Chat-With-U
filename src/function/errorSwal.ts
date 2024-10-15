import Swal from "sweetalert2"

const ErrorNotification = (e:unknown) => {
    const message: string = e instanceof Error ? e.response?.data.message : "Terjadi kesalahan"
    Swal.fire({
        text:message,
        icon:"error",
        title:"Kesalahan"
    })
}

export default ErrorNotification