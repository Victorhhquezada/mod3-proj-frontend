import {_api} from "./api";

export const getallBurgers =() =>{
    return _api.get(`/burger/allburgers`)
}

export const createBurger = (data) => {
    console.log(data)
    return _api.post(`/burger/createburger`,data)
} 

export const editBurger = (id,data) =>{
    return _api.patch(`/burger/edit-burger/${id}`,data)
}

export const burgerbyUsers = (id) =>{
    return _api.get(`/burger/burgerbyuser/${id}`)
}

export const deleteBurger = (id) =>{
    return _api.delete(`/burger/delete/${id}`)
}