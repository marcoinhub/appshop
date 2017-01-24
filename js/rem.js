/**
 * Created by youy on 2016/8/30.
 */
function setRem(){
    var doc=document.documentElement;
    var docW=doc.clientWidth;
    if(docW<=640){doc.style.fontSize=17.5*(docW/414)+'px';}else {doc.style.fontSize=27+'px';}
}
setRem();
window.onresize=function(){
    setRem();
}