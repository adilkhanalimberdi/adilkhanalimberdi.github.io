var kz = document.getElementById("kz");
var ru = document.getElementById("ru");
var en = document.getElementById("en");
const doc = document;


kz.addEventListener("click", () => {
    doc.querySelector("div.download-container h2").textContent = "Android жүйесіне арналған қолданба";
    doc.querySelector("div.download-container p").textContent = "Қолданбаны дәл қазір жүктеп алып, Қазақстан тарихын оңай үйренуді бастаңыз.";
    doc.querySelector("div.download-button").textContent = "Жүктеу";
});

ru.addEventListener("click", () => {
    doc.querySelector("div.download-container h2").textContent = "Приложение для Android";
    doc.querySelector("div.download-container p").textContent = "Загрузите приложение прямо сейчас и начните изучать историю Казахстана легким способом.";
    doc.querySelector("div.download-button").textContent = "Скачать";
});

en.addEventListener("click", () => {
    doc.querySelector("div.download-container h2").textContent = "Application for Android";
    doc.querySelector("div.download-container p").textContent = "Download the app right now and start learning the history of Kazakhstan in an easy way.";
    doc.querySelector("div.download-button").textContent = "Download";
});