const dropOutMenu = document.querySelector(".Header-elements")
let BurgerClicked = false

function BurgerMenu() {
    BurgerClicked = !BurgerClicked
    if (BurgerClicked) {
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