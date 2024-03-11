const doc = document;
const menuOpen = doc.querySelector(".menu");
const menuClose = doc.querySelector(".close");
const overlay = doc.querySelector(".overlay");

menuOpen.addEventListener("click", () => {
  overlay.classList.add("overlay--active");
});

menuClose.addEventListener("click", () => {
  overlay.classList.remove("overlay--active");
});

window.addEventListener('scroll', function(){
  var header = document.getElementById('mainHeader');
  var scrollPosition = window.pageYOffset || this.document.documentElement.scrollTop;

  if (scrollPosition > 100) { 
    header.style.backgroundColor = 'rgb(211,211,211,0.5)'; 
  } else {
    header.style.backgroundColor = 'rgba(211, 211, 211, 1)'; 
  }
})

function myMenuFunction(){
  var i = document.getElementById("navMenu");
  if(i.className === "nav-menu"){
    i.className += " responsive";
  }else{
    i.className = "nav-menu";
  }
}