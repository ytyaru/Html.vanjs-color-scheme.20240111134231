(function(){
class Location {
    constructor() {
        this._csv = `都道府県名,市区名,緯度,経度
北海道,札幌市,43.06431,141.346879
青森県,青森市,40.824589,140.740548
岩手県,盛岡市,39.703526,141.152696
宮城県,仙台市,38.268579,140.872072
秋田県,秋田市,39.718626,140.102381
山形県,山形市,38.240434,140.36369
福島県,福島市,37.750029,140.467771
茨城県,水戸市,36.341737,140.446824
栃木県,宇都宮市,36.565912,139.883592
群馬県,前橋市,36.390688,139.060453
埼玉県,さいたま市,35.857033,139.649012
千葉県,千葉市,35.60456,140.123154
東京都,新宿区,35.689501,139.691722
神奈川県,横浜市,35.447734,139.642537
新潟県,新潟市,37.902451,139.023245
富山県,富山市,36.695265,137.211305
石川県,金沢市,36.594606,136.625669
福井県,福井市,36.065209,136.22172
山梨県,甲府市,35.664108,138.568455
長野県,長野市,36.651306,138.180904
岐阜県,岐阜市,35.391174,136.723657
静岡県,静岡市,34.976944,138.383056
愛知県,名古屋市,35.180209,136.906582
三重県,津市,34.730278,136.508611
滋賀県,大津市,35.004513,135.868568
京都府,京都市,35.021242,135.755613
大阪府,大阪市,34.686344,135.520037
兵庫県,神戸市,34.691257,135.183078
奈良県,奈良市,34.685274,135.832861
和歌山県,和歌山市,34.226111,135.1675
鳥取県,鳥取市,35.503449,134.238261
島根県,松江市,35.472293,133.05052
岡山県,岡山市,34.661739,133.935032
広島県,広島市,34.396558,132.459646
山口県,山口市,34.186041,131.470654
徳島県,徳島市,34.065761,134.559286
香川県,高松市,34.340112,134.043291
愛媛県,松山市,33.841642,132.765682
高知県,高知市,33.559722,133.531111
福岡県,福岡市,33.606389,130.417968
佐賀県,佐賀市,33.249351,130.298792
長崎県,長崎市,32.75004,129.867251
熊本県,熊本市,32.7898,130.741584
大分県,大分市,33.23813,131.612645
宮崎県,宮崎市,31.911034,131.423887
鹿児島県,鹿児島市,31.560171,130.558025
沖縄県,那覇市,26.212445,127.680922`
    }
    setup() {
        const csv = this.readCsv()
        document.querySelector('#location-select').append(...this.makeOptions(csv))
        this.#addListener()
        document.querySelector('#location-select').dispatchEvent(new Event('input'))
    }
    readCsv() {
        var result = []
        var lines = this._csv.split('\n').slice(0)
        for(var i=1; i<lines.length; ++i) { result[i] = lines[i].split(',') }
        return result
    }
    makeOptions(csv) { return csv.map(d=>this.makeOption(d)) }
    makeOption(d) {
        const option = document.createElement('option')
        option.setAttribute('value', `${d[2]},${d[3]}`)
        option.innerText = `${d[0]} ${d[1]}`
        return option
    }
    #addListener() {
        document.querySelector('#location-select').addEventListener('input', (event) => {
            const [latitude, longitude] = event.currentTarget.value.split(',').map(v=>parseFloat(v))
            document.querySelector('#latitude').value = latitude
            document.querySelector('#longitude').value = longitude
            sun.latitude = latitude
            sun.longitude = longitude
            colorScheme.setup()
        });
        document.querySelector('#latitude').addEventListener('input', (e) => {
            sun.latitude = e.target.value
            colorScheme.setup()
        });
        document.querySelector('#longitude').addEventListener('input', (e) => {
            sun.longitude = e.target.value
            colorScheme.setup()
        });
    }
}
window.Location = new Location()
})()
