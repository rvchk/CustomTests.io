// Get All Necessary Definitions
let Questions = [""]
let questionInput = document.querySelector("#que")
let answerInput = document.querySelector("#ans")
let create = document.querySelector("#create")
let lengthUI = document.querySelector("#length-UI")
let local = JSON.parse(localStorage.getItem("Questions"))
let completedUI = document.querySelector("#completed-UI")
let Completed = JSON.parse(localStorage.getItem("CompletedTimes"))
let avgTimeArray = JSON.parse(localStorage.getItem("TestTimers"))
let avgTimeUI = document.querySelector("#avgTime")
let TimeArray = localStorage.getItem('TestTimers');
let CheckBox = document.querySelector("#ButtonsCheck")
const ListBlockUI = document.querySelector(".Questions-list")
//

// LocalWork
if (local){
    Questions = local
    Render()
}
if (completedUI) {
    lengthUI.innerHTML = Questions.length-1
    completedUI.innerHTML = Completed
    TimeArray == "[]" ? avgTimeUI.innerHTML = 0: avgTimeUI.innerHTML = Math.round(avgTimeArray.reduce((x,y)=> x+y) / avgTimeArray.length)
}
if (Questions.length == 1) {
    avgTimeArray = []
    CompletedTimes = "0"
    TestTimers = []
    localStorage.setItem('CompletedTimes', JSON.stringify(Completed))
    localStorage.setItem('TestTimers', JSON.stringify(TestTimers))

    ListBlockUI.innerHTML = `
        <div class="Error-block">
            <h1>Oops...</h1>
            <img src="static/imgs/Error-icon.png" alt="Error-icon">
            <h2>You Don't have any Questions yet</h2>
        </div>
    `
}
//


// Create Definition
create.addEventListener("click", () => {
    // Check || If All Fields are Empty
    if (questionInput.value === "" || answerInput.value === ""){
        Render()
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
})
//

// This Fucntion Shows all Changes on the Page
function Render() {
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
    avgTimeArray == "[]" ? avgTimeUI.innerHTML = 0: avgTimeUI.innerHTML = Math.round(avgTimeArray.reduce((x,y)=> x+y) / avgTimeArray.length)

    // Shows the list on WebPage
    document.querySelector("#listQue").innerHTML = list
    // If there will be to many Questions on the Page
    document.querySelectorAll("#delbtn").forEach(el => el.addEventListener("click", deleteItem))

    localStorage.setItem('CompletedTimes', JSON.stringify(Completed))
    localStorage.setItem('TestTimers', JSON.stringify(TimeArray))
}
//

// Delete Item Button
function deleteItem() {
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
}