const fullListUI = document.querySelector("#FullList")
const listLengthUI = document.querySelector("#length-UI")
let editing = false

let FullList = ""

function NoQuestions() {
    document.querySelector(".List-container").innerHTML = `
    <div class="List-Error-block">
        <h1>Oops...</h1>
        <img src="static/imgs/Error-icon.png" alt="Error-icon">
        <h2>You Don't have any Questions yet</h2>
        <h2 style="margin-top: 70px; margin-bottom: 30px;">Go and create one</h2>
        <a href="index.html">
            <button>Create</button>
        </a>
    </div>`
}

function Render() {
    if(questions.length==0) NoQuestions()

    questions.map((x) => {
        FullList += `
        <li>
            <p id="Question-form">${x.Question}</p>
            <p id="Answer-form">${x.Answer}</p>
            <p id="Type-form">${x.Type}</p>
            <p>${x.Date}</p>

            <button id="editButton" style="background-color: transparent; border: none;">
                <img src="static/imgs/Icons/Edit-icon.png" alt="">
            </button>
            <button id="deleteButton" style="background-color: transparent; border: none;">
                <img src="static/imgs/Icons/Delete-icon.png" alt="">
            </button>
        </li>`
    })
    fullListUI.innerHTML = FullList
    listLengthUI.innerHTML = questions.length
    FullList = ""

    let allDeleteButtons = document.querySelectorAll("#deleteButton")
    allDeleteButtons.forEach(deleteButton => deleteButton.addEventListener("click", DeleteQuestionList))

    let allEditButtons = document.querySelectorAll("#editButton")
    allEditButtons.forEach(editButton => editButton.addEventListener("click", EditQuestionList)) 
}

function DeleteQuestionList() {
    let index = questions.map((x)=> `${x.Question}\n\n${x.Answer}\n\n${x.Type}\n\n${x.Date}`).indexOf(this.closest("li").innerText)
    questions.splice(index, 1)

    localStorage.setItem('localQuestions', JSON.stringify(questions))
    Render()
}

function EditQuestionList() {
    
    if (!editing) {
        let question = this.closest("li").innerText.replace(/\s/g, " ").split(" ")
        let questionForm = this.closest("li").querySelector("#Question-form")
        let answerForm = this.closest("li").querySelector("#Answer-form")
        let typeForm = this.closest("li").querySelector("#Type-form")

        editing = true

        this.closest("li").querySelector("#editButton").innerHTML = `
            <button id="acceptButton" style="background-color: transparent; border: none;">
                <img src="static/imgs/Icons/Accept-icon1.png" alt="" style="transform: scale(1.3);">
            </button>
        `
        questionForm.innerHTML = `
            <input value=${question[0]}></input>
        `
        answerForm.innerHTML = `
            <input value=${question[2]}></input>
        `
        typeForm.innerHTML = `
            <select id="TypeSelect">
                <option>${question[4]}</option>
                <option>Button</option>
            </select>
        `
    }
}

Render() 