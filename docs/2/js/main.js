window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOMContentLoaded!!');
    document.querySelector('#night').addEventListener('change', (e) => {
        colorScheme.isLight = false
        colorScheme.hasBlue = false
    });
    document.querySelector('#noon').addEventListener('change', (e) => {
        colorScheme.isLight = true
        colorScheme.hasBlue = true
    });
    document.querySelector('#is-soft').addEventListener('change', (e) => {
        colorScheme.isSoft = e.currentTarget.checked
        console.log(colorScheme.isSoft)
    });
    document.querySelector('#lightness').addEventListener('change', (e) => {
        colorScheme.isLight = ('noon'===e.currentTarget.value)
    });
    document.querySelector('#has-blue').addEventListener('change', (e) => {
        colorScheme.hasBlue = e.currentTarget.checked
    });
    document.querySelector('#lightness-4').addEventListener('change', (e) => {
    });
    document.querySelector('#blueness-4').addEventListener('change', (e) => {
    });
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});

