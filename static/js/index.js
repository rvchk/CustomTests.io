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
let localCompletedTests = JSON.parse(localStorage.getItem("CompletedTimes"))
let localTimeArray = JSON.parse(localStorage.getItem("TestTimers"))

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
    let list = ""

    questions.map((x) => {
        list += `
            <li>
                ${x.Question} ==> ${x.Answer}
                <button id="deleteButton" style="background-color: transparent; border: none;">
                    <img src="static/imgs/Icons/Delete-icon.png" alt="">
                </button>
            </li>`
        })

    if (questions.length == 0) {
        Completed = 0
        questionsUI.innerHTML = `
            <div class="Error-block">
                <h1>Oops...</h1>
                <img src="static/imgs/Error-icon.png" alt="Error-icon">
                <h2>You Don't have any Questions yet</h2>
            </div>`
    }
    else {  
        questionsUI.innerHTML = `
        <h1>List of Questions</h1>
        <ul id="listQue"></ul>`

        document.querySelector("#listQue").innerHTML = list
    }
          
    questionsLengthUI.innerHTML = questions.length
        
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
/* create.addEventListener("click", () => {
    // Check || If All Fields are Empty
    if (questionInput.value === "" || answerInput.value === ""){
        return
    }
    else {
        const date = new Date()
        let CurrentDate = `${String(date).split(" ").slice(1,4).join("/")}`
        // Pushing all data to an array

        if (CheckBox.checked) {
            Questions.push(`${questionInput.value} ==> ${answerInput.value} Button ${CurrentDate}`)
        }
        else {
            Questions.push(`${questionInput.value} ==> ${answerInput.value} Text ${CurrentDate}`)
        }

        // Add all Parameters in Arrays
        // Get Zero Inf in Input Field
        questionInput.value = ""
        answerInput.value = ""
        // Set all Arrays in LocalStorage
        localStorage.setItem('Questions', JSON.stringify(Questions))
        Render()
        renderTest()
    }
}) */
//

// This Fucntion Shows all Changes on the Page
/* function Render() {
    if (Questions.length > 1) {
        ListBlockUI.innerHTML = `
            <h1>List of Questions</h1>
            <ul id="listQue"></ul>
        `
    }

    lengthUI.innerHTML = Questions.length-1
    // Create empty List
    let list = ""
    // To check Every Question
    Questions.map((question)=> {
        if (question !== "") {
            // Add every <li> At <ul>
            // 69 stroke removes the TYPE from <li>
            list += `
            <li>
                ${ // Question without TYPE and DATE
                    question.split(" ").slice(0, -2).join(" ")}
                <button id="delbtn" style="background-color: transparent; border: none;">
                    <img src="static/imgs/Icons/Delete-icon.png" alt="">
                </button>
            </li>`
        }
    })

    completedUI.innerHTML = Completed

    // Shows the list on WebPage
    document.querySelector("#listQue").innerHTML = list
    // If there will be to many Questions on the Page
    document.querySelectorAll("#delbtn").forEach(el => el.addEventListener("click", deleteItem))

    localStorage.setItem('CompletedTimes', JSON.stringify(Completed))
    localStorage.setItem('TestTimers', JSON.stringify(TimeArray))
} */
//

// Delete Item Button
/* function deleteItem() {
    let index = Questions.indexOf(this.closest("li").innerText.split(" ").slice(0,3).join(" "))
    Questions.splice(index, 1)
    this.closest("li").remove()
    localStorage.setItem("Questions",JSON.stringify(Questions))
    
    if (Questions.length == 1) {
        Completed = 0
        ListBlockUI.innerHTML = `
            <div class="Error-block">
                <h1>Oops...</h1>
                <img src="static/imgs/Error-icon.png" alt="Error-icon">
                <h2>You Don't have any Questions yet</h2>
            </div>
        `
    }
    Render()
} */

