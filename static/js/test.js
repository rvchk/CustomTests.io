let test = document.querySelector("#test")
let testQue = document.querySelector("#testQue")
let testAns = document.querySelector("#testAns")
let testBtn = document.querySelector("#testBtn")
let ansTheQue = document.querySelector("#ansTheQue")
let testInd = 0
let RightAns = 0
testAns.style.display = "none"

function renderTest(){
    test.innerHTML = `TEST ${testInd}/${Questions.length}`
    if (!Answers.length){
        testQue.innerHTML = `Result is ${RightAns}/${Questions.length}`
        testAns.style.display = "none"
        testBtn.innerHTML = "START"
        ansTheQue.innerHTML = ""
        QuestionsTest = localTest
        Answers = localAns
        testInd = 0
        RightAns = 0
        renderTest()
    }
}

testBtn.addEventListener("click", function(){
    testQue.innerHTML = QuestionsTest[0]
    ansTheQue.innerHTML = "Answer the Question"
    testAns.style.display = "block"
    testBtn.innerHTML = "Answer"
    if (!Questions.length){
        QueStart = false
        renderTest()
    }
    if(testAns.value == Answers[0]){
        RightAns += 1
    }
    testAns.value = ""
    if (testInd < Questions.length){
        testInd += 1
    }
    testQue.innerHTML = QuestionsTest[0]
    QuestionsTest = QuestionsTest.slice(1)
    Answers = Answers.slice(1)
    renderTest()
})
