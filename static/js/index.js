// Get All Necessary Definitions
let Questions = [""]
let que = document.querySelector("#que")
let ans = document.querySelector("#ans")
let create = document.querySelector("#create")
let delBtn = document.querySelector("#delBtn")
let lengthUI = document.querySelector("#length-UI")
let local = JSON.parse(localStorage.getItem("Questions"))
let listQue = document.querySelector("#listQue")
let completedUI = document.querySelector("#completed-UI")
let x = localStorage.getItem('CompletedTimes');
completedUI.innerHTML = x
//

// LocalWork
if (local){
    Questions = local
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
            list += `
            <li>
                ${x}
                <button id="delbtn" style="background-color: transparent; border: none;">
                    <img src="static/imgs/Delete-icon (2).png" alt="">
                </button>
            </li>`
        }
    })

    // Shows the list on WebPage
    listQue.innerHTML = list
    lengthUI.innerHTML = QueLength
    // If there will be to many Questions on the Page
    document.querySelectorAll("#delbtn").forEach(el => el.addEventListener("click", deleteItem))
}
//

// Button to Clear all Parametres and Questions
delBtn.addEventListener("dblclick", () => {
    localStorage.clear()
    Questions = [""]
    showBtn.style.display = "none"
    closeBtn.style.display = "none"
    document.querySelector("h3").style.display = "block"
    Render()
    renderTest()
})

// Delete Item Button
function deleteItem() {
    let index = Questions.indexOf(this.closest("li").innerText.split(" ").slice(0,3).join(" "))
    Questions.splice(index, 1)
    this.closest("li").remove()
    localStorage.setItem("Questions",JSON.stringify(Questions))
}
