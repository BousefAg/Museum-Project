var nav = document.getElementById('nav');

window.addEventListener('scroll', function () {
  if (window.scrollY > 60) {
    nav.classList.add('actief');
  } else {
    nav.classList.remove('actief');
  }
}, { passive: true });

var hamburger = document.getElementById('nav-hamburger');
var menu      = document.getElementById('nav-menu');

hamburger.addEventListener('click', function () {
  if (menu.classList.contains('open')) {
    menu.classList.remove('open');
  } else {
    menu.classList.add('open');
    nav.classList.add('actief');
  }
});

function sluitMenu() {
  menu.classList.remove('open');
}

var slides       = document.querySelectorAll('.slide');
var stippen      = document.querySelectorAll('.stip');
var thumbs       = document.querySelectorAll('.thumb');
var teller       = document.getElementById('slide-teller');
var aantalSlides = slides.length;
var huidig       = 0;
var timer;

function gaNaarSlide(index) {

  slides[huidig].classList.remove('actief');
  stippen[huidig].classList.remove('actief');
  thumbs[huidig].classList.remove('actief');

  huidig = (index + aantalSlides) % aantalSlides;

  slides[huidig].classList.add('actief');
  stippen[huidig].classList.add('actief');
  thumbs[huidig].classList.add('actief');

  teller.textContent = (huidig + 1) + ' / ' + aantalSlides;

  var thumbRij = document.getElementById('slide-thumbnails');
  var actiefThumb = thumbs[huidig];
  var thumbLinks = actiefThumb.offsetLeft - thumbRij.offsetLeft;
  var centreer = thumbLinks - (thumbRij.clientWidth / 2) + (actiefThumb.clientWidth / 2);
  thumbRij.scrollLeft = centreer;
}

function startTimer() {
  clearInterval(timer);
  timer = setInterval(function () {
    gaNaarSlide(huidig + 1);
  }, 5000);
}

document.getElementById('pijl-links').addEventListener('click', function () {
  gaNaarSlide(huidig - 1);
  startTimer();
});

document.getElementById('pijl-rechts').addEventListener('click', function () {
  gaNaarSlide(huidig + 1);
  startTimer();
});

stippen.forEach(function (stip) {
  stip.addEventListener('click', function () {
    gaNaarSlide(parseInt(stip.getAttribute('data-index')));
    startTimer();
  });
});

thumbs.forEach(function (thumb) {
  thumb.addEventListener('click', function () {
    gaNaarSlide(parseInt(thumb.getAttribute('data-index')));
    startTimer();
  });
});

var swipeStartX = 0;

document.getElementById('slideshow').addEventListener('touchstart', function (e) {
  swipeStartX = e.touches[0].clientX;
}, { passive: true });

document.getElementById('slideshow').addEventListener('touchend', function (e) {
  var verschil = swipeStartX - e.changedTouches[0].clientX;
  if (verschil > 40) {
    gaNaarSlide(huidig + 1);
    startTimer();
  } else if (verschil < -40) {
    gaNaarSlide(huidig - 1);
    startTimer();
  }
}, { passive: true });

startTimer();
