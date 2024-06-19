import axios from "axios";
import {toast} from "sonner";
import {mutate} from "swr";

export const GET = async (url: string) => {
    const token = localStorage.getItem("neigh_secure_token")
    try{
        const res = await axios.get(
            url,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )

        if (res.status != 200){
            throw new Error("Error fetching entry")
        }

        // console.log(res.data)
        return res.data.data;
    }catch (e){
        console.log(e)
    }
}

export const POST = async (url: string, data?: any) => {
    const token = localStorage.getItem("neigh_secure_token")
    try{
        toast.promise(axios.post(
                url,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            ),
            {
                loading: "Creating ...",
                success: (payload) => {
                    if (payload.status != 200) {
                        throw new Error("Error creating resource");
                    }
                    return "Resource created successfully";
                },
                error: "Error creating creating",
            }
        )
    }catch (e){
        console.log(e)
    }
}

export const deleteEntries = async (url: string) => {
    const token = localStorage.getItem("neigh_secure_token")
    try{
        toast.promise(axios.delete(
                url,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            ),
            {
                loading: "Deleting entry...",
                success: (payload) => {
                    if (payload.status != 200) {
                        throw new Error("Error fetching entry");
                    }
                    mutate('/admin/entries')
                    return "Entry deleted successfully";
                },
                error: "Error deleting entry",
            }
        )
    }catch (e){
        console.log(e)
    }
}

export const deleteUser = async (url : string, role: string) => {
    const token = localStorage.getItem("neigh_secure_token")
    try{
        toast.promise(axios.patch(
                url,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            ),
            {
                loading: "Deleting user...",
                success: (payload) => {
                    if (payload.status != 200) {
                        throw new Error("Error fetching entry");
                    }
                    mutate(`/admin/users/role/${role}`);
                    return "User deleted successfully";
                },
                error: "Error deleting user",
            }
        )
    }catch (e){
        console.log(e)
    }
}

