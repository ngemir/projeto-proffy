// Procurar o botao
document.querySelector("#add-time")

//Quando clicar no botao
.addEventListener('click', cloneField);


//Executar uma ação
function cloneField() {
    //Duplicar os campos
    const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true);
    
    //limpar os campos
    const fields = newFieldContainer.querySelectorAll('input');
    
    // fields[0].value = "";
    // fields[1].value = "";
    // Melhor ↓
    fields.forEach(function(field) {
        field.value = "";
    })


    //Colocar na página
     document.querySelector('#schedule-items').appendChild(newFieldContainer);
    
}