$(document).ready(function () {
	$('.header-content__item').hover(function(){
		$('ul', this).slideDown(400);
	},function(){
		$('ul', this).slideUp(400);			   
	});

	if ($(window).width() < 767) {
		$('.header-content__list').append(`<li class="header-content__item">
		<a href="#" class="link header-content__link">Вход</a>
	</li>`);
	}
	
	$('.header-burger').click(function(event) {
		$('.header-burger,.header-content').toggleClass('active');
		$('body').toggleClass('lock');
	});
});


function scrollToTop() {
	const offset = 100;
	const scrollTop = document.createElement('div');
	scrollTop.classList.add('scroll');
	document.body.prepend(scrollTop);

	window.addEventListener('scroll', function() {
		if (window.pageYOffset > offset) {
			scrollTop.classList.add('scroll--active');
		}
		else {
			scrollTop.classList.remove('scroll--active');
		}
	})

	scrollTop.addEventListener('click', function() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		})
	});
}

scrollToTop();

$(document).ready(function() {
	let position = 0;
	const slideToShow = 2; // Показываем 2 элемента
	const slideToScoll = 2; // Скролим по 2 элемента
	const container = $('.reviews-slider__container');
	const track = $('.reviews-slider__track');
	const item  = $('.reviews-slider__item');
	const btnPrev = $('.btn-prev');
	const btnNext = $('.btn-next');
	const itemCount = item.length;
	const itemWidth = container.width() / slideToShow;
	const movePosition = slideToScoll * itemWidth;

	item.each(function(index, item) {
		$(item).css({
			minWidth: itemWidth,
		});
	});


	btnNext.click(function() {
		const itemsLeft = itemCount - (Math.abs(position) + slideToShow * itemWidth) / itemWidth;
		position -= itemsLeft >= slideToScoll ? movePosition: itemsLeft * itemWidth

		setPosition()
		checkBtns()
	});

	btnPrev.click(function() {
		const itemsLeft = Math.abs(position) / itemWidth;
		position += itemsLeft >= slideToScoll ? movePosition: itemsLeft * itemWidth;

		setPosition();
        checkBtns();
	});

	const setPosition = () => {
		track.css({
			transform: `translateX(${position}px)`, 
		});
	}

	const checkBtns = () => {
		btnPrev.prop('disabaled', position === 0);
		btnNext.prop(
			'disabaled', 
			position <= -(itemCount - slideToShow) * itemWidth
			);
	}
	checkBtns();
});
