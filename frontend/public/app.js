let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');

// config param
let countItem = items.length;
let itemActive = 0;
// event next click
next.onclick = function(){
    itemActive = itemActive + 1;
    if(itemActive >= countItem){
        itemActive = 0;
    }
    showSlider();
}
//event prev click
prev.onclick = function(){
    itemActive = itemActive - 1;
    if(itemActive < 0){
        itemActive = countItem - 1;
    }
    showSlider();
}
// auto run slider
let refreshInterval = setInterval(() => {
    next.click();
}, 5000)
function showSlider(){
    // remove item active old
    let itemActiveOld = document.querySelector('.slider .list .item.active');
    let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
    itemActiveOld.classList.remove('active');
    thumbnailActiveOld.classList.remove('active');

    // active new item
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');
    setPositionThumbnail();

    // clear auto time run slider
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click();
    }, 5000)
}
function setPositionThumbnail () {
    let thumbnailActive = document.querySelector('.thumbnail .item.active');
    let rect = thumbnailActive.getBoundingClientRect();
    //if (rect.left < 0 || rect.right > window.innerWidth) {
        //thumbnailActive.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
        //thumbnailActive.scrollIntoView({ behavior: 'instant', inline: 'nearest', block: 'end'});
    //}
}

// click thumbnail
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showSlider();
    })
})

// click menu dash
function toggleMenu() {
    const menu = document.querySelector('.menu');
    const buttons = document.querySelector('.mobile-buttons');
    menu.classList.toggle('active');
    buttons.classList.toggle('active');
}

document.getElementById('left-half').addEventListener('click', showPrevImage);
document.getElementById('right-half').addEventListener('click', showNextImage);

function showPrevImage() {
    itemActive = itemActive - 1;
    if(itemActive < 0){
        itemActive = countItem - 1;
    }
    showSlider();
}

function showNextImage() {
    itemActive = itemActive + 1;
    if(itemActive >= countItem){
        itemActive = 0;
    }
    showSlider();
}

function userRegister() {
    //location.href = "http://www.google.com";
    //window.open('http://localhost:3000/auth/google/', '_blank', 'width=500,height=600');
    window.open('https://ridingfactorfullweb.vercel.app/auth/google/', '_blank', 'width=500,height=600');
}

function userLogin() {
    //location.href = "http://www.google.com";
    window.open('https://ridingfactorfullweb.vercel.app/auth/google/', '_blank', 'width=500,height=600');
}

function userLogout() {
    //location.href = "http://www.google.com";
    //window.open('http://localhost:3000/auth/google/signout');
    window.location.href = 'https://ridingfactorfullweb.vercel.app/auth/google/signout';
}
