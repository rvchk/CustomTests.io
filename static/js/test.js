let test = document.querySelector("#test")
let testQue = document.querySelector("#testQue")
let testAns = document.querySelector("#testAns")
let testBtn = document.querySelector("#testBtn")
let ansTheQue = document.querySelector("#ansTheQue")
let CompletedTimes = 0
let testInd = 0
let RightAns = 0
let TestTimers = []
let QueLength = Questions.length-1
let localTimer = JSON.parse(localStorage.getItem("TestTimers"))
let localCompleted = JSON.parse(localStorage.getItem("CompletedTimes"))
let time
let timer
if(localCompleted)  {
    CompletedTimes = localCompleted
    TestTimers = localTimer
}

if (Questions.length == 1) {
    document.querySelector(".test").innerHTML = `
        <div class="List-Error-block">
            <h1>Oops...</h1>
            <img src="static/imgs/Error-icon.png" alt="Error-icon">
            <h2>You Don't have any Questions yet</h2>
            <h2 style="margin-top: 70px; margin-bottom: 30px;">Go and create one</h2>
            <a href="index.html">
                <button>Create</button>
            </a>
        </div>
    `
}

renderTest = () => {
    test.innerHTML = `TEST ${testInd}/${QueLength}`
    if (Questions.length == 0){
        timer == null ? timer = 0: TestTimers.push(timer)
        timer = 0
        clearInterval(time)
        time = setInterval(() => {
            timer++
        }, 1000);

        Questions = local
        testQue.innerHTML = `Result is ${RightAns}/${QueLength}`
        testAns.style.display = "none"
        testBtn.innerHTML = "START"
        ansTheQue.innerHTML = ""
        testInd = 0
        RightAns = 0
        CompletedTimes++
        localStorage.setItem('CompletedTimes', JSON.stringify(CompletedTimes))
        localStorage.setItem('TestTimers', JSON.stringify(TestTimers))
    }
}

testBtn.addEventListener("click", function(){
    ansTheQue.innerHTML = "Answer the Question"
    testAns.style.display = "block"
    testBtn.innerHTML = "Answer"

    if (testAns.value == Questions[0].split(" ")[2]){
        console.log("Correct")
        RightAns += 1
    }
    testAns.value = ""
    if (testInd < Questions.length){
        testInd += 1
    }
    if (Questions.length > 1) {
        testQue.innerHTML = Questions[1].split(" ").slice(0,2).join(" ")
    }
    Questions = Questions.slice(1)
    renderTest()
})