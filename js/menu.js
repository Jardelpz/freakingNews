let show = true;

const menuSection = document.querySelector(".menu-section")
const menuToggle = document.querySelector(".menu-toggle")

menuToggle.addEventListener("click", () => {
  //se o botao for pressionado (show=true) vai dar um overflow hidden (não deixa rolar a pagina). Caso contrario, deixa o padrão pra rolagem initial.
    document.body.style.overflow = show ? "hidden" : "initial"

    menuSection.classList.toggle("on", show)
    show = !show;
})
