let fullListUI = document.querySelector("#FullList")
let FullList = ""
Questions.map((x)=> {
    if (x !== "") {
    FullList += `
    <li>
        <p>${x.split(" ")[0]}</p>
        <p>${x.split(" ")[2]}</p>
        <p>${x.split(" ")[3]}</p>
        <p>${x.split(" ")[4]}</p>
        <button id="delbtn" style="background-color: transparent; border: none;">
            <img src="static/imgs/Delete-icon (2).png" alt="">
        </button>
    </li>`
    }
})
document.querySelectorAll("#delbtn").forEach(el => el.addEventListener("click", deleteItem))
fullListUI.innerHTML = FullList