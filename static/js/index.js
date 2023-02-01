// Create a Question
let QueStart = true
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
let showBtn = document.querySelector("#showBtn")
let closeBtn = document.querySelector("#closeBtn")
showBtn.style.display = "none"
closeBtn.style.display = "none"



if (local){
    Questions = local
    Render()
}
if (localTest){
    QuestionsTest = localTest
    Render()
}
if (localAns){
    Answers = localAns
    Render()
}


create.addEventListener("click", function(){
    if (Questions.length > 10){
        listQue.innerHTML = ""
    }

    if (que.value === "" && ans.value === ""){
        Render()
    }
    else {
        Questions.push(`${que.value} ==> ${ans.value}`)
        QuestionsTest.push(`${que.value} ==> `)
        Answers.push(`${ans.value}`)
        que.value = ""
        ans.value = ""
        localStorage.setItem('Questions', JSON.stringify(Questions))
        localStorage.setItem("QuestionsTest", JSON.stringify(QuestionsTest))
        localStorage.setItem("Answers", JSON.stringify(Answers))
        Render()
        renderTest()
        console.log(Answers)
    }
})


function Render(){
    let list = ""
    for (i = 0; i < Questions.length; i++){
        list += `
        <li>
            ${Questions[i]}
        </li>`
    }
    listQue.innerHTML = list
    if (Questions.length > 5){
        listQue.innerHTML = ""
        showBtn.style.display = "block"
    }
    showBtn.addEventListener("click", function(){
        listQue.innerHTML = list
        closeBtn.style.display = "block"
        showBtn.style.display = "none"
    })
    closeBtn.addEventListener("click", function(){
        listQue.innerHTML = ""
        closeBtn.style.display = "none"
        showBtn.style.display = "block"
    })
}


delBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    Questions = []
    QuestionsTest = []
    testQue = []
    Answers = ["0"]
    showBtn.style.display = "none"
    closeBtn.style.display = "none"
    Render()
    renderTest()
    location.reload()
    console.log(Answers)
})


delLastBtn.addEventListener("dblclick", function(){
    localStorage.Answers
    localStorage.Answers = JSON.stringify(Answers.slice(0, -1))
    localStorage.QuestionsTest
    localStorage.QuestionsTest = JSON.stringify(QuestionsTest.slice(0, -1))
    localStorage.Questions
    localStorage.Questions = JSON.stringify(Questions.slice(0, -1))
    Answers.pop()
    Questions.pop()
    QuestionsTest.pop()
    Render()
    renderTest()
})


// Test
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
    console.log(Answers)
})
