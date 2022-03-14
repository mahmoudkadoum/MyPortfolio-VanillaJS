// Toggel spin class on icon 
document.querySelector(".toggel-settings .fa-gear").onclick = function () {
    this.classList.toggle("fa-spin");
    if (this.classList.contains("fa-spin")) {
        document.querySelector(".settings-box .toggel-settings").style.setProperty('background-color', 'rgb(12, 12, 12)');
        document.querySelector(".header-area .logo").style.setProperty('padding-left', '5.5vw');
    } else {
        document.querySelector(".settings-box .toggel-settings").style.setProperty('background-color', '#FFF');
        document.querySelector(".header-area .logo").style.removeProperty('padding-left');
    }
    document.querySelector(".settings-box").classList.toggle("open");
};

// Main colors Settings
// Set Color from local storage
let mainColors = localStorage.getItem("color_option");
if (mainColors !== null) {
    document.documentElement.style.setProperty('--main-color', mainColors);
    // Set active class on current local storage color if it's conssist
    document.querySelectorAll(".color-list li").forEach(li => {
        if (li.dataset.color == mainColors) {
            li.classList.add("active");
        } else {
            li.classList.remove("active");
        }
    });
}
// Switch Main colors by colors BTNs
const colorsLi = document.querySelectorAll(".color-list li");
colorsLi.forEach(li => {
    // Click on every list items
    li.addEventListener("click", (e) => {
        //Set color on root
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color)
        localStorage.setItem("color_option", e.target.dataset.color);
        //Remove class active from all colors
        e.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active");
        });
        e.target.classList.add("active");
    });
});

// random BG Settings
let backgrounInterval;
let backgrounOption = true;
randomizeBacgrond();
let randomBGButon = document.querySelectorAll(".option-box:nth-child(2) span");
randomBGButon.forEach(btn => {
    btn.addEventListener("click", (e) => {
        //Set radom background setting on localstorage
        localStorage.setItem("random_background", e.target.dataset.background);
        //Remove class active from other button
        e.target.parentElement.querySelector(".active").classList.remove("active");
        //Add class active to the button
        e.target.classList.add("active");
        // Set random BG Interval Settings by butons
        if (e.target.dataset.background === 'yes') {
            if (backgrounOption !== true) {
                backgrounOption = true;
                randomizeBacgrond();
            }
        } else {
            if (backgrounOption !== false) {
                backgrounOption = false;
                clearInterval(backgrounInterval);
            }
        }
    });
    // Check if there's local storage randomBG Option
    let randomBG = localStorage.getItem("random_background");
    if (randomBG !== null) {
        // Set active class on current local storage random_background if it's conssist
        if (btn.dataset.background == randomBG) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
        // Set random BG Interval Settings from local storage if it's conssist
        if (randomBG === 'yes') {
            backgrounOption = true;
            // randomizeBacgrond();
        } else {
            backgrounOption = false;
            clearInterval(backgrounInterval);
        }
    }
});
// random BG array of imgs
// Select Landing Page
let landingPage = document.querySelector(".landing-page")
// Get array of imgs
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg"];
// random BG Interval
function randomizeBacgrond() {
    if (backgrounOption === true) {
        backgrounInterval = setInterval(() => {
            // Get random number
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
            // Change background img Url
            landingPage.style.backgroundImage = 'url("images/' + imgsArray[randomNumber] + '")'
        }, 10000);
    }
};

// Function to scroll To Sections 
// Add section Name to Nav Bullets
let allBullet = document.querySelectorAll(".navBullets .bullet");
allBullet.forEach(bullet => {
    let sectionName = bullet.id;
    bullet.style.setProperty('--section-name', `'${sectionName}'`);
})
function scrollToSection(elements) {
    elements.forEach(ele => {
        let section = ele.dataset.section;
        ele.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(section).scrollIntoView({
                behavior: 'smooth'
            })
        })
    })
}
// scroll To Sections by Bulets
scrollToSection(allBullet);
// scroll To Sections by linkks
let links = document.querySelectorAll(".header-area .links a");
scrollToSection(links);

// Add active class to Links when Hover 
{
    links.forEach(link => {
        link.addEventListener('mouseover', (e) => {
            e.target.classList.add("active");
        })
        link.addEventListener('mouseleave', (e) => {
            e.target.classList.remove("active");
        })
    })

}

// Function to huo illustration img And BGs color
// Main colors buttons
let btnOneColor = document.querySelector(".color-list li:nth-child(1)").dataset.color;
let btnTwoColor = document.querySelector(".color-list li:nth-child(2)").dataset.color;
let btnThreeColor = document.querySelector(".color-list li:nth-child(3)").dataset.color;
let btnFourColor = document.querySelector(".color-list li:nth-child(4)").dataset.color;
let btnFiveColor = document.querySelector(".color-list li:nth-child(5)").dataset.color;

let bannerImg = document.querySelector(".bannerBkg");
let aboutUsTextBG = document.querySelector(".about-us .BG");
let galleryBG = document.querySelector(".gallery .BG");

function huoImg(theColor, theImg) {
    if (theColor == btnOneColor) {
        theImg.style.filter = 'hue-rotate(200deg)';
    } else if (theColor == btnTwoColor) {
        theImg.style.filter = 'hue-rotate(345deg)';
    } else if (theColor == btnThreeColor) {
        theImg.style.filter = 'hue-rotate(300deg)';
    } else if (theColor == btnFourColor) {
        theImg.style.filter = 'hue-rotate(45deg)';
    } else if (theColor == btnFiveColor) {
        theImg.style.filter = 'hue-rotate(120deg)';
    }
}
// Huo the illustration img color from local storage
if (mainColors !== null) {
    huoImg(mainColors, bannerImg);
    huoImg(mainColors, aboutUsTextBG);
    huoImg(mainColors, galleryBG);
}
// Huo the illustration img color from colors button
colorsLi.forEach(li => {
    li.addEventListener("click", (e) => {
        huoImg(e.target.dataset.color, bannerImg);
        huoImg(e.target.dataset.color, aboutUsTextBG);
        huoImg(e.target.dataset.color, galleryBG);
    });
});

// About Me Banner Hover Animation
{
    let bounceContainer = document.querySelector(".bannerText");
    let bounce = document.querySelector(".bounce");
    bounceContainer.addEventListener('mouseover', () => {
        bounce.style.setProperty("animation", "bounce2 1s ease")
        bounce.style.setProperty("-webkit-animation", "bounce2 1s ease")
        bounce.style.setProperty("transform-origin", "50% 100%")
        bounce.style.setProperty("-ms-transform-origin", "50% 100%")
        bounce.style.setProperty("-webkit-transform-origin", "50% 100%")
        bounce.style.setProperty("visibility", "visible !important")
    })
    bounceContainer.addEventListener('mouseleave', () => {
        bounce.style.removeProperty("animation")
        bounce.style.removeProperty("-webkit-animation")
    })
    let bannerPhoto = document.querySelector(".bannerPhoto");
    let bigEntrance = document.querySelector(".bigEntrance");
    bannerPhoto.addEventListener('mouseover', () => {
        bigEntrance.style.setProperty("animation", "bigEntrance 1.5s ease-out")
        bigEntrance.style.setProperty("-webkit-animation", "bigEntrance 1.5s ease-out")
        bigEntrance.style.setProperty("visibility", "visible !important")
    })
    bannerPhoto.addEventListener('mouseleave', () => {
        bigEntrance.style.removeProperty("animation")
        bigEntrance.style.removeProperty("-webkit-animation")
        console.log("removed");
    })
}
// Function to fill Skills by Animation
{
    let ourSkills = document.querySelector(".skills");
    window.onscroll = function () {
        let skillsTop = ourSkills.getBoundingClientRect().top;
        let windowHeight = this.innerHeight;
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        allSkills.forEach(skill => {
            if (skillsTop >= windowHeight - 150 || skillsTop <= -(windowHeight + 150)) {
                skill.style.width = ("0%");
            } else {
                skill.style.width = skill.dataset.progress;
            }
        });
        {
            // Set Side Page Scroll Progress Bar
            let scrollProgressBar = document.querySelector('#scrollProgressBar');
            let totalHeight = document.body.scrollHeight - window.innerHeight;
            let progressHeight = (window.pageYOffset / totalHeight) * 100;
            scrollProgressBar.style.height = progressHeight + "%";
        }
    };
}

// Creat a Popup include Image
{
    let myGallery = document.querySelectorAll(".gallery .imgBox img");
    myGallery.forEach(img => {
        img.addEventListener('click', (e) => {
            let overlay = document.createElement("div");
            overlay.className = 'pageOverlay';
            document.body.appendChild(overlay);
            let popup = document.createElement("div");
            popup.className = "popup";
            document.body.appendChild(popup);
            let popupTitele = document.createElement("h2");
            popupTitele.className = 'popupTitele';
            popupTitele.innerHTML = img.alt;
            popup.appendChild(popupTitele);
            let popedupImg = document.createElement("img");
            popedupImg.setAttribute("src", img.src);
            popup.appendChild(popedupImg);
            popedupImg.className = 'popedupImg';
            let popupCloseBtn = document.createElement("span");
            popupCloseBtn.className = 'popupCloseBtn';
            popupCloseBtn.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
            popup.appendChild(popupCloseBtn);
            overlay.addEventListener('click', (e) => {
                document.body.removeChild(popup)
                document.body.removeChild(overlay)
            })
            popupCloseBtn.addEventListener('click', (e) => {
                document.body.removeChild(popup)
                document.body.removeChild(overlay)
            })
        })
    })
}

