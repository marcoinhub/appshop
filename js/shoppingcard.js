/**
 * Created by Dylon on 2016/09/07.
 */

var shoppingCar = {
	/**
	 * 加入购物车
	 * @param goods Object|Array {productId:'123', qty:1}
	 */
	addToShoppingCart: function(productId,source,qty,access_token) {
		var that = this;
		var goods = new Goods(productId,source,qty)
		//获取购物车
		var cart = this.getCart();
		
		if(goods.source=='yiguoKid'){
			for(key in cart){
				var goodsinfo=cart[key];
				if(goodsinfo.source=='yiguoKid'){
					toast('只能购买一个套包，请删除购物车中已有套包！')
					return ;
				}
			}
		}
		
		if(parseInt(userId) > 0){
			//登录状态下，直接更新购物车
			var $param = {};
			$param.productList = [goods];
			Post2(mobileHome + "/service/app/v1/shoppingcart/add?access_token=" + access_token,$param,function($data){
				that.goodsToAddCart(goods);
				toast("加入购物车成功！");
			},function($message, $status){
				toast($message);
			});
		}else{
			//非登录状态下，加入缓存
			this.goodsToAddCart(goods);
			toast("加入购物车成功！");
		}
	},
	
	/**
	 * 修改购物车
	 * @param goods Object|Array {productId:'123', qty:1}
	 */
	updateToShoppingCart: function(productId,source,qty,access_token) {
		var that = this;
		var goods = new Goods(productId,source,qty)
		//获取购物车
		var cart = this.getCart();
		
		if(goods.source=='yiguoKid'){
			for(key in cart){
				var goodsinfo=cart[key];
				if(goods.productId==goodsinfo.productId){
					toast('这个商品限购一个哦')
				}
			}
		}
		
		if(parseInt(userId) > 0){
			//登录状态下，直接更新购物车
			var $param = {};
			$param.productList = [goods];
			Post2(mobileHome + "/service/app/v1/shoppingcart/sync?access_token=" + access_token,$param,function($data){
				that.goodsToUpdateCart(goods);
			},function($message, $status){
				toast($message);
			});
		}else{
			//非登录状态下，加入缓存
			this.goodsToUpdateCart(goods);
		}
	},

	/**
	 * 删除购物车
	 */
	deleteToShoppingCart: function(productId,access_token) {
		var ret = false;
		//获取购物车
		var cart = this.getCart();
		if(parseInt(userId) > 0){
			var productList = [];
			var product = {};
			product.productId = productId;
			productList.push(product);
			var $param = {};
			$param.productList = productList;
			if(this.doRemoveMyCart($param,access_token)){
				for(key in cart){
					var goodsinfo=cart[key];
					if(productId==goodsinfo.productId){
						cart.splice(key, 1);
					}
				}
				ret = true;
			}
		}else{
			for(key in cart){
				var goodsinfo=cart[key];
				//console.info(productId+"=="+goodsinfo.productId);
				if(productId==goodsinfo.productId){
					cart.splice(key, 1);
				}
			}
			ret = true;
		}
		if(cart.length <= 0){
			$("#shoppingCart").html('购物车');
		}else{
			$("#shoppingCart").html('购物车<i class="af-badge">'+cart.length+'</i>');
		}
		//console.info("1111111"+JSON.stringify(cart));
		var json = $.base64('encode', JSON.stringify(cart));
		sessionStorage.setItem("shoppingCart", json);
		
		return ret;
	},

	/**
	 * 清空购物车
	 */
	clearToShoppingCart: function(access_token) {
		var ret = false;
		if(parseInt(userId) > 0){
			var cart = this.getCart();
			var productList = [];
			for(key in cart){
				var productId=cart[key].productId;
				var product = {};
				product.productId = productId;
				productList.push(product);
			}
			var $param = {};
			$param.productList = productList;
			if(this.doRemoveMyCart($param,access_token)){
				sessionStorage.removeItem("shoppingCart");
				ret = true;
			}
		}else{
			sessionStorage.removeItem("shoppingCart");
			ret = true;
		}
		$("#shoppingCart").html('购物车');
		return ret;
	},

	/**
	 * 提交删除购物车
	 */
	doRemoveMyCart: function($param,access_token){
		var ret = false;
		Post2(mobileHome + "/service/app/v1/shoppingcart/delete?access_token=" + access_token,$param,function($data){
			ret = true;
		},function($message, $status){
			toast($message);
		});
		return ret;
	},

	/**
	*写入cookie
	**/
	goodsToAddCart: function(goods){
		//获取购物车
		var cart = this.getCart();
		if(cart.length > 0){
			var isExist = false;
			for(key in cart){
				var goodsinfo=cart[key];
				if(goods.productId==goodsinfo.productId){
					isExist = true;
					goodsinfo.qty = parseInt(goodsinfo.qty) + parseInt(goods.qty);
				}
			}
			if(!isExist){
				cart.push(goods);
			}
		}else{
			cart.push(goods);
		}
		if(cart.length <= 0){
			$("#shoppingCart").html('购物车');
		}else{
			$("#shoppingCart").html('购物车<i class="af-badge">'+cart.length+'</i>');
		}
		var json = $.base64('encode', JSON.stringify(cart));
		sessionStorage.setItem("shoppingCart", json);
	},

	/**
	*修改cookie
	**/
	goodsToUpdateCart: function(goods){
		//获取购物车
		var cart = this.getCart();
		if(cart.length > 0){
			for(key in cart){
				var goodsinfo=cart[key];
				if(goods.productId==goodsinfo.productId){
					goodsinfo.qty = parseInt(goods.qty);
				}
			}
		}
		if(cart.length <= 0){
			$("#shoppingCart").html('购物车');
		}else{
			$("#shoppingCart").html('购物车<i class="af-badge">'+cart.length+'</i>');
		}
		var json = $.base64('encode', JSON.stringify(cart));
		sessionStorage.setItem("shoppingCart", json);
	},
	
	/**
	*提交添加购物车
	**/
	submitShoppingCart: function(accessToken,province,city,county){
		var cart = this.getCart();
		var that = this;
		if(cart.length > 0){
			var $param = {};
			$param.productList = cart;
			Post2(mobileHome + "/service/app/v1/shoppingcart/add?access_token=" + accessToken,$param,function($data){
				if($data){
					sessionStorage.removeItem("shoppingCart");
					for(var i=0;i<$data.length;i++){
						var goods = $data[i];
						that.goodsToAddCart(new Goods(goods.productId,goods.source,goods.qty));
					}
				}
			},function($message, $status){
				toast($message);
			});
		}else{
			this.refreshCart(province,city,county,accessToken);
		}
	},
	
	/**
	*获取购物车
	**/
	getCart: function(){
		var json = sessionStorage.getItem("shoppingCart");
		if(json){
			json = $.base64('decode', json);
		}
		var cart = JSON.parse(json);
		if(!cart){
			cart = [];
		}
		return cart;
	},

	/**
	*获取购物车
	**/
	getBaseCart: function(){
		var json = sessionStorage.getItem("shoppingCart");
		if(json){
			return json;
		}
		return "";
	},

	/**
	*刷新购物车
	**/
	refreshCart: function(province,city,county,accessToken){
		if(parseInt(userId) > 0){
			var that = this;
			var $param = {};
			$param.channelTo = "1";
			$param.province = province;
			$param.city = city;
			$param.country = county;
			Post(mobileHome + "/service/app/v1/shoppingcart/list?access_token=" + accessToken,$param,function($data){
				if($data){
					sessionStorage.removeItem("shoppingCart");
					for(var i=0;i<$data.length;i++){
						var goods = $data[i];
						that.goodsToAddCart(new Goods(goods.productId,goods.source,goods.qty));
					}
				}
			},function($message, $status){
				toast($message);
			});
		}
		var cart = this.getCart();
		if(cart.length > 0){
			$("#shoppingCart").html('购物车<i class="af-badge">'+cart.length+'</i>');
		}
	},

	/**
	*结算
	**/
	toPayCart: function(productBuyList){
        window.location.href = base + "/service/appshopV2/order/settlement?productBuyList=" + $.base64('encode', JSON.stringify(productBuyList));
    },
    toOldPayCart: function(productBuyList){
        window.location.href = base + "/service/appshop/order/settlement?productBuyList=" + $.base64('encode', JSON.stringify(productBuyList));
    },
	toGroupPayCart: function(productBuyList,activityGroupParamVO){
        window.location.href = base + "/service/appshop/group/groupSettlement?activityCode="+activityGroupParamVO.activityCode+"&groupCode="+activityGroupParamVO.groupCode+"&productBuyList=" + $.base64('encode', JSON.stringify(productBuyList));
    }
}

var Goods = function Goods(productId,source,qty){
	this.productId=productId;
	this.source=source;
	this.qty=qty;
}