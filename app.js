const Countries = ["GHANA", "ROMANIA", "INDIA", "GERMANY", "CANADA"]

let body = ["#head", "#right-arm", "#left-arm", "#top-body", "#bottom-body", "#right-leg", "#left-leg"]

const hangmanSymbols = [
    { "#head": "O" },
    { "#right-arm": "/" },
    { "#left-arm": `\\` },
    { "#top-body": "|" },
    { "#bottom-body": "|" },
    { "#right-leg": "/" },
    { "#left-leg": "\\" }
]

const Animals = ["DOG", "CAT", "LION", "ZEBRA", "SHARK"]

const Food = ["SALAD", "CHICKEN", "CHEESE", "RICE", "BREAD"]

const Hint = {
    "GHANA": "Second-largest producer of gold in Africa.",
    "ROMANIA": "It's home to the world's heaviest building.",
    "INDIA": "Cows are considered sacred",
    "GERMANY": "Has 1,000 Varieties of Sausages!",
    "CANADA": "Has 20% of the world's fresh water.",
    "DOG": 'a',
    "CAT": "b",
    "LION": "c",
    "ZEBRA": "d",
    "SHARK": "e",
    "SALAD": "f",
    "CHEESE": "g",
    "Cheese": "h",
    "RICE": "i",
    "BREAD": "j"
}

let categoryClicked = false

let difficultyClicked = false

let letterBoardActive = false

let categorySelectedIndex = 0

let lives = 7

let hangManBodyIndex = -1

let livesToStr = lives.toString()

let clickedLetters = []

let catergorySelected

let catergoryIndexSelected

let difficultySelected

let difficultyIndexSelected

let wordToBeCompleted 

let input 

let fillInp

let replace

let hint



for (let i = 0; i < document.querySelectorAll(".buttonCategory").length; i++){

    document.querySelectorAll(".buttonCategory")[i].addEventListener("click", function (e) {
        if (!categoryClicked && !difficultyClicked) {
            console.log(e.target.textContent)

            if (e.target.textContent == "Countries") {
                catergorySelected = Countries
            } else if (e.target.textContent == "Animals") {
                catergorySelected = Animals
            } else {
                catergorySelected = Food
            }

            categoryClicked = true
            catergoryIndexSelected = i
            document.querySelector("#header-text").textContent = "Select Difficulty"
            document.querySelectorAll(".buttonCategory")[i].classList.remove("btn-warning")
            document.querySelectorAll(".buttonCategory")[i].classList.add("btn-outline-warning")
            document.querySelector(".categories").classList.add("disable")

            
            wordToBeCompleted = catergorySelected[categorySelectedIndex]
        }
      
    })

}

for (let i = 0; i < document.querySelectorAll(".buttonDifficulty").length; i++) {

    document.querySelectorAll(".buttonDifficulty")[i].addEventListener("click", function (e) {      
        if (categoryClicked && !difficultyClicked) {

            if (i == 0) {
                difficultySelected = e.target.textContent
                difficultyClicked = true
                difficultyIndexSelected = i
                document.querySelector("#header-text").textContent = "The Game Begins Click Reset To Change Difficulty Or Category"
                document.querySelectorAll(".buttonDifficulty")[i].classList.remove("btn-success")
                document.querySelectorAll(".buttonDifficulty")[i].classList.add("btn-outline-success")
                document.querySelector(".difficulty").classList.add("disable")
                letterBoarActived = true
                let livesToStr = lives.toString()
                document.querySelector("#countdown").textContent = livesToStr
                input = inputField()
                fillInp = fillInput(input)
                document.querySelector(".fieldInput").textContent = fillInp
                document.querySelector(".progression").innerHTML = `<h1>${categorySelectedIndex.toString()}/${catergorySelected.length.toString()}</h1>`

                for (let i = 0; i < body.length; i++){
                    document.querySelector(body[i]).textContent = ""
                }
                
            } else {
                difficultySelected = e.target.textContent
                difficultyClicked = true
                difficultyIndexSelected = i
                document.querySelector("#header-text").textContent = "The Game Begins Click Reset To Change Difficulty Or Category"
                document.querySelectorAll(".buttonDifficulty")[i].classList.remove("btn-danger")
                document.querySelectorAll(".buttonDifficulty")[i].classList.add("btn-outline-danger")
                document.querySelector(".difficulty").classList.add("disable")
                letterBoarActived = true
                document.querySelector("#countdown").textContent = livesToStr
                input = inputField()
                fillInp = fillInput(input)
                console.log(input)
                document.querySelector(".fieldInput").textContent = fillInp
                document.querySelector(".progression").innerHTML = `<h1>${categorySelectedIndex.toString()}/${catergorySelected.length.toString()}</h1>`
                for (let i = 0; i < body.length; i++){
                    document.querySelector(body[i]).textContent = ""
                }
                
            }
                
             
        }
    })
         
}

for (let i = 0; i < document.querySelectorAll(".player-clickable-alphabets").length; i++){

    
    document.querySelectorAll(".player-clickable-alphabets")[i].addEventListener("click", function (e) {
        if (letterBoarActived) {
            if (difficultySelected == "Easy") {

            if (e.target.textContent == "") {
                console.log(e.target.textContent)
                
            } else {
                    
                if (wordToBeCompleted.includes(e.target.textContent) && clickedLetters.includes(e.target.textContent) == false) {
                    playAsound("right")
                    document.querySelectorAll(".rightOrWrong")[i].classList.add("green")

                    clickedLetters.push(e.target.textContent)
                    document.querySelectorAll(".player-clickable-alphabets")[i].classList.add("disable")


                    replace = checkField(e.target.textContent)
                    document.querySelector(".fieldInput").textContent = replace
                    
                    
                    if (replace.includes("_") == false) {
                        for (let i = 0; i < body.length; i++){
                            document.querySelector(body[i]).textContent = ""
                        }
                        lives = 7
                        categorySelectedIndex++
                        hangManBodyIndex = -1
                        livesToStr = lives.toString()
                        document.querySelector("#countdown").textContent = livesToStr
                        if (categorySelectedIndex < catergorySelected.length) {
                            wordToBeCompleted = catergorySelected[categorySelectedIndex]
                            input = inputField()
                            fillInp = fillInput(input)
                            console.log(input)
                            document.querySelector(".fieldInput").textContent = fillInp
        
                            for (let i = 0; i < document.querySelectorAll(".rightOrWrong").length; i++) {
                                if (document.querySelectorAll(".rightOrWrong")[i].classList.contains("red")) {
                                    document.querySelectorAll(".rightOrWrong")[i].classList.remove("red")
                                } else {
                                    document.querySelectorAll(".rightOrWrong")[i].classList.remove("green")
            
                                }
                            }
        
                            for (let i = 0; i < document.querySelectorAll(".player-clickable-alphabets").length; i++) {
                                document.querySelectorAll(".player-clickable-alphabets")[i].classList.remove("disable")
        
                            }

                            clickedLetters = []
                            document.querySelector(".progression").innerHTML = `<h1>${categorySelectedIndex.toString()}/${catergorySelected.length.toString()}</h1>`

                        } else {
                            document.querySelector(".progression").innerHTML = `<h1>${categorySelectedIndex.toString()}/${catergorySelected.length.toString()}</h1>`

                            document.querySelector("#hintField").textContent = "You have Completed Every Word Click Reset"
                            letterBoarActived = false
                        }
                    }
                    
                }
                else if (clickedLetters.includes(e.target.textContent) == false && wordToBeCompleted.includes(e.target.textContent) == false) {
                    playAsound("wrong")
                    document.querySelectorAll(".rightOrWrong")[i].classList.add("red")
                    lives -= 1
                    hangManBodyIndex += 1
                    livesToStr = lives.toString()
                    
                    document.querySelector(body[hangManBodyIndex]).textContent = hangmanSymbols[hangManBodyIndex][body[hangManBodyIndex]]

                     
                    clickedLetters.push(e.target.textContent)
                    document.querySelectorAll(".player-clickable-alphabets")[i].classList.add("disable")
                     
                    document.querySelector("#countdown").textContent = livesToStr
                    if (lives == 0) {
                        letterBoarActived = false
                        document.querySelector("#hintField").textContent = "You have run out of lives Click Reset To Start Over"
                    }

                }
                
            }
                       
        }
        else {
                if (e.target.textContent == "") {
                    console.log(e.target.textContent)
                    
                } else {
                        
                    if (wordToBeCompleted.includes(e.target.textContent) && clickedLetters.includes(e.target.textContent) == false) {
                        playAsound("right")
                        document.querySelectorAll(".rightOrWrong")[i].classList.add("green")
    
                        clickedLetters.push(e.target.textContent)
                        document.querySelectorAll(".player-clickable-alphabets")[i].classList.add("disable")
    
    
                        replace = checkField(e.target.textContent)
                        document.querySelector(".fieldInput").textContent = replace
                        
                        
                        if (replace.includes("_") == false) {
                            categorySelectedIndex++
                            if (categorySelectedIndex < catergorySelected.length) {
                                wordToBeCompleted = catergorySelected[categorySelectedIndex]
                                input = inputField()
                                fillInp = fillInput(input)
                                console.log(input)
                                document.querySelector(".fieldInput").textContent = fillInp
            
                                for (let i = 0; i < document.querySelectorAll(".rightOrWrong").length; i++) {
                                    if (document.querySelectorAll(".rightOrWrong")[i].classList.contains("red")) {
                                        document.querySelectorAll(".rightOrWrong")[i].classList.remove("red")
                                    } else {
                                        document.querySelectorAll(".rightOrWrong")[i].classList.remove("green")
                
                                    }
                                }
            
                                for (let i = 0; i < document.querySelectorAll(".player-clickable-alphabets").length; i++) {
                                    document.querySelectorAll(".player-clickable-alphabets")[i].classList.remove("disable")
            
                                }
    
                                clickedLetters = []
                                document.querySelector(".progression").innerHTML = `<h1>${categorySelectedIndex.toString()}/${catergorySelected.length.toString()}</h1>`
    
                            } else {
                                document.querySelector(".progression").innerHTML = `<h1>${categorySelectedIndex.toString()}/${catergorySelected.length.toString()}</h1>`
    
                                document.querySelector("#hintField").textContent = "You have Completed Every Word Click Reset"
                                letterBoarActived = false
                            }
                        }
                        
                    }
                    else if (clickedLetters.includes(e.target.textContent) == false && wordToBeCompleted.includes(e.target.textContent) == false) {
                        playAsound("wrong")
                        document.querySelectorAll(".rightOrWrong")[i].classList.add("red")
                        lives -= 1
                        hangManBodyIndex += 1
                        livesToStr = lives.toString()
                        
                        document.querySelector(body[hangManBodyIndex]).textContent = hangmanSymbols[hangManBodyIndex][body[hangManBodyIndex]]
    
                         
                        clickedLetters.push(e.target.textContent)
                        document.querySelectorAll(".player-clickable-alphabets")[i].classList.add("disable")
                         
                        document.querySelector("#countdown").textContent = livesToStr
                        if (lives == 0) {
                            letterBoarActived = false
                            document.querySelector("#hintField").textContent = "You have run out of lives Click Reset To Start Over"
                        }
    
                    }
                    
                }    
                
        }

    }
    })
}

document.querySelector(".Hint-button").addEventListener("click", function (e) {
    console.log(e.target.textContent)
     hint = Hint[wordToBeCompleted]
    if(hint) {
        document.querySelector("#hintField").textContent = hint

    }
})


document.querySelector(".reest").addEventListener("click", function (e) {

    console.log(e.target.textContent)
    categoryClicked = false
    difficultyClicked = false
    letterBoarActived = false
    if (difficultyIndexSelected == 0) {
        document.querySelectorAll(".buttonDifficulty")[difficultyIndexSelected].classList.add("btn-success")
        document.querySelectorAll(".buttonDifficulty")[difficultyIndexSelected].classList.remove("btn-outline-success")
        
    } else {
        document.querySelectorAll(".buttonDifficulty")[difficultyIndexSelected].classList.add("btn-danger")
        document.querySelectorAll(".buttonDifficulty")[difficultyIndexSelected].classList.remove("btn-outline-danger")
    }
    document.querySelector("#header-text").textContent = "Select A category"
    document.querySelectorAll(".buttonCategory")[catergoryIndexSelected].classList.add("btn-warning")
    document.querySelectorAll(".buttonCategory")[catergoryIndexSelected].classList.remove("btn-outline-warning")
    document.querySelector(".categories").classList.remove("disable")
    document.querySelector(".difficulty").classList.remove("disable")
    // lives = 6
    clickedLetters = []

    document.querySelector("#hintField").textContent = "Hint Goes Here"


    for (let i = 0; i < document.querySelectorAll(".rightOrWrong").length; i++){
        if (document.querySelectorAll(".rightOrWrong")[i].classList.contains("red")) {
            document.querySelectorAll(".rightOrWrong")[i].classList.remove("red")
        } else {
            document.querySelectorAll(".rightOrWrong")[i].classList.remove("green")

        }
    }

    for (let i = 0; i < document.querySelectorAll(".player-clickable-alphabets").length; i++){
        document.querySelectorAll(".player-clickable-alphabets")[i].classList.remove("disable")

    }

    categorySelectedIndex = 0
    document.querySelector(".progression").innerHTML = `<h1>0/0</h1>`
    document.querySelector(".fieldInput").textContent = "_ _ _ _ _ _ _"

    lives = 7
    livesToStr = lives.toString()
    document.querySelector("#countdown").textContent = livesToStr
    hangManBodyIndex = -1

    // catergorySelected = 
    // strs = Countries[increment]


})

function inputField() {

    let inputField =[]
    for (let i = 0; i < wordToBeCompleted.length; i++){
        inputField.push("_ ")
    }

    return inputField
}

function fillInput(arr) {

    let str = ""

    for (let i = 0; i < arr.length; i++){
        str += arr[i]
    }

    return str
    
}

function checkField(letterPassed) {

   
    console.log(letterPassed)

    for (let i = 0; i < wordToBeCompleted.length; i++){
        if (letterPassed == wordToBeCompleted[i]) {
            input[i] = letterPassed
        }
    }

    let str = ""
    
    for (let i = 0; i < input.length; i++){
        str += input[i] + " "
    }

    console.log(str)
    
    return str
}

function playAsound(rightOrWrong) {

    var audio = new Audio("./Sound-Effects/" + rightOrWrong + ".wav");
    audio.play();
    
}