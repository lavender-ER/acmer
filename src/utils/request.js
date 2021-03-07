import axios from "axios"

const service  = axios.create({
    //http://locahost:8080 this is your front page location
    //http://localhost:8080/api this is your backend location
    //api example: GET http://localhost:8080/api/user
    // or http://123.456.789.123/user
    // get home page data
    // http://localhost:8080/api/home
    baseURL: "/api",
    timeout: 5000
})

// before any request, use this config
service.interceptors.request.use(
    config => {
        //for future use
        return config;
    },
    error => {
        // 全局请求失败处理，当请求发送失败时，处理error
        console.log(error)
    }
)

service.interceptors.response.use(
    response => {
        // after each response first check is is ok
        const res = response.data
        if (response.status !== 200) {
            // tell user request failed
        }
        if(res.code === 1234 || res.code === 1235) {
            // wrong pwd
            //or
        } else return res
    },
    error => {
        console.log(error)
        //timeout
    }
)

export default service
