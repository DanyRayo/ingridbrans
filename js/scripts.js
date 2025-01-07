// ---------------------------------------------------------------------------------------------Script para la barra de navegación------------------------------------------------
const menuToggle = document.getElementById("menuToggle");
const navbarmob = document.getElementById("navbarmob");

menuToggle.addEventListener("click", () => {
    navbarmob.classList.toggle("active");
});
// Script para el efecto active
const currentLocation = window.location.href;
const navLinks = document.querySelectorAll("#navbar-desktop .navbar-content li a");

navLinks.forEach(link => {
    if (link.href === currentLocation) {
        link.parentElement.classList.add("active");
    }
});

//------------------------------------------------------------------------------------------------- Script para desaparecer el banner de redes social-------------------------------------------------
var elemento = document.getElementById('banner-social');
var footer = document.querySelector('footer');

// Función para verificar si el elemento está cerca del footer
function estaCercaDelFooter() {
  var elementoRect = elemento.getBoundingClientRect();
  var footerRect = footer.getBoundingClientRect();

  // Determina la distancia entre el fondo del elemento y la parte superior del footer
  var distancia = footerRect.top - elementoRect.bottom;

  // Define una distancia umbral para mostrar u ocultar el elemento
  var distanciaUmbral = 20; // Ajusta según tus necesidades

  if (distancia <= distanciaUmbral) {
    elemento.style.opacity = 0; // Oculta el elemento
  } else {
    elemento.style.opacity = 1; // Muestra el elemento
  }
}

// Agregar un event listener para controlar el scroll de la página
window.addEventListener('scroll', estaCercaDelFooter);

// Llama a la función una vez al cargar la página para verificar la posición inicial
estaCercaDelFooter();


//-----------------------------------------------------------------------------------------------------Script para el carrusel-----------------------------------------------------------------------
const carousel = document.querySelector(".carousel"),
firstImg = carousel.querySelectorAll("img")[0],
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
    // showing and hiding prev/next icon according to carousel scroll left value
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
        // if clicked icon is left, reduce width value from the carousel scroll left else add to it
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
    });
});

const autoSlide = () => {
    // if there is no image left to scroll then return from here
    if(carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;

    positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
    let firstImgWidth = firstImg.clientWidth + 14;
    // getting difference value that needs to add or reduce from carousel left to take middle img center
    let valDifference = firstImgWidth - positionDiff;

    if(carousel.scrollLeft > prevScrollLeft) { // if user is scrolling to the right
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    // if user is scrolling to the left
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) => {
    // updatating global variables value on mouse down event
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    // scrolling images/carousel to left according to mouse pointer
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");

    if(!isDragging) return;
    isDragging = false;
    autoSlide();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);

// --------------------------------------------------Scripts para la funcion de compartir-------------------------------------

// Función para abrir una ventana de compartir en Facebook
function openFacebookShareWindow() {
    const urlToShare = encodeURIComponent(window.location.href);
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${urlToShare}`;
    window.open(facebookShareUrl, "Compartir en Facebook", "width=600, height=400");
}

// Función para abrir una ventana de compartir en Twitter
function openTwitterShareWindow() {
    const urlToShare = encodeURIComponent(window.location.href);
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${urlToShare}`;
    window.open(twitterShareUrl, "Compartir en Twitter", "width=600, height=400");
}

