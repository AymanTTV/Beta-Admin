import { api } from "../../apiConfig/Config";


export const GetAllAbout = async()=>{

    return await api.get("/about")
}

export const GetByIdAbout = async (id)=>{
    return await api.get(`/about/${id}`)
}

export const  AddAbout = async (data)=>{
    return await api.post("/about",data)
}

export const  DeleteAbout = async (id)=>{
    return await api.delete(`/about/${id}`)
}

export const  UpdateAbout = async (id,data)=>{
    return await api.put(`/about/${id}`,data)
}
