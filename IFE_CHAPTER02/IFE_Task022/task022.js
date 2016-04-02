/**
 * @Author : Iceberg
 * @Date : 2016-04-01
 */

/**
 * 访问该节点时的特效函数
 */
function show(){
    var arr = stack;
    var i=0
    var myanim = setInterval(function(){
        if(i==arr.length-1){
            arr[i].style.backgroundColor = "#fff";
            clearInterval(myanim);
        }
        else{
            i++;
            arr[i-1].style.backgroundColor = "#fff";
            arr[i].style.backgroundColor = "#0f0";
        }
    },500);

}
function reset(){
    var nodeList = document.getElementsByTagName("div");
    for(var i=0; i<nodeList.length; i++){
        nodeList[i].style.background = "#fff";
    }
}
/**
 * 前序遍历
 */
var stack=[];
function dlrOrder(node){
    stack.push(node);
    if(node.firstElementChild){
        console.log("left");
        dlrOrder(node.firstElementChild);

    }
    if(node.lastElementChild){
        console.log("right");
        dlrOrder(node.lastElementChild);

    }
}
function init(){
    var node = document.getElementsByClassName("tree-root")[0];
    dlrOrder(node);
    document.getElementById("btn-dlr").addEventListener("click",show);
}
init();