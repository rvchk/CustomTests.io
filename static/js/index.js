// Create a Question
let Questions = []
let que = document.querySelector("#que")
let ans = document.querySelector("#ans")
let create = document.querySelector("#create")
let local = JSON.parse(localStorage.getItem("Questions"))
let listQue = document.querySelector("#listQue")
let delBtn = document.querySelector("#deleteAll")
let delLastBtn = document.querySelector("#deleteLast")

if (local){
    Questions = local
    Render()
}

create.addEventListener("click", function(){
    if (que.value === "" && ans.value === ""){
        Render()
    }
    else {
        Questions.push(`${que.value} ==> ${ans.value}`)
        que.value = ""
        ans.value = ""
        localStorage.setItem('Questions', JSON.stringify(Questions))
        Render()
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
})

delLastBtn.addEventListener("dblclick", function(){
    localStorage.Questions
    localStorage.Questions = JSON.stringify(Questions.slice(0, -1))
    Questions.pop()
    console.log(Questions)
    Render()
})

// Test
