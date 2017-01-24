/**
 * Created by youy on 2016/9/1.
 * @class  选取地址组件
 * @param url 请求地址组件
 * @param options 定位地址 回调函数 json
 * demo
 * 	var pol = new poplist("${mobileHome}/service/app/v1/account/addressArea?access_token=${access_token}");
    var options={
				default:{province:'北京',city:'北京市',county:'朝阳区'},
				callback:function(data){
						Post2("${base}/service/appshop/account/updateCity?province="+data.province+"&city="+data.city+"&county="+data.county,{},function($data){
					    		sessionStorage.setItem("accountAddress", "1");
					    		window.location.href = "${base}/service/appshop/product/index?y=" + Math.random();
					    		$('.main').css('display','block');
							},function($message, $status){
								toast($message);
								$('.main').css('display','block');
							});
						}
				}
     pol.init(options);
 */
var poplist =function(url){
    this.dom=document.createElement('div');
    this.rn=document.createElement('div');
    this.pos=document.createElement('label');
    this.li=document.createElement('li');
    this.li.appendChild(this.pos);
    this.li.appendChild(this.rn);
    this.ul=document.createElement('ul');
    this.Nav=document.createElement('div');
    this.back=document.createElement('span');
    this.head=document.createElement('label');
    this.addressWrap=document.createElement('div');
    this.title=document.createElement('div');
    this.default=document.createElement('div');
    this.defaultTitle=document.createElement('div');
    this.defaultBody=document.createElement('div');
    this.defaultData;
    this.data={province:'',city:'',county:''};
    this.isEmpty=function (obj){
        var result=true;
        for(k in obj){
            var v = obj[k];
            console.log(v);
            if(v&&typeof v !='undefine'&& v !=null){
                return false;
            }
        }
        return true;
    }
    this.joinA=function(obj){
        var result='';
        for (k in obj){
            v=obj[k];
            if(v&&typeof v !='undefined'&& v !=null){
                result=result+'&nbsp;'+v;
            }
        }
        return result;
    }
    this.init=function(options) {

        var self = this;
        // self.defaultData=options.default||{province:'上海',city:'上海市',county:'徐汇区'};
        self.defaultData=options.default;
        if (options.data != null) {
            if (options.data.province != null) {
                self.data.province = options.data.province;
            }
            if (options.data.city != null) {
                self.data.city = options.data.city;
            }
            if (options.data.county != null) {
                self.data.county = options.data.county;
            }
        }
        var screenH =$(window).height();
        var boardH=screenH-44;
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if(isiOS){
            self.addressWrap.setAttribute('style', 'height:' + boardH + 'px;' + 'width:100%;background:#eeeeee;overflow:auto;padding-bottom:44px');
        }else if(isAndroid){
            self.addressWrap.setAttribute('style','position: fixed;left: 0;right: 0;top: 44px;bottom: 0;width: 100%;background: #eeeeee;overflow: auto;padding-bottom: 44px;');
        }else {
            self.addressWrap.setAttribute('style','position: fixed;left: 0;right: 0;top: 44px;bottom: 0;width: 100%;background: #eeeeee;overflow: auto;padding-bottom: 44px;');
        }
        self.ul.setAttribute('style','background:#ffffff')
        self.dom.setAttribute('style', 'width:100%;position:fixed;left:0;top:0px;z-index:99999999');
        self.Nav.setAttribute('style', 'background: rgb(245, 245, 245);border-bottom: 1px solid rgb(221, 221, 221);height:44px');
        self.head.innerHTML='请选择收货地址';
        self.rn.innerHTML='>';
        self.rn.setAttribute('style', 'position:absolute;display: block;right:.5rem;top:10px;text-align:center;font-size: 24px;color: #666;transform: scaleY(1.5);font-stretch: ultra-condensed');
        self.back.setAttribute('style', 'display: block;left:0;top:0;text-align:center;font-size: 24px;height: 40px;line-height: 40px;width: 50px;color: #666;transform: scaleY(1.5);font-stretch: ultra-condensed');
        self.Nav.appendChild(self.back);
        self.Nav.appendChild(self.head);
        self.head.setAttribute('style','position:absolute;left:50%;top:0%;transform:translate(-50%,0);height:44px;color:#666666;line-height:44px;font-size:20px');
        self.li.setAttribute('style', 'position:relative;padding: 10px 25px;border-bottom: 1px solid #ccc;text-align:left');
       // self.li.appendChild(self.rn);

        self.title.setAttribute('style','padding:10px 25px;background:transparent');
        self.defaultTitle.setAttribute('style','padding:10px 25px;background:transparent');
        self.defaultBody.setAttribute('style','padding: 10px 25px;border-bottom: 1px solid #ccc;text-align:left;background:#ffffff');
        self.dom.appendChild(self.Nav);
        self.title.innerHTML='选择地区';
        if(!self.isEmpty(self.defaultData)){
            self.default.appendChild(self.defaultTitle);
            self.default.appendChild(self.defaultBody);
            self.addressWrap.appendChild(self.default);
            self.defaultTitle.innerHTML='定位城市';
            self.defaultBody.innerHTML=self.joinA(self.defaultData);
        }
        self.defaultBody.addEventListener('click',function(){
            try{

                var main=document.querySelector('.main');
                if(main && main.style.display=='none'){
                    main.style.display='block';
                }
                if (!self.data.province && !self.city && !self.county) {
                    document.body.removeChild(self.dom);
                }
            }catch (e){

                document.body.removeChild(self.dom);
            }
            options.callback(self.defaultData);
        })
        self.addressWrap.appendChild(self.title);
        self.addressWrap.appendChild(self.ul);
        self.dom.appendChild(self.addressWrap);
        self.back.innerHTML="<";
        document.body.appendChild(self.dom);
        self.back.addEventListener('click', function () {
            try{
                var main=document.querySelector('.main');
                if(main && main.style.display=='none'){
                    main.style.display='block';
                }
                if (!self.data.provice && !self.city && !self.county) {
                    document.body.removeChild(self.dom);
                }
            }catch (e){
                document.body.removeChild(self.dom);
            }
        })
        var setData = function () {
            var lengthp=self.data.province.length;
            var lengthc=self.data.city.length;
            try{
                self.addressWrap.removeChild(self.default);
            }catch (e){
            }
            if (lengthp==0) {
                self.data.province = this.childNodes[0].innerHTML;
                getData();
            };
            if(lengthp>0&&lengthc==0){
                self.data.city=this.childNodes[0].innerHTML;
                getData();
            }
            if(lengthp>0&&lengthc>0){
                self.data.county=this.childNodes[0].innerHTML;
                if(options.callback&&typeof options.callback == 'function'){
                    options.callback(self.data);
                }
                document.body.removeChild(self.dom);
            }
        }
        var getData = function () {
            Post(url, self.data, function (data) {
                while (self.ul.hasChildNodes())
                {
                    self.ul.removeChild(self.ul.firstChild);
                }
                data.forEach(function (data) {

                    var neli = self.li.cloneNode(true);

                    neli.childNodes[0].innerHTML= data;
                    neli.addEventListener('click', setData);
                    self.ul.appendChild(neli);
                })
            }, function (error) {
                console.log(error);
            })
        }
        getData();
    }
}


