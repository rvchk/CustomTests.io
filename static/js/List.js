let fullListUI = document.querySelector("#FullList")
let FullList = ""

if (Questions.length == 1) {
    document.querySelector(".List-container").innerHTML = `
        <div class="List-Error-block">
            <h1>Oops...</h1>
            <img src="static/imgs/Error-icon.png" alt="Error-icon">
            <h2>You Don't have any Questions yet</h2>
            <h2 style="margin-top: 70px; margin-bottom: 30px;">Go and create one</h2>
            <a href="index.html">
                <button>Create</button>
            </a>
        </div>
    `
}

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
            <img src="static/imgs/Icons/Delete-icon.png" alt="">
        </button>
    </li>`
}
})

lengthUI.innerHTML = Questions.length-1
fullListUI.innerHTML = FullList