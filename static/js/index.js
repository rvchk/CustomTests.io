// Get All Necessary Definitions
let QuestionsTest = []
let Questions = []
let Answers = ["0"]
let que = document.querySelector("#que")
let ans = document.querySelector("#ans")
let create = document.querySelector("#create")
let local = JSON.parse(localStorage.getItem("Questions"))
let localTest = JSON.parse(localStorage.getItem("QuestionsTest"))
let localAns = JSON.parse(localStorage.getItem("Answers"))
let listQue = document.querySelector("#listQue")
let delBtn = document.querySelector("#deleteAll")
let delLastBtn = document.querySelector("#deleteLast")
let delFirstBtn = document.querySelector("#deleteFirst")
let showBtn = document.querySelector("#showBtn")
let closeBtn = document.querySelector("#closeBtn")
showBtn.style.display = "none"
closeBtn.style.display = "none"
// alert function

function alert() {
    alert("This is not working properly, I Should solve it one day)")
}

// LocalWork
if (local,localTest,localAns){
    Questions = local
    QuestionsTest = localTest
    Answers = localAns
    Render()
}
//

// Create Definition
create.addEventListener("click", () => {
    // Check || If All Fields are Empty
    if (que.value === "" || ans.value === ""){
        Render()
    }
    else {
        // Add all Parameters in Arrays
        Questions.push(`${que.value} ==> ${ans.value}`)
        QuestionsTest.push(`${que.value} ==> `)
        Answers.push(`${ans.value}`)
        // Get Zero Inf in Input Field
        que.value = ""
        ans.value = ""
        // Set all Arrays in LocalStorage
        localStorage.setItem('Questions', JSON.stringify(Questions))
        localStorage.setItem("QuestionsTest", JSON.stringify(QuestionsTest))
        localStorage.setItem("Answers", JSON.stringify(Answers))
        //
        Render()
        renderTest()
    }
})
//

// This Fucntion Shows all Changes on the Page
function Render() {
    // Create empty List
    let list = ""
    // To check Every Question
    Questions.map((x)=> {
        // Add every <li> At <ul>
        list += `
        <li>
            ${x}
        </li>`
    })
    
    // Shows the list on WebPage
    listQue.innerHTML = list
    // If there will be to many Questions on the Page
    if (Questions.length > 5){
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
//

// Button to Clear all Parametres and Questions
delBtn.addEventListener("dblclick", () => {
    localStorage.clear()
    Questions = []
    QuestionsTest = []
    testQue = []
    Answers = ["0"]
    showBtn.style.display = "none"
    closeBtn.style.display = "none"
    document.querySelector("h3").style.display = "block"
    Render()
    renderTest()
})
//

// Function to DeleteLast Item
delLastBtn.addEventListener("dblclick", () => {
    // Deleting Last Item From Array
    Answers.pop()
    Questions.pop()
    QuestionsTest.pop()
    // And Then Set his Value to LocalStorage
    localStorage.setItem("Questions",JSON.stringify(Questions))
    localStorage.setItem("QuestionsTest",JSON.stringify(QuestionsTest))
    localStorage.setItem("Answers",JSON.stringify(Answers))
    Render()
    renderTest()
})
// Function to DeleteFirst Item
delFirstBtn.addEventListener("dblclick", () => {
    // Deleting First Item From Array
    Questions.shift()
    QuestionsTest.shift()
    Answers.shift()
    // And Then Set his Value to LocalStorage
    localStorage.setItem("Questions",JSON.stringify(Questions))
    localStorage.setItem("QuestionsTest",JSON.stringify(QuestionsTest))
    localStorage.setItem("Answers",JSON.stringify(Answers))
    Render()
    renderTest()
})
//
