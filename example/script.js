const toggle = document.getElementById("theme-toggle");
const body = document.body;

toggle.addEventListener("click", () => {

    body.classList.toggle("dark");
    body.classList.toggle("light");

    // Saving chosen theme in local storage
    if (body.classList.contains("dark")) {
        toggle.textContent = "light theme";
        localStorage.setItem("theme", "dark");
    } else {
        toggle.textContent = "dark theme";
        localStorage.setItem("theme", "light");
    }
})

// Check and install theme when loading the site
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    body.classList.add(savedTheme);
} else {
    body.classList.add("light");
}