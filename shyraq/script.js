const nav_home = document.getElementById("home");
const nav_download = document.getElementById("download");
const nav_contacts = document.getElementById("contacts");

nav_home.addEventListener("click", () => {
    window.location.href = "index.html";
});

nav_download.addEventListener("click", () => {
    window.location.href = "download.html";
});

nav_contacts.addEventListener("click", () => {
    window.location.href = "contacts.html";
});


document.getElementById("phone-home").addEventListener("click", () => {
    window.location = "index.html";
});

document.getElementById("phone-download").addEventListener("click", () => {
    window.location = "download.html";
});

document.getElementById("phone-contacts").addEventListener("click", () => {
    window.location = "contacts.html";
});



const phone_nav = document.getElementById("phone-nav");
var count = 0;

phone_nav.addEventListener("click", () => {
    if (count % 2 == 1) {
        document.getElementById("phone-home").style.display = "block";
        document.getElementById("phone-download").style.display = "block";
        document.getElementById("phone-contacts").style.display = "block";
    } else {
        document.getElementById("phone-home").style.display = "none";
        document.getElementById("phone-download").style.display = "none";
        document.getElementById("phone-contacts").style.display = "none";
    }
    count++;
});
