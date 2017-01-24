/**
 * Created by Dylon on 2016/09/02.
 */
String.prototype.trimEnd = function($end){
	if (this.indexOf($end) == this.length - $end.length){
		return this.substr(0, this.length - $end.length);
    }
    return this;
}

var positionFunc = function () {
    var deferred = $.Deferred();
    var defaultPosition = lastPosition.getPosition();
    var um_location = new BMap.Geolocation();
    um_location.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var geo = new BMap.Geocoder();
            geo.getLocation(r.point, function ($ret) {
                var $position = {
                    province: $ret.addressComponents.province,
                    city: $ret.addressComponents.city,
                    county: $ret.addressComponents.district
                };
                $position.province = $position.province.trimEnd('市')

                deferred.resolve($position)
            })
        }else{
            deferred.resolve(defaultPosition)
        }
    },{enableHighAccuracy: false});
    return deferred.promise();
}

function cityEqual($p1, $p2) {
    if ($p1.city == $p2.city) {
        return true;
    }
    return false;
}

function districtEqual($p1, $p2) {
    if (!cityEqual($p1, $p2)) {
        return false;
    }

    if ($p1.county == $p2.county) {
        return true;
    }
    return false;
}

var LastPosition = function () {
    this.position = {"county": "徐汇区", "city": "上海市", "province": "上海"};
    if (window.localStorage.getItem('lastPosition')) {
        this.position = JSON.parse(window.localStorage.getItem('lastPosition'));
    }
}
LastPosition.prototype.getPosition = function () {
    return this.position;
}

LastPosition.prototype.setPosition = function ($newPosition) {
    if ($newPosition)
    {
        this.position.province = $newPosition.provinceName || $newPosition.province;
        this.position.city = $newPosition.cityName || $newPosition.city;
        this.position.county = $newPosition.county;
        window.localStorage.setItem('lastPosition', JSON.stringify(this.position));
    }
}
