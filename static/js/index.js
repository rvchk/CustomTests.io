// Get All Necessary Definitions
let questions = []

const questionInput = document.querySelector("#que")
const answerInput = document.querySelector("#ans")
const createButton = document.querySelector("#create")
const questionsLengthUI = document.querySelector("#length-UI")
const completedTestsUI = document.querySelector("#completed-UI")
const timeArrayUI = document.querySelector("#avgTime")
const questionTypeText = document.querySelector("#radioText")
const questionsUI = document.querySelector(".Questions-list")

let localQuestions = JSON.parse(localStorage.getItem("localQuestions"))
let completed = JSON.parse(localStorage.getItem("completedTimes"))
let localTimeTests = JSON.parse(localStorage.getItem("testTimers"))

if (localQuestions) {
    questions = localQuestions
}

function CurrentDate() {
    let date = new Date()
    return `${String(date).split(" ").slice(1,4).join("/")}`
}

function CreateQuestion() {
    createButton.innerHTML = "Create"
    if (questionInput.value && answerInput.value) {
        questions.push(
            {
                // .replace -- removes excess spaces
                Question: questionInput.value.replace(/\s/g, ""),
                Answer: answerInput.value.replace(/\s/g, ""),
                Type: questionTypeText.checked ? "Text" : "Button",
                Date: CurrentDate()
            }
        )
        
        questionInput.value = ""
        answerInput.value = ""

        localStorage.setItem('localQuestions', JSON.stringify(questions))
        Render()
    }
    console.log(questions)
}

function Render() {
    if (questions.length == 0) {
        completed = 0
        localTimeTests = []
        localStorage.setItem('testTimers', JSON.stringify(localTimeTests))
        localStorage.setItem('completedTimes', JSON.stringify(completed))
        completedTestsUI.innerHTML = completed
        timeArrayUI.innerHTML = 0

        questionsUI.innerHTML = `
            <div class="Error-block">
                <h1>Oops...</h1>
                <img src="static/imgs/Error-icon.png" alt="Error-icon">
                <h2>You Don't have any Questions yet</h2>
            </div>`
    }

    let list = []
        questions.map((x) => {
                list.push(`
                <li>
                    ${x.Question} ==> ${x.Answer}
                        <div>
                        <button id="editButton" style="background-color: transparent; border: none;">
                            <img src="static/imgs/Icons/Edit-icon.png" alt="">
                        </button>
                        <button id="deleteButton" style="background-color: transparent; border: none;">
                            <img src="static/imgs/Icons/Delete-icon.png" alt="">
                        </button>
                        </div>
                </li>`
        )})

    if (questions.length > 0) {  
        questionsUI.innerHTML = `
        <h1>List of Questions</h1>
        <ul id="listQue"></ul>`

        document.querySelector("#listQue").innerHTML = list.slice(0,8).join("")
    }
          
    questionsLengthUI.innerHTML = questions.length
    completedTestsUI.innerHTML = completed
    timeArrayUI.innerHTML = localTimeTests.length ? Math.round(localTimeTests.reduce((x,y)=>x+y)/localTimeTests.length) : 0
        
    let allDeleteButtons = document.querySelectorAll("#deleteButton")
    allDeleteButtons.forEach(deleteButton => deleteButton.addEventListener("click", DeleteQuestion))
    
    let allEditButtons = document.querySelectorAll("#editButton")
    allEditButtons.forEach(editButton => editButton.addEventListener("click", EditQuestion))  
}

function DeleteQuestion() {
    let index = questions.map(x => `${x.Question}==>${x.Answer}`)
        .indexOf(this.closest("li").innerText.replace(/\s/g, "")
    )

    questions.splice(index, 1)
    localStorage.setItem('localQuestions', JSON.stringify(questions))
    Render()
}

function EditQuestion() {
    let currentQuestion = this.closest("li").innerText.split(" ")
    let arrowIndex = currentQuestion.indexOf("==>")

    questionInput.value = currentQuestion.slice(0, arrowIndex).join(" ")
    answerInput.value = currentQuestion.slice(arrowIndex+1, currentQuestion.length).join(" ")
    createButton.innerHTML = "Change"

    let index = questions.map(x => `${x.Question}==>${x.Answer}`)
        .indexOf(this.closest("li").innerText.replace(/\s/g, ""))

    questions.splice(index, 1)
    localStorage.setItem('localQuestions', JSON.stringify(questions))
    Render()
}

createButton.addEventListener("click", CreateQuestion)
Render()