const dropOutMenu = document.querySelector(".Header-elements")
const burgerButton = document.querySelector("#burgerButton")
let BurgerClicked = false

function BurgerMenu() {
    burgerButton.src = `static/imgs/Icons/BurgerMenu-icon.png`
    BurgerClicked = !BurgerClicked
    if (BurgerClicked) {
        burgerButton.src = `static/imgs/Icons/Delete-icon.png`
        dropOutMenu.style.display = "block"
        dropOutMenu.innerHTML = `
            <a href="index.html">
                <div class="Header-questions">
                    <img src="static/imgs/Icons/Questions-icon.png" alt="">
                    <span>Questions</span>
                </div>
            </a>
            <a href="List.html">
                <div class="Header-Tests">
                    <img src="static/imgs/Icons/List-icon.png" alt="">
                    <span>List</span>
                </div>
            </a>
            <a href="Test.html">
                <div class="Header-Tests">
                    <img src="static/imgs/Icons/Tests-icon.png" alt="">
                    <span>Test</span>
                </div>
            </a>
        `
    }
    else {
        dropOutMenu.style.display = "none"
    }
}

burgerButton.addEventListener("click", BurgerMenu)