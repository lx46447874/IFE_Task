/**
 * @Author : Ice
 * @Date : 2016-04-13
 */

/**
 * 单例模式，记录所有选项是否正确
 */
var flag = {
    correct : [],
};

/**
 * 验证用户名
 */
function validate_required()
{
    var field = document.querySelector("#input-name");
    var alertText = document.querySelector("#alert1");
    //验证 "必填，长度为4-16个字符"
    var charSum = field.value.replace(/[^x00-xff]/g,"aa").split("").length;
    console.log(charSum);
    if (field.value==null||field.value=="")
    {
        alertText.innerHTML = "输入不可为空";
        alertText.className = "alert_wrong";
    }
    else if(charSum<4||charSum>16){
        alertText.innerHTML = "长度 应为4-16个字符，当前字符数为 "+charSum;
        alertText.className = "alert_wrong";
        document.querySelector("#input-name").className = "alert_wrong";
        flag.correct[0] = false;
    }
    else {
        alertText.innerHTML = "输入正确";
        alertText.className = "alert_correct";
        document.querySelector("#input-name").className = "alert_correct";
        flag.correct[0] = true;
    }
}
/**
 * 验证第一次输入的密码
 */
function validate_secret(){
    console.log("验证第一次输入的密码");
    document.querySelector("#input-secret").className = "alert_correct";
    document.querySelector("#alert2").innerHTML = "密码可用";
    document.querySelector("#alert2").className = "alert_correct";
    flag.correct[1] = true;
}
/**
 * 验证第二次输入的密码
 */
function validate_secret_confirm(){
    console.log("验证第二次输入的密码");
    var source = document.querySelector("#input-secret");
    var dest = document.querySelector("#input-secret-confirm");
    if(dest.value == source.value){
        dest.className = "alert_correct";
        document.querySelector("#alert3").innerHTML = "密码输入一致";
        document.querySelector("#alert3").className = "alert_correct";
        flag.correct[2] = true;
    }
    else{
        dest.className = "alert_wrong";
        document.querySelector("#alert3").innerHTML = "密码输入不一致，请重新输入";
        document.querySelector("#alert3").className = "alert_wrong";
        flag.correct[2] = false;
    }
}
/**
 * 验证邮箱
 */
function validate_mail(){
    console.log("验证邮箱");
    var field = document.querySelector("#input-mail");
    var apos = field.value.indexOf("@");
    var dotpos = field.value.lastIndexOf(".");
    if(apos<1 || dotpos-apos<2){
        //邮箱格式非法
        field.className = "alert_wrong"
        document.querySelector("#alert4").innerHTML = "邮箱格式非法";
        document.querySelector("#alert4").className = "alert_wrong";
        flag.correct[3] = false;
    }
    else{
        field.className = "alert_correct";
        document.querySelector("#alert4").innerHTML = "邮箱可用";
        document.querySelector("#alert4").className = "alert_correct";
        flag.correct[3] = true;
    }

}
/**
 * 验证手机号
 */
function validate_phone(){
    console.log("验证手机号");
    var field = document.querySelector("#input-phone");
    if(/^\d{11}$/.test(field.value)){
        field.className = "alert_correct";
        document.querySelector("#alert5").innerHTML = "手机号码可用";
        document.querySelector("#alert5").className = "alert_correct";
        flag.correct[4] = true;
    }
    else{
        field.className = "alert_wrong"
        document.querySelector("#alert5").innerHTML = "手机格式非法";
        document.querySelector("#alert5").className = "alert_wrong";
        flag.correct[4] = false;
    }
}
function mysubmit(){
    for(var i=0; i<flag.correct.length; i++){
        if(flag.correct[i]==false){
            alert("提交失败");
            return;
        }
    }
    alert("提交成功");
}
function initButton(){
    var btnList = document.querySelectorAll(".btn");
    btnList[0].addEventListener("click",mysubmit);
}
/**
 * 获得焦点时显示提示
 */
function myfocus(){
    var e = event.target;
    console.log(e.nodeName);
    var tip = e.parentNode.parentNode.nextElementSibling.children[1].children[0];
    if(tip){
        tip.style.visibility = "visible";
    }
}
/**
 * 失去焦点时进行验证
 */
function myblur(){
    var e = event.target;
    var eventId = e.id;
    switch(eventId){
        case "input-name":
            validate_required();
            break;
        case "input-secret":
            validate_secret();
            break;
        case "input-secret-confirm":
            validate_secret_confirm();
            break;
        case "input-mail":
            validate_mail();
            break;
        case "input-phone":
            validate_phone();
            break;
    }
}
function initMouse(){
    var inputList = document.querySelectorAll("input");
    for(var i=0; i<inputList.length; i++){
        inputList[i].addEventListener("focus",myfocus);
        inputList[i].addEventListener("blur",myblur);
    }
}

initButton();
initMouse();