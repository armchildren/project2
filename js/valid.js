const form = document.getElementById('form');
let name = document.getElementById('forName');
let tel = document.getElementById('forTel');
let forEmail = document.getElementById('forEmail');

form.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    let error = validate(form);
    
    let formData = {
        name: name.value,
        tel:  tel.value,
        email: forEmail.value
    };
    
    if(error == true) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/');
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.onload = function() {
            console.log(xhr.responseText);
            if(xhr.responseText == 'success') {
                alert('Email sent');
                name.value = '';
                tel.value = '';
                forEmail.value = '';
            }
            else {
                alert('Eror');
            }
        }
        xhr.send(JSON.stringify(formData));
    }
    
});


function validate(form) {
    const prov = document.querySelectorAll('.form__input');
    const email = document.getElementById('forEmail').value;
    let flag = true;
    let reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    prov.forEach((item) => {
        formRemErr(item);
        if(item.value == "") {
            formAddErr(item);
            flag = false;
        }
        if(reg.test(email) == false) {
            formAddErr(item);
            flag = false;
        }
    });
    return flag;
}

function formAddErr(input) {
    input.classList.add('prov');
}

function formRemErr(input) {
    input.classList.remove('prov');
}

function formEmailErr(input) {
    return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(input);
}