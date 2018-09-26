import axios from "../assets/js/axios";
import {getLotCookie} from './cookie';
let server = axios.create({
    //timeout: 5000, // 请求超时时间
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        //'X-Requested-With':'XMLHttpRequest'
    },
    // transformRequest: [function (data) {
    //     console.log(data);
    //     return data;
    // }],
    withCredentials: true//true为了让axios发送的请求带上cookie
});


// request拦截器,拦截器优先执行于create=》transformRequest
server.interceptors.request.use(
    config => {
        let ret = ''
        for (let it in config.data) {//json转化为formdata
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(config.data[it]) + '&';
        }
        
        if(config.url !== '/admin/login/login'){//除登录接口外都要给的参数
            ret += getLotCookie(['user_id','project_id','org_id','token']);
        }
        
        if(config.method==="post"){//get和post携带参数的方式不一样
            config.data = ret.substr(0,ret.length-1);
        }
        if(config.method==="get"){
            config.url += '?'+ret.substr(0,ret.length-1);
        }
        return config;
    },
    error => {
        // Do something with request error
        console.log(error) // for debug
        Promise.reject(error)
    }
)


// response 拦截器
server.interceptors.response.use(
    res => {
        if(res.data.code === 500){
            window.xgo.$router.push('/login');
        }
        return res.data;
        //return Promise.reject('error')
    },
    error => {
        console.log('err' + error);
        return Promise.reject(error)
    }
);

export default server;