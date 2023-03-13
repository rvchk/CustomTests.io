let test = document.querySelector("#test")
let testQue = document.querySelector("#testQue")
let testAns = document.querySelector("#testAns")
let testBtn = document.querySelector("#testBtn")
let ansTheQue = document.querySelector("#ansTheQue")
let ChooseAnswers = document.querySelector(".ans")
let testInd = 0
let RightAns = 0
testAns.style.display = "none"

renderTest = () => {
    test.innerHTML = `TEST ${testInd}/${QuestionsSEVANS.length}`
    if (!QuestionsTestSEVANS.length){
        testQue.innerHTML = `Result is ${RightAns}/${QuestionsSEVANS.length}`
        testAns.style.display = "none"
        testBtn.innerHTML = "START"
        ansTheQue.innerHTML = ""
        ChooseAnswers.innerHTML = ""
        QuestionsTestSEVANS = localTestSEVANS
        AnswersSEVANS = localAnsSEVANS
        CorrectAnswers = LocalCorrectAnswers
        OtherAnswers = localOtherAnswers
        testInd = 0
        RightAns = 0
        renderTest()
    }
}


testBtn.addEventListener("click", function(){
    testQue.innerHTML = QuestionsTestSEVANS[0]
    ansTheQue.innerHTML = "Answers"
    testAns.style.display = "block"
    testBtn.innerHTML = "Answer"
    if (!CorrectAnswers.length){
        QueStart = false
        renderTest()
    }
    if(testAns.value === CorrectAnswers[0]){
        RightAns += 1
    }
    testAns.value = ""
    if (testInd < QuestionsSEVANS.length){
        testInd += 1
    }
    QuestionsTestSEVANS = QuestionsTestSEVANS.slice(1)
    testQue.innerHTML = QuestionsTestSEVANS[0]
    ChooseAnswers.innerHTML = OtherAnswers[0]
    CorrectAnswers = CorrectAnswers.slice(1)
    OtherAnswers = OtherAnswers.slice(1)
    renderTest()
})