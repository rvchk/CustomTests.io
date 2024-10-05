// Get All Necessary Definitions
let Questions = [""]
let que = document.querySelector("#que")
let ans = document.querySelector("#ans")
let create = document.querySelector("#create")
let lengthUI = document.querySelector("#length-UI")
let local = JSON.parse(localStorage.getItem("Questions"))
let listQue = document.querySelector("#listQue")
let completedUI = document.querySelector("#completed-UI")
let avgTimeUI = document.querySelector("#avgTime")
let Completed = localStorage.getItem('CompletedTimes');
let TimeArray = localStorage.getItem('TestTimers');
let CheckBox = document.querySelector("#ButtonsCheck")
//

// LocalWork
if (local){
    Questions = local
    Render()
}
if(completedUI) {
    completedUI.innerHTML = Completed
    TimeArray !== null? avgTimeUI.innerHTML = 0: avgTimeUI.innerHTML = Math.round(TimeArray.reduce((x,y)=> x+y) / TimeArray.length)
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
    QueLength = Questions.length
    // Create empty List
    let list = ""
    // To check Every Question
    Questions.map((x)=> {
        if (x !== "") {
            // Add every <li> At <ul>
            // 64 stroke removes the TYPE from <li>
            list += `
            <li>
                ${x.split(" ").slice(0,3).join(" ")}
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