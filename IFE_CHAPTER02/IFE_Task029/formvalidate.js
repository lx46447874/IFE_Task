/**
 * @Author : Ice
 * @Date : 2016-04-11
 */
function validate_required()
{
    var field = document.getElementsByName("test1")[0];
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
        alertText.innerHTML = "长度应为4-16个字符，当前字符数为 "+charSum;
        alertText.className = "alert_wrong";
        document.querySelector("#input-name").className = "alert_wrong";
    }
    else {
        alertText.innerHTML = "输入正确";
        alertText.className = "alert_correct";
        document.querySelector("#input-name").className = "alert_correct";
    }
}

function initButton(){
    var btnList = document.querySelectorAll(".btn");
    btnList[0].addEventListener("click",validate_required);
}
initButton();