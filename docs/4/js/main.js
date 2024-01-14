window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOMContentLoaded!!');
    document.querySelector('#night').addEventListener('change', (e) => {
        colorScheme.isLight = false
        colorScheme.hasBlue = false
        document.querySelector('#has-blue').checked = false
    });
    document.querySelector('#noon').addEventListener('change', (e) => {
        colorScheme.isLight = true
        colorScheme.hasBlue = true
        document.querySelector('#has-blue').checked = true
    });
    document.querySelector('#is-soft').addEventListener('change', (e) => {
        colorScheme.isSoft = e.currentTarget.checked
    });
    document.querySelector('#has-blue').addEventListener('change', (e) => {
        colorScheme.hasBlue = e.currentTarget.checked
    });
    /*
    document.querySelector('#lightness').addEventListener('change', (e) => {
        colorScheme.isLight = ('noon'===e.currentTarget.value)
    });
    document.querySelector('#lightness-4').addEventListener('change', (e) => {
    });
    document.querySelector('#blueness-4').addEventListener('change', (e) => {
    });
    */

    if (sunshine.isSunrizing()) {
        document.querySelector('#noon').checked = true
        document.querySelector('#is-soft').checked = true
        document.querySelector('#has-blue').checked = false
    } else {
        document.querySelector('#night').checked = true
        document.querySelector('#is-soft').checked = true
        document.querySelector('#has-blue').checked = false
    }
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});

