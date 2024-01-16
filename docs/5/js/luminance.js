(function(){
class ColorScheme {
    constructor(isLight=false, hasBlue=false, isSoft=false) {
        this._isLight = isLight
        this._hasBlue = hasBlue
        this._isSoft = isSoft
        this.#setup()
        
    }
    setup() { this._auto = new AutoMode(); this._auto.setup(); }
    get isNightValues( ) { return [false, false, true] }
    get isNoonValues( ) { return [true, true, true] }
    setNight() { this._isLight = false; this._hasBlue = false; this._isSoft = true; }
    setNoon() { this._isLight = true; this._hasBlue = true; this._isSoft = true; }
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
class Sun {
    constructor(latitude, longitude) {
        this._latitude = (latitude) ? latitude : 43.06431      // 札幌市の県庁所在地（緯度）
        this._longitude = (longitude) ? longitude : 141.346879 // 札幌市の県庁所在地（経度）
    }
    isRise(dt, latitude, longitude) { // 太陽が上っているか否か
        if (!dt) { dt = new Date() }
        if (!latitude) { latitude = this._latitude }
        if (!longitude) { longitude = this._longitude }
        return this.#isLight(dt, this.times(dt, latitude, longitude))
    }
    next(dt, latitude, longitude) { // 次に 太陽が沈む or 太陽が上る 最初の時間を返す
        if (!dt) { dt = new Date() }
        if (!latitude) { latitude = this._latitude }
        if (!longitude) { longitude = this._longitude }
        const times = this.times(dt, latitude, longitude)
        if      (dt.getTime() < times.sunriseEnd.getTime()) { return ['sunriseEnd', times] }
        else if (dt.getTime() < times.sunset.getTime()) { return ['sunset', times] }
        else {
            const tomorrow = new Date(dt.getTime() + 1000*60*60*24)
            const nextTimes = this.times(tomorrow, latitude, longitude)
            console.log(dt)
            console.log('dt.getTime():', dt.getTime())
            console.log(':', nextTimes.sunriseEnd.getTime())
            console.log(':', nextTimes.sunset.getTime())
            if      (dt.getTime() < nextTimes.sunriseEnd.getTime()) { return ['sunriseEnd', nextTimes] }
            else if (dt.getTime() < nextTimes.sunset.getTime()) { return ['sunset', nextTimes] }
            throw new Error('Sun.next()の取得に失敗しました。')
        }
    }
    times(dt, latitude, longitude) { return SunCalc.getTimes(((dt) ? dt : new Date()), ((latitude) ? latitude : this._latitude), ((longitude) ? longitude : this._longitude)) }
    #isLight(dt, times) {
        console.log(dt, times)
        const n = dt.getTime()
        const re = times.sunriseEnd.getTime() // 日出（太陽の全てが地平線から現れる時刻）
        const s = times.sunset.getTime()      // 日入（太陽が地平線にくっつく時刻）
        return ((re < n) && (n < s))
    }
    get latitude( ) { return this._latitude }
    set latitude(v) { if (Number.isFinite(v)) { this._latitude = v } }
    get longitude( ) { return this._longitude }
    set longitude(v) { if (Number.isFinite(v)) { this._longitude = v } }
}
window.colorScheme = new ColorScheme()
window.sun = new Sun()
class AutoMode {
    constructor() {
        this._isLaunch = true  // 起動時に自動設定するか否か
        this._isWorking = true // 起動中に自動設定するか否か
        this._isLock = true // 日没中は黒に固定するか否か
//        this._isLockNight = true // 日没中は黒に固定するか否か
//        this._isLockNoon = true // 日中は白に固定するか否か
        this._isWorkingFn = null
        this._isLockFn = null
    }
    get isLaunch( ) { return this._isLaunch }
    set isLaunch(v) { this._isLaunch = v }
    get isWorking( ) { return this._isWorking }
    set isWorking(v) { this._isWorking = v }
    get isLock( ) { return this._isLock }
    set isLock(v) { this._isLock = v }
//    get isLockNight( ) { return this._isLockNight }
//    set isLockNight(v) { this._isLockNight = v }
//    get isLockNoon( ) { return this._isLockNoon }
//    set isLockNoon(v) { this._isLockNoon = v }
    launch() {
        if (!this.isLaunch) { return }
        this.#setColor(sun.isRise())
    }
    working() {
        if (!this.isWorking) { return }
        const [key, times] = sun.next()
        const t = times[key].getTime() - new Date().getTime()

        console.log('AutoMode.working():', this.#msToHms(t), '後に', key)
        //console.log('AutoMode.working():', Math.floor(t/1000/60/60), '時間', Math.floor((t-(Math.floor(t/1000/60/60)))/1000/60), '分後に', key)
        if (this._isWorkingFn) { clearTimeout(this._isWorkingFn) }
        this._isWorkingFn = setTimeout(()=>{this.#setColor((key==='sunriseEnd')); this.working();}, t)
    }
    lock() {
        if (!this.isLock) { return }
        const [key, times] = sun.next()
        const t = times[key].getTime() - new Date().getTime()
        console.log('AutoMode.lock():', Math.floor(t/1000/60/60), '時間', Math.floor(t/1000/60), '分後に', key)
        //if (this._isLockFn) { clearTimeout(this._isLockFn) }
        //this._isLockFn = setTimeout(()=>{colorScheme.isLockLight = (key==='sunset'); this.working();}, t) // isLockLightは未実装
    }
    setup() {
        this.launch()
        this.working()
        //this.lockLight()
    }
    #setColor(isLight) {
        colorScheme.isLight = isLight
        colorScheme.isSoft = true
        colorScheme.hasBlue = (isLight)
    }
    #msToHms(ms) {
        const h = Math.floor(ms/1000/60/60)
        const m = Math.floor((ms-(h*1000*60*60))/1000/60)
        const s = Math.floor((ms-(h*1000*60*60)-(m*1000*60))/1000)
        return `${h}時間${m}分${s}秒`
    }
}

})()
