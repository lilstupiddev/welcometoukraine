$(document).ready(function () {
    $(window).scroll(function(event) {
        const s = $(this).scrollTop();
        const w = $(this).outerWidth();
        const h = $('.content').outerHeight();
        const h_b = $('.parallax').outerHeight();
        const p = s/h*100;
        const p_b = s/h_b*100;
        const o = 1-1/100*p_b;
        const content = document.getElementsByClassName('content');

        const z_1 = 1+(w/10000*p_b);
        $('.parallax_fog').css('transform','scale('+z_1+')');
        $('.parallax_fog').css('opacity', o);

        const z_2 = 1+(w/5000000*p);
        $('.parallax_mountain_1').css('transform','scale('+z_2+')');

        const hr = w/2000*p_b;
        const z_3 = 1+(w*0.000005*p_b);
        $('.parallax_mountain_2').css('transform', 'translate3d('+hr+'px,0,0) scale('+z_3+')');

        const hr_2 = w/1500*p_b;
        const z_4 = 1+(w*0.00001*p_b);
        $('.parallax_mountain_3').css('transform', 'translate3d('+hr_2+'px,0,0) scale('+z_4+')');

        if($('.parallax_fog').css('opacity', o)){
            $('.content_article').css('z-index', '4');
        }
    });
});


$(window).on("load",function(){
    $(".loader-container").fadeOut(2000);
});



var ebModal = document.getElementById('mySizeChartModal');
ebModal.classList.add("closed-div");

var ebBtn = document.getElementById("mySizeChart");

var ebSpan = document.getElementsByClassName("close")[0];


ebBtn.onclick = function() {
    ebModal.classList.remove("closed-div");
    window.onclick = function(event) {
        if (event.target == ebModal) {
            ebModal.classList.add("closed-div");
        }
    }
}

ebSpan.onclick = function() {
    ebModal.classList.add("closed-div");
}







var ebModal2 = document.getElementById('mySizeChartModal2');
ebModal2.classList.add("closed-div");

var ebBtn2 = document.getElementById("mySizeChart2");

var ebSpan2 = document.getElementsByClassName("close2")[0];



ebBtn2.onclick = function() {
    ebModal2.classList.remove("closed-div");
    window.onclick = function(event) {
        if (event.target == ebModal2) {
            ebModal2.classList.add("closed-div");
        }
    }
}

ebSpan2.onclick = function() {
    ebModal2.classList.add("closed-div");
}


var ebModal3 = document.getElementById('mySizeChartModal3');
ebModal3.classList.add("closed-div");

var ebBtn3 = document.getElementById("mySizeChart3");

var ebSpan3 = document.getElementsByClassName("close3")[0];



ebBtn3.onclick = function() {
    ebModal3.classList.remove("closed-div");
    window.onclick = function(event) {
        if (event.target == ebModal3) {
            ebModal3.classList.add("closed-div");
        }
    }
}

ebSpan3.onclick = function() {
    ebModal3.classList.add("closed-div");
}



const carouselFrame = document.querySelector('.carousel-frame');
const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = getImagesPlusClones();
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');
const navDots = Array.from(document.querySelectorAll('.carousel-dots li'));

let imageCounter = 1;

function getImagesPlusClones() {
  let images = document.querySelectorAll('.carousel-slide img');

  const firstClone = images[0].cloneNode();
  const lastClone = images[images.length - 1].cloneNode();

  firstClone.className = 'first-clone';
  lastClone.className = 'last-clone';

  // we need clones to make an infinite loop effect
  carouselSlide.append(firstClone);
  carouselSlide.prepend(lastClone);

  // must reassign images to include the newly cloned images
  images = document.querySelectorAll('.carousel-slide img');

  return images;
}

function initializeNavDots() {
  if (navDots.length) navDots[0].classList.add('active-dot');
}

function initializeCarousel() {
  carouselSlide.style.transform = 'translateX(-100%)';
}

function slideForward() {
  // first limit counter to prevent fast-change bugs
  if (imageCounter >= carouselImages.length - 1) return;
  carouselSlide.style.transition = 'transform 400ms';
  imageCounter++;
  carouselSlide.style.transform = `translateX(-${100 * imageCounter}%)`;
}

function slideBack() {
  // first limit counter to prevent fast-change bugs
  if (imageCounter <= 0) return;
  carouselSlide.style.transition = 'transform 400ms';
  imageCounter--;
  carouselSlide.style.transform = `translateX(-${100 * imageCounter}%)`;
}

function makeLoop() {
  // instantly move from clones to originals to produce 'infinite-loop' effect
  if (carouselImages[imageCounter].classList.contains('last-clone')) {
    carouselSlide.style.transition = 'none';
    imageCounter = carouselImages.length - 2;
    carouselSlide.style.transform = `translateX(-${100 * imageCounter}%)`;
  }

  if (carouselImages[imageCounter].classList.contains('first-clone')) {
    carouselSlide.style.transition = 'none';
    imageCounter = carouselImages.length - imageCounter;
    carouselSlide.style.transform = `translateX(-${100 * imageCounter}%)`;
  }
}

function goToImage(e) {
  carouselSlide.style.transition = 'transform 400ms';
  imageCounter = 1 + navDots.indexOf(e.target);
  carouselSlide.style.transform = `translateX(-${100 * imageCounter}%)`;
}

function highlightCurrentDot() {
  navDots.forEach((dot) => {
    if (navDots.indexOf(dot) === imageCounter - 1) {
      dot.classList.add('active-dot');
    } else {
      dot.classList.remove('active-dot');
    }
  });
}

function addBtnListeners() {
  nextBtn.addEventListener('click', slideForward);
  prevBtn.addEventListener('click', slideBack);
}

function addNavDotListeners() {
  navDots.forEach((dot) => {
    dot.addEventListener('click', goToImage);
  });
}

function addTransitionListener() {
  carouselSlide.addEventListener('transitionend', () => {
    makeLoop();
    highlightCurrentDot();
  });
}

function autoAdvance() {
  let play = setInterval(slideForward, 5000);

  carouselFrame.addEventListener('mouseover', () => {
    clearInterval(play); // pause when mouse enters carousel
  });

  carouselFrame.addEventListener('mouseout', () => {
    play = setInterval(slideForward, 5000); // resume when mouse leaves carousel
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearInterval(play); // pause when user leaves page
    } else {
      play = setInterval(slideForward, 5000); // resume when user returns to page
    }
  });
}

function buildCarousel() {
  initializeCarousel();
  initializeNavDots();
  addNavDotListeners();
  addBtnListeners();
  addTransitionListener();
  autoAdvance();
}

buildCarousel();


