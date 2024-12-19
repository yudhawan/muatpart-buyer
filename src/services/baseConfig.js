import axios from "axios"

class ConfigUrl {
    constructor(url) {
        this.url=url?url:process.env.NEXT_PUBLIC_GLOBAL_API
        this.get=this.get.bind(this)
    }
    async get(path,{url,options}){
        const result = await axios.get(url?url:this.url+path,options)
        return result
    }
    async post({url,data,options}){
        return axios.post(url,data,options).then(a=>a.json())
    }
    async put(path,{url,data,options}){
        return axios.put(url,data,options).then(a=>a.json())
    }
    async delete(path,{url,options}){
        return axios.delete(url,options).then(a=>a.json())
    }
}

export default ConfigUrl