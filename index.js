// If the window loads then it should show loading.

let loading = document.querySelector(".site-loading");

window.addEventListener("load", () => {
  loading.style.top = "-100%";
});

// fetch my work data

let work_container = document.querySelector(".work-container");

let all_btn = document.querySelector(".filter-all-btn");
let web_dev_btn = document.querySelector(".filter-web-dev-btn");
let graphic_btn = document.querySelector(".filter-graphic-btn");
let digital_painting_btn = document.querySelector(
  ".filter-digital-painting-btn"
);
let video_editing_btn = document.querySelector(".filter-video-editing-btn");

let chevron_left = document.querySelector(".fa-chevron-left");
let chevron_right = document.querySelector(".fa-chevron-right");

// fetch work.json file
fetch("work.json")
  .then((response) => response.json())
  .then((data) => {
    data.work.sort(() => Math.random() - 0.5); // random data's

    // show all data
    all_btn.addEventListener("click", () => {
      show(data.work);
    });

    // only web dev data
    web_dev_btn.addEventListener("click", (e) => {
      let web_dev_res = data.work.filter((value) => {
        return value.topic.toLowerCase() == "web development";
      });

      show(web_dev_res);
    });

    // only graphic data
    graphic_btn.addEventListener("click", () => {
      let graphic_res = data.work.filter((value) => {
        return value.topic.toLowerCase() == "graphic's";
      });

      show(graphic_res);
    });

    // only digital painting data
    digital_painting_btn.addEventListener("click", () => {
      let digital_painting_res = data.work.filter((value) => {
        return value.topic.toLowerCase() == "digital painting";
      });

      show(digital_painting_res);
    });

    // only video editing data
    video_editing_btn.addEventListener("click", () => {
      let video_editing_res = data.work.filter((value) => {
        return value.topic.toLowerCase() == "video editing";
      });

      show(video_editing_res);
    });

    let index;

    function show(useData, i) {
      // data show function

      if (!i) {
        // if not true
        index = 1;
      } else {
        index = i;
      }

      // useData.sort(() => Math.random() - 0.5); // randomly shuffle

      let total_data = useData.length; //total data = 8

      let limit_per_page = 6; // limit per page = 3

      let total_page = Math.ceil(total_data / limit_per_page); // total page = 3

      if (index > 1) {
        // if index greater then 1
        chevron_left.style.display = "flex";
      } else {
        chevron_left.style.display = "none";
      }

      if (total_page > index) {
        // if total-page greater then index number
        chevron_right.style.display = "flex";
      } else {
        chevron_right.style.display = "none";
      }

      let offset = (index - 1) * limit_per_page; // offset data start num = 0

      let limit_show = limit_per_page * index;

      let final_data = useData.slice(offset, limit_show); // show data per page

      let container = " ";

      final_data.forEach(function (value, index) {
        container += `<div class='work-container-box' data-aos="fade-up"> <div class='work-container-box-image' style='background:${value.background}'> <span style='background:${value.background}' data-aos="fade-left">${value.topic}</span> <a href="${value.link}" target="_blanl"><img src='${value.image}' ></a> </div> <a href="${value.link}" target="_blanl"><h4 class='work-container-box-heading' data-aos="fade-right" title="${value.heading}">${value.heading}</h4></a> <div class='work-container-box-data-lang' data-aos="fade-up"> <span>${value.date}</span> &nbsp; | &nbsp;<span> <img src='${value.langIcon}'> ${value.lang} </span> </div> </div>`;
      });

      work_container.innerHTML = container;
    }

    show(data.work);

    chevron_left.addEventListener("click", () => {
      index = index - 1;

      show(data.work, index);
    });

    chevron_right.addEventListener("click", () => {
      index = index + 1;

      show(data.work, index);
    });
  })
  .catch((error) => {
    work_container.innerHTML = error;
  });

// for menu bar click toggle

let toggle_menu_bar = document.querySelector(".menu-bar");
let nav_ul = document.querySelector("header nav ul");
let nav_ul_li = document.querySelectorAll("header nav ul li");

// if click menu bar icon
toggle_menu_bar.addEventListener("click", () => {
  toggle_menu_bar.classList.toggle("toggle-menu-bar");
  nav_ul.classList.toggle("navOpen");
  nav.classList.add("black");
});

// apply to each li value
nav_ul_li.forEach((val) => {
  val.addEventListener("click", () => {
    toggle_menu_bar.classList.toggle("toggle-menu-bar");
    nav_ul.classList.toggle("navOpen");
  });
});

let graphic = document.querySelectorAll(".graphic");
let nav = document.querySelector("nav");
let navChild = document.querySelector(".nav-child");

let footer = document.querySelector("footer");
let about_us = document.querySelector("#about-us");
let skill = document.querySelector(".skill");
let progress_value = document.querySelectorAll(".progress-value");

let nav_ul_li_active = document.querySelectorAll("header nav ul li a");

// if window scroll
window.addEventListener("scroll", (e) => {
  // tigger points
  let graphicResponsiveCheck = window.matchMedia(
    "(min-width: 0px) and (max-width: 850px)"
  );
  let tabActiveResponsive = window.matchMedia("(min-width: 801px)");

  let window_height = window.innerHeight;

  progress_value.forEach((val, index) => {
    let progress_value_data = val.attributes.data.value;

    if (
      window_height > skill.getBoundingClientRect().top &&
      -skill.offsetHeight < skill.getBoundingClientRect().top
    ) {
      progress_value[index].style.width = progress_value_data;
    } else {
      progress_value[index].style.width = 0;
    }
  });

  if (window_height >= about_us.getBoundingClientRect().top) {
    nav.classList.add("black");

    if (window.pageYOffset == 0) {
      nav.classList.remove("black");
      toggle_menu_bar.classList.remove("toggle-menu-bar");
      nav_ul.classList.remove("navOpen");
    }

    if (graphicResponsiveCheck.matches) {
      graphic[0].style.top = "-280px";
    } else {
      graphic[0].style.top = "-180px";
    }
  } else {
    graphic[0].style.top = "-0px";
    nav.classList.remove("black");
  }

  if (window_height >= footer.getBoundingClientRect().top) {
    nav.style.top = "-100%";
    navChild.style.top = "-100%";
    toggle_menu_bar.classList.remove("toggle-menu-bar");
    nav_ul.classList.remove("navOpen");

    if (graphicResponsiveCheck.matches) {
      graphic[1].style.top = "-250px";
    } else {
      nav.classList.add("black");
      graphic[1].style.top = "-100px";
    }
  } else {
    graphic[1].style.top = "-60px";
    nav.style.top = "0%";
    navChild.style.top = "0%";
  }

  // left side bar height
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  let height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrolled = (winScroll / height) * 100;
  document.getElementsByClassName("indicator")[0].style.height = scrolled + "%";
});

// tap to tap button code here
let tap_to_top = document.querySelector(".tap-to-top");

tap_to_top.addEventListener("click", () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

// contact Us

let url =
  "https://script.google.com/macros/s/AKfycbxU-AZwephX2e4HM-zt8skBgP-LWYV4DWw2pbFEqse1AYQvDbLknyqNgEFb2VZKnx1A/exec";

let form = document.querySelector("#contact_us_form");
let responseRes = document.querySelector(".responseRes");

let message = document.querySelector("#message");
let email = document.querySelector("#email");
let full_name = document.querySelector("#name");

form.addEventListener("submit", (e) => {
  if (
    message.value.length <= 0 ||
    email.value.length <= 0 ||
    full_name.value.length <= 0
  ) {
    responseRes.innerHTML = "Please fill out this field...";
  } else {
    e.target.btn.value = "sending...";

    let d_form = new FormData(form);

    // google sheet
    fetch(url, {
      method: "POST",
      body: d_form,
    })
      .then((response) => response.text())
      .then((formData) => {
        e.target.btn.value = "send message";
        responseRes.innerHTML = formData;
        form.reset();

        setTimeout(() => {
          responseRes.innerHTML = "";
        }, 3000);
      });

    // google mail
    let message_inp = message.value;
    let email_inp = email.value;
    let name_inp = full_name.value;

    let form_body = `Name : ${name_inp} ,<br> Email : ${email_inp} ,<br> Message : ${message_inp}`;

    Email.send({
      SecureToken: "d5f75710-d9b6-47b9-bf21-a8b54136dd4e",
      To: "zeeshan.shaikh.professional@gmail.com",
      From: "zeeshan.shaikh.professional@gmail.com",
      Subject: "Portfolio interest message",
      Body: form_body,
    }).then((message) => alert(message));
  }

  e.preventDefault();
});



// Wrap every letter in a span
var textWrapper = document.querySelector('.ml3');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({ loop: true })
  .add({
    targets: '.ml3 .letter',
    opacity: [0, 1],
    easing: "easeInOutQuad",
    duration: 2250,
    delay: (el, i) => 150 * (i + 1)
  }).add({
    targets: '.ml3',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });

// for animation initialize
AOS.init();
