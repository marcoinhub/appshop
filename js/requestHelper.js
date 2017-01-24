/**
 * Created by Kevin on 2015/11/2.
 */
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function(fmt)
{ //author: meizz
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}
//毫秒日期格式转化
function renderTime(date,fmt){
    var d = new Date()
    d.setTime(date)
    return d.Format(fmt);
}

function createHeader()
{
    var header = {
        timestamp:new Date().Format("yyyy-MM-dd hh:mm:ss"),
        ver:"v1.0",
        deviceCode:"",
        toSignString:function(){
            var str = "";
            str += "timestamp:"+this.timestamp+","
            str += "deviceCode:"+''+","
            str += "ver:"+this.ver+","
            return str;
        },
    };
    var headerStr = header.toSignString();
    headerStr = headerStr.replace("{", "").replace("}", "");
    headerStr += "unilife";
    var md5Str = hex_md5(headerStr);
    header.sign = md5Str;
    return header;
}

function createRequestData($data){
    var requestData = {
        header:createHeader(),
        data:$data,
		offset:$data.offset,
		pageSize:$data.pageSize
    }
    return requestData;
}

function Post($url, $data, $success, $error){
    $data = ($data)?$data:"";
    if (!$success){
        throw new Error("Success call back can't be null");
    }
    $error = ($error)?$error:function($err, $state){
        console.info("error: " + $err);
    };

    var $reqData = createRequestData($data);


    $.ajax({
        url:$url,
        data:JSON.stringify($reqData),
        datatype:'json',
        type:'post',
        contentType:'application/json',
        success:function($ret){
            if (typeof($ret) == "string")
            {
                $ret = JSON.parse($ret);
            }
            if ($ret.state == "000000" || parseInt($ret.state) == 0)
            {
                $success($ret.data || $ret.userInfo);

            }
            else
            {
                $error($ret.msg, $ret.state);
            }
        },
        error:function($xmlHttpRequest, $txtStatus, $errorThrown){
            console.info('text status = ' + $txtStatus);
            $error("网络异常", $txtStatus);
        }
    });
}

//禁止异步
function Post2($url, $data, $success, $error){
    $data = ($data)?$data:"";
    if (!$success){
        throw new Error("Success call back can't be null");
    }
    $error = ($error)?$error:function($err, $state){
        console.info("error: " + $err);
    };

    var $reqData = createRequestData($data);


    $.ajax({
        url:$url,
        data:JSON.stringify($reqData),
        datatype:'json',
        type:'post',
		async:false,
        contentType:'application/json',
        success:function($ret){
            if (typeof($ret) == "string")
            {
                $ret = JSON.parse($ret);
            }
            if ($ret.state == "000000" || parseInt($ret.state) == 0)
            {
                $success($ret.data || $ret.userInfo);

            }
            else
            {
                $error($ret.msg, $ret.state);
            }
        },
        error:function($xmlHttpRequest, $txtStatus, $errorThrown){
            console.info('text status = ' + $txtStatus);
            $error("网络异常", $txtStatus);
        }
    });
}

//禁止异步
function Post3($url, $data, $success, $error){
    $data = ($data)?$data:"";
    if (!$success){
        throw new Error("Success call back can't be null");
    }
    $error = ($error)?$error:function($err, $state){
        console.info("error: " + $err);
    };
	
    $.ajax({
        url:$url,
        data:$data,
        datatype:'json',
        type:'post',
        success:function($ret){
            if (typeof($ret) == "string"){
                $ret = JSON.parse($ret);
            }
            $success($ret);
        },
        error:function($xmlHttpRequest, $txtStatus, $errorThrown){
            console.info('text status = ' + $txtStatus);
            $error("网络异常", $txtStatus);
        }
    });
}

function Post4($url, $data, $success, $error){
    $data = ($data)?$data:"";
    if (!$success){
        throw new Error("Success call back can't be null");
    }
    $error = ($error)?$error:function($err, $state){
        console.info("error: " + $err);
    };
	
    $.ajax({
        url:$url,
        data:$data,
        datatype:'html',
        type:'post',
		async:false,
        success:function($ret){
            $success($ret);
        },
        error:function($xmlHttpRequest, $txtStatus, $errorThrown){
            console.info('text status = ' + $txtStatus);
            $error("网络异常", $txtStatus);
        }
    });
}