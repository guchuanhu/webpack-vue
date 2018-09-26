<template>
    <div class="select">
        <div class="page_number">
            <span>每页显示</span>
            <selectcom @selectaction="selectgetdata" :data-list="storeData.page" />
            <span>数据</span>
        </div>
        <div class="page_change">
            <button @click="search(1)" class="page_c_button">首页</button>
            <button @click="search(page.curentPage-1)" class="page_c_button">上一页</button>
            <button @click="search(page.curentPage-1)" v-if="page.curentPage-1>0" class="page_c_button">{{page.curentPage-1}}</button>
            <button class="page_c_button page_c_button_choice">{{page.curentPage}}</button>
            <button @click="search(page.curentPage+1)" v-if="page.curentPage+1<=page.totalPage" class="page_c_button">{{page.curentPage+1}}</button>
            <button @click="search(page.curentPage+1)" class="page_c_button">下一页</button>
            <button @click="search(page.totalPage)" class="page_c_button">尾页</button>
        </div>
    </div>
</template>

<script>

import server from '../publicMethod/server';
import selectcom from '../component/selectcom.vue';

export default {
    name: 'pagecom',
    props:["data-total"],
    data () {
        let that = this;
        return {
            page: {
                curentPage: 1,
                totalPage: 1,
                limit: 10,
                totalNum: that.dataTotal//计算使用
            },
            storeData: {
                page: {
                    selectId: "limit",
                    selectModules: 'select_page',//更换为页面选择器样式
                    current: {
                        name: 10,
                        id: 10
                    },
                    menu: [
                        {
                            name: 10,
                            id: 10
                        },
                        {
                            name: 20,
                            id: 20
                        },
                        {
                            name: 30,
                            id: 30
                        }
                    ]
                }
            }
        }
    },
    components: {
        selectcom
    },
    created(){

    },
    watch: {
        dataTotal(n,o){//总数变化之后触发
            this.page.totalPage = Math.ceil(this.dataTotal/this.page.limit);
            this.page.totalNum = this.dataTotal;
        }
    },
    methods: {
        selectgetdata(data){
            if(data.selectId === 'limit'){//展示条数选择
                this.page.limit = data.id;
                this.page.totalPage = Math.ceil(this.dataTotal/this.page.limit);
                this.page.totalNum = this.dataTotal;
                this.search(1);
            }
        },
        search(toPage){
            if(typeof toPage === 'number'){
                if(toPage>this.page.totalPage || toPage<1){
                    console.log('超出页码范围');
                    return false;
                }
            }
            this.page.curentPage = toPage;
            this.$emit('pageAction', {
                curentPage: toPage,
                limit: this.page.limit,
            });
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page_number{
    font-size: 15px;
    color: #202020;
    line-height: 40px;
    display: inline-block;
}
.page_n_choice{
    position: relative;
    box-sizing: border-box;
    display: inline-block;
    width: 70px;
    height: 25px;
    padding-left: 12px;
    line-height: 25px;
    border: 1px solid #16a085;
    border-radius: 2px;
    color:#16a085;
    background-color: #eff3f3;
}
.page_nc_icon{
    position: absolute;    
    top: 4px;
    right: 12px;
    width: 16px;
    height: 16px;
    background: url(../assets/img/small/selectdown.png) no-repeat center;
}
.page_c_button{
    box-sizing: border-box;
    height: 32px;
    padding: 0 12px;
    border: 1px solid #b3b3b3;
    color: #b3b3b3;
    background-color: #eff3f3;
    border-radius: 2px;
}
.page_c_button_choice{
    border: 1px solid #16a085;
    color: #ffffff;
    background-color: #16a085;
}
.page_change{
    float: right;
    margin-top: 6px;
}
</style>
