export function toggleNav() {
    const menuButton = document.getElementById("menu-button");
    const nav = document.getElementById("nav-bar");
    menuButton.addEventListener("click", () => {
        nav.classList.toggle("remove");
    })
}