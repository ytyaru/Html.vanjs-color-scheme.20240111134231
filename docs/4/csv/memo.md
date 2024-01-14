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


## 日本地図による座標入力

* https://yugokimura.github.io/jmap/

日本    47都道府県

東日本	　23=1+6+7+9   北海道地方、東北地方、関東地方、中部地方
西日本	　24=7+5+4+8   近畿地方、中国地方、四国地方、九州地方

日本の８地方

北海道地方	　北海道
東北地方	　青森県、岩手県、宮城県、秋田県、山形県、福島県　【6県】
関東地方	　東京都、茨城県、栃木県、群馬県、埼玉県、千葉県、神奈川県　【1都6県】
中部地方	　新潟県、富山県、石川県、福井県、山梨県、長野県、岐阜県、静岡県、愛知県　【9県】
近畿地方	　京都府、大阪府、三重県、滋賀県、兵庫県、奈良県、和歌山県　【2府5県】
中国地方	　鳥取県、島根県、岡山県、広島県、山口県　【5県】
四国地方	　徳島県、香川県、愛媛県、高知県　【4県】
九州地方	　福岡県、佐賀県、長崎県、大分県、熊本県、宮崎県、鹿児島県、沖縄県　【8県】
