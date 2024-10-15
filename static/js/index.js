// Get All Necessary Definitions
let questions = []

const questionInput = document.querySelector("#que")
const answerInput = document.querySelector("#ans")
const createButton = document.querySelector("#create")
const questionsLengthUI = document.querySelector("#length-UI")
const completedTestsUI = document.querySelector("#completed-UI")
const timeArrayUI = document.querySelector("#avgTime")
const checkBoxUI = document.querySelector("#ButtonsCheck")
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
    if (questionInput.value && answerInput.value) {

        questions.push(
            {
                Question: questionInput.value,
                Answer: answerInput.value,
                Type: checkBoxUI.checked ? "Button" : "Text",
                Date: CurrentDate()
            }
        )
        
        questionInput.value = ""
        answerInput.value = ""

        localStorage.setItem('localQuestions', JSON.stringify(questions))
        Render()
    }
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
                    <button id="deleteButton" style="background-color: transparent; border: none;">
                        <img src="static/imgs/Icons/Delete-icon.png" alt="">
                    </button>
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
}

function DeleteQuestion() {
    let index = questions.map((x)=> `${x.Question} ==> ${x.Answer}`).indexOf(this.closest("li").innerText)
    questions.splice(index, 1)

    localStorage.setItem('localQuestions', JSON.stringify(questions))
    Render()
}

createButton.addEventListener("click", CreateQuestion)
Render()