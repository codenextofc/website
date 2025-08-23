function updateProgressBar() {
    const { scrollTop, scrollHeight } = document.documentElement;
    const scrollPercent =
        (scrollTop / (scrollHeight - window.innerHeight)) * 100 + "%";
    document
        .querySelector("#progress-bar")
        .style.setProperty("--progress", scrollPercent);
}

document.addEventListener("scroll", updateProgressBar);

document.addEventListener("DOMContentLoaded", () => {
    const langButton = document.getElementById("language-button");
    const dropdown = document.getElementById("dropdown-language");

    langButton.addEventListener("click", (e) => {
        e.stopPropagation(); // evita fechar imediatamente
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    });

    // Fecha o dropdown ao clicar fora
    document.addEventListener("click", () => {
        dropdown.style.display = "none";
    });
});