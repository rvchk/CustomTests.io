let questionIndex = 0
let rightAnswers = 0
let questionsLength = questions.length
let completedTimes = 0
let timer = 0
let testTimers = []
let allAnswerButtons

const testContainer = document.querySelector(".Test")
const questionNumber = document.querySelector("#Question-number")
const testQuestion = document.querySelector("#Test-Question")
const testInput = document.querySelector("#Test-input")
const testButton = document.querySelector("#Test-button")
const questionNumberUI = document.querySelector(".Test-question")
const testLengthUI = document.querySelector("#Questions-length")
const TestTimerUI = document.querySelector("#TestTime-clock")

let localCompleted = JSON.parse(localStorage.getItem("completedTimes"))
let localTimers = JSON.parse(localStorage.getItem("testTimers"))

if (localCompleted) {
    testTimers = localTimers
    completedTimes = localCompleted
}

function NoQuestions() {
    testContainer.innerHTML = `
    <div class="List-Error-block">
        <h1>Oops...</h1>
        <img src="static/imgs/Error-icon.png" alt="Error-icon">
        <h2>You Don't have any Questions yet</h2>
        <h2 style="margin-top: 70px; margin-bottom: 30px;">Go and create one</h2>
        <a href="index.html">
            <button>Create</button>
        </a>
    </div>`
    testContainer.style = "box-shadow: 0px 0px 0px 0px; margin-top: 0px; width: auto;"
}

function AllToDefault() {
    clearInterval(testTime)
    TestTimerUI.innerHTML = 0
    questionIndex = 0
    rightAnswers = 0
    questions = localQuestions
}

function ChooseAnswer() {
    let clickedButton = this.closest("button")

    allAnswerButtons.forEach((button)=>{
        button.id = "AnswerOption"
    })
    testInput.value = clickedButton.innerText
    clickedButton.id = "ChoosedAnswer"
}

function RenderUI(option) {
    if (option) {
        testQuestion.innerHTML = `Result is ${rightAnswers}/${questionsLength}`
        testInput.style = "display: none;"
        testButton.innerHTML = "Start"
        questionNumberUI.style = "display: none;"
    }
    else {
        testInput.style = "display: block;"
        questionNumberUI.style = "display: flex;"
    }
}

function Render() {
    if (questionsLength == 0) NoQuestions()

    questionNumber.innerHTML = `${questionIndex}/${questionsLength}`
    testLengthUI.innerHTML = questionsLength

    if (questions.length == 0){
        AllToDefault()
        console.log("DOne")
        testTimers.push(timer)
        RenderUI(true)
        completedTimes++
        localStorage.setItem('completedTimes', JSON.stringify(completedTimes))
        localStorage.setItem('testTimers', JSON.stringify(testTimers))
    }
}

function RandomAnswer() {
    return questions[Math.ceil(Math.random()*questions.length-1)]
}

function Test() {
    RenderUI(false)
    // Timer and Shuffle
    if (testButton.innerHTML == "Start") {
        ShuffleArray(questions)

        timer = 0
        testTime = setInterval(() => {
            timer++
            TestTimerUI.innerHTML = timer
        }, 1000);
    }

    if (testInput.value == questions[0].Answer){
        console.log("Correct");
        rightAnswers ++
    }

    if (testButton.innerHTML == "Answer") {
        if (questions.length !== 0) {
            questions = questions.slice(1)
        }
    }

    if (questions.length >= 1 && questions[0].Type == "Button"){
        
        let randomAnswer = RandomAnswer().Answer
        testInput.style = "display: none;"
        document.querySelector(".Test-answerContainer").innerHTML = `
            <button id="AnswerOption">${randomAnswer}</button>
            <button id="AnswerOption">${questions[0].Answer}</button>
        `
        
        allAnswerButtons = document.querySelectorAll("#AnswerOption")
        allAnswerButtons.forEach(AnswerOption => AnswerOption.addEventListener("click", ChooseAnswer)) 
    }

    if (questions.length >= 1) {
        testQuestion.innerHTML = questions[0].Question
    }

    if (questionIndex < questionsLength){
        questionIndex ++
    }

    testInput.value = ""
    testButton.innerHTML = "Answer"
    
    Render()
}

function ShuffleArray(array) {
    array = array.sort(() => Math.random() - 0.5)
}

testButton.addEventListener("click", Test)
Render()