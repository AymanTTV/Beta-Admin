import { api } from "../../apiConfig/Config";


export const GetAllXogtaShirkada = async()=>{

    return await api.get("/xogtaShirkada")
}

export const GetByIdXogtaShirkada = async (id)=>{
    return await api.get(`/xogtaShirkada/${id}`)
}

export const  AddXogtaShirkada = async (data)=>{
    return await api.post("/xogtaShirkada",data)
}

export const  DeleteXogtaShirkada = async (id)=>{
    return await api.delete(`/xogtaShirkada/${id}`)
}

export const  UpdateXogtaShirkada = async (id,data)=>{
    return await api.put(`/xogtaShirkada/${id}`,data)
}
