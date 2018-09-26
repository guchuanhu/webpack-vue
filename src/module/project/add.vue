<template>
    <div class="company_add">
        <div class="info clearfix">
            <div class="arow">
                <div class="info_left">
                    <span class="info_left_title"><span class="info_lt_red">*</span>项目名称：</span>
                    <selectcom @selectaction="selectgetdata" :data-list="storeData.list" />
                </div>
            </div>
            <div class="arow">
                <div class="info_left">
                    <span class="info_left_title"><span class="info_lt_red">*</span>项目名称：</span>
                    <selectcom @selectaction="selectgetdata" :data-list="storeData.list" />
                </div>
            </div>
        </div>
        <div class="line"></div>
        
        <div class="arow">
            <button @click="search()" class="button_search">查询</button>
        </div>
        
    </div>
</template>

<script>

import server from '../../publicMethod/server';
import selectcom from '../../component/selectcom.vue';

export default {
  name: 'company',
  data () {
    return {
        searchData: {
            search: '',
            status: '',
            company_id: 0,
        },
        page: {
            curentPage: 1,
            totalPage: 1,
            limit: 10,
            totalNum: 0//计算使用
        },
        storeData: {
            list: {
                selectId: "company_id",
                selectModules: 'select_reverse',
                current: {
                    name: "请选择公司",
                    id: false
                },
                menu: []
            }
        }
    }
  },
  components: {
      selectcom
  },
  created(){

        let that = this;
        server({//获取公司信息
            url:'/admin/company/getCompanyKV',
            method: "get",
            data:{}
        }).then(function (res) {
            if(res.code === 200){
                for(let i in res.data.data){
                    that.storeData.list.menu.push({
                        name: res.data.data[i],
                        id: i
                    });
                }
            }
        })
        .catch(function (error) {
            console.log(error);
        });
  },
  methods: {
        selectgetdata(data){
            console.log(data);
            if(data.selectId === 'limit'){//展示条数选择
                this.page.limit = data.id;
                if(this.page.curentPage > Math.ceil(this.page.totalNum/this.page.limit)){
                    this.search(Math.ceil(this.page.totalNum/this.page.limit));
                }else{
                    this.search();
                }
            }
            if(data.selectId === 'status'){
                this.searchData.status = data.id;
            }
            if(data.selectId === 'company_id'){
                this.searchData.company_id = data.id;
            }
        },
        deleteItem(itemId){
            let that = this;
            server({
                url:'/admin/project/delItem',
                method: "post",
                data:{
                    id: itemId
                }
            }).then(function (res) {
                if(res.code === 200){
                    that.search();
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
.info{
    margin-bottom: 15px;
    padding: 45px 0;
    background-color: #16a085;
    color: white;
    border-radius: 4px;
}
.info_left{
    width: 360px;
    margin: auto;
}
.info_left_title{
    font-size: 18px;
    line-height: 32px;
}
.info_lt_red{
    color: #ef2336;
}
.arow{
    margin-bottom: 20px;
}
.search{
    display: inline-block;
    position: relative;
    margin-right: 20px;
}
.search_input{
    box-sizing: border-box;
    padding: 0 14px;
    width: 285px;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    color: #808e9c;
    background-color: #d9dcde;
    border: 0;
    border-radius: 2px;
}
.search_icon{
    position: absolute;
    top: 9px;
    right: 14px;
    width: 16px;
    height: 16px;
    background: url(../../assets/img/small/search.png) no-repeat center;
}



.button_default{
    float: right;
    box-sizing: border-box;
    width: 74px;
    height: 32px;
    border: 1px solid #16a085;
    background-color: #eff3f3;
    border-radius: 2px;
    color: #16a085;
    font-size: 14px;
}
.button_search{
    float: right;
    box-sizing: border-box;
    width: 74px;
    height: 32px;
    border: 0px;
    background-color: #16a085;
    border-radius: 2px;
    color: white;
    font-size: 14px;
}
.button_little{
    box-sizing: border-box;
    width: 50px;
    height: 20px;
    border: 0;
    background-color: #16a085;
    border-radius: 2px;
    color: #f4f9f8;
    font-size: 14px;
}
.button_little_delete{
    box-sizing: border-box;
    width: 50px;
    height: 20px;
    border: 0;
    background-color: #ff4444;
    border-radius: 2px;
    color: #f4f9f8;
    font-size: 14px;
}
.line{
    height: 1px;
    background-color: #16a085;
    margin-bottom: 20px;
}
</style>
