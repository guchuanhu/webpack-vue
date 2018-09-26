<template>
    <div class="company">
        <div class="arow">
            <div class="search">
                <input v-model="searchData.search" type="text" class="search_input" placeholder="请输入项目名称" />
                <span class="search_icon"></span>
            </div>
            <button @click="addItem()" class="button_default">添加</button>
        </div>
        <div class="arow">
            <selectcom @selectaction="selectgetdata" :data-list="storeData.list" />
            <selectcom @selectaction="selectgetdata" :data-list="storeData.listtwo" />
            <button @click="search()" class="button_search">查询</button>
        </div>
        <div class="line"></div>
        <table class="table_default">
            <tr>
                <td>序号</td>
                <td>项目名称</td>
                <td>公司名称</td>

                <td>项目备注</td>
                <td>是否启用</td>
                <td>添加时间</td>
                <td>操作</td>
            </tr>
            <tr v-for="item in tableData" :key="item.id">
                <td>{{item.id}}</td>
                <td>{{item.name}}</td>
                <td>{{item.company_id}}</td>

                <td>{{item.description}}</td>
                <td>{{item.status}}</td>
                <td>{{item.create_time}}</td>
                <td>
                    <button class="button_little">修改</button>
                    <button @click="deleteItem(item.id)" class="button_little_delete">删除</button>
                </td>
            </tr>
        </table>
        <div class="arow">
            <pagecom @pageAction="pageAction" :data-total="page.totalNum" />
        </div>
        
    </div>
</template>

<script>

import server from '../../publicMethod/server';
import selectcom from '../../component/selectcom.vue';
import pagecom from '../../component/pagecom.vue';

export default {
  name: 'company',
  data () {
    return {
        page: {
            totalNum: 0,
            curentPage: 0,
            limit: 0,
        },
        searchData: {
            search: '',
            status: '',
            company_id: 0,
        },
        storeData: {
            list: {
                selectId: "status",
                current: {
                    name: "是否启用",
                    id: false
                },
                menu: [
                    {
                        name: "不启用",
                        id: 2
                    },
                    {
                        name: "启用",
                        id: 1
                    }
                ]
            },
            listtwo: {
                selectId: "company_id",
                current: {
                    name: "请选择公司",
                    id: false
                },
                menu: []
            }
        },
        tableData: [
            {
                id: 1,
                name: "公司字",
                people: "哈士奇"
            },
            {
                id: 2,
                name: "公司名",
                people: "哈奇"
            }
        ]
    }
  },
  components: {
      selectcom,
      pagecom
  },
  created(){
        this.search();

        let that = this;
        server({//获取公司信息
            url:'/admin/company/getCompanyKV',
            method: "get",
            data:{}
        }).then(function (res) {
            if(res.code === 200){
                for(let i in res.data.data){
                    that.storeData.listtwo.menu.push({
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
        pageAction(data){//接收分页组件的参数
            console.log(data);
            this.page.curentPage = data.curentPage;
            this.page.limit = data.limit;
            this.search();
        },
        selectgetdata(data){
            console.log(data);
            if(data.selectId === 'status'){
                this.searchData.status = data.id;
            }
            if(data.selectId === 'company_id'){
                this.searchData.company_id = data.id;
            }
        },
        addItem(){
            this.$router.push('/company/add');
        },
        search(toPage){
            let that = this;
            
            server({
                url:'/admin/project/get',
                method: "get",
                data:{
                    p: that.page.curentPage,//当前页
                    pageSize: that.page.limit,//每页展示数

                    search: that.searchData.search,//项目名称
                    status: that.searchData.status,//是否启用
                    company_id: that.searchData.company_id,//公司名称
                }
            }).then(function (res) {
                if(res.code === 200){
                    that.tableData = res.data[0].data;//展示列表
                    
                    that.page.totalNum = res.data[0].total;//保存列表总条数
                }
            })
            .catch(function (error) {
                console.log(error);
            });
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
.table_default{
    width: 100%;
    margin-bottom: 70px;
    font-size: 15px;
    border-top: 1px solid #16a085;
    border-left: 1px solid #16a085;
}
.table_default td{
    padding: 12px 10px;
    text-align: center;
    border-bottom: 1px solid #16a085;
    border-right: 1px solid #16a085;
}
</style>
