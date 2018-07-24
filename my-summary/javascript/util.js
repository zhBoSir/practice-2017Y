/** 
 * 校验时间格式 
 */  
function checkTime(timevale) {  
    var regex = /^(([0-1][0-9])|([2][0-4]))(\:)[0-5][0-9](\:)[0-5][0-9]$/g;  
    var b = regex.test(timevale);  
    return b;  
}  

/** 
 * 由秒数转化成hh:mm:ss格式 
 */  
function timeTohhmmss(seconds){  
    var hh;  
    var mm;  
    var ss;  
    if(seconds==null || seconds<0){  
        return;  
    }  
    var pseconds = parseInt(seconds);  
    //得到小时  
    hh = pseconds/3600|0;  
    pseconds = parseInt(pseconds)-parseInt(hh)*3600;  
    if(parseInt(hh)<10){  
        hh="0"+hh;  
    }  
    if(parseInt(hh)>=24){  
        hh="00";  
    }  
    //得到分钟  
    mm = parseInt(pseconds)/60|0;  
    //得到秒  
    ss = parseInt(pseconds)-parseInt(mm)*60;  
    if(parseInt(mm)<10){  
        mm = "0"+mm;  
    }  
    if(parseInt(ss)<10){  
        ss = "0"+ss;  
    }  
    return hh+":"+mm+":"+ss;  
} 

/** 
 * 验证是否为座机电话号码
 */  
function isTelephone(source) {  
    var regex = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/  
    return regex.test(source); 
}

/** 
 * 验证是否为手机号码
 */  
function isMobile(source) {  
    var regex = /^((13|14|15|17|18)[0-9]{1}\d{8})$/;  
    return regex.test(source); 
}

/** 
 * 手机号码格式化(格式化后显示成4位一个空格隔开)
 * source是一个手机号字符串
 */ 
function formatMobile(source) {
    var val = source.replace(/\B(?=(?:\d{4})+$)/g, ' ')
    return val;
}

/** 
 * 获取今天是 ****年**月**日 星期几 
 */  
function getTodayDate(){  
    var now = new Date();  
    var yy = now.getFullYear();  
    var mm = now.getMonth()+1;  
    var dd=now.getDate();  
    var day = new Array();  
    day[0] = "星期日";  
    day[1] = "星期一";  
    day[2] = "星期二";  
    day[3] = "星期三";  
    day[4] = "星期四";  
    day[5] = "星期五";  
    day[6] = "星期六";  
    return( yy + '年' + mm + '月'+ dd +'日 '+day[now.getDay()]);  
}

/** 
 * 时间戳转成时间 
 */  
function timestampTotime(time){  
    var datetime = new Date();  
    datetime.setTime(time);  
    var year = datetime.getFullYear();  
    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;  
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();  
    var hour = datetime.getHours()< 10 ? "0" + datetime.getHours() : datetime.getHours();  
    var minute = datetime.getMinutes()< 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();  
    var second = datetime.getSeconds()< 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();  
    return year + "-" + month + "-" + date+" "+hour+":"+minute+":"+second;  
}

/** 
 * 把当前时间转成时间戳(总毫秒数) 
 */  
function timeTotimestamp(){  
    var datetime = new Date();
    // 第一种方法：
    return datetime.getTime();
    // 第二种方法：
    // return datetime.valueOf();
    // 第三种方法：
    // return Date.parse(datetime);

    // 第一、第二种：会精确到毫秒   第三种：只能精确到秒，毫秒用000替代
}

/** 
 * 判断是否为空 
 */  
function isEmpty(val) {  
    if (val == undefined || val == null || val == "" || val == ''  
        || val == "undefined" || val == "null" || val == "NULL") {  
        return true;  
    }  
    return false;  
} 

/** 
 * 数字四舍五入保留两位小数，并且整数部分3为以,分隔
 */ 
 function formatCurrency(num) {
    num = num.toString().replace(/\$|\,/g,'');  
    if(isNaN(num))  
    num = "0";  
    sign = (num == (num = Math.abs(num)));  
    num = Math.floor(num*100+0.50000000001);  
    cents = num%100;  
    num = Math.floor(num/100).toString();  
    if(cents<10)
    cents = "0" + cents;  
    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)  
    num = num.substring(0,num.length-(4*i+3))+','+  
    num.substring(num.length-(4*i+3));  
    return (((sign)?'':'-') + num + '.' + cents);  
}

/**
 * 检验密码强度(提示：<正规项目中密码是由>8位以上大写、小写字母、数字及符号中的两种或以上组合)
 * 根据返回的数字来判断密码的强弱，如果为0，代表密码设置的不合格
 * sValue 密码
 */
 function checkPwdStrong(sValue) {
      let modes = 0
      // 通过前端验证的再进行验证
      // 不合格 返回0
      // 任何字符数的两类字符组合，弱， 返回值为1
      // 10位字符数以下的三类组合，中 ，返回值为2
      // 10位字符数以上的三类组合，强，返回值为3

      // 每多一种类型的密码形式，modes就加1
      if (sValue.length < 8) return modes
      if (/\d/.test(sValue)) modes++ // 数字
      if (/[a-z]/.test(sValue)) modes++ // 小写
      if (/[A-Z]/.test(sValue)) modes++ // 大写
      if (/\W/.test(sValue)) modes++ // 特殊字符

      // 逻辑处理
      switch (modes) {
        case 1:
          return 0
        case 2:
          return 1
        case 3:
          if (sValue.length < 10) {
            return 2
          } else {
            return 3
          }
        case 4:
          return 3
      }
}