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