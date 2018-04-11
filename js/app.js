

var navbar = document.querySelector(".navbar");
var logo = document.getElementById("logo");

// Typed.js for typing simulation
var typed = new Typed("#typed", {
  strings: ["Hi...", "My name is Dave.", "Web development is my passion."],
  typeSpeed: 100,
  backSpeed: 50,
  startDelay: 1000,
  onComplete: (self) => {
  	setTimeout(() => {
  		return $("#typed").siblings('.typed-cursor').css("visibility", "hidden");
  	}, 1000);
  }
});

$(function() {
    $('.nav a').on('click', function(){ 
        if($('.navbar-toggle').css('display') !='none'){
            $(".navbar-toggle").trigger( "click" );
        }
    });
});


// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually going to occur
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top - 70
        }, 1000, 'swing');
      }
    }
  });


// Scroll Handler IIFE
(function navbarSwitcher() {
  var aboutSection = document.querySelector("#about");
  var projectsSection = document.querySelector("#projects");
  var contactSection = document.querySelector("#contact");
  var navLinks = document.querySelectorAll(".navlink");
  var theme;
  var HOME = "home";
  var ABOUT = "about";
  var PROJECTS = "projects";
  var CONTACT = "contact";
  var new_theme;

  var scrolling = false;

  function highlightLink(index) {
    navLinks.forEach(function(link, i) {
      if (i === index) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  var scroll_handler = function() {
    return setTimeout(function() {
      if (scrolling) return;
      var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
      if (scrollTop < aboutSection.offsetTop - 74) {
        new_theme = HOME;
      } else if (scrollTop < projectsSection.offsetTop - 74) {
        new_theme = ABOUT;
      } else if (scrollTop < contactSection.offsetTop - 74) {
        new_theme = PROJECTS;
      } else {
        new_theme = CONTACT;
      }

      if (new_theme === theme) { // Don't repaint if theme hasn't changed
        scrolling = false;
        return;
      }

      switch (new_theme) {
        case HOME:
          navbar.classList.remove("navbar-show");
          logo.classList.remove("logo-show");
          highlightLink(0);
          break;
        case ABOUT:
          navbar.classList.add("navbar-show");
          logo.classList.add("logo-show");
          highlightLink(1);
          break;
        case PROJECTS:
          navbar.classList.add("navbar-show");
          logo.classList.add("logo-show");
          highlightLink(2);
          break;
        default:
          navbar.classList.add("navbar-show");
          logo.classList.add("logo-show");
          highlightLink(3);
      }

      theme = new_theme;
      scrolling = false;
    });
  }
  window.addEventListener("scroll", scroll_handler);
  window.addEventListener("load", scroll_handler);
})();

// Dynamic year for copyright section
document.querySelector("#year").textContent = new Date().getFullYear();