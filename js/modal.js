const modalBtn = document.querySelector('.intro__link');
const closeBtn = document.querySelector('.btn__close');

modalBtn.addEventListener('click', function() {

    const modal = document.querySelector('.modal');
    modal.style.display = "block";

    closeBtn.addEventListener('click', function() {
    modal.style.display = "none";
    });

});

