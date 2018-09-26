<template>
    <div class="right_top">
        <div class="right_t_box">
            <div class="right_t_top">
                <img class="right_tt_img" :src="img.menu" />
                <img class="right_tt_img" :src="img.refresh" />
                <img class="right_tt_head" :src="img.head" />
                <span @click="switchPop" class="right_tt_name">
                    {{name}}
                    <img class="right_ttn_down" :src="img.down" />
                    <ul v-if="popShow" class="right_ttn_pop">
                        <li>
                            <span class="right_ttnp_password"></span>
                            修改密码
                        </li>
                        <li @click="loginout">
                            <span class="right_ttnp_out"></span>
                            退出登录
                        </li>
                    </ul>
                </span>
            </div>
            <div class="right_t_title">
                <div class="right_tt_text">项目管理</div>
                <div class="right_tt_line"></div>
            </div>
        </div>
    </div>
</template>

<script>
// import Vue from 'vue'
// import menuComponent from './menu.vue';
import server from '../publicMethod/server';
import {delCookie,getCookie} from '../publicMethod/cookie';

export default {
  name: 'topnav',
  data () {
    return {
        img: {
            head: require('../assets/img/small/head.png'),
            refresh: require('../assets/img/small/refresh.png'),
            menu: require('../assets/img/small/menu.png'),
            down: require('../assets/img/small/down.png'),
        },
        popShow: false,
        name: getCookie('name')
    }
  },
  watch: {
    '$route' (to, from) {//监控路由变化
        if(from.name === "login"){//获取用户姓名
            this.name = getCookie('name');
        }
    }
  },
  created(){//47.98.198.248
    console.log(getCookie('name'));
  },
  methods: {
    switchPop(){
        this.popShow = !this.popShow;
    },
    loginout(e){
        let that = this;
        server({
            url:'/admin/login/outlogin',
            method: "post",
            data:{}
        }).then(function (res) {
            if(res.code === 200){
                let userinfo = {
                    user_id: null,
                    project_id: null,
                    org_id: null,
                    user_id: null,
                    name: null,
                    token: null
                };
                delCookie(userinfo);//清空cookie
                that.$router.push('/login');
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.right_top{
    position: relative;
    height: 135px;
}
.right_t_box{
    position: absolute;
    width: 100%;
}
.right_page{
    padding-top: 135px;
    margin-top: -135px;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    overflow: hidden;
}
.right_page_content{
    box-sizing: border-box;
    height: 100%;
    overflow: auto;
    padding: 0 22px;
}
.right_pc_page{
    box-sizing: border-box;
    padding: 20px 20px 80px 20px;
    width: 100%;
    border-radius: 5px;
    background-color: #eff3f3;
}
.right_t_top{
    line-height: 66px;
    height: 66px;
    background-color: #eff3f3;
}
.right_tt_img{
    margin-left: 24px;
}
.right_tt_head{
    margin-top: 10px;
    margin-right: 25px;
    float: right;
    width: 42px;
}
.right_tt_name{
    position: relative;
    font-size: 17px;
    color: #616f7d;
    margin-right: 20px;
    float: right;
}
.right_ttn_down{
    display: inline-block;
    margin-left: 5px;
}
.right_ttn_pop{
    box-sizing: border-box;
    position: absolute;
    top: 55px;
    right: 0;
    width: 120px;
    background-color: #ffffff;
    border: 1px solid #d0d3d5;
    border-radius: 6px;
    text-align: center;
    line-height: 40px;
    font-size: 14px;
    color: #000000;
    box-shadow: 2px 2px 5px #bfc2c4;
}
.right_ttn_pop li:hover{
    background-color: #d9dcde;
    cursor: pointer;
}
.right_ttnp_out{
    display: inline-block;
    vertical-align: middle;
    width: 15px;
    height: 15px;
    background: url(../assets/img/small/loginout.png) no-repeat;
}
.right_ttnp_password{
    display: inline-block;
    vertical-align: middle;
    width: 15px;
    height: 15px;
    background: url(../assets/img/small/password.png) no-repeat;
}
.right_t_title{
    box-sizing: border-box;
    padding: 22px;
    height: 79px;
}
.right_tt_text{
    margin-bottom: 5px;
    margin-left: 10px;
    font-size: 17px;
    color: #30a891;
}
.right_tt_line{
    height: 1px;
    background-color: #adadad;
}
</style>
