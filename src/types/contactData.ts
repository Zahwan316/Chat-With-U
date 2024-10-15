type contactData = {
    body: string;
    created_Date?: string;
    group_id?: string | null;
    id: string | number;
    soft_delete?: string | null;
    time: string;
    type: string;
    user_from_id: string;
    user_target_id?: string | null;
    sentBy?: string;
}

export default contactData