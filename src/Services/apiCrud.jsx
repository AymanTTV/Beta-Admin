import { api } from "../../apiConfig/Config";


export const GetAllService = async()=>{

    return await api.get("/service")
}

export const GetByIdService = async (id)=>{
    return await api.get(`/service/${id}`)
}

export const  AddService = async (data)=>{
    return await api.post("/service",data)
}

export const  DeleteService = async (id)=>{
    return await api.delete(`/service/${id}`)
}

export const  UpdateService = async (id,data)=>{
    return await api.put(`/service/${id}`,data)
}
