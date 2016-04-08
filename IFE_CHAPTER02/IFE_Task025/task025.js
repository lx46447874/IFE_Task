/**
 * @Author : Iceberg
 * @Date : 2016-04-07
 */
/**
 * 重置节点颜色
 * 重置存储遍历结果的数组
 */
function reset(){
    var nodeList = document.querySelectorAll("span");
    for(var i=0; i<nodeList.length; i++){
        nodeList[i].style.backgroundColor = "#fff";
        nodeList[i].parentNode.style.backgroundColor = "#fff";
        nodeList[i].parentNode.classList.remove("selectTag");//移除p元素上的选中标记
    }
    dfsResult=[];
}
/**
 * 查找函数，这里使用DFS查找
 */
function find(){
    reset();
    dfs(rootNode);
    console.log("not find");
    var goal = document.querySelector("#input-box").value;
    var reg = new RegExp(goal);
    for(var i=0; i<dfsResult.length; i++){
        /*
         对nodeValue取值的解释：
         nodeValue = 第i个div孩子.第一个p元素.文本节点.文本节点值
         参考这里html结构：
         <div class="tree-node4">
         <p><span>-</span>Moment</p>
         <div class="tree-leaf"><p><span>-</span>Cat</p></div>
         </div>
         */
        var nodeValue = dfsResult[i].children[0].childNodes[1].nodeValue;
        if(reg.test(nodeValue)){
            //·········dfsResult[i].children[0].classList.add("find");
            //·········dfsResult[i].children[0].children[0].classList.add("find");
            dfsResult[i].children[0].style.background = "#0f0";//p文本染色
            dfsResult[i].children[0].children[0].style.background = "#0f0";//p内最开始的+ -标志符号染色
            //回溯，做两件事：1.显示本节点和同级兄弟节点 2.展开父节点
            for(var node=dfsResult[i], flag=true ; node ; node=node.parentNode){
                //1.显示本节点和同级兄弟节点
                if(flag){
                    for(var j=0, nodeBro=node.parentNode.children; j<nodeBro.length; j++){
                        nodeBro[j].classList.remove("unselectTag");
                    }
                    flag = false;
                }
                //2.展开父节点
                node.parentNode.classList.remove("unselectTag");
                node.children[0].childNodes[0].innerHTML = "-";//改为展开的logo
            }
        }
    }
    console.log("not find");
}
/**
 *DFS
 */
var rootNode = document.getElementsByClassName("tree-root")[0];
var dfsResult=[];
function dfs(currNode){
    if(currNode && currNode.nodeName == "DIV"){
        for(var i=0; i<currNode.children.length; i++){
            dfs(currNode.children[i]);
        }
        dfsResult.push(currNode);//入队后构成访问序列
        console.log(currNode);
    }
}

/**
 * 保存选中的节点，这里保存p元素节点
 * 改变选中元素的颜色
 */
var selected = null;//保存p元素节点
function select(){
    var target = event.target;
    reset();
    if(target.nodeName=="P"){
        target.style.background = "#f00";
        target.firstChild.style.background = "#f00";
        selected = target;
    }
    if(target.nodeName=="SPAN"){
        target.style.background = "#f00";
        target.parentNode.style.background = "#f00";
        selected = target.parentNode;
    }
    selected.classList.add("selectTag");//给p元素添加选中标记
    mytoggle();
}
/**
 * 折叠展开函数
 */
function mytoggle(){
    var divList = document.querySelectorAll(".selectTag ~ div");
    if(divList.length>0){
        var flag = true;
        var tag = document.querySelector(".selectTag > span");
        for(var i=0; i<divList.length; i++) {
            //若直接用此句toggle有BUG divList[i].classList.toggle("unselectTag");//使用classList的toggle函数，而非jQuery的toggle
            //因此需要重写toggle而不能用classList的toggle
            if (!divList[i].classList.contains("unselectTag")) {
                flag = false;
            }
        }
        flag ? tag.innerHTML = "-" : tag.innerHTML = "+";
        for(var i=0; i<divList.length; i++) {
            if(tag.innerHTML == "-"){
                //logo是“ - ”号，则子元素应是 显示 状态
                divList[i].classList.remove("unselectTag");
            }
            if(tag.innerHTML == "+"){
                //logo是“ + ”号，则子元素应是 隐藏 状态
                divList[i].classList.add("unselectTag");
            }
        }

    }
}
/**
 * 删除节点
 */
function delnode(){
    var parent = selected.parentNode.parentNode;
    parent.removeChild(selected.parentNode);
}
/**
 * 添加节点
 */
function addnode(){
    var input = document.querySelector("#input-add").value;
    var newnode = document.createElement("div");
    newnode.className = "tree-leaf";
    newnode.innerHTML = "<p><span>-</span>"+input+"</p>";
    selected.parentNode.appendChild(newnode);
}
/**
 * 初始化，按钮绑定事件
 */
function init(){
    document.querySelector("#btn-dfs-search").addEventListener("click",find);
    document.querySelector(".tree-root").addEventListener("click",select);
    document.querySelector("#btn-del").addEventListener("click",delnode);
    document.querySelector("#btn-add").addEventListener("click",addnode);
}
init();