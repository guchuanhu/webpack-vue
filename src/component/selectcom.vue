<template>
    <div class="select" :class="cssModule">
        <div @click="menudisplay" class="select_input">
            <span>{{current.name}}</span>
        </div>
        <span @click="menudisplay" :class="menushow?'select_iconup':'select_icondown'"></span>
        <ul v-show="menushow" class="select_menu">
            <li @click="menuclick(item.id,item.name)" v-for="item in menu" :key="item.id" class="select_m_li">{{item.name}}</li>
        </ul>
        <div v-show="menushow" @click="menudisplay" class="select_mask"></div>
    </div>
</template>

<script>
export default {
    name: 'selectcom',
    props:["data-list"],
    data () {
        return {
            menushow: false,
            current: this.dataList.current,
            menu: this.dataList.menu,
            cssModule: this.dataList.selectModules
        }
    },
    mounted(){
        console.log(this)
    },
    methods: {
        menudisplay(e){
            this.menushow = !this.menushow;
        },
        menuclick(id,name){
            this.current = {//改变当前选中值
                name: name,
                id: id
            };
            this.$emit('selectaction', {
                selectId: this.dataList.selectId,
                id: this.current.id
            });
            this.menudisplay();
        }
    }
}
</script>

<style scoped>
.select{
    display: inline-block;
    position: relative;
    margin-right: 20px;
}
.select_input{
    position: relative;
    z-index: 2;
    box-sizing: border-box;
    padding: 0 14px;
    width: 240px;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    color: #16a085;
    background-color: #eff3f3;
    border: 1px solid #16a085;
    border-radius: 2px;
}
.select_iconup{
    position: absolute;
    z-index: 2;
    top: 9px;
    right: 14px;
    width: 16px;
    height: 16px;
    background: url(../assets/img/small/selectup.png) no-repeat center;
    cursor: pointer;
}
.select_icondown{
    position: absolute;
    z-index: 2;
    top: 9px;
    right: 14px;
    width: 16px;
    height: 16px;
    background: url(../assets/img/small/selectdown.png) no-repeat center;
    cursor: pointer;
}
.select_menu{
    position: absolute;
    z-index: 3;
    width: 100%;
}
.select_mask{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
}
.select_m_li{
    box-sizing: border-box;
    padding: 0 14px;
    line-height: 32px;
    font-size: 14px;
    color: #000000;
    background-color: white;
}
.select_m_li:hover{
    color: white;
    background-color: #16a085;
    cursor: pointer;
}
/* 翻页插件专用star */
.select_page{
    margin-right: 0;
}
.select_page .select_input{
    width: 70px;
    height: 25px;
    padding-left: 12px;
    line-height: 25px;
}
.select_page .select_icondown,.select_page .select_iconup{
    top: 5px;
}
/* 翻页插件专用end */
/* 反色专用star */
.select_reverse{
    margin-right: 0;
}
.select_reverse .select_input{
    color: #eff3f3;
    background-color: #16a085;
    border: 1px solid #eff3f3;
}
.select_reverse .select_iconup{
    background: url(../assets/img/small/selectupwhite.png) no-repeat center;
}
.select_reverse .select_icondown{
    background: url(../assets/img/small/selectdownwhite.png) no-repeat center;
}
/* 反色专用end */

</style>
