var arr = new Array();
$(function() {
	var now, nty, ntm, cty, ctm, calD, calH, dif, countDownTime = null;
	$(".countDownTime").each(function(index){
        //获取倒计时总时间
        countDownTime = $("#countDownTime" + index).text();

        if (countDownTime == null || countDownTime == '') {
            return;
        }

        //默认 25:59:59
        //1: 25小时59分钟
        var showType = $("#countDownTime" + index).attr("showType");

        //倒计时
        now = new Date().Format("yyyy-MM-dd hh:mm:ss");
        nty = getYYYYMMDD(now);
        ntm = getHHMMSS(now);
        cty = getYYYYMMDD(countDownTime);
        ctm = getHHMMSS(countDownTime);
        calD = (new Date(nty).getTime() - new Date(cty).getTime()) / 1000;
        calH = getS(ntm) - getS(ctm);
        dif = calH+calD;
        arr[index] = -dif;
        SetRemainTime("countDownTime"+index, index, showType);
        self.setInterval(function(){
            SetRemainTime("countDownTime"+index, index, showType);
        }, 1000);
        console.log(arr[index]);
    });
});

//倒计时相关
function SetRemainTime(id, temp, showType){
	if(parseInt(arr[temp]) > 0){
		var sec = parseInt(arr[temp]%60);
		var min = parseInt(arr[temp]/60%60);
		var hour = parseInt(arr[temp]/60/60);
		if(sec < 10) {
			sec = '0' + sec;
		}
		if(min < 10) {
			min = '0' + min;
		}
		if(hour < 10) {
			hour = '0' + hour;
		}
		arr[temp]--;
	} else {
        sec = '00';
        min = '00';
        hour = '00';
	}
    var htmlText = '<span>' + hour +'</span>:<span>' + min +'</span>:<span>' + sec + '</span>';
    if (showType == '1') {
        htmlText = '<span>' + hour +'</span>小时<span>' + min +'</span>分钟';
    }
    $("#" + id).html(htmlText);
}

function  getYYYYMMDD(time){
    var regD = /^(\d{4})-(0\d{1}|1[0-2])-(0\d{1}|[12]\d{1}|3[01])/;
    var ymd = time.match(regD)[0];
    return ymd;
}
function getHHMMSS(time){
     var regH = /(0\d{1}|1\d{1}|2[0-3]):[0-5]\d{1}:([0-5]\d{1})/;
     var hms = time.match(regH)[0];
     return hms;
}
function getS(time){
    var buffer = time.split(':');
    console.log(buffer);
    var n = parseInt(buffer[0])*3600+parseInt(buffer[1])*60+parseInt(buffer[2]);
    return n;
}
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };

    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}