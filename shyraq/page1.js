var kz = document.getElementById("kz");
var ru = document.getElementById("ru");
var en = document.getElementById("en");
const doc = document;


kz.addEventListener("click", () => {
    doc.querySelector("div.title p").textContent = "Тарихын білмеген елдің болашағы бұлыңғыр";
    doc.querySelector("div.info p").textContent = "Тарих өткенді ғана емес, бүгінгіні түсінудің де кілті.";
    doc.querySelector("p.use-for-translate").textContent = "Біздің қосымшамыз Қазақстан тарихын оқуда қиындықтарға тап болған студенттер үшін арнайы жасалған.";
});

ru.addEventListener("click", () => {
    doc.querySelector("div.title p").textContent = "Будущее страны, которая не знает своей истории, мрачно";
    doc.querySelector("div.info p").textContent = "История – это не только прошлое, но и ключ к пониманию настоящего.";
    doc.querySelector("p.use-for-translate").textContent = "Наше приложение создано специально для студентов, которые сталкиваются с трудностями в изучении истории Казахстана.";
});

en.addEventListener("click", () => {
    doc.querySelector("div.title p").textContent = "The future of a nation that doesn't know its history is bleak";
    doc.querySelector("div.info p").textContent = "History is not only the past, but also the key to understanding the present.";
    doc.querySelector("p.use-for-translate").textContent = "Our application was created specifically for students who encounter difficulties in studying the history of Kazakhstan.";
});