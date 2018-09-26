<template>
    <ul class="menu0"><!-- 一级 -->
        <li v-for="item in lists" :key="item.id">
            <a v-if="item.url" :class="choice?'choiceClass':''" v-on:click="mychoice" v-bind:href="'#'+item.url">
                <img class="menu0-img" :src="item.img"/>
                <span class="menu0-span">
                    {{item.name}}
                </span>
            </a>
            <span v-if="!item.url">
                <a v-on:click="switchshow">
                    <img class="menu0-img" :src="item.img"/>
                    <span class="menu0-span">
                        {{item.name}}
                    </span>
                </a>
                <ul><!-- 二级 -->
                    <li v-for="item0 in item.child" :key="item0.id">
                        <a v-if="item0.url" :class="choice?'choiceClass':''" v-on:click="mychoice" v-bind:href="'#'+item0.url">
                            <span class="menu0-span">
                                {{item0.name}}
                            </span>
                        </a>
                        <span v-if="!item0.url">
                            <a v-on:click="switchshow">
                                <span class="menu0-span">
                                    {{item0.name}}
                                </span>
                            </a>
                            <ul><!-- 三级 -->
                                <li v-for="item1 in item0.child" :key="item1.id">
                                    <a v-if="item1.url" :class="choice?'choiceClass':''" v-on:click="mychoice" v-bind:href="'#'+item1.url">
                                        <span class="menu2-span">
                                            {{item1.name}}
                                        </span>
                                    </a>
                                    <span v-if="!item1.url">
                                        <a v-on:click="switchshow">
                                            <span class="menu2-span">
                                                {{item1.name}}
                                            </span>
                                        </a>
                                    </span>
                                </li>
                            </ul>
                        </span>
                    </li>
                </ul>
            </span>
        </li>
    </ul>
</template>

<script>
// import Vue from 'vue'
// import menuComponent from './menu.vue';
import server from '../publicMethod/server';

export default {
  name: 'menuComponent',
  data () {
    return {
        show: false,
        choice: false,
        lists:[
            {
                name:"首页管理",
                id:0,
                icon:"shouye",
                url:"/list",
                child:[]
            },
            {
                name:"人员管理",
                id:1,
                icon:"renyuan",
                child:[
                    {
                        name:"菜单管理",
                        id:2,
                        url:"/hanoi",
                        child:[]
                    },
                    {
                        name:"项目管理",
                        id:3,
                        child:[
                            {
                                name:"登录",
                                url:"/login",
                                id:4,
                                child:[]
                            }
                        ]
                    }
                ]
            }
        ]
    }
  },
  created(){//47.98.198.248
    this.lists.forEach((v,i,a) => {//处理一级菜单icon
        v.img = require('../assets/img/'+v.icon+'.png');
    });

    let that = this;
    server({
        url:'/admin/menu/getmenu',
        method: "post",
        data: {}
    }).then(function (res) {
        if(res.code === 200){
            that.lists = res.data;
        }
    })
    .catch(function (error) {
        console.log(error);
    });

  },
  methods: {
    switchshow(e){
        this.show = !this.show;
    },
    mychoice(){
        this.choice = true;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .choiceClass{
        color: red;
    }

.menu0{
    height: 100%;
    overflow: scroll;
    width: 263px;
    background-color: #292d30;
}
/* .menu0 li{
} */
.menu0 li a{
    display: block;
    line-height: 50px;
    height: 50px;
    cursor: pointer;
    position: relative;
}
.menu0-span{
    color: #d9dcde;
    font-size: 17px;
    height: 50px;
    display: inline-block;
    margin-left: 90px;
}
.menu2-span{
    color: #d9dcde;
    font-size: 17px;
    height: 50px;
    display: inline-block;
    margin-left: 125px;
}
.menu0-img{
    position: absolute;
    left: 50px;
    top: 13px;
}
/* .menu ul{
    list-style: none;
    text-align: center;
}
.menu ul li{
    height: 100%;
    width: 100px;
    display: inline-block;
    line-height: 100px;
    cursor: pointer;
}
.menu ul li a{
    height: 100%;
    width: 100px;
    display: inline-block;
    line-height: 100px;
    cursor: pointer;
}
.menu ul li:hover{
    background-color: #c5edf6;
    color: #4d4203;
} */

</style>
