// Create a Question
let QuestionsTest = []
let Questions = []
let que = document.querySelector("#que")
let ans = document.querySelector("#ans")
let create = document.querySelector("#create")
let local = JSON.parse(localStorage.getItem("Questions"))
let localTest = JSON.parse(localStorage.getItem("QuestionsTest"))
let listQue = document.querySelector("#listQue")
let delBtn = document.querySelector("#deleteAll")
let delLastBtn = document.querySelector("#deleteLast")

if (local){
    Questions = local
    QuestionsTest = localTest
    Render()
}


create.addEventListener("click", function(){
    if (que.value === "" && ans.value === ""){
        Render()
    }
    else {
        Questions.push(`${que.value} ==> ${ans.value}`)
        QuestionsTest.push(`${que.value} ==> `)
        que.value = ""
        ans.value = ""
        localStorage.setItem('Questions', JSON.stringify(Questions))
        localStorage.setItem("QuestionsTest", JSON.stringify(QuestionsTest))
        Render()
        renderTest()
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
}

delBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    Questions = []
    Render()
    renderTest()
})

delLastBtn.addEventListener("dblclick", function(){
    localStorage.Questions
    localStorage.Questions = JSON.stringify(Questions.slice(0, -1))
    Questions.pop()
    console.log(Questions)
    Render()
    renderTest()
})

// Test
let test = document.querySelector("#test")
let testQue = document.querySelector("#testQue")
let testAns = document.querySelector("#testAns")
let testBtn = document.querySelector("#testBtn")
let testInd = 0
console.log(localTest)

function renderTest(){
    test.innerHTML = `TEST ${testInd}/${Questions.length}`
}

testBtn.addEventListener("click", function(){
    testAns.value = ""
    if (testInd < Questions.length){
        testInd += 1
    }
    if(testInd == Questions.length){
        testInd --
    }
    testQue.innerHTML = QuestionsTest[0]
    QuestionsTest = QuestionsTest.slice(1)
    renderTest()
    console.log(QuestionsTest)
})
