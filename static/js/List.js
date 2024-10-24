const fullListUI = document.querySelector("#FullList")
const listLengthUI = document.querySelector("#length-UI")
const listPagesUI = document.querySelector(".List-pages")
let editing = false

let FullList = []
let currentPage = 1

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
    if (questions.length==0) NoQuestions()

    questions.map((x) => {
        FullList.push (`
        <li>
            <p id="Question-form">${x.Question}</p>
            <p id="Answer-form">${x.Answer}</p>
            <p id="Type-form">${x.Type}</p>
            <p id="CurrentDate">${x.Date}</p>

            <button id="editButton" style="background-color: transparent; border: none;">
                <img src="static/imgs/Icons/Edit-icon.png" alt="">
            </button>
            <button id="deleteButton" style="background-color: transparent; border: none;">
                <img src="static/imgs/Icons/Delete-icon.png" alt="">
            </button>
        </li>`)
    })
    fullListUI.innerHTML = FullList.slice(currentPage*10-10, currentPage*10).join("")
    listLengthUI.innerHTML = questions.length
    FullList = []

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

function AcceptEdit() {
    if (editing) {
        editing = false
        questions.push({
            // .replace -- removes excess spaces
            Question: this.closest("li").querySelector("#queInput").value.replace(/\s/g, ""),
            Answer: this.closest("li").querySelector("#ansInput").value.replace(/\s/g, ""),
            Type: this.closest("li").querySelector("#TypeSelect").value,
            Date: this.closest("li").querySelector("#CurrentDate").innerText
        })
        questions.splice(index, 1)
        localStorage.setItem('localQuestions', JSON.stringify(questions))

        Render()
    }
}

function EditQuestionList() {

    let questionForm = this.closest("li").querySelector("#Question-form")
    let answerForm = this.closest("li").querySelector("#Answer-form")
    let typeForm = this.closest("li").querySelector("#Type-form")

    if (!editing) {
        index = questions.map((x)=> `${x.Question}\n\n${x.Answer}\n\n${x.Type}\n\n${x.Date}`).indexOf(this.closest("li").innerText)

        this.closest("li").querySelector("#editButton").innerHTML = `
            <img src="static/imgs/Icons/Accept-icon.png" alt="" style="transform: scale(1.3);">
        `
        this.closest("li").querySelector("#editButton").id = "acceptButton"

        questionForm.innerHTML = `
            <input id="queInput" value=${questionForm.innerText}></input>
        `
        answerForm.innerHTML = `
            <input id="ansInput" value=${answerForm.innerText}></input>
        `
        typeForm.innerHTML = `
            <select id="TypeSelect">
                <option>${typeForm.innerText}</option>
                <option>${typeForm.innerText == "Text" ? "Button" : "Text"}</option>
            </select>
        `

        editing = true
        console.log("clicked")
    }
    
    let acceptButton = document.querySelector("#acceptButton")
    acceptButton.addEventListener("click", AcceptEdit) 
}

function ChoosePage() {
    document.querySelectorAll(".page-number").forEach(page => page.id = "")
    this.id= "current-page"
    currentPage = this.innerText
    Render()
}

function ListPages() {
    let length = questions.length
    let pages = length % 10 == 0? 45/10: Math.floor(length/10)+1
    let pagesUI = `<h1 id="current-page" class="page-number">1</h1>`
    for (let i = 2; i<pages+1; i++) {
        pagesUI += `<h1 class="page-number">${i}</h1>`
    }
    listPagesUI.innerHTML = pagesUI
    document.querySelectorAll(".page-number").forEach(num => num.addEventListener("click", ChoosePage))
}

Render()
ListPages()