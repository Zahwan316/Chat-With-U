const ConsoleDebug = (item) => {
    if(import.meta.env.VITE_APP_STAGE === "BUILD")
    console.log(item)
}

export default ConsoleDebug