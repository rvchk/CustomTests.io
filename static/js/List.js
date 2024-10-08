let fullListUI = document.querySelector("#FullList")
let FullList = ""
Questions.map((question)=> {
    let arrowIndex = question.split(" ").indexOf("==>")
    if (question !== "") {
        FullList += `
        <li>
        <p>${question.split(" ").slice(0, arrowIndex).join(" ")}</p>
        <p>${question.split(" ").slice(arrowIndex+1, question.length).slice(0, -2).join(" ")}</p>
        <p>${question.split(" ").slice(-1 * 2)[0]}</p>
        <p>${question.split(" ").slice(-1)}</p>
        <button id="delbtn" style="background-color: transparent; border: none;">
        <img src="static/imgs/Delete-icon (2).png" alt="">
        </button>
    </li>`
}
})

lengthUI.innerHTML = Questions.length-1
fullListUI.innerHTML = FullList