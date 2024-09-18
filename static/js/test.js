let test = document.querySelector("#test")
let testQue = document.querySelector("#testQue")
let testAns = document.querySelector("#testAns")
let testBtn = document.querySelector("#testBtn")
let ansTheQue = document.querySelector("#ansTheQue")
let testInd = 0
let RightAns = 0
testAns.style.display = "none"
let QueLength = Questions.length-1

renderTest = () => {
    test.innerHTML = `TEST ${testInd}/${QueLength}`
    if (Questions.length == 0){
        testQue.innerHTML = `Result is ${RightAns}/${QueLength}`
        testAns.style.display = "none"
        testBtn.innerHTML = "START"
        ansTheQue.innerHTML = ""
        testInd = 0
        RightAns = 0
    }
}

testBtn.addEventListener("click", function(){
    ansTheQue.innerHTML = "Answer the Question"
    testAns.style.display = "block"
    testBtn.innerHTML = "Answer"
    console.log(Questions.length)

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
