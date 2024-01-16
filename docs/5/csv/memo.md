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

32x32
□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□
□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□
□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□
□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□
□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□
□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□
□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□
□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□
□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□
□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□
□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□
□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□
□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□
□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□
□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□
□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□
□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□
□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□
□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□
□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□
□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□
□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□
□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□
□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□
□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□
□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□
□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□
□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□
□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□
□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□
□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□
□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□
https://yugokimura.github.io/jmap/
https://yugokimura.github.io/jmap/jmap.js
{ code: 1, name: "北海道", full: "", alphabet: "Hokkaido", area8: 1, area11: 1, cordinate: { x: 41, y: 1, z: 29 }, size: { x: 14, y: 4 }, radius: [1, 1, 1, 0], box : { cordinate: { x: 32, y: 2 }, size : { x: 12, y: 3}} },
{ code: 2, name: "青森", full: "県", alphabet: "Aomori", area8: 2, area11: 2, cordinate: { x: 41, y: 5, z: 30 }, size: { x: 12, y: 2 }, radius: [0, 0, 0, 0] },
{ code: 3, name: "岩手", full: "県", alphabet: "Iwate", area8: 2, area11: 2, cordinate: { x: 47, y: 7, z: 33 }, size: { x: 6, y: 2 }, radius: [0, 0, 0, 0] },
{ code: 4, name: "宮城", full: "県", alphabet: "Miyagi", area8: 2, area11: 2, cordinate: { x: 47, y: 9, z: 34 }, size: { x: 6, y: 2 }, radius: [0, 0, 0, 0] },
{ code: 5, name: "秋田", full: "県", alphabet: "Akita", area8: 2, area11: 2, cordinate: { x: 41, y: 7, z: 31 }, size: { x: 6, y: 2 }, radius: [0, 0, 0, 0], box : { cordinate: { x: 30, y: 6 }, size : { x: 12, y: 3}} },
{ code: 6, name: "山形", full: "県", alphabet: "Yamagata", area8: 2, area11: 2, cordinate: { x: 41, y: 9, z: 32 }, size: { x: 6, y: 2 }, radius: [0, 0, 0, 0] },
{ code: 7, name: "福島", full: "県", alphabet: "Fukushima", area8: 2, area11: 2, cordinate: { x: 45, y: 11, z: 39 }, size: { x: 8, y: 2 }, radius: [0, 0, 0, 0] },
{ code: 8, name: "茨城", full: "県", alphabet: "Ibaraki", area8: 3, area11: 3, cordinate: { x: 49, y: 13, z: 42 }, size: { x: 4, y: 3 }, radius: [0, 0, 0, 0] },
{ code: 9, name: "栃木", full: "県", alphabet: "Tochigi", area8: 3, area11: 3, cordinate: { x: 45, y: 13, z: 41 }, size: { x: 4, y: 3 }, radius: [0, 0, 0, 0] },
{ code: 10, name: "群馬", full: "県", alphabet: "Gunma", area8: 3, area11: 3, cordinate: { x: 41, y: 13, z: 40 }, size: { x: 4, y: 3 }, radius: [0, 0, 0, 0] },
{ code: 11, name: "埼玉", full: "県", alphabet: "Saitama", area8: 3, area11: 3, cordinate: { x: 41, y: 16, z: 43 }, size: { x: 8, y: 2 }, radius: [0, 0, 0, 0] },
{ code: 12, name: "千葉", full: "県", alphabet: "Chiba", area8: 3, area11: 3, cordinate: { x: 49, y: 16, z: 46 }, size: { x: 4, y: 5 }, radius: [0, 0, 1, 0] },
{ code: 13, name: "東京", full: "都", alphabet: "Tokyo", area8: 3, area11: 3, cordinate: { x: 41, y: 18, z: 44 }, size: { x: 8, y: 2 }, radius: [0, 0, 0, 0] },
{ code: 14, name: "神奈川", full: "県", alphabet: "Kanagawa", area8: 3, area11: 3, cordinate: { x: 41, y: 20, z: 45 }, size: { x: 8, y: 2 }, radius: [0, 0, 1, 0] },
{ code: 15, name: "新潟", full: "県", alphabet: "Niigata", area8: 4, area11: 4, cordinate: { x: 37, y: 11, z: 35 }, size: { x: 8, y: 2 }, radius: [0, 0, 0, 0] },
{ code: 16, name: "富山", full: "県", alphabet: "Toyama", area8: 4, area11: 4, cordinate: { x: 33, y: 11, z: 26 }, size: { x: 4, y: 2 }, radius: [0, 0, 0, 0] },
{ code: 17, name: "石川", full: "県", alphabet: "Ishikawa", area8: 4, area11: 4, cordinate: { x: 29, y: 10, z: 18 }, size: { x: 4, y: 2 }, radius: [1, 1, 0, 0] },
{ code: 18, name: "福井", full: "県", alphabet: "Fukui", area8: 4, area11: 4, cordinate: { x: 27, y: 12, z: 19 }, size: { x: 6, y: 2 }, radius: [1, 0, 0, 0] },
{ code: 19, name: "山梨", full: "県", alphabet: "Yamanashi", area8: 4, area11: 3, cordinate: { x: 37, y: 17, z: 37 }, size: { x: 4, y: 2 }, radius: [0, 0, 0, 0] },
{ code: 20, name: "長野", full: "県", alphabet: "Nagano", area8: 4, area11: 3, cordinate: { x: 37, y: 13, z: 36 }, size: { x: 4, y: 4 }, radius: [0, 0, 0, 0] },
{ code: 21, name: "岐阜", full: "県", alphabet: "Gifu", area8: 4, area11: 5, cordinate: { x: 33, y: 13, z: 27 }, size: { x: 4, y: 4 }, radius: [0, 0, 0, 0] },
{ code: 22, name: "静岡", full: "県", alphabet: "Shizuoka", area8: 4, area11: 5, cordinate: { x: 37, y: 19, z: 38 }, size: { x: 4, y: 3 }, radius: [0, 0, 0, 1] },
{ code: 23, name: "愛知", full: "県", alphabet: "Aichi", area8: 4, area11: 5, cordinate: { x: 33, y: 17, z: 28 }, size: { x: 4, y: 3 }, radius: [0, 0, 0, 0] },
{ code: 24, name: "三重", full: "県", alphabet: "Mie", area8: 5, area11: 5, cordinate: { x: 29, y: 18, z: 24 }, size: { x: 4, y: 2 }, radius: [0, 0, 0, 0] },
{ code: 25, name: "滋賀", full: "県", alphabet: "Shiga", area8: 5, area11: 6, cordinate: { x: 29, y: 14, z: 22 }, size: { x: 4, y: 2 }, radius: [0, 0, 0, 0] },
{ code: 26, name: "京都", full: "府", alphabet: "Kyoto", area8: 5, area11: 6, cordinate: { x: 25, y: 14, z: 20 }, size: { x: 4, y: 3 }, radius: [1, 0, 0, 0] },
{ code: 27, name: "大阪", full: "府", alphabet: "Osaka", area8: 5, area11: 6, cordinate: { x: 25, y: 17, z: 21 }, size: { x: 4, y: 3 }, radius: [0, 0, 0, 0] },
{ code: 28, name: "兵庫", full: "県", alphabet: "Hyogo", area8: 5, area11: 6, cordinate: { x: 21, y: 15, z: 13 }, size: { x: 4, y: 4 }, radius: [0, 0, 0, 0] },
{ code: 29, name: "奈良", full: "県", alphabet: "Nara", area8: 5, area11: 6, cordinate: { x: 29, y: 16, z: 23 }, size: { x: 4, y: 2 }, radius: [0, 0, 0, 0] },
{ code: 30, name: "和歌山", full: "県", alphabet: "Wakayama", area8: 5, area11: 6, cordinate: { x: 25, y: 20, z: 25 }, size: { x: 6, y: 2 }, radius: [0, 0, 1, 1] },
{ code: 31, name: "鳥取", full: "県", alphabet: "Tottori", area8: 6, area11: 7, cordinate: { x: 17, y: 15, z: 11 }, size: { x: 4, y: 2 }, radius: [0, 0, 0, 0] },
{ code: 32, name: "島根", full: "県", alphabet: "Shimane", area8: 6, area11: 7, cordinate: { x: 13, y: 15, z: 9 }, size: { x: 4, y: 2 }, radius: [0, 0, 0, 0] },
{ code: 33, name: "岡山", full: "県", alphabet: "Okayama", area8: 6, area11: 7, cordinate: { x: 17, y: 17, z: 12 }, size: { x: 4, y: 2 }, radius: [0, 0, 0, 0] },
{ code: 34, name: "広島", full: "県", alphabet: "Hiroshima", area8: 6, area11: 7, cordinate: { x: 13, y: 17, z: 10 }, size: { x: 4, y: 2 }, radius: [0, 0, 0, 0] },
{ code: 35, name: "山口", full: "県", alphabet: "Yamaguchi", area8: 6, area11: 9, cordinate: { x: 9, y: 15, z: 8 }, size: { x: 4, y: 4 }, radius: [0, 0, 0, 0] },
{ code: 36, name: "徳島", full: "県", alphabet: "Tokushima", area8: 7, area11: 8, cordinate: { x: 17, y: 21, z: 17 }, size: { x: 6, y: 2 }, radius: [0, 0, 1, 0] },
{ code: 37, name: "香川", full: "県", alphabet: "Kagawa", area8: 7, area11: 8, cordinate: { x: 17, y: 19, z: 16 }, size: { x: 6, y: 2 }, radius: [0, 1, 0, 0] },
{ code: 38, name: "愛媛", full: "県", alphabet: "Ehime", area8: 7, area11: 8, cordinate: { x: 11, y: 19, z: 14 }, size: { x: 6, y: 2 }, radius: [1, 0, 0, 0] },
{ code: 39, name: "高知", full: "県", alphabet: "Kochi", area8: 7, area11: 8, cordinate: { x: 11, y: 21, z: 15 }, size: { x: 6, y: 2 }, radius: [0, 0, 0, 1] },
{ code: 40, name: "福岡", full: "県", alphabet: "Fukuoka", area8: 8, area11: 9, cordinate: { x: 5, y: 15, z: 4 }, size: { x: 4, y: 2 }, radius: [0, 0, 0, 0] },
{ code: 41, name: "佐賀", full: "県", alphabet: "Saga", area8: 8, area11: 9, cordinate: { x: 1, y: 17, z: 2 }, size: { x: 4, y: 2 }, radius: [0, 0, 0, 0] },
{ code: 42, name: "長崎", full: "県", alphabet: "Nagasaki", area8: 8, area11: 9, cordinate: { x: 1, y: 15, z: 1 }, size: { x: 4, y: 2 }, radius: [1, 0, 0, 0] },
{ code: 43, name: "熊本", full: "県", alphabet: "Kumamoto", area8: 8, area11: 9, cordinate: { x: 1, y: 19, z: 3 }, size: { x: 4, y: 2 }, radius: [0, 0, 0, 0] },
{ code: 44, name: "大分", full: "県", alphabet: "Oita", area8: 8, area11: 9, cordinate: { x: 5, y: 17, z: 5 }, size: { x: 4, y: 2 }, radius: [0, 0, 0, 0] },
{ code: 45, name: "宮崎", full: "県", alphabet: "Miyazaki", area8: 8, area11: 10, cordinate: { x: 5, y: 19, z: 6 }, size: { x: 4, y: 2 }, radius: [0, 0, 0, 0] },
{ code: 46, name: "鹿児島", full: "県", alphabet: "Kagoshima", area8: 8, area11: 10, cordinate: { x: 1, y: 21, z: 7 }, size: { x: 8, y: 2 }, radius: [0, 0, 1, 1] },
{ code: 47, name: "沖縄", full: "県", alphabet: "Okinawa", area8: 8, area11: 11, cordinate: { x: 18, y: 11, z: 47 }, size: { x: 4, y: 2, z: 47 }, radius: [1, 1, 1, 1] }
],
0:  0:北海道
1:  1:青森
2:  2:岩手
3:  3:宮城
4:  4:秋田
5:  5:山形
6:  6:福島
7:  7:茨城
8:  8:栃木
9:  9:群馬
A: 10:埼玉
B: 11:千葉
C: 12:東京
D: 13:神奈川
E: 14:新潟
F: 15:富山
G: 16:石川
H: 17:福井
I: 18:山梨
J: 19:長野
K: 20:岐阜
L: 21 :静岡
M: 22 :愛知
N: 23 :三重
O: 24 :滋賀
P: 25 :京都
Q: 26 :大阪
R: 27 :兵庫
S: 28 :奈良
T: 29 :和歌山
U: 30 :鳥取
V: 31 :島根
W: 32 :岡山
X: 33 :広島
Y: 34 :山口
Z: 35:徳島
a: 36:香川
b: 37:愛媛
c: 38:高知
d: 39:福岡
e: 40:佐賀
f: 41:長崎
g: 42:熊本
h: 43:大分
i: 44:宮崎
j: 45:鹿児島
k: 46:沖縄

32x32
22x20
□□□□□□□□□□□□□□□□□□□□□□□□□□００００００
□□□□□□□□□□□□□□□□□□□□□□□□□□００００００
□□□□□□□□□□□□□□□□□□□□□□□□□□００００００
□□□□□□□□□□□□□□□□□□□□□□□□□□００００００
□□□□□□□□□□□□□□□□□□□□□□□□□□□１１１１□
□□□□□□□□□□□□□□□□□□□□□□□□□□□１１１１□
□□□□□□□□□□□□□□□□□□□□□□□□□□□４４２２□
□□□□□□□□□□□□□□□□□□□□□□□□□□□４４２２□
□□□□□□□□□□□□□□□□□□□□□□□□□□□５５３３□
□□□□□□□□□□□□□□□□□□□□ＧＧ□□□□□５５３３□
□□□□□□□□□□□□□□□□□□□□ＧＧＦＦＥＥＥＥ６６６６
□□□□□□□□□□□□□□□□□□□ＨＨＨＦＦＥＥＥＥ６６６６
□□□□□□□□□□□□□□□□□□□ＨＨＨＫＫＪＪ９９８８７７
□□□□□□□□□□□□□□□□□□□□　　ＫＫＪＪ９９８８７７
□□□□□□□□□□□□□□□□□□□□　　ＫＫＪＪ９９８８７７
□□□□□□□□□□□□□□□□□□□□　　ＫＫＪＪ９９８８７７
□□□□□□□□□□□□□□□□□□□□　　ＫＫＪＪＡＡＡＡＢＢ
□□□□□□□□□□□□□□□□□□□□　　ＫＫＪＪＡＡＡＡＢＢ
□□□□□□□□□□□□□□□□□□□□　　ＭＭＩＩＣＣＣＣＢＢ
□□□□□□□□□□□□□□□□□□□□　　ＭＭＩＩＣＣＣＣＢＢ
□□□□□□□□□□□□□□□□□□□□□□　　ＬＬＤＤＤＤＢＢ
□□□□□□□□□□□□□□□□□□□□□□　　ＬＬＤＤＤＤＢＢ
□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□
□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□
□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□
□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□
□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□
□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□
□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□
□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□
□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□
□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□

