import axios from "axios"
import { BASE_URL } from "../constnt"



let getData = async (endpoint) => {
    let res = await axios.get(BASE_URL + endpoint)
    return res
}

let addData = async (endpoint, data) => {
    let res = await axios.post(BASE_URL + endpoint, data)
    return res;
}

let deleteData = async (endpoint, id) => {
    let res = await axios.delete(BASE_URL + endpoint + `/${id}`);
    return res
}

let updateData = async (endpoint, data) => {
    let res = await axios.put(BASE_URL + endpoint , data)
    return res;
}


export { getData, addData, deleteData, updateData }