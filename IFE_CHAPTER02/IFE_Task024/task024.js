/**
 * @Author : Iceberg
 * @Date : 2016-04-04
 */
/**
 * 重置节点颜色
 * 重置存储遍历结果的数组
 */
function reset(){
    var nodeList = document.querySelectorAll("[class*=tree]");
    for(var i=0; i<nodeList.length; i++){
        nodeList[i].style.backgroundColor = "#fff";
    }
    dfsResult = [];
    bfsStack = [];
    bfsResult = [];
}
/**
 * 访问该节点时的特效函数
 */
function show(index, node){
    reset();
    switch (index){
        case 0:
            dfs(node);
            var arr = dfsResult;
            break;
        case 1:
            bfs(node);
            var arr = bfsResult;
            break;
        case 2:
            var goal = document.querySelector("#input-box").value;
            dfs(node);
            var arr = dfsResult;
            break;
        case 3:
            var goal = document.querySelector("#input-box").value;
            bfs(node);
            var arr = bfsResult;
            break;
    }
    var i=0
    arr[i].style.backgroundColor = "#0f0";
    var myanim = setInterval(function(){
        var nodeVal = arr[i].firstChild.nodeValue.replace(/(^\s*)|(\s*$)/g,"");
        console.log(nodeVal);
        if(i==arr.length-1 || nodeVal==goal){
            arr[i].style.backgroundColor = "#fff";
            clearInterval(myanim);
            if(nodeVal==goal){
                arr[i].style.backgroundColor = "#f00";
            }
            if(goal && i==arr.length-1 && nodeVal !=goal){
                alert("未找到所输入的值："+ goal);
            }
        }
        else{
            i++;
            arr[i-1].style.backgroundColor = "#fff";
            arr[i].style.backgroundColor = "#0f0";
        }
    },500);
}
/**
 *DFS
 */
var dfsResult=[];
function dfs(currNode){
    if(currNode){
        for(var i=0; i<currNode.children.length; i++){
            dfs(currNode.children[i]);
        }
        dfsResult.push(currNode);//入队后构成访问序列
    }
}
/**
 * BFS
 */
var bfsStack=[];
var bfsResult=[];
function bfs(curNode){
    bfsStack.push(curNode);
    var node  = bfsStack.shift();
    while (node){
        for(var i=0; i<node.children.length; i++){
            bfsStack.push(node.children[i]);
        }
        bfsResult.push(node);//入队后构成访问序列
        node = bfsStack.shift();
    }
}

/**
 * 改变选中元素的颜色
 */
var selected = null;
function select(){
    var target = event.target;
    reset();
    target.style.background = "#f00";
    selected = target;
}
/**
 * 删除节点
 */
function delnode(){
    var parent = selected.parentNode;
    parent.removeChild(selected);
}
/**
 * 添加节点
 */
function addnode(){
    var input = document.querySelector("#input-add").value;
    var newnode = document.createElement("div");
    newnode.className = "tree-leaf";
    newnode.innerHTML = input;
    selected.appendChild(newnode);
}
function init(){
    var node = document.getElementsByClassName("tree-root")[0];
    document.querySelector("#btn-dfs").addEventListener("click",function(){show(0,node);});
    document.querySelector("#btn-bfs").addEventListener("click",function(){show(1,node);});
    document.querySelector("#btn-dfs-search").addEventListener("click",function(){show(2,node);});
    document.querySelector("#btn-bfs-search").addEventListener("click",function(){show(3,node);});
    document.querySelector(".tree-root").addEventListener("click",select);
    document.querySelector("#btn-del").addEventListener("click",delnode);
    document.querySelector("#btn-add").addEventListener("click",addnode);
}
init();