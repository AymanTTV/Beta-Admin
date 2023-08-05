import { api } from "../../apiConfig/Config";


export const GetAllContact = async()=>{

    return await api.get("/contactForm")
}

export const GetByIdContact = async (id)=>{
    return await api.get(`/contactForm/${id}`)
}

export const  AddContact = async (data)=>{
    return await api.post("/contactForm",data)
}

export const  DeleteContact = async (id)=>{
    return await api.delete(`/contactForm/${id}`)
}

export const  UpdateContact = async (id,data)=>{
    return await api.put(`/contactForm/${id}`,data)
}
