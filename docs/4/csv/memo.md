# 太陽高度の算出

* [SunCalc.js][] [CDN][SunCalc CDN]

[SunCalc.js]:https://github.com/mourner/suncalc
[SunCalc CDN]:https://cdnjs.com/libraries/suncalc

```js
const times = SunCalc.getTimes(new Date(), 51.5, -0.1);
```

## 座標の取得（経度・緯度）

A. Geolocation API
B. CSV
C. Web API

### A. Geolocation API

　JS標準API。ただしユーザが毎回許可を出す必要あり。GPS付デバイスでないと取得不可。

```js
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

function successCallback(position){
    var latitude = position.coords.latitude; // 緯度
    var longitude = position.coords.longitude; // 経度
    console.log(latitude, longitude)
};

// 取得に失敗した場合の処理
function errorCallback(error){ alert("位置情報が取得できませんでした"); }
```

### B. CSV

　日本の県庁所在地データが公開されている。

* https://www.benricho.org/chimei/latlng_data.html

### C. Web API

https://www.ipvx.info/ipv4/ip-geolocation/maxmind/#result

GeoLite2-ASN-Blocks-IPv4.csv
GeoLite2-Country-Blocks-IPv4.csv
GeoLite2-City-Blocks-IPv4.csv

情報源
　GoogleMap。APIキーなし。クリップボード経由。

* https://wis-labo.com/googlemap/
* http://www.shurey.com/html/googlemaps.html
* https://qiita.com/hiron2225/items/8d5cd1b6728b4d63434b

