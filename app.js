let Countries = ["GHANA", "ROMANIA"]

let hangman_body = ["#head", "#right-arm", "#left-arm", "#top-body", "#bottom-body", "#right-leg", "#left-leg"]

// let hangmanKeys = Object.keys(hangman_body)



let hangman = [{ "#head": "O" }, { "#right-arm": "/" }, { "#left-arm": `\\` }, { "#top-body": "|" }, { "#bottom-body": "|" },
{"#right-leg": "/"}, {"#left-leg": "\\"}
]
// "ROMANIA", "INDIA", "GERMANY", "CANADA"

let Animals = ["DOG", "CAT", "LION", "ZEBRA", "SHARK"]

let Food = ["SALAD", "CHICKEN", "CHEESE", "RICE", "BREAD"]

let Hint = {
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

let clickablesActive = false

let catergorySelected

let catergoryNumSelected

let difficultySelected

let difficultyNumSelected

let increment = 0

let strs 

let lives = 7
let hangIndex = -1
let numToStr = lives.toString()

let clickedLetters = []

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

            // catergorySelected = Countries

            // catergorySelected = e.target.textContent
            categoryClicked = true
            catergoryNumSelected = i
            document.querySelector("#header-text").textContent = "Select Difficulty"
            document.querySelectorAll(".buttonCategory")[i].classList.remove("btn-warning")
            document.querySelectorAll(".buttonCategory")[i].classList.add("btn-outline-warning")
            document.querySelector(".categories").classList.add("disable")

            
            strs = catergorySelected[increment]
        }
      
    })

}

for (let i = 0; i < document.querySelectorAll(".buttonDifficulty").length; i++) {

    document.querySelectorAll(".buttonDifficulty")[i].addEventListener("click", function (e) {      
        if (categoryClicked && !difficultyClicked) {

            if (i == 0) {
                difficultySelected = e.target.textContent
                difficultyClicked = true
                difficultyNumSelected = i
                document.querySelector("#header-text").textContent = "The Game Begins Click Reset To Change Difficulty Or Category"
                document.querySelectorAll(".buttonDifficulty")[i].classList.remove("btn-success")
                document.querySelectorAll(".buttonDifficulty")[i].classList.add("btn-outline-success")
                document.querySelector(".difficulty").classList.add("disable")
                clickablesActive = true
                let numToStr = lives.toString()
                document.querySelector("#countdown").textContent = numToStr
                input = inputField()
                fillInp = fillInput(input)
                document.querySelector(".fieldInput").textContent = fillInp
                document.querySelector(".progression").innerHTML = `<h1>${increment.toString()}/${catergorySelected.length.toString()}</h1>`

                for (let i = 0; i < hangman_body.length; i++){
                    document.querySelector(hangman_body[i]).textContent = ""
                }
                
            } else {
                difficultySelected = e.target.textContent
                difficultyClicked = true
                difficultyNumSelected = i
                document.querySelector("#header-text").textContent = "The Game Begins Click Reset To Change Difficulty Or Category"
                document.querySelectorAll(".buttonDifficulty")[i].classList.remove("btn-danger")
                document.querySelectorAll(".buttonDifficulty")[i].classList.add("btn-outline-danger")
                document.querySelector(".difficulty").classList.add("disable")
                clickablesActive = true
                document.querySelector("#countdown").textContent = numToStr
                input = inputField()
                fillInp = fillInput(input)
                console.log(input)
                document.querySelector(".fieldInput").textContent = fillInp
                document.querySelector(".progression").innerHTML = `<h1>${increment.toString()}/${catergorySelected.length.toString()}</h1>`
                for (let i = 0; i < hangman_body.length; i++){
                    document.querySelector(hangman_body[i]).textContent = ""
                }
                
            }
                
             
        }
    })
         
}

for (let i = 0; i < document.querySelectorAll(".player-clickable-alphabets").length; i++){

    
    document.querySelectorAll(".player-clickable-alphabets")[i].addEventListener("click", function (e) {
        if (clickablesActive) {
            if (difficultySelected == "Easy") {

            if (e.target.textContent == "") {
                console.log(e.target.textContent)
                
            } else {
                    
                if (strs.includes(e.target.textContent) && clickedLetters.includes(e.target.textContent) == false) {
                    playAsound("right")
                    document.querySelectorAll(".rightOrWrong")[i].classList.add("green")

                    clickedLetters.push(e.target.textContent)
                    document.querySelectorAll(".player-clickable-alphabets")[i].classList.add("disable")


                    replace = checkField(e.target.textContent)
                    document.querySelector(".fieldInput").textContent = replace
                    
                    
                    if (replace.includes("_") == false) {
                        for (let i = 0; i < hangman_body.length; i++){
                            document.querySelector(hangman_body[i]).textContent = ""
                        }
                        lives = 7
                        increment++
                        hangIndex = -1
                        numToStr = lives.toString()
                        document.querySelector("#countdown").textContent = numToStr
                        if (increment < catergorySelected.length) {
                            strs = catergorySelected[increment]
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
                            document.querySelector(".progression").innerHTML = `<h1>${increment.toString()}/${catergorySelected.length.toString()}</h1>`

                        } else {
                            document.querySelector(".progression").innerHTML = `<h1>${increment.toString()}/${catergorySelected.length.toString()}</h1>`

                            document.querySelector("#hintField").textContent = "You have Completed Every Word Click Reset"
                            clickablesActive = false
                        }
                    }
                    
                }
                else if (clickedLetters.includes(e.target.textContent) == false && strs.includes(e.target.textContent) == false) {
                    playAsound("wrong")
                    document.querySelectorAll(".rightOrWrong")[i].classList.add("red")
                    lives -= 1
                    hangIndex += 1
                    numToStr = lives.toString()
                    
                    document.querySelector(hangman_body[hangIndex]).textContent = hangman[hangIndex][hangman_body[hangIndex]]

                     
                    clickedLetters.push(e.target.textContent)
                    document.querySelectorAll(".player-clickable-alphabets")[i].classList.add("disable")
                     
                    document.querySelector("#countdown").textContent = numToStr
                    if (lives == 0) {
                        clickablesActive = false
                        document.querySelector("#hintField").textContent = "You have run out of lives Click Reset To Start Over"
                    }

                }
                
            }





            // if (clickablesActive == true) {
            //     if (replace.includes("_") == false) {
            //         increment++
            //         if (increment < catergorySelected.length) {
            //             setTimeout(function() {
                    
            //                 strs = catergorySelected[increment]
            //                 input = inputField()
            //                 fillInp = fillInput(input)
            //                 console.log(input)
            //                 document.querySelector(".fieldInput").textContent = fillInp
        
            //                 for (let i = 0; i < document.querySelectorAll(".rightOrWrong").length; i++){
            //                     if (document.querySelectorAll(".rightOrWrong")[i].classList.contains("red")) {
            //                         document.querySelectorAll(".rightOrWrong")[i].classList.remove("red")
            //                     } else {
            //                         document.querySelectorAll(".rightOrWrong")[i].classList.remove("green")
        
            //                     }
            //                 }
    
            //                 for (let i = 0; i < document.querySelectorAll(".player-clickable-alphabets").length; i++){
            //                     document.querySelectorAll(".player-clickable-alphabets")[i].classList.remove("disable")
    
            //                 }
            //                 clickedLetters =[]
            //               }, 1000)
            //         } else {

            //             setTimeout(function () {
            //                 document.querySelector("#hintField").textContent = "You have Completed Every Word Click Reset"
            //                 clickablesActive = false
            //             }, 1000)
            //         }
            //     }
            // }





            
            // if (clickablesActive == true && replace.includes("_") == false) {
            //     increment++

            //     if (increment < catergorySelected.length) {
            //         // increment++
            //         // if (increment == catergorySelected.length + 1) {
            //         //     setTimeout(function () {
            //         //         document.querySelector("#hintField").textContent = "You have Completed Every Word Click Reset"
            //         //         clickablesActive = false
            //         //     }, 1000)
            //         // }
            //         setTimeout(function() {
                    
            //             strs = catergorySelected[increment]
            //             input = inputField()
            //             fillInp = fillInput(input)
            //             console.log(input)
            //             document.querySelector(".fieldInput").textContent = fillInp
    
            //             for (let i = 0; i < document.querySelectorAll(".rightOrWrong").length; i++){
            //                 if (document.querySelectorAll(".rightOrWrong")[i].classList.contains("red")) {
            //                     document.querySelectorAll(".rightOrWrong")[i].classList.remove("red")
            //                 } else {
            //                     document.querySelectorAll(".rightOrWrong")[i].classList.remove("green")
    
            //                 }
            //             }

            //             for (let i = 0; i < document.querySelectorAll(".player-clickable-alphabets").length; i++){
            //                 document.querySelectorAll(".player-clickable-alphabets")[i].classList.remove("disable")

            //             }
            //             clickedLetters =[]
            //           }, 1000)
            //     } else if (increment == catergorySelected.length) {
            //         setTimeout(function () {
            //                     document.querySelector("#hintField").textContent = "You have Completed Every Word Click Reset"
            //                     clickablesActive = false
            //                 }, 1000)
            //     }
            //     //  else {
            //     //     setTimeout(function () {
            //     //         document.querySelector("#hintField").textContent = "You have Completed Every Word Click Reset"
            //     //         clickablesActive = false
            //     //     }, 1000)
                 
            //     // }
             
               
            // }
            

           
            console.log(e.target.textContent)
            
        }
        else {
                if (e.target.textContent == "") {
                    console.log(e.target.textContent)
                    
                } else {
                        
                    if (strs.includes(e.target.textContent) && clickedLetters.includes(e.target.textContent) == false) {
                        playAsound("right")
                        document.querySelectorAll(".rightOrWrong")[i].classList.add("green")
    
                        clickedLetters.push(e.target.textContent)
                        document.querySelectorAll(".player-clickable-alphabets")[i].classList.add("disable")
    
    
                        replace = checkField(e.target.textContent)
                        document.querySelector(".fieldInput").textContent = replace
                        
                        
                        if (replace.includes("_") == false) {
                            increment++
                            if (increment < catergorySelected.length) {
                                strs = catergorySelected[increment]
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
                                document.querySelector(".progression").innerHTML = `<h1>${increment.toString()}/${catergorySelected.length.toString()}</h1>`
    
                            } else {
                                document.querySelector(".progression").innerHTML = `<h1>${increment.toString()}/${catergorySelected.length.toString()}</h1>`
    
                                document.querySelector("#hintField").textContent = "You have Completed Every Word Click Reset"
                                clickablesActive = false
                            }
                        }
                        
                    }
                    else if (clickedLetters.includes(e.target.textContent) == false && strs.includes(e.target.textContent) == false) {
                        playAsound("wrong")
                        document.querySelectorAll(".rightOrWrong")[i].classList.add("red")
                        lives -= 1
                        hangIndex += 1
                        numToStr = lives.toString()
                        
                        document.querySelector(hangman_body[hangIndex]).textContent = hangman[hangIndex][hangman_body[hangIndex]]
    
                         
                        clickedLetters.push(e.target.textContent)
                        document.querySelectorAll(".player-clickable-alphabets")[i].classList.add("disable")
                         
                        document.querySelector("#countdown").textContent = numToStr
                        if (lives == 0) {
                            clickablesActive = false
                            document.querySelector("#hintField").textContent = "You have run out of lives Click Reset To Start Over"
                        }
    
                    }
                    
                }
    
    
    
    
    
                // if (clickablesActive == true) {
                //     if (replace.includes("_") == false) {
                //         increment++
                //         if (increment < catergorySelected.length) {
                //             setTimeout(function() {
                        
                //                 strs = catergorySelected[increment]
                //                 input = inputField()
                //                 fillInp = fillInput(input)
                //                 console.log(input)
                //                 document.querySelector(".fieldInput").textContent = fillInp
            
                //                 for (let i = 0; i < document.querySelectorAll(".rightOrWrong").length; i++){
                //                     if (document.querySelectorAll(".rightOrWrong")[i].classList.contains("red")) {
                //                         document.querySelectorAll(".rightOrWrong")[i].classList.remove("red")
                //                     } else {
                //                         document.querySelectorAll(".rightOrWrong")[i].classList.remove("green")
            
                //                     }
                //                 }
        
                //                 for (let i = 0; i < document.querySelectorAll(".player-clickable-alphabets").length; i++){
                //                     document.querySelectorAll(".player-clickable-alphabets")[i].classList.remove("disable")
        
                //                 }
                //                 clickedLetters =[]
                //               }, 1000)
                //         } else {
    
                //             setTimeout(function () {
                //                 document.querySelector("#hintField").textContent = "You have Completed Every Word Click Reset"
                //                 clickablesActive = false
                //             }, 1000)
                //         }
                //     }
                // }
    
    
    
    
    
                
                // if (clickablesActive == true && replace.includes("_") == false) {
                //     increment++
    
                //     if (increment < catergorySelected.length) {
                //         // increment++
                //         // if (increment == catergorySelected.length + 1) {
                //         //     setTimeout(function () {
                //         //         document.querySelector("#hintField").textContent = "You have Completed Every Word Click Reset"
                //         //         clickablesActive = false
                //         //     }, 1000)
                //         // }
                //         setTimeout(function() {
                        
                //             strs = catergorySelected[increment]
                //             input = inputField()
                //             fillInp = fillInput(input)
                //             console.log(input)
                //             document.querySelector(".fieldInput").textContent = fillInp
        
                //             for (let i = 0; i < document.querySelectorAll(".rightOrWrong").length; i++){
                //                 if (document.querySelectorAll(".rightOrWrong")[i].classList.contains("red")) {
                //                     document.querySelectorAll(".rightOrWrong")[i].classList.remove("red")
                //                 } else {
                //                     document.querySelectorAll(".rightOrWrong")[i].classList.remove("green")
        
                //                 }
                //             }
    
                //             for (let i = 0; i < document.querySelectorAll(".player-clickable-alphabets").length; i++){
                //                 document.querySelectorAll(".player-clickable-alphabets")[i].classList.remove("disable")
    
                //             }
                //             clickedLetters =[]
                //           }, 1000)
                //     } else if (increment == catergorySelected.length) {
                //         setTimeout(function () {
                //                     document.querySelector("#hintField").textContent = "You have Completed Every Word Click Reset"
                //                     clickablesActive = false
                //                 }, 1000)
                //     }
                //     //  else {
                //     //     setTimeout(function () {
                //     //         document.querySelector("#hintField").textContent = "You have Completed Every Word Click Reset"
                //     //         clickablesActive = false
                //     //     }, 1000)
                     
                //     // }
                 
                   
                // }
                
    
                
        }

    }
    })
}

document.querySelector(".Hint-button").addEventListener("click", function (e) {
    console.log(e.target.textContent)
     hint = Hint[strs]
    if(hint) {
        document.querySelector("#hintField").textContent = hint

    }
})


document.querySelector(".reest").addEventListener("click", function (e) {

    console.log(e.target.textContent)
    categoryClicked = false
    difficultyClicked = false
    clickablesActive = false
    if (difficultyNumSelected == 0) {
        document.querySelectorAll(".buttonDifficulty")[difficultyNumSelected].classList.add("btn-success")
        document.querySelectorAll(".buttonDifficulty")[difficultyNumSelected].classList.remove("btn-outline-success")
        
    } else {
        document.querySelectorAll(".buttonDifficulty")[difficultyNumSelected].classList.add("btn-danger")
        document.querySelectorAll(".buttonDifficulty")[difficultyNumSelected].classList.remove("btn-outline-danger")
    }
    document.querySelector("#header-text").textContent = "Select A category"
    document.querySelectorAll(".buttonCategory")[catergoryNumSelected].classList.add("btn-warning")
    document.querySelectorAll(".buttonCategory")[catergoryNumSelected].classList.remove("btn-outline-warning")
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

    increment = 0
    document.querySelector(".progression").innerHTML = `<h1>0/0</h1>`
    document.querySelector(".fieldInput").textContent = "_ _ _ _ _ _ _"

    lives = 7
    numToStr = lives.toString()
    document.querySelector("#countdown").textContent = numToStr
    hangIndex = -1

    // catergorySelected = 
    // strs = Countries[increment]


})

function inputField() {

    let inputField =[]
    for (let i = 0; i < strs.length; i++){
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

    for (let i = 0; i < strs.length; i++){
        if (letterPassed == strs[i]) {
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

function playAsound(ans) {

    var audio = new Audio("/Sound-Effects/" + ans + ".wav");
    audio.play();
    
}

// if (!categoryClicked && !difficultyClicked) {
//     document.querySelector("#header-text").textContent = "Select A Category"

   

      
// }

// if (categoryClicked == true && difficultyClicked == false) {

//     for (let i = 0; i < document.querySelectorAll(".select-difficulty").length; i++) {

//         document.querySelectorAll(".select-difficulty")[i].addEventListener("click", function (e) {
//             difficultySelected = e.target.textContent
//             difficultyClicked = true
//             document.querySelector("#header-text").textContent = "The Game Begins"

//         })

//     }
    

// }

// function callMe() {
//     if (categoryClicked && !difficultyClicked) {
//         document.querySelector("#header-text").textContent = "Select A Difficulty"
    
//     }
// }




