let fullListUI = document.querySelector("#FullList")
let FullList = ""
Questions.map((question)=> {
    let arrowIndex = question.split(" ").indexOf("==>")
    const que = question.split(" ")
    if (question !== "") {
        FullList += `
        <li>
        <p>${que.slice(0, arrowIndex).join(" ")}</p>
        <p>${que.slice(arrowIndex+1, que.length).slice(0, -2).join(" ")}</p>
        <p>${que.slice(-1 * 2)[0]}</p>
        <p>${que.slice(-1)}</p>
        <button id="delbtn" style="background-color: transparent; border: none;">
        <img src="static/imgs/Delete-icon (2).png" alt="">
        </button>
    </li>`
}
})

lengthUI.innerHTML = Questions.length-1
fullListUI.innerHTML = FullList