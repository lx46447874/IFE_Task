/**
 * @Author : Ice
 * @Date : 2016-05-08
 */

/**
 * 表单工厂
 */
function FormFactory(label,type,validator,rules,success,fail){
    //表单标签、表单类型、表单验证规则、填写规则提示、验证通过提示、验证失败提示
    /*个人认为在工厂里写success和fail的提示不好，应写在验证规则中，因为失败提示
      如果唯一则无法针对不同情况给出具体的失败提示。因此，本程序将success和fail
      提示写在验证规则中，工厂中的success和fail并没有使用。
     */
    this.label = label;
    this.type = type;
    this.validator = validator;
    this.rules = rules;
    this.success = success;
    this.fail = fail;
};
/**
 * 根据选项生成表单
 */
function createForm(){
    var checkboxList = document.querySelectorAll(".checkbox");
    var str="";
    for(var i=0; i<checkboxList.length; i++){
        var item = checkboxList[i];
        if(item.checked){
            switch (item.name){
                case "label":
                    //创建条目
                    var inputName = new FormFactory("name","text",check.checkName,"长度应为4-16个字符","名称可用","名称不可用");
                    str += createItem(inputName);
                    break;
                case "password":
                    var inputPassWord = new FormFactory("password","password",check.checkPassWord,"密码不可为空","密码可用","密码不可用");
                    str += createItem(inputPassWord);
                    var inputPassWordAgain = new FormFactory("passwordAgain","password",check.checkPassWordAgain,"请再次输入密码","密码可用","输入不一致");
                    str += createItem(inputPassWordAgain);
                    break;
                case "email":
                    var inputEmail = new FormFactory("email","text",check.checkEmail,"请输入邮箱","邮箱可用","邮箱格式错误");
                    str += createItem(inputEmail);
                    break;
                case "phone":
                    var inputPhone = new FormFactory("phone","text",check.checkPhone,"请输入电话号码","电话号码可用","电话号码不可用");
                    str += createItem(inputPhone);
                    break;
            }
        }
    }
    str += "<tr><td></td><td><button id='btn-submit'>提交</button></td></tr>";
    var myform = document.querySelector("#myform");
    myform.innerHTML = "<table>"+str+"</table>";
    //添加focus事件 和 blur事件
    var EleFormName = document.querySelector("#form-name");
    var EleFormPassword = document.querySelector("#form-password");
    var EleFormPasswordAgain = document.querySelector("#form-passwordAgain");
    var EleFormEmail = document.querySelector("#form-email");
    var EleFormPhone = document.querySelector("#form-phone");
    if(EleFormName){
        EleFormName.addEventListener("focus",function(){
            EleFormName.nextSibling.className="";
            EleFormName.nextSibling.innerHTML = inputName.rules;
        });
        EleFormName.addEventListener("blur",check.checkName);
    }
    if(EleFormPassword){
        EleFormPassword.addEventListener("focus",function(){
            EleFormPassword.nextSibling.className="";
            EleFormPassword.nextSibling.innerHTML = inputPassWord.rules;
        });
        EleFormPassword.addEventListener("blur",check.checkPassWord);
    }
    if(EleFormPasswordAgain){
        EleFormPasswordAgain.addEventListener("focus",function(){
            EleFormPasswordAgain.nextSibling.className="";
            EleFormPasswordAgain.nextSibling.innerHTML = inputPassWordAgain.rules;
        });
        EleFormPasswordAgain.addEventListener("blur",check.checkPassWordAgain);
    }
    if(EleFormEmail){
        EleFormEmail.addEventListener("focus",function(){
            EleFormEmail.nextSibling.className="";
            EleFormEmail.nextSibling.innerHTML = inputEmail.rules;
        });
        EleFormEmail.addEventListener("blur",check.checkEmail);
    }
    if(EleFormPhone){
        EleFormPhone.addEventListener("focus",function(){
            EleFormPhone.nextSibling.className="";
            EleFormPhone.nextSibling.innerHTML = inputPhone.rules;
        });
        EleFormPhone.addEventListener("blur",check.checkPhone);
    }
    //表单创建完成后再给提交按钮添加事件
    document.querySelector("#btn-submit").addEventListener("click",check.checkSubmit);
}
/**
 * 生成表单条目格式字符串 obj是表单工厂的实例
 */
function createItem(obj){
    var labelMap={
        "name":"名称",
        "password":"密码",
        "passwordAgain":"确认密码",
        "email":"邮箱",
        "phone":"电话"
    };
    return "<tr><td><label for='form-"+obj.label+"'>"+labelMap[obj.label]+"</label></td>" +
        "<td><input type="+obj.type+" id='form-"+obj.label+"'><span></span></td></tr>";
}
/**
 * 单例模式，记录所有选项是否正确
 */
var flag = {
    correct : []
};
/**
 * 校验规则
 */
var check = {
    checkName : function(){
        var field = document.querySelector("#form-name");
        var alertText = document.querySelector("#form-name").nextSibling;
        //验证 "必填，长度为4-16个字符"
        var charSum = field.value.replace(/[^x00-xff]/g,"aa").split("").length;
        console.log(charSum);
        if (field.value==null||field.value=="")
        {
            alertText.innerHTML = "输入不可为空";
            alertText.className = "alert_wrong";
        }
        else if(charSum<4||charSum>16){
            alertText.innerHTML = "长度应为4-16个字符,当前字符数为"+charSum;
            alertText.className = "alert_wrong";
            document.querySelector("#form-name").className = "alert_wrong";
            flag.correct[0] = false;
        }
        else {
            alertText.innerHTML = "输入正确";
            alertText.className = "alert_correct";
            document.querySelector("#form-name").className = "alert_correct";
            flag.correct[0] = true;
        }
    },
    checkPassWord : function(){
        var field = document.querySelector("#form-password");
        var alertText = document.querySelector("#form-password").nextSibling;
        if(field.value==""){
            alertText.innerHTML = "密码不可为空";
            alertText.className = "alert_wrong";
            field.className = "alert_wrong";
            flag.correct[1] = false;
        }
        else{
            alertText.innerHTML = "密码可用";
            alertText.className = "alert_correct";
            field.className = "alert_correct";
            flag.correct[1] = true;
        }
    },
    checkPassWordAgain : function(){
        var source = document.querySelector("#form-password");
        var dest = document.querySelector("#form-passwordAgain");
        var alertText = dest.nextSibling;
        if(dest.value == ""){
            dest.className = "alert_wrong";
            alertText.innerHTML = "密码不可为空";
            alertText.className = "alert_wrong";
        }
        else if(dest.value == source.value){
            dest.className = "alert_correct";
            alertText.innerHTML = "密码输入一致";
            alertText.className = "alert_correct";
            flag.correct[2] = true;
        }
        else{
            dest.className = "alert_wrong";
            alertText.innerHTML = "密码输入不一致，请重新输入";
            alertText.className = "alert_wrong";
            flag.correct[2] = false;
        }
    },
    checkEmail : function(){
        var field = document.querySelector("#form-email");
        var alertText = field.nextSibling;
        var apos = field.value.indexOf("@");
        var dotpos = field.value.lastIndexOf(".");
        if(apos<1 || dotpos-apos<2){
            //邮箱格式非法
            field.className = "alert_wrong";
            alertText.innerHTML = "邮箱格式非法";
            alertText.className = "alert_wrong";
            flag.correct[3] = false;
        }
        else{
            field.className = "alert_correct";
            alertText.innerHTML = "邮箱可用";
            alertText.className = "alert_correct";
            flag.correct[3] = true;
        }
    },
    checkPhone : function(){
        var field = document.querySelector("#form-phone");
        var alertText = field.nextSibling;
        if(/^\d{11}$/.test(field.value)){
            field.className = "alert_correct";
            alertText.innerHTML = "手机号码可用";
            alertText.className = "alert_correct";
            flag.correct[4] = true;
        }
        else{
            field.className = "alert_wrong";
            alertText.innerHTML = "手机格式非法";
            alertText.className = "alert_wrong";
            flag.correct[4] = false;
        }
    },
    checkSubmit : function(){
        //未赋值的correct[i]的值为 undefined
        console.log("1111");
        for(var i=0; i<flag.correct.length; i++){
            if(flag.correct[i]==false){
                alert("提交失败");
                return;
            }
        }
        alert("提交成功");
    }
};
/**
 * 给"生成表单"按钮绑定事件
 */
function init(){
    document.querySelector("#btn-create").addEventListener("click",createForm);
}
init();
