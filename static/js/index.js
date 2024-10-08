// Get All Necessary Definitions
let Questions = [""]
let que = document.querySelector("#que")
let ans = document.querySelector("#ans")
let create = document.querySelector("#create")
let lengthUI = document.querySelector("#length-UI")
let local = JSON.parse(localStorage.getItem("Questions"))
let listQue = document.querySelector("#listQue")
let completedUI = document.querySelector("#completed-UI")
let Completed = JSON.parse(localStorage.getItem("CompletedTimes"))
let avgTimeArray = JSON.parse(localStorage.getItem("TestTimers"))
let avgTimeUI = document.querySelector("#avgTime")
let TimeArray = localStorage.getItem('TestTimers');
let CheckBox = document.querySelector("#ButtonsCheck")
//

// LocalWork
if (local){
    Questions = local
    Render()
}
if(completedUI) {
    lengthUI.innerHTML = Questions.length-1
    completedUI.innerHTML = Completed
    TimeArray == null? avgTimeUI.innerHTML = 0: avgTimeUI.innerHTML = Math.round(avgTimeArray.reduce((x,y)=> x+y) / avgTimeArray.length)
}
//


// Create Definition
create.addEventListener("click", () => {
    // Check || If All Fields are Empty
    if (que.value === "" || ans.value === ""){
        Render()
    }
    else {
        const date = new Date()
        let CurrentDate = `${String(date).split(" ").slice(1,4).join("/")}`
        // Pushing all data to an array
        CheckBox.checked ? 
        Questions.push(`${que.value} ==> ${ans.value} Button ${CurrentDate}`) :
        Questions.push(`${que.value} ==> ${ans.value} Text ${CurrentDate}`)
        // Add all Parameters in Arrays
        // Get Zero Inf in Input Field
        que.value = ""
        ans.value = ""
        // Set all Arrays in LocalStorage
        localStorage.setItem('Questions', JSON.stringify(Questions))

        Render()
        renderTest()
    }
})
//

// This Fucntion Shows all Changes on the Page
function Render() {
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
                    <img src="static/imgs/Delete-icon (2).png" alt="">
                </button>
            </li>`
        }
    })

    // Shows the list on WebPage
    listQue.innerHTML = list
    // If there will be to many Questions on the Page
    document.querySelectorAll("#delbtn").forEach(el => el.addEventListener("click", deleteItem))
}
//

// Delete Item Button
function deleteItem() {
    let index = Questions.indexOf(this.closest("li").innerText.split(" ").slice(0,3).join(" "))
    Questions.splice(index, 1)
    this.closest("li").remove()
    localStorage.setItem("Questions",JSON.stringify(Questions))
}