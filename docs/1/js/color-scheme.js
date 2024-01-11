(function(){
/*
      文字色,背景色,リンク色

        yellow     blue
dark  #ff0,#000  #fff,#000
light #000,#ff0  #000,#fff

      #4f0       #ff0
      #080       #00f
*/
class ColorScheme {
    constructor(isLight=false, hasBlue=false) {
        this._isLight = isLight
        this._hasBlue = hasBlue
        this.#setup()
    }
    get isLight( ) { return this._isLight }
    set isLight(v) { this._isLight = v; this.#setup() }
    get hasBlue( ) { return this._hasBlue }
    set hasBlue(v) { this._hasBlue = v; this.#setup() }
    get #value() {
        if      ( this.isLight &&  this.hasBlue) { return 3 }
        else if ( this.isLight && !this.hasBlue) { return 2 }
        else if (!this.isLight &&  this.hasBlue) { return 1 }
        else                                     { return 0 }
    }
    get #back() { return `#${(( this._isLight) ? ('ff' + ((this._hasBlue) ? 'f' : '0')) : '000')}` } // 000,ff0,fff
    get #fore() { return `#${((!this._isLight) ? ('ff' + ((this._hasBlue) ? 'f' : '0')) : '000')}` } // ff0,fff,000
    get #aFore()    {
        if      ( this.isLight &&  this.hasBlue) { return '#00f' }
        else if ( this.isLight && !this.hasBlue) { return '#600' }
        else if (!this.isLight &&  this.hasBlue) { return '#4f0' }
        else                                     { return '#4f0' }
    }
    #setup() {
        this._back = this.#back
        this._fore = this.#fore
        this._a = this.#aFore
        this._selectionFg = this._back
        this._selectionBg = this._fore
        this._aSelectionFg = this._back
        this._aSelectionBg = this._a
        this._caret = this._fore
        this._outline = this._fore
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
        Css.set('--a-selection-color', this._aSelectionFg)
        Css.set('--a-selection-background-color', this._aSelectionBg)
        Css.set('--caret-color', this._caret)
        Css.set('--outline-color', this._outline)
        Css.set('--button-focus-color', this._buttonFocusFg)
        Css.set('--button-focus-background-color', this._buttonFocusBg)
        console.log(Css.get('--background-color'))
        console.log(Css.get('--color'))
    }
//        if (isLight) { this.light(hasBlue) } else { this.dark(hasBlue) }
//        this._fore = '#ff0'
//        this._back = '#000'
//        this.fg = van.state('white')
//        this.bg = van.state('black')
//        this.lock = van.state('unlock')
//        this.blueLight = van.state('max')
//        Css.set('--color', this.fg.val)
//        Css.set('--background-color', this.bg.val)
//        Css.set('--color', this._fore)
//        Css.set('--background-color', this._back)
    /*
    get isLight() { return this.#isBc(['white','#fff','#ffffff','#ffffffff','rgb(255,255,255)']) }
    get isDark() { return this.#isBc(['black','#000','#000000','#00000000','rgb(0,0,0)']) }
    get isBlue() { }
    #isBc(expecteds) { return expecteds.some(expected=>this.back.replace(/\s+/g,'').toLowerCase().startsWith(expected)) }
    #isFc(expecteds) { return expecteds.some(expected=>this.fore.replace(/\s+/g,'').toLowerCase().startsWith(expected)) }
    toggle() {
        console.log(this.isDark, Css.get('--background-color'))
        if (this.isDark) { this.light() } else { this.dark() }
        //if (this.isDark()) { this.lightMinBlue() } else { this.darkMinBlue() }
    }
    addBlue() {
        if (this.hasBlue) {

        }
    }
    dark() {
        this.back = '#000'
        this.fore = '#fff'
        this.a = '#ff0'
        this.selectionBg = '#aa0'
        this.selectionFg = '#000'
        this.aSelectionBg = '#aa0'
        this.aSelectionFg = '#008'
        this.caret = this.fore
        this.outline = this.fore
        this.buttonFocusFg = this.back
        this.buttonFocusBg = this.fore
        this.#setCss()
    }
    light() {
        this.back = '#fff'
        this.fore = '#000'
        this.a = '#00f'
        this.selectionFg = '#ff0'
        this.selectionBg = '#000'
        this.aSelectionFg = '#00f'
        this.aSelectionBg = '#ff0'
        this.caret = this.fore
        this.outline = this.fore
        this.buttonFocusFg = this.back
        this.buttonFocusBg = this.fore
        this.#setCss()
    }
    dark() {
        this.back = '#000'
        this.fore = '#fff'
        this.a = '#ff0'
        this.selectionBg = '#aa0'
        this.selectionFg = '#000'
        this.aSelectionBg = '#aa0'
        this.aSelectionFg = '#008'
        this.caret = this.fore
        this.outline = this.fore
        this.buttonFocusFg = this.back
        this.buttonFocusBg = this.fore
        this.#setCss()
    }
    #setCss() {
        Css.set('--color', this._fore)
        Css.set('--em-color', this._fore)
        Css.set('--a-color', this._a)
        Css.set('--background-color', this._back)
        Css.set('--selection-color', this._selectionFg)
        Css.set('--selection-background-color', this._selectionBg)
        Css.set('--a-selection-color', this._aSelectionFg)
        Css.set('--a-selection-background-color', this._aSelectionBg)
        Css.set('--caret-color', this._caret)
        Css.set('--outline-color', this._outline)
        Css.set('--button-focus-color', this._buttonFocusFg)
        Css.set('--button-focus-background-color', this._buttonFocusBg)
        console.log(Css.get('--a-color'))
    }
    lightMinBlue() {
        this.fg.val = 'black'
        this.bg.val = 'yellow'
        this.a = 'red'
        this.#setCss()
    }
    darkMinBlue() {
        this.fg.val = 'yellow'
        this.bg.val = 'black'
        this.a = 'green'
    }
    // click: 白黒
    // long-click: 青光[軽減／非軽減]  青[有無]
    // long-click: lock（clickで切り替わらなくなる。長押しするたびにロック／解除を切替 🔓🔒🔑）
    // long-click: サブメニュー（hjkli;）
    // softLight/softDark
    // b キー押下: 青光[軽減／非軽減]  青[有無] ＋青　➖青
    // l キー押下: lock（clickで切り替わらなくなる。長押しするたびにロック／解除を切替 🔓🔒🔑）
    */
}
window.colorScheme = new ColorScheme()
})()
