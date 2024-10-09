let fullListUI = document.querySelector("#FullList")
let FullList = ""

function Render() {
    let allDeleteButtonss = document.querySelectorAll("#deleteButton")
    allDeleteButtonss.forEach(deleteButton => deleteButton.addEventListener("click", DeleteQuestionList)) 
}

function RenderUI() {
    if (questions.length == 0) {
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
    
    questions.map((x) => {
        FullList += `
            <li>
                <p>${x.Question}</p>
                <p>${x.Answer}</p>
                <p>${x.Type}</p>
                <p>${x.Date}</p>
                <button id="deleteButton" style="background-color: transparent; border: none;">
                    <img src="static/imgs/Icons/Delete-icon.png" alt="">
                </button>
            </li>`
    })
    fullListUI.innerHTML = FullList
    FullList = ""
    Render()
}

RenderUI()

function DeleteQuestionList() {
    let index = questions.map((x)=> `${x.Question}\n\n${x.Answer}\n\n${x.Type}\n\n${x.Date}`).indexOf(this.closest("li").innerText)

    questions.splice(index, 1)
    console.log(questions)
    localStorage.setItem('localQuestions', JSON.stringify(questions))
    RenderUI()
}
Render()