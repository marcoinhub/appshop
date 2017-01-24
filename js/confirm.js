/**
 * Created by youy on 2016/8/31.
 */
var confirm=function(){
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
        var boardCSS='position:fixed;width:284px;background:#ffffff;z-index:255;left:50%;top:50%;margin-left:-142px;margin-top:-85px;text-align:center;padding:0px 33px 20px;box-sizing: border-box;';
        board.setAttribute('style',boardCSS);
        document.body.appendChild(board);
        mask.onclick=function(){
            mask.remove();
            board.remove();
        }
        var options=options||self.options;
        var header=document.createElement('div');
        var headerCSS='font-weight: normal;font-size: 1em;border-bottom: 1px solid #d9d9d9;padding:22px 33px 8px;font-size:17.5px';
        header.setAttribute('style',headerCSS);
        header.innerHTML=options.title;
        board.appendChild(header);
        var info=document.createElement('div');
        var infoCSS='padding:8px;font-size:16px;line-height:20px';
        info.setAttribute('style',infoCSS);
        info.innerHTML=options.info;
        board.appendChild(info);
        var footer=document.createElement('div');
        var footerCSS='margin-top:20px';
        footer.setAttribute('style',footerCSS);
        board.appendChild(footer);
        var yes=document.createElement('button');
        var no=document.createElement('button');
        yes.innerHTML=options.sure;
        var no=document.createElement('button');
        no.innerHTML=options.cancle;
        var yesCSS='float:left;width:97px;height:37px;color: #e54a36;border:1px #e54a36 solid;background:none;border-radius:4px;'
        var noCSS='float:right;width:97px;height:37px;border:1px #585858 solid;color:#585858;background:none;border-radius:4px;'
        no.setAttribute('style',noCSS);
        yes.setAttribute('style',yesCSS);
        footer.appendChild(yes);
        footer.appendChild(no);
        yes.addEventListener('click',function(){
            if(callback &&typeof callback == 'function'){
                callback(true);
            }
            document.body.removeChild(mask);
            document.body.removeChild(board);
        })
        no.addEventListener('click',function(){
            if(callback && typeof callback =='function'){
                callback(false);
            }
            document.body.removeChild(mask);
            document.body.removeChild(board);
        })
    }
}