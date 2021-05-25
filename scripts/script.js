import { ContactSendMail as contactSend } from './email.js';
import { EmailValues } from './email.js';

AOS.init();

//sticky navigation bar
window.onscroll = function() {myFunction()};

var navbar = document.getElementById("navigation-bar");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
    
  } else {
    navbar.classList.remove("sticky");
  }
}

const homebtn = document.getElementById("home-btn")
const gallerybtn = document.getElementById("gallery-btn")
const servicesbtn =document.getElementById("services-btn")
const contactbtn = document.getElementById("contact-btn")
const logo = document.querySelector('#logo')

const home = document.getElementById("home-content")
const gallery = document.getElementById("gallery-content")
const services = document.getElementById("services-content")
const contact = document.getElementById("contact-content")

const tabs = document.getElementById("tabs");

const tabDisplay = () => {
  if($(window).width() > 1024) {
    tabs.style.display = "flex";
  } else {
    tabs.style.display = "none";
  }
};

const tabDisplayResize = () => {
  window.addEventListener('resize', () => {
    tabDisplay();
  });
}

tabDisplayResize();

function displayNone(noTab) {
  home.style.display = "none";
  gallery.style.display = "none";
  services.style.display = "none";
  contact.style.display = "none";
  if(noTab == true) {
    tabDisplay();
  }
}


function enableBtn() {
  homebtn.classList.remove("avoid-clicks");
  gallerybtn.classList.remove("avoid-clicks");
  servicesbtn.classList.remove("avoid-clicks");
  contactbtn.classList.remove("avoid-clicks");
}

function tabClickable() {
  //service tabs
  designTab.classList.remove("avoid-clicks");
  videoTab.classList.remove("avoid-clicks");
}

displayNone(false);
const defaultDisplay = home.style.display = "flex";

if(defaultDisplay) {
  homebtn.classList.add("avoid-clicks");
}

logo.addEventListener('click', () => {
  displayNone(true);
  $("#home-content").fadeIn();
  enableBtn();
  homebtn.classList.add("avoid-clicks");
})

homebtn.addEventListener('click', () => {
  displayNone(true);
  $("#home-content").fadeIn();
  enableBtn();
  homebtn.classList.add("avoid-clicks");
})

gallerybtn.addEventListener('click', () => {
  displayNone(true);
  $("#gallery-content").fadeIn();
  enableBtn();
  gallerybtn.classList.add("avoid-clicks");
})

servicesbtn.addEventListener('click', () => {
  displayNone(false);
  $("#services-content").fadeIn();
  enableBtn();
  servicesbtn.classList.add("avoid-clicks");
  noSection();
  designSection.style.display = "block";

  tabDecoration();
  tabClickable();
})

contactbtn.addEventListener('click', () => {
  displayNone(true);
  $("#contact-content").fadeIn();
  enableBtn();
  contactbtn.classList.add("avoid-clicks");
})

let rawData = [];
let firstIndex = 266300;
rawData.push(firstIndex);
for (let i = 0; i < 5; i++) {
    rawData.push(firstIndex += (firstIndex*5)/100);
}

//chart showing graphics design demand in years using chart.js
const ctx = document.getElementById('popularityChart').getContext('2d');
let popularityChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['2016', '2017', '2018', '2019', '2020', '2021'],
        datasets: [{
            label: 'Demand of Graphic Designs throughout the years',
            data: rawData,
            backgroundColor: [
                'rgba(255, 99, 132, 0.4)',
                'rgba(255, 99, 132, 0.4)',
                'rgba(255, 99, 132, 0.4)',
                'rgba(255, 99, 132, 0.4)',
                'rgba(255, 99, 132, 0.4)',
                'rgba(255, 99, 132, 0.4)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 5
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
            }
        }
    }
});

//lightbox for staff images
//lightbox for gallery images
const stafflightbox = document.createElement("div");
stafflightbox.id = "stafflightbox";
document.body.appendChild(stafflightbox);

const staffimg = document.getElementsByClassName("staff-members")
Array.prototype.forEach.call(staffimg,(image) => {
  image.addEventListener('click', () => {
    stafflightbox.classList.add("active")
    const img = document.createElement("img")
    img.src = image.src;
    while(stafflightbox.firstChild) {
      stafflightbox.removeChild(stafflightbox.firstChild)
    }
    stafflightbox.appendChild(img);
  })
})

stafflightbox.addEventListener('click', e => {
  if(e.target !== e.currentTarget) return
  stafflightbox.classList.remove("active")
})



//lightbox for gallery images
const lightbox = document.createElement("div");
lightbox.id = "lightbox";
document.body.appendChild(lightbox);

const images = document.getElementsByClassName("gallery-img")
Array.prototype.forEach.call(images,(image) => {
  image.addEventListener('click', () => {
    lightbox.classList.add("active")
    const img = document.createElement("img")
    img.src = image.src;
    while(lightbox.firstChild) {
      lightbox.removeChild(lightbox.firstChild)
    }
    lightbox.appendChild(img);
  })
})

lightbox.addEventListener('click', e => {
  if(e.target !== e.currentTarget) return
  lightbox.classList.remove("active")
})

$("#hamburger").click(() => {
  $("#tabs").slideToggle(300);
});

//tab buttons
const designTab = document.querySelector('#designTab');
const videoTab = document.querySelector('#videoTab');
const customTab = document.querySelector('#customTab');

//section displays
const designSection = document.querySelector('#design-section');
const videoSection = document.querySelector('#video-section');

const noSection = () => {
  designSection.style.display = "none";
  videoSection.style.display = "none";
}


const tabDecoration = () => {
  designTab.style.background = "none";
  videoTab.style.background = "none";
}


//on design tab click
designTab.addEventListener('click', () => {

  noSection();//no section displayed
  designSection.style.display = "block";//display design section

  tabDisplay();// tab display on window width

  tabDecoration();//tab background
  designTab.style.background = "rgba(131, 131, 131, 0.801)";
  tabClickable();
  designTab.classList.add("avoid-clicks");
})


// on video tab click
videoTab.addEventListener('click', () => {
  noSection();
  videoSection.style.display = "block";
  tabDisplay();
  tabDecoration();
  videoTab.style.background = "rgba(131, 131, 131, 0.801)";
  tabClickable();
  videoTab.classList.add("avoid-clicks");
})


const mapAddress = document.querySelector('#map-address')

mapAddress.addEventListener('click', () => {
  window.location.href = 'https://www.google.com/maps/place/Dolores,+San+Fernando,+Pampanga,+Philippines/@15.038852,120.684817,13z/data=!4m5!3m4!1s0x3396f7119e0221f3:0xdac0d652d8d51fe2!8m2!3d15.0389739!4d120.6808826?hl=en-US';
})

const sendMail = document.querySelector('#sendMail');

sendMail.addEventListener('click', () => {
  const email = new EmailValues();
  
  if(email.emailParams.userAccount.length == 0 || email.emailParams.message.length == 0) {
    Swal.fire({
      icon: `warning`,
      title: `Empty input`,
      text: `Please don't leave the textfield empty.`
    })
  } else {
    const validateEmail = (email) => {
      const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailRegex.test(String(email).toLowerCase());
    }
      if(!validateEmail(email.emailParams.userAccount)) {
        Swal.fire({
          icon: `warning`,
          title: `Invalid Gmail address`,
          text: `Please check your Gmail address`
        })
      } else {
        contactSend()
      }
  }
})