
document.querySelectorAll('.menuMobile  .menu-firstLevel.subList').forEach(itemMenu => {

    let itemDiv = itemMenu.querySelector('.menu-link-div');

    itemDiv.classList.add('enable-mobile');
    
    itemMenu.addEventListener('click', (event) => {
       
        // Obter o submenu correspondente ao item clicado
        let subMenu = itemMenu.querySelector('.menu-secondLevel');
        
        // Verificar se o submenu existe
        if (subMenu) {
            // Se o submenu estiver aberto, fechá-lo
            if (subMenu.style.display === "block") {
                itemDiv.classList.remove('disable-mobile');
                itemDiv.classList.add('enable-mobile');
                subMenu.style.display = "none";

            } else {
                // Fechar todos os outros submenus
                document.querySelectorAll('.menu-secondLevel').forEach(subItemMenu => {
                    subItemMenu.style.display = "none";
                    subItemMenu.parentElement.children[0].classList.remove('disable-mobile');
                    subItemMenu.parentElement.children[0].classList.add('enable-mobile');
                });
                
                itemMenu.querySelectorAll('.menu-link-div').forEach(x =>{
                })

                itemDiv.classList.add('disable-mobile');
                itemDiv.classList.remove('enable-mobile');
                subMenu.style.display = "block";
            }
        }
               
    });
});