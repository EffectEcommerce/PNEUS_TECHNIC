document.addEventListener('DOMContentLoaded', function() {
    let timeoutId;
    
    function handleResize() {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            const titles = document.querySelectorAll('.title-footer');
            
            titles.forEach(title => {
                let list = title.nextElementSibling;
                while (list && !list.classList.contains('list-footer')) {
                    list = list.nextElementSibling;
                }
    
                if (list) {
                    if (window.innerWidth <= 500) {
                        list.style.display = 'none';
    
                        title.removeEventListener('click', toggleDisplay);
                        title.addEventListener('click', toggleDisplay);
                    } else {
                        list.style.display = ''; 
                        title.removeEventListener('click', toggleDisplay);
                    }
                }
            });
        }, 100);
    }

    function toggleDisplay() {
        let list = this.nextElementSibling;
        while (list && !list.classList.contains('list-footer')) {
            list = list.nextElementSibling;
        }

        if (list) {
            list.style.display = (list.style.display === 'none' ? 'block' : 'none');

            // Encontre o elemento da seta
            const arrow = this.querySelector('.arrow-open');
            if (arrow) {
                if (list.style.display === 'block') {
                    arrow.classList.remove('flecha-fechada');
                    arrow.classList.add('flecha-aberta');
                } else {
                    arrow.classList.remove('flecha-aberta');
                    arrow.classList.add('flecha-fechada');
                }
            }
        }
    }

    handleResize();
    window.addEventListener('resize', handleResize);
});
