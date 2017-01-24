/**
 * Created by youy on 2016/9/18.
 */
/**
 * Created by youy on 2016/8/31.
 */
var Alert=function(){
    this.options={
        title:'消息框',
        info:'确认删除该收货地址吗',
        sure:'确认',
        cancle:'取消'
    };
    this.init=function(options,callback){
        var self=this;
        var mask=document.createElement('div');
        var maskcss='display:block;width:100%;height:100%;background: rgba(0,0,0,0.4);z-index:200;position:fixed;top: 0;left: 0;right:0;top:0;';
        mask.setAttribute('style',maskcss);
        document.body.appendChild(mask);
        var board=document.createElement('div');
        var boardCSS='position:fixed;width:284px;background:#ffffff;z-index:255;left:50%;top:50%;margin-left:-142px;margin-top:-85px;text-align:center;padding:0px 33px 20px;box-sizing: border-box;border-radius:5px;' +
            'transform:scale(0);transition:transform 200ms  cubic-bezier(0.42,0,0.58,1) ';
        board.setAttribute('style',boardCSS);
        document.body.appendChild(board);
        mask.onclick=function(){
            mask.remove();
            board.remove();
        }
        var options=options||self.options;
        var header=document.createElement('div');
        var headerCSS='font-weight: normal;font-size: 1em;padding:22px 33px 8px;font-size:20px;color:#333333';
        header.setAttribute('style',headerCSS);
        header.innerHTML=options.title;
        board.appendChild(header);
        var info=document.createElement('div');
        var infoCSS='padding:8px;font-size:20px;line-height:20px;color:#666666';
        info.setAttribute('style',infoCSS);
        info.innerHTML=options.info;
        board.appendChild(info);
        var footer=document.createElement('div');
        var footerCSS='margin-top:20px';
        footer.setAttribute('style',footerCSS);
        board.appendChild(footer);
        var yes=document.createElement('button');
        yes.innerHTML=options.sure;
        var no=document.createElement('button');
        no.innerHTML=options.cancle;
        var yesCSS='margin:0 auto;min-width:97px;max-width:150px;height:37px;border:none;background:none;font-size:20px'
        yes.setAttribute('style',yesCSS);
        footer.appendChild(yes);
        if(options.cancle){
            var noCSS='margin:0 auto;min-width:97px;max-width:150px;height:37px;border:none;color:#585858;background:none;font-size:20px;color:#c8362b'
            no.setAttribute('style',noCSS);
            var split=document.createElement('span');
            split.innerHTML="丨";
            footer.appendChild(split);
            footer.appendChild(no);
            no.addEventListener('click',function(){
                if(callback &&typeof callback == 'function'){
                    callback(false);
                }
                document.body.removeChild(mask);
                document.body.removeChild(board);
            })
        }
        setTimeout(function(){
            board.style.transform="scale(1)";
        },100)




        yes.addEventListener('click',function(){
            if(callback &&typeof callback == 'function'){
                callback(true);
            }
            document.body.removeChild(mask);
            document.body.removeChild(board);
        })
    }
}