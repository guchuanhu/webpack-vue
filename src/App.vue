<template>

  <div id="app">
        <div v-if="menuShow" class="left">
            <div class="logo">
                <img class="logo_img" :src="img.logo" />
                <div class="logo_head">
                    <img class="logo_h_img" :src="img.head" />
                    <div class="logo_h_text">
                        <p>欢迎登录修狗</p>
                        <p>{{name}}</p>
                    </div>
                </div>
            </div>
            <menu-component></menu-component>
        </div>
        <div class="right">
            <topnav />
            <div class="right_page">
                <div class="right_page_content">
                    <div class="right_pc_page">
                        <router-view/>
                    </div>
                </div>
            </div>
        </div>
    
    
  </div>
</template>

<script>

import menuComponent from './component/menu.vue';
import topnav from './component/topnav.vue';
import {getCookie} from './publicMethod/cookie';


export default {
  name: 'App',
  data(){
      return {//初始化菜单显隐\
            menuShow: this.$route.name==="login"?false:true,
            img: {
                    logo: require('./assets/img/small/logo.png'),
                    head: require('./assets/img/small/head.png'),
            },
            name: getCookie('name')
      }
  },
  watch: {
    '$route' (to, from) {//监控路由变化
        if(to.name === "login"){//控制菜单显隐
            this.hideMenu();
        }else{
            this.showMenu();
        }
        if(from.name === "login"){//获取用户姓名
            this.name = getCookie('name');
        }
    }
  },
  methods: {
      hideMenu(){
          this.menuShow =false;
      },
      showMenu(){
          this.menuShow =true;
      }
  },
  created(){

    console.log(this.$router.currentRoute.name);
      
  },
  components: {
      menuComponent,
      topnav
  }
}
</script>


<style scope>
#app{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
}
.logo{
    position: absolute;
    left: 0;
    top: 0;
}
.left{
    position: absolute;
    z-index: 1;
    width: 263px;
    height: 100%;
    padding-top: 250px;
    box-sizing: border-box;
    background-color: #23272b;
}
.right{
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: 100%;
    padding-left: 263px;
    background-color: #d9dcde;
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
.logo_img{
    margin-top: 30px;
    margin-left: 60px;
    width: 120px;
}
.logo_head{
    padding: 35px 0;
    margin-top: 31px;
    background-color: #292d30;
}
.logo_h_img{
    width: 72px;
    margin-left: 30px;
}
.logo_h_text{
    float: right;
    width: 160px;
    text-align: center;
    line-height: 30px;
    padding-top: 15px;
    font-size: 17px;
    color: #d5d9d9;
}
</style>
