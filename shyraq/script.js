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


document.getElementById("kz").addEventListener("click", () => {
    document.getElementById("home").textContent = "НЕГІЗГІ";
    document.getElementById("download").textContent = "ЖҮКТЕУ";
    document.getElementById("contacts").textContent = "БАЙЛАНЫС";

    document.getElementById("phone-home").textContent = "НЕГІЗГІ";
    document.getElementById("phone-download").textContent = "ЖҮКТЕУ";
    document.getElementById("phone-contacts").textContent = "БАЙЛАНЫС";
});

document.getElementById("ru").addEventListener("click", () => {
    document.getElementById("home").textContent = "ГЛАВНАЯ";
    document.getElementById("download").textContent = "ЗАГРУЗКИ";
    document.getElementById("contacts").textContent = "СВЯЗАТЬСЯ";

    document.getElementById("phone-home").textContent = "ГЛАВНАЯ";
    document.getElementById("phone-download").textContent = "ЗАГРУЗКИ";
    document.getElementById("phone-contacts").textContent = "СВЯЗАТЬСЯ";
});

document.getElementById("en").addEventListener("click", () => {
    document.getElementById("home").textContent = "HOME";
    document.getElementById("download").textContent = "DOWNLOAD";
    document.getElementById("contacts").textContent = "CONTACTS";

    document.getElementById("phone-home").textContent = "HOME";
    document.getElementById("phone-download").textContent = "DOWNLOAD";
    document.getElementById("phone-contacts").textContent = "CONTACTS";
});
