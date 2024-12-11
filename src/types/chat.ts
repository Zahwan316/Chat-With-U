type chat = {
    id: string,
    type: "text" | "file",
    body: string,
    time: string,
    user_target_id?: string,
    user_from_id: string
    created_Date: string,
    sent_by?: "me" | "other"
    file?:string,
    token?: string,
    group_id?: string
  }

export default chat