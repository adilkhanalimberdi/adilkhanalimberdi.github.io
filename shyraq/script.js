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

document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
        user: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("contact-text"),
    };

    console.log(data);

    alert("Your message has been sent successfully!");
});