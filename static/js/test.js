let questionIndex = 0
let rightAnswers = 0
let questionsLength = questions.length
let completedTimes = 0
let timer = 0
let testTimers = []

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
        testTimers.push(timer)
        clearInterval(testTime)
        TestTimerUI.innerHTML = 0

        RenderUI(true)
        completedTimes++
        questionIndex = 0
        rightAnswers = 0
        questions = localQuestions
        localStorage.setItem('completedTimes', JSON.stringify(completedTimes))
        localStorage.setItem('testTimers', JSON.stringify(testTimers))
    }
}

function Test() {
    // Timer
    if (testButton.innerHTML == "Start") {
        timer = 55
        testTime = setInterval(() => {
            timer++
            TestTimerUI.innerHTML = timer
        }, 1000);
    }

    RenderUI(false)

    if (testInput.value == questions[0].Answer){
        rightAnswers ++
    }
    if (testButton.innerHTML == "Answer") {
        questions = questions.slice(1)
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

testButton.addEventListener("click", Test)
Render()

/* let TestTimers = []
let CompletedTimes = 0 
let localTimer = JSON.parse(localStorage.getItem("TestTimers"))
let localCompleted = JSON.parse(localStorage.getItem("CompletedTimes")) */

/* if (localCompleted)  {
    CompletedTimes = localCompleted
    TestTimers = localTimer
}

if (questions.length == 0) {
    document.querySelector(".test").innerHTML = `
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

renderTest = () => {
    test.innerHTML = `TEST ${testInd}/${queLength}`
    if (questions.length == 0){
        timer == null ? timer = 0: TestTimers.push(timer)
        timer = 0
        clearInterval(time)
        time = setInterval(() => {
            timer++
        }, 1000);

        testQue.innerHTML = `Result is ${RightAns}/${queLength}`
        testAns.style.display = "none"
        testBtn.innerHTML = "START"
        ansTheQue.innerHTML = ""
        testInd = 0
        RightAns = 0
        CompletedTimes++
        localStorage.setItem('CompletedTimes', JSON.stringify(CompletedTimes))
        localStorage.setItem('TestTimers', JSON.stringify(TestTimers))
    }
}

testBtn.addEventListener("click", function(){
    if (testAns.value == questions[0].Answer){
        console.log("Correct")
        RightAns += 1
    }
    testAns.value = ""
    if (testInd < queLength){
        testInd ++
    }
    if (testBtn.innerHTML == "Answer") {
        questions = questions.slice(1)
    }
    if (questions.length >= 1) {
        testQue.innerHTML = questions[0].Question
    }
    ansTheQue.innerHTML = "Answer the Question"
    testAns.style.display = "block"
    testBtn.innerHTML = "Answer"
    renderTest()
}) */