document.querySelectorAll('.header-categ.u-effectHeader .header-menu').forEach(element => {
    element.addEventListener('animationend', () => {
        element.style.display = 'none';
    });
});

document.querySelectorAll('.header.u-effectHeader .header-menu').forEach(element => {
    element.addEventListener('animationend', () => {
        element.style.display = 'none';
    });
});
