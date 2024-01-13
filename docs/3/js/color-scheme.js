(function(){
class ColorScheme {
    constructor(isLight=false, hasBlue=false, isSoft=false) {
        this._isLight = isLight
        this._hasBlue = hasBlue
        this._isSoft = isSoft
        this.#setup()
    }
    get isLight( ) { return this._isLight }
    set isLight(v) { this._isLight = v; this.#setup() }
    get hasBlue( ) { return this._hasBlue }
    set hasBlue(v) { this._hasBlue = v; this.#setup() }
    get isSoft( ) { return this._isSoft }
    set isSoft(v) { this._isSoft = v; this.#setup() }
    get #back() { return this.#toSoft(`#${(( this._isLight) ? ('ff' + ((this._hasBlue) ? 'f' : '0')) : '000')}`) } // 000,ff0,fff
    get #fore() { return this.#toSoft(`#${((!this._isLight) ? ('ff' + ((this._hasBlue) ? 'f' : '0')) : '000')}`) } // ff0,fff,000
    #toSoft(hex) { const v = ((this._isSoft) ? hex.replace(/f/g, 'd') : hex); return ((this._isBlue) ? v.replace(/0/g, '2') : v); }
    get #aFore()    { return this.#toSoft(this.#_aFore) }
    get #thBack()   { return this.#toSoft(this.#_thBack) }
    get #_aFore()    {
        if      ( this.isLight &&  this.hasBlue) { return '#00f' }
        else if ( this.isLight && !this.hasBlue) { return '#600' }
        else if (!this.isLight &&  this.hasBlue) { return '#4f0' }
        else                                     { return '#4f0' }
    }
    get #_thBack()    {
        if      ( this.isLight &&  this.hasBlue) { return '#ffa' }
        else if ( this.isLight && !this.hasBlue) { return '#ff0' }
        else if (!this.isLight &&  this.hasBlue) { return '#440' }
        else                                     { return '#420' }
    }
    #setup() {
        this._back = this.#back
        this._fore = this.#fore
        this._a = this.#aFore
        this._selectionFg = this._back
        this._selectionBg = this._fore
        this._markFg = this._back
        this._markBg = this._fore
        this._aSelectionFg = this._back
        this._aSelectionBg = this._a
        this._caret = this._fore
        this._outline = this._fore
        this._border = this._fore
        this._thBg = this.#thBack
        this._buttonFocusFg = this._back
        this._buttonFocusBg = this._fore
        this.#setCss()
    }
    #setCss() {
        Css.set('--color', this._fore)
        Css.set('--em-color', this._fore)
        Css.set('--a-color', this._a)
        Css.set('--background-color', this._back)
        Css.set('--selection-color', this._selectionFg)
        Css.set('--selection-background-color', this._selectionBg)
        Css.set('--mark-color', this._markFg)
        Css.set('--mark-background-color', this._markBg)
        Css.set('--a-selection-color', this._aSelectionFg)
        Css.set('--a-selection-background-color', this._aSelectionBg)
        Css.set('--caret-color', this._caret)
        Css.set('--outline-color', this._outline)
        Css.set('--border-color', this._border)
        Css.set('--th-background-color', this._thBg)
        Css.set('--button-focus-color', this._buttonFocusFg)
        Css.set('--button-focus-background-color', this._buttonFocusBg)
        console.log(Css.get('--background-color'))
        console.log(Css.get('--color'))
    }
}
// 日照時間予想（日時、座標）
class Sunshine { // 日照時間予想（0:日の出〜一時間後内、1:日の出から一時間後〜日の入り一時間前迄、2:一時間前〜日の入り、3:日の入り〜日の出一時間前迄）
    // ほぼ確実に明い：0:日出から一時間後〜日入一時間前 isLight
    // ほぼ確実に暗い：1:日出より一時間前〜日入一時間後 isDark
    // 明いと思うけど暗いかも？：isHalfLight
    // 暗いと思うけど明いかも？：isHalfDark
    constructor() {
        console.log('現在日時:', new Date())
        this._sunData = new SunshineData()
        this._location = SunshineData.Datas()['東京'] // 現在座標（基準日照日時）
//        this._basedAt = Date.now() // 基準日時（アプリ起動時間/sunrise/sunset）
//        this._base = SunshineData.calc(this._location, this._basedAt) // 現在の予想日照日時
        this.#update()
    }
    isSunrizing(date=null) {
        if (!date) { date = new Date() }
        return (this._base.sunrise.getTime() <= date.getTime() && date.getTime() <= this._base.sunset.getTime())
    }
    #update() { // 予想日照日時を更新する
        // 現在日時から直近の未来の日時を次のsunrise,sunsetから取得し、その日時になったら一度だけ実行する。内容はlaunched,base更新
        // 現在の基準日照日時を取得する
        this.#updateBase()
        // 現在日時から直近の未来の日時を取得する
        const recentDt = this.#recentFutureDate()
        console.log(`${recentDt.getFullYear()}-${recentDt.getMonth()+1}-${recentDt.getDate()}`)
        // 何ms後
        const t = recentDt.getTime() - Date.now()
        console.log(`${t/1000/60/60}分後。`, `${t/1000/60}時間後。`)
        setTimeout(()=>this.#update.bind(this), t)
        //setTimeout(()=>this.#updateBase.bind(this), t)
        //setTimeout(()=>this.update.bind(this), t)
    }
    #updateBase() {
        this._basedAt = Date.now() // 基準日時（アプリ起動時間/sunrise/sunset）
        this._base = this._sunData.calc(this._location, this._basedAt) // 現在の予想日照日時
    }
    #recentFutureDate() { // 直近の未来の日時を返す（予想日照時間の中から）
        const now = new Date()
        console.log('#recentFutureDate()', now, this._base)
        if      (now.getTime() < this._base.sunrise.getTime()) { return this._base.sunrise }
        else if (now.getTime() < this._base.sunset.getTime()) { return this._base.sunset }
        now.setDate(now.getDate() + 1)
        const tomorrow = this._sunData.calc(this._location, now)
        if      (now.getTime() < tomorrow.sunrise.getTime()) { return tomorrow.sunrise }
        else if (now.getTime() < tomorrow.sunset.getTime()) { return tomorrow.sunset }
        throw new Error('直近の未来の日時を返せなかった…')
    }
    get isLight() {
        this._base.sunrise
        this._base.sunset
    }

    get isSunrizeBefore() { return }
    get isSunrizeAfter() { return }
    get isSunsetBefore() { return }
    get isSunsetAfter() { return }
    get isSunrizeBeforeHouer() { return }
    get isSunrizeAfterHouer() { return }
    get isSunsetBeforeHouer() { return }
    get isSunsetAfterHouer() { return }
}
class SunshineData {
    constructor() {
        this._launched = new Date(Date.now()) // アプリ起動日時
        this._location = SunshineData.Datas()['東京']
    }
    static get Solstice() { return {
        'summer':'06-21', // 夏至（一年のうち最も日照時間が長い日）2023年時
        'winter':'12-22', // 冬至（一年のうち最も日照時間が短い日）2023年時
    }}
    static Datas() { return {
        '札幌':{'summer':{'sunrise':'03:54', 'sunset':'19:18'}, 'winter':{'sunrise':'07:03', 'sunset':'16:03'}},
        '東京':{'summer':{'sunrise':'04:24', 'sunset':'19:00'}, 'winter':{'sunrise':'06:47', 'sunset':'16:32'}},
        '大阪':{'summer':{'sunrise':'04:44', 'sunset':'19:15'}, 'winter':{'sunrise':'07:01', 'sunset':'16:51'}},
        '福岡':{'summer':{'sunrise':'05:08', 'sunset':'19:32'}, 'winter':{'sunrise':'07:19', 'sunset':'17:14'}},
    }}
    calc(loc, dt) { // 日照時間帯と現在日時から、現在日時の予想日照時間帯を返す
        // 1. 夏至〜冬至の日照時間の差分を取得する
        // 2. 1を365で割って一日あたりの変化量を推測する（等速直線運動と仮定している。実際は違う）
        // 3. 夏至を基準にして現在日時が過去なら夏至の[sunrise|sunset]から2を加算する。未来なら2を減算する。
        /*
        console.log(this._launched)
        console.log(`${this._launched.getFullYear()}-${SunshineData.Solstice.winter} ${this._location.winter.sunrise}`)
        console.log(this._location)
        console.log(this._location.winter)
        console.log(this._location.winter.sunrise)
        console.log(this._location.winter['sunrise'])
        */
        const winRise = this.#date(`${this._launched.getFullYear()}-${SunshineData.Solstice.winter} ${this._location.winter.sunrise}`)
        /*
        console.log(`${this._launched.getFullYear()}-${SunshineData.Solstice.summer} ${this._location.summer.sunrise}`)
        console.log(`${this._launched.getFullYear()}-${SunshineData.Solstice.winter} ${this._location.winter.sunset}`)
        console.log(`${this._launched.getFullYear()}-${SunshineData.Solstice.summer} ${this._location.summer.sunset}`)
        */
        const sumRise = this.#date(`${this._launched.getFullYear()}-${SunshineData.Solstice.summer} ${this._location.summer.sunrise}`)
        const winSet = this.#date(`${this._launched.getFullYear()}-${SunshineData.Solstice.winter} ${this._location.winter.sunset}`)
        const sumSet = this.#date(`${this._launched.getFullYear()}-${SunshineData.Solstice.summer} ${this._location.summer.sunset}`)
        console.log('winRise:', this.#hhmmss(winRise))
        console.log('winSet:', this.#hhmmss(winSet))
        console.log('sumRise:', this.#hhmmss(sumRise))
        console.log('sumSet:', this.#hhmmss(sumSet))
//        const winRise = `${this._launched.getFullYear()}-${SunshineData.Solstice.winter} ${this._location.winter.sunrise}`
//        const sumRise = `${this._launched.getFullYear()}-${SunshineData.Solstice.summer} ${this._location.summer.sunrise}`
//        const winSet = `${this._launched.getFullYear()}-${SunshineData.Solstice.winter} ${this._location.winter.sunset}`
//        const sumSet = `${this._launched.getFullYear()}-${SunshineData.Solstice.summer} ${this._location.summer.sunset}`
//        console.log('夏至〜冬至の日出差:', this.#span(winRise, sumRise)/1000/60)
//        console.log('夏至〜冬至の日入差:', this.#span(sumSet, winSet)/1000/60)
        const diffRise = Math.abs(this.#getTimeSpan(winRise, sumRise))
        const diffSet = Math.abs(this.#getTimeSpan(sumSet, winSet))
        console.log('夏至〜冬至の日出差:', diffRise/1000/60/60, '時間差')
        console.log('夏至〜冬至の日入差:', diffSet/1000/60/60, '時間差')
        
        const diff = {'sunrise':this.#span(winRise, sumRise), 'sunset':this.#span(sumSet, winSet)}
        const daylyValue = {'sunrise':diff.sunrise/365, 'sunset':diff.sunset/365}
        console.log('daylyValue:', daylyValue)
        console.log(daylyValue.sunrise / 1000 / 60 / 60 ) // 一日毎に12分ずれていく
        //const summerSol = this.#date(`${this._launched.getFullYear()}-${SunshineData.Solstice.summer}`)
//        const summerSol = new Date(`${this._launched.getFullYear()}-${SunshineData.Solstice.summer}`)
//        const winterSol = new Date(`${this._launched.getFullYear()}-${SunshineData.Solstice.summer}`)
        //const diffNow = summerSol.getTime() - Date.now().getTime()
        //const diffNow = this.#span(summerSol, Date.now())
 //       const diffNow = this.#span(new Date(summerSol), new Date())
        const [isSummerSeason, diffNow] = this.#nearSummer()
        const diffNowDays = (diffNow /1000 / 60 / 60 / 24)
        //return {'sunrise':this.#date(diffNowDays * daylyValue.sunrise), 'sunset':diffNowDays * daylyValue.sunset}
//        console.log(summerSol)
        console.log(diffNow, diffNow/1000/60/60/24)
        console.log(diffNowDays, '日差')
        //return {'sunrise':new Date(summerSol.getTime() - (diffNowDays * daylyValue.sunrise)), 'sunset':new Date(summerSol.getTime() - (diffNowDays * daylyValue.sunset))}
//        const sunrise = new Date(sumRise.getTime() + (diffNowDays * daylyValue.sunrise))
//        const sunset = new Date(sumSet.getTime() - (diffNowDays * daylyValue.sunset))
        const sunrise = new Date(sumRise.getTime() + ((diffNowDays * daylyValue.sunrise) * ((isSummerSeason) ?  1 : -1)))
        const sunset = new Date(sumSet.getTime() + ((diffNowDays * daylyValue.sunset) * ((isSummerSeason) ? -1 :  1)))
        console.log(sunrise)
        console.log(sunset)
        //return {'sunrise':new Date(sumRise.getTime() - (diffNowDays * daylyValue.sunrise)), 'sunset':new Date(sumRise.getTime() - (diffNowDays * daylyValue.sunset))}
        const now = new Date()
        return {'sunrise':new Date(`${this.#yymmdd(now)} ${this.#hhmmss(sunrise)}`), 'sunset':new Date(`${this.#yymmdd(now)} ${this.#hhmmss(sunset)}`)}
    }
    #nearSummer() { // 夏至／冬至のどちらに近いか。近いほうのsunrise/sunsetを使う。加算・減算が逆転する。
        const summerSol = new Date(`${this._launched.getFullYear()}-${SunshineData.Solstice.summer}`)
        const winterSol = new Date(`${this._launched.getFullYear()}-${SunshineData.Solstice.winter}`)
        const now = new Date()
        const diffSumNow = this.#span(summerSol, now)
        const diffWinNow = this.#span(winterSol, now)
        console.log('diffSumNow:', diffSumNow)
        console.log('diffWinNow:', diffWinNow)
        console.log('now       :', now.getTime())
        console.log((diffSumNow < diffWinNow))
        if (diffSumNow < diffWinNow) { return [true,  diffSumNow] }
        else                         { return [false, diffWinNow] }
    }
    #date(s) { return new Date(`${s}:00`) }
    //#span(d1, d2) { return Math.abs(d1.getTime() - d2.getTime()) } // 秒
    #span(d1, d2) { return Math.abs(new Date(d1).getTime() - new Date(d2).getTime()) } // ms
    #getTimeSpan(d1, d2) {
        console.log(new Date('2000-01-01'))
        console.log(new Date('2000-01-01 00:00:00'))
        console.log(new Date('2000-01-01 06:47:00'))
        const _d1 = new Date(`2000-01-01 ${d1.getHours().toString().padStart(2,'0')}:${d1.getMinutes().toString().padStart(2,'0')}:${d1.getSeconds().toString().padStart(2,'0')}`)
        const _d2 = new Date(`2000-01-01 ${d2.getHours().toString().toString().padStart(2,'0')}:${d2.getMinutes().toString().padStart(2,'0')}:${d2.getSeconds().toString().padStart(2,'0')}`)
        console.log(`2000-01-01 ${d1.getHours().toString().padStart(2,'0')}:${d1.getMinutes().toString().padStart(2,'0')}:${d1.getSeconds().toString().padStart(2,'0')}`)
        console.log(_d1)
        console.log(_d2)
        return _d1.getTime() - _d2.getTime()
    }
    #pad(i) { return i.toString().padStart(2, '0') }
    #hhmmss(dt) { return `${this.#pad(dt.getHours())}:${this.#pad(dt.getMinutes())}:${this.#pad(dt.getSeconds())}` }
    #yymmdd(dt) { return `${this.#pad(dt.getFullYear())}-${this.#pad(dt.getMonth()+1)}-${this.#pad(dt.getDate())}` }

    /*
    #getTimeSpan(diff) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        diff -= hours * (1000 * 60 * 60);

        const mins = Math.floor(diff / (1000 * 60));
        diff -= mins * (1000 * 60);

        const seconds = Math.floor(diff / (1000));
        diff -= seconds * (1000);
    }
    */
    /*
    `${this._launched.getFullYear()}-${SunshineData.Solstice.summer}` // 今年の予想夏至（本当は毎年可変だけど2023年のを流用する）
    `${this._launched.getFullYear()}-${SunshineData.Solstice.winter}` // 今年の予想冬至（本当は毎年可変だけど2023年のを流用する）
    `${this._launched.getFullYear()}-${SunshineData.Solstice.summer} ${this._location.summer.sunrise}` // 今年の夏至のココの日出時刻
    `${this._launched.getFullYear()}-${SunshineData.Solstice.summer} ${this._location.summer.sunset}`  // 今年の夏至のココの日入時刻
    `${this._launched.getFullYear()}-${SunshineData.Solstice.winter} ${this._location.winter.sunrise}` // 今年の冬至のココの日出時刻
    `${this._launched.getFullYear()}-${SunshineData.Solstice.winter} ${this._location.winter.sunset}`  // 今年の冬至のココの日入時刻
    Date.getFullYear()
    */
}
window.colorScheme = new ColorScheme()
window.sunshine = new Sunshine()
})()
