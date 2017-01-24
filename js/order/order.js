

// 取消子订单
function cancelOrder(unilifeOrderCode){
    var con = new confirm();
    con.init({title:'确认取消',
        info:'该订单尚未完成支付，您确定要取消订单吗？',
        sure:'确认取消',
        cancle:'返回'},function(response){
        if(response==true){
            var $param = {};
            $param.unilifeOrderCode = unilifeOrderCode;
            Post(mobileHome+"/service/app/v1/order/cancel?access_token=${access_token}",$param,function($data){
                toast("成功取消订单！");
                //友盟埋点
                _czc.push(["_trackEvent","getOrderList_取消订单" + unilifeOrderCode + "_ca","click","点击取消订单_订单取消了","1","removeOrder"]
                );
                setTimeout(function () {
                    window.location.href = base+"/service/appshopV2/order/orderList";
                }, 500)
            },function($message, $status){
                toast($message);
            });
        }
    })
}

/*取消组订单*/
function cancelGroupOrder(orderGroupId){
    var con = new confirm();
    con.init({title:'确认取消',
        info:'该订单尚未完成支付，您确定要取消订单吗？',
        sure:'确认取消',
        cancle:'返回'},function(response){
        if(response==true){
            var $param = {};
            $param.orderGroupId = orderGroupId;
            Post(mobileHome+"/service/app/v1/order/cancelOrderByOrderGroupId?access_token=${access_token}",$param,function($data){
                toast("取消成功！");
                setTimeout(function () {
                    window.location.href = base+"/service/appshopV2/order/orderList";
                }, 500)
            },function($message, $status){
                toast($message);
            });
        }
    })
}

/*删除订单*/
function deleteOrder(unilifeOrderCode){
    var con = new confirm();
    con.init({title:'确认删除',
        info:'您确定要删除该订单吗？',
        sure:'确认删除',
        cancle:'返回'},function(response){
        if(response==true){
            var $param = {};
            $param.unilifeOrderCode = unilifeOrderCode;
            Post(mobileHome+"/service/app/v1/order/removeOrder?access_token=${access_token}",$param,function($data){
                toast("删除成功！");
                setTimeout(function () {
                    window.location.href = base+"/service/appshopV2/order/orderList";
                }, 500)
            },function($message, $status){
                toast($message);
            });
        }
    })
}

// 确认收货
function makeSure(unilifeOrderCode){
    var con = new confirm();
    con.init({title:'确认收货',
        info:'你确认已经收到货了吗？',
        sure:'我已收到',
        cancle:'还未收到'},function(response){
        if(response==true){
            var $param = {};
            $param.unilifeOrderCode = unilifeOrderCode;
            Post(mobileHome+"/service/app/v1/order/confirmReceipt?access_token=${access_token}",$param,function($data){
                toast("订单已完成！");
                //友盟埋点
                _czc.push(["_trackEvent","getOrderList_确认收货"+unilifeOrderCode+"_ca","click","点击确认收货_商品收到了","1","确认收货"]);
                setTimeout(function () {
                    window.location.href = base+"/service/appshopV2/order/orderList";
                }, 500)
            },function($message, $status){
                toast($message);
            });
        }
    })
}

// 去支付
function toPay(orderId) {
    window.location.href = base+"/service/appshopV2/order/payOrder?orderId="+orderId;
}

// 查看物流
function express(unilifeOrderCode, unilifePackageId) {
    window.location.href = base+"/service/appshopV2/order/express?unilifeOrderCode="+unilifeOrderCode+"&unilifePackageId="+unilifePackageId;
}

//售后
function afterSale(unilifePackageId) {
    window.location.href = base+"/service/appshop/customerService/requestCustomerHandle?unilifePackageId="+unilifePackageId;
}