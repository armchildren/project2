$(document).ready(function() {
    $('.header-content__item').hover(function() {
        $('ul',this).slideDown(400);
    }, function() {
        $('ul', this).slideUp(400);		
    });

    $('.header-burger').click(function(event) {
        $('.header-burger,.header-content').toggleClass('active');
        $('body').toggleClass('lock');
    });
});

