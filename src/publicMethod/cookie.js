//获取cookie、
export function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)){
        return (arr[2]);
    }
    else{
        return null;
    }
  }


  export function getLotCookie(arr){
    let str = '';
    arr.forEach(v => {
        str +=  v + '=' + getCookie(v) + '&';
    });
    return str;
}
  
  //添加cookie
  export function setCookie (c_name, value) {
      console.log(value);
    if(typeof value === 'object'){
        for(let i in value){
            if(value.hasOwnProperty(i)){
                document.cookie = i + "=" + escape(value[i]);
            }
        }
    }else{
        document.cookie = c_name + "=" + escape(value);
    }
    
  };
  
  //删除cookie
  export function delCookie (name) {
        let cval;
        let exp = new Date();
        exp.setTime(exp.getTime() - 1);
        if(typeof name === 'string' && name.length>0){//单一删除
            cval = getCookie(name);
            if (cval != null){
                document.cookie = name + "=null"+";expires="+exp.toGMTString();
            }
        }
        if(typeof name === 'object'){//对象删除
            for(let i in name){
                cval = getCookie(i);
                if (cval != null){
                    document.cookie = i + "=null"+";expires="+exp.toGMTString();
                }
            }
        }
        
  };