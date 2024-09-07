alert("This function working not properly, don't mind it);

let choosedAns = document.querySelector("#HowMany")
let CorAns = document.querySelector("#Corans")
let QuestionsTestSEVANS = [0]
let QuestionsSEVANS = []
let AnswersSEVANS = []
let OtherAnswers = []
let CorrectAnswers = [0]
let AnswersToChoose = []
let localSEVANS = JSON.parse(localStorage.getItem("QuestionsSEVANS"))
let localTestSEVANS = JSON.parse(localStorage.getItem("QuestionsTestSEVANS"))
let localAnsSEVANS = JSON.parse(localStorage.getItem("AnswersSEVANS"))
let localOtherAnswers = JSON.parse(localStorage.getItem("OtherAnswers"))
let LocalCorrectAnswers = JSON.parse(localStorage.getItem("LocalCorrectAnswers"))
let que = document.querySelector("#que")
let ans = document.querySelectorAll("#ans")
let delBtn = document.querySelector("#deleteAll")
let delLastBtn = document.querySelector("#deleteLast")
let delFirstBtn = document.querySelector("#deleteFirst")
let showBtn = document.querySelector("#showBtn")
let closeBtn = document.querySelector("#closeBtn")
showBtn.style.display = "none"
closeBtn.style.display = "none"

if (localSEVANS,localTestSEVANS,localAnsSEVANS){
    QuestionsSEVANS = localSEVANS
    QuestionsTestSEVANS = localTestSEVANS
    AnswersSEVANS = localAnsSEVANS
    OtherAnswers = localOtherAnswers
    CorrectAnswers = LocalCorrectAnswers
    Render()
}

create.addEventListener("click", () => {
    OtherAns = ""
    for(i=0;i<ans.length;i++){
        OtherAns += " " + ans[i].value + ","
    }
    OtherAns += " " + CorAns.value + ","
    OtherAns = OtherAns.substring(0, OtherAns.length - 1)
    OtherAnswers.push(OtherAns)
    QuestionsSEVANS.push(`${que.value} ==> ${CorAns.value} (${OtherAns})`)
    QuestionsTestSEVANS.push(`${que.value} ==> `)
    AnswersSEVANS.push(`${CorAns.value} (${OtherAns})`)
    CorrectAnswers.push(CorAns.value)
    // Get Zero Inf in Input Field
    que.value = ""
    CorAns.value = ""
    for(i=0;i<ans.length;i++){
        ans[i].value = ""
    }
    // Set all Arrays in LocalStorage
    localStorage.setItem('QuestionsSEVANS', JSON.stringify(QuestionsSEVANS))
    localStorage.setItem("QuestionsTestSEVANS", JSON.stringify(QuestionsTestSEVANS))
    localStorage.setItem("AnswersSEVANS", JSON.stringify(AnswersSEVANS))
    localStorage.setItem("OtherAnswers", JSON.stringify(OtherAnswers))
    localStorage.setItem("LocalCorrectAnswers",JSON.stringify(CorrectAnswers))
    //
    Render()
    renderTest()
})
function Render() {
    // Create empty List
    let list = ""
    // To check Every Question
    QuestionsSEVANS.map((x)=> {
        // Add every <li> At <ul>
        list += `
        <li>
            ${x}
        </li>`
    })
    
    // Shows the list on WebPage
    listQue.innerHTML = list
    // If there will be to many Questions on the Page
    if (QuestionsSEVANS.length > 5){
        // Hide list of Questions
        listQue.innerHTML = ""
        // Then reveal ShowBtn
        showBtn.style.display = "block"
        document.querySelector("h3").style.display = "none"
    }
    showBtn.addEventListener("click", () => {
        // If Show button has been Clicked, we Shows the ListQue
        listQue.innerHTML = list
        // Add the CloseBtn
        closeBtn.style.display = "block"
        // And hide ShowBtn
        showBtn.style.display = "none"
        document.querySelector("h3").style.display = "block"

    })
    closeBtn.addEventListener("click", () => {
        // If Close button has been clicked, We Hide list
        listQue.innerHTML = ""
        // Hide the CloseBtn
        closeBtn.style.display = "none"
        // And Reveal ShowBtn
        showBtn.style.display = "block"
        document.querySelector("h3").style.display = "none"
    })
}

// Button to Clear all Parametres and Questions
delBtn.addEventListener("dblclick", () => {
    localStorage.clear()
    QuestionsSEVANS = []
    QuestionsTestSEVANS = []
    testQueSEVANS = []
    AnswersSEVANS = ["0"]
    AnswersToChoose = []
    CorrectAnswers = []
    showBtn.style.display = "none"
    closeBtn.style.display = "none"
    document.querySelector("h3").style.display = "block"
    localStorage.setItem("QuestionsSEVANS",JSON.stringify(QuestionsSEVANS))
    localStorage.setItem("QuestionsTestSEVANS",JSON.stringify(QuestionsTestSEVANS))
    localStorage.setItem("AnswersSEVANS",JSON.stringify(AnswersSEVANS))
    localStorage.setItem("AnswersToChoose",JSON.stringify(AnswersToChoose))
    localStorage.setItem("LocalCorrectAnswers",JSON.stringify(CorrectAnswers))
    Render()
    renderTest()
})
//

// Function to DeleteLast Item
delLastBtn.addEventListener("dblclick", () => {
    // Deleting Last Item From Array
    AnswersSEVANS.pop()
    QuestionsSEVANS.pop()
    QuestionsTestSEVANS.pop()
    AnswersToChoose.pop()
    CorrectAnswers.pop()
    OtherAnswers.pop()
    // And Then Set his Value to LocalStorage
    localStorage.setItem("QuestionsSEVANS",JSON.stringify(QuestionsSEVANS))
    localStorage.setItem("QuestionsTestSEVANS",JSON.stringify(QuestionsTestSEVANS))
    localStorage.setItem("AnswersSEVANS",JSON.stringify(AnswersSEVANS))
    localStorage.setItem("AnswersToChoose",JSON.stringify(AnswersToChoose))
    Render()
    renderTest()
})
// Function to DeleteFirst Item
delFirstBtn.addEventListener("dblclick", () => {
    // Deleting First Item From Array
    QuestionsSEVANS.shift()
    QuestionsTestSEVANS.shift()
    AnswersSEVANS.shift()
    AnswersToChoose.shift()
    CorrectAnswers.shift()
    OtherAnswers.shift()
    // And Then Set his Value to LocalStorage
    localStorage.setItem("QuestionsSEVANS",JSON.stringify(QuestionsSEVANS))
    localStorage.setItem("QuestionsTestSEVANS",JSON.stringify(QuestionsTestSEVANS))
    localStorage.setItem("AnswersSEVANS",JSON.stringify(AnswersSEVANS))
    localStorage.setItem("AnswersToChoose",JSON.stringify(AnswersToChoose))
    Render()
    renderTest()
})
//


