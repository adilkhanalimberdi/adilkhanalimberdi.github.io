var kz = document.getElementById("kz");
var ru = document.getElementById("ru");
var en = document.getElementById("en");
const doc = document;


kz.addEventListener("click", () => {
    doc.getElementById("name-label").textContent = "Есіміңіз: ";
    doc.getElementById("email-label").textContent = "Поштаңыз: ";
    doc.getElementById("message-label").textContent = "Хабарламаңыз: ";
    doc.getElementById("submit").textContent = "Жіберу";
    doc.querySelector("p.text").textContent = "Сұрақтар мен ұсыныстар үшін бізге жазыңыз";
    doc.getElementById("text-email").textContent = "Пошта: adilkhankerimshe@gmail.com";
    doc.getElementById("text-number").textContent = "Телефон номеры: +7 771 671 29 05";
    doc.getElementById("text-social-media").textContent = "Әлеуметтік желілер";
});

ru.addEventListener("click", () => {
    doc.getElementById("name-label").textContent = "Имя: ";
    doc.getElementById("email-label").textContent = "Почта: ";
    doc.getElementById("message-label").textContent = "Сообщение: ";
    doc.getElementById("submit").textContent = "Отправить";
    doc.querySelector("p.text").textContent = "По вопросам и предложениям пишите нам";
    doc.getElementById("text-email").textContent = "Почта: adilkhankerimshe@gmail.com";
    doc.getElementById("text-number").textContent = "Номер телефона: +7 771 671 29 05";
    doc.getElementById("text-social-media").textContent = "Социальные сети";
});

en.addEventListener("click", () => {
    doc.getElementById("name-label").textContent = "Name: ";
    doc.getElementById("email-label").textContent = "Email: ";
    doc.getElementById("message-label").textContent = "Message: ";
    doc.getElementById("submit").textContent = "send";
    doc.querySelector("p.text").textContent = "For questions and suggestions, write to us";
    doc.getElementById("text-email").textContent = "Email: adilkhankerimshe@gmail.com";
    doc.getElementById("text-number").textContent = "Phone number: +7 771 671 29 05";
    doc.getElementById("text-social-media").textContent = "Social media";
});