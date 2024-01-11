window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOMContentLoaded!!');
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

