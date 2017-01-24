/**
 * Created by Dylon on 2016/09/06.
 */
function actionButton(_doc){
	var action = $(_doc).attr("action");
	var placeKey = $(_doc).attr("placeKey");
	var catalogId = $(_doc).attr("catalogId");
	var webSiteUrl = $(_doc).attr("webSiteUrl");
	var productId = $(_doc).attr("productId");
	var infoId = $(_doc).attr("infoId");
	var province = $(_doc).attr("province");
	var city = $(_doc).attr("city");
	var county = $(_doc).attr("county");
	var access_token = $(_doc).attr("access_token");
	switch(action){
		case "0":     // 无操作
			
			break;
		case "1":     // 打开电商目录
			window.location.href = base + "/service/appshopV2/product/productList?catalogId=" + catalogId;
			break;
		case "4":     // 打开html
			window.location.href = webSiteUrl;
			break;
		case "5":     // 打开商品详情
			window.location.href = base + "/service/appshopV2/product/product/" + productId;
			break;
		case "7":     // 打开功能模块
			switch (catalogId){
				case "8":  //打开易果套餐
					window.location.href = base + "/service/appshop/product/yiGuoKidList";
					break;
				case "9": //优卡专区
					window.location.href = base + "/service/appshopV2/unilifecard/list?placeKey=" + placeKey;
				break;
			}
			break;
		case "9":
			window.location.href = base + "/service/appshopV2/product/store/" + infoId;
			break;
		case "10": //专题列表
			formSubmit(infoId);
			break;
		case "11": //首页品牌推荐
			var $param = {};
			$param.province = province;
			$param.city = city;
			$param.country = county;
			$param.id = infoId;
			Post(mobileHome + "/service/app/v1/index/getProjectById?access_token=" + access_token,$param,function($data){
				if($data.source != null && $data.source != "" && $data.source != undefined){
					window.location.href = base + "/service/appshopV2/product/store/" + $data.source;
				}else{
					toast("系统异常");
				}
			},function(){
				toast("系统异常");
			});
	}
}

function formSubmit(subjectId) {
    var turnForm = document.createElement("form");   
    document.body.appendChild(turnForm);
    turnForm.method = 'post';
	turnForm.action = base + "/service/appshopV2/product/productList";

	var newElement0 = document.createElement("input");
    newElement0.setAttribute("name","subjectId");
    newElement0.setAttribute("type","hidden");
    newElement0.setAttribute("value",subjectId);
    turnForm.appendChild(newElement0);

	var newElement1 = document.createElement("input");
    newElement1.setAttribute("name","queryType");
    newElement1.setAttribute("type","hidden");
    newElement1.setAttribute("value","SubjectIdQuery");
    turnForm.appendChild(newElement1);
    turnForm.submit();
}