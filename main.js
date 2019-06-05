const TypeWriter = function(txtElement, words, waitTime) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = "";
  this.wordIndex = 0;
  this.waitTime = parseInt(waitTime);
  this.type();
  this.isDeleting = false;
};

//
TypeWriter.prototype.type = function() {
  const current = this.wordIndex % this.words.length;
  //get full text of current word
  const fullTxt = this.words[current];

  if (this.isDeleting) {
    //remove char
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    //add char
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  //insert txt into html
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

  //Initial speed
  let typeSpeed = 300;

  if (this.isDeleting) {
    typeSpeed /= 2;
  }

  //if word is complete
  if (!this.isDeleting && this.txt === fullTxt) {
    typeSpeed = this.waitTime;
    //set del to true
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;

    this.wordIndex++;
    typeSpeed = 500;
  }

  setTimeout(() => this.type(), typeSpeed);
};

//Init DOM load
document.addEventListener("DOMContentLoaded", init);

function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const waitTime = txtElement.getAttribute("data-wait");

  new TypeWriter(txtElement, words, waitTime);
}


window.onscroll = function() {
    var nav = document.getElementById("nav");
    if (window.pageYOffset > 100) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  };