<template>
    <div class="login">
        <div class="login_box">
            <p class="login_box_p">修狗</p>
            <div class="login_box_content">
                <p class="login_bc_title">欢迎登录修狗</p>
                <p class="login_bc_ipt">
                    <span class="login_bci_title">账号：</span>
                    <input v-model="account" class="login_bci_input" type="text" />
                </p>
                <p class="login_bc_ipt">
                    <span class="login_bci_title">密码：</span>
                    <input v-model="password" class="login_bci_input" type="password" />
                </p>
                <p class="login_bc_m">
                    <span class="login_bcm_password">忘记密码</span>
                </p>
                <p class="login_bc_b">
                    <button @click="submit" class="login_bcb_button">登录</button>
                </p>
                <p class="login_bc_error">
                    {{msg}}
                </p>
                <p class="login_bc_choice">
                    <span class="login_bcc_name login_bccn_left login_bccn_item">内部登录</span>
                    <span class="login_bcc_name">合作商登录</span>
                    <span class="login_bcc_name login_bccn_right">网点登录</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>

import Vue from '../../assets/js/vue.js';
import server from '../../publicMethod/server';
import {setCookie} from '../../publicMethod/cookie';

export default {
  name: 'login',
  data () {
    return {
      account: 'zth',
      password: 123456,
      project_id: 1,
      org_id: 1,
      msg: null
    }
  },
  created(){

  },
  methods: {
        submit(e){
            let config = 
            {
                user_id : this.account,
                password : this.password,
                project_id : this.project_id,
                org_id : this.org_id
            };
            let that = this;
            server({
                url:'/admin/login/login',
                method: "post",
                data:config
            }).then(function (res) {
                if(res.code === 200){
                    let userinfo = {//匹配用户信息和token
                        user_id: res.data.userinfo.user_id,
                        project_id: res.data.userinfo.project_id,
                        org_id: res.data.userinfo.org_id,
                        user_id: res.data.userinfo.user_id,
                        name: res.data.userinfo.name,
                        token: res.data.token
                    };
                    setCookie('save object', userinfo);
                    that.$router.push('/project');
                }else{
                    that.msg = res.msg;
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
.login{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(../../assets/img/login_in.png) no-repeat center;
    background-size: cover;
}
.login_box{
    box-sizing: border-box;
    padding: 0 25px;
    position: relative;
    width: 340px;
    height: 425px;
    margin: auto;
    margin-top: 300px;
    background-color: #7ad8ff;
    border-radius: 10px;
    overflow: hidden;
}
.login_box::after{
    content: "";
    display: inline-block;
    position: absolute;
    width: 1000px;
    height: 1000px;
    background-color: white;
    border-radius: 50%;
    top: 72px;
    left: -330px;
}
.login_box_p{
    line-height: 72px;
    font-size: 30px;
    text-align: center;
    font-weight: bold;
}
.login_box_content{
    position: relative;
    z-index: 1;
}
.login_bc_title{
    font-size: 17px;
    line-height: 50px;
    text-align: center;
    margin-top: 25px;
    font-weight: bold;
}
.login_bc_ipt{
    text-align: center;
    margin-top: 20px;
    position: relative;
}
.login_bci_title{
    display: inline-block;
    position: absolute;
    top: 0;
    left: 11px;
    width: 66px;
    line-height: 32px;
    text-align: center;
    color: #c8c8c8;
    font-size: 18px;
}
.login_bci_input{
    box-sizing: border-box;
    width: 100%;
    height: 32px;
    border: 1px solid #c8c8c8;
    border-radius: 16px;
    padding-left: 66px;
}
.login_bc_m{
    text-align: right;
    margin-top: 25px;
}
.login_bcm_password{
    display: inline-block;
    font-size: 15px;
    color: #c8c8c8;
    line-height: 35px;
    cursor: pointer;
}
.login_bc_b{
    text-align: center;
}
.login_bcb_button{
    width: 166px;
    line-height: 32px;
    font-size: 20px;
    color: white;
    background-color: #7ad8ff;
    border: 0;
    border-radius: 15px;
    cursor: pointer;
}
.login_bc_error{
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #ff4c4c;
    font-size: 12px;
    font-weight: bold;
}
.login_bc_choice{
    text-align: center;
}
.login_bcc_name{
    font-size: 15px;
    color: #c8c8c8;
    line-height: 35px;
    cursor: pointer;
}
.login_bccn_left{
    float: left;
}
.login_bccn_right{
    float: right;
}
.login_bccn_item{
    color: #2899f7;
    text-decoration: underline;
}
</style>
