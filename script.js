// Type writer effect
class TypeWriter{
    constructor(txtElement, words, wait = 1500) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = "";
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }
    type(){
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];
        if(this.isDeleting){
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        }
        else{
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
        let typeSpeed = 200;
        if(this.isDeleting){
            typeSpeed /= 2;
        }
        if(!this.isDeleting && this.txt === fullTxt){
            typeSpeed = this.wait;
            this.isDeleting = true;
        }
        else if(this.isDeleting && this.txt === ""){
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 400;
        }
        setTimeout(() => this.type(), typeSpeed);
    }
}
document.addEventListener('DOMContentLoaded', init);
function init(){
    const txtElement = document.querySelector(".txt_type");
    const words = JSON.parse(txtElement.getAttribute("data-words"));
    const wait =  txtElement.getAttribute("data-wait");
    new TypeWriter(txtElement, words, wait);
}


// Change color of menu bar on scroll
window.onscroll = function(){
    let menu = document.querySelector("header");
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50){
        menu.classList.add("scrolling");
    }else {
        menu.classList.remove("scrolling");
    }
}

//responsive
const bar = document.querySelector(".iconBar");
bar.addEventListener("click", function(){
    var respMenu = document.querySelector(".responsive");
    if(respMenu.style.display == "block"){
        respMenu.style.display = "none";
    }
    else{
        respMenu.style.display = "block";
    }
});

// highlighting current section in menu 
var sections = document.querySelectorAll("section");
window.addEventListener("scroll", function(){
    let scrollY = window.pageYOffset;
    sections.forEach(function(current){
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute("id");
        if( scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector("#menu ul li a[href*=" + sectionId + "]").classList.add("active");
            document.querySelector(".responsive ul li a[href*=" + sectionId + "]").classList.add("respActive");
        }else{
            document.querySelector("#menu ul li a[href*=" + sectionId + "]").classList.remove("active");
            document.querySelector(".responsive ul li a[href*=" + sectionId + "]").classList.remove("respActive");
        }
        if( scrollY > sectionTop && scrollY <= sectionTop + sectionHeight && sectionId == "connect"){
            document.querySelector('#contact a button ').innerHTML = "Home";
            document.querySelector('#contact a').href = "#home";
        }else{
            document.querySelector('#contact a button').innerHTML = "contact";
            document.querySelector('#contact a').href = "#connect";
        }
    });
});
$(document).ready(function(){
    //animations
    $("#about").waypoint(function(direction){
        $("#aboutDesc").addClass("animate__animated animate__fadeInDown ");
        $("#aboutBtitle").addClass("animate__animated animate__fadeInUp ");
    },{
        offset: "50%"
    });

    $("#service").waypoint(function(direction){
        $(".sBox").addClass("animate__animated animate__flipInX ");
    },{
        offset: "50%"
    });

    $("#skill").waypoint(function(direction){
        $(".progress").addClass("fillProgress");
    },{
        offset: "40%"
    });

    $("#work").waypoint(function(direction){
        $("#projects").addClass("animate__animated animate__pulse");
    },{
        offset: "40%"
    });
    
    $("#connect").waypoint(function(direction){
        $(".socialMedia").addClass("animate__animated animate__jackInTheBox");
    },{
        offset: "40%"
    });
});
//Work tab changes
var tabs = document.querySelectorAll(".tab");
var prevBtn = document.getElementById("prev");
var nextBtn = document.getElementById("next");
tabs[0].style.display = "grid";
var i = 0;

const prev = function(){
    if( i == 0){
        tabs[i].style.display = "none";
        i = tabs.length - 1;
        tabs[i].style.display = "grid";
    }
    else{
        tabs[i].style.display = "none";
        i--;
        tabs[i].style.display = "grid";
    }
}
const next = function(){
    if(i == (tabs.length - 1)){
        tabs[i].style.display = "none";
        i = 0;
        tabs[i].style.display = "grid";
    }
    else{
        tabs[i].style.display = "none";
        i++;
        tabs[i].style.display = "grid";
    }
}
//Work Hover
var project = document.querySelectorAll(".project");
var workHover = document.querySelectorAll(".workHover");
for (let i = 0; i < project.length; i++) {
    project[i].addEventListener('mouseover', ()=>{
        workHover[i].style.display = "grid";
    });
    project[i].addEventListener('mouseout', ()=>{
        workHover[i].style.display = "none";
    });
}

//FORM SUBMIT
var form = document.getElementById("review");
async function handleSubmit(event) {
    event.preventDefault();
//   var status = document.getElementById("formStts");
    var data = new FormData(event.target);
    fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
    }).then(response => {
    // status.innerHTML = "Thanks";
    alert("Thanks for message")
    form.reset()
    }).catch(error => {
    alert("Oops! Something Wrong")
    });
}
form.addEventListener("submit", handleSubmit);