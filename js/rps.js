// This function generates "Rock", "Paper" or "Scissors" randomly: 
function computerPlay() {
let myArray = ["Rock", "Paper", "Scissors"] ;

let myNum = Math.floor(Math.random() * 3) ;

let computerSlctn = myArray[myNum] ;

return computerSlctn ;
                        }


//------------

// This function simply returns either "Pass" or "Fail". It  
// checks whether the player has typed in "Rock", "Paper" or
// "Scissors" correctly (which means a mixture of uc and lc 
// because this function converts "rOcK", for example, into "Rock"),
// but if the user types in, say, "papperr" instead of the 
// acceptable "PaPeR", this function returns "Fail": 
function correctnessTest(input) {
let pass = "Pass"
let fail = "Fail"
// The following line converts "sCiSSorS", say, into "Scissors" 
let inputToTest = reformatTextInput(input)   ;
if (inputToTest == "Rock" || inputToTest == "Paper"  || inputToTest == "Scissors") {
return pass
                                                                       } // end if
// It's better to have a simple "else" here! change when you have the time! :
if (inputToTest != "Rock" || inputToTest != "Paper"  || inputToTest != "Scissors") {
return fail
                                                                        } // end if

                                 } // end correctnessTest


//-------------

// This function converts whatever the user has typed in into 
// lower case and then the first letter to upper case (so
// if the player types "sCiSSorS", this gets converted to 
// "Scissors". 
// Function correctnessTest calls this function:
function reformatTextInput (input) {
let formattedtext = input ;
// First to all lowercase
formattedtext = formattedtext.toLowerCase()  ;
// Now convert first letter to upper case:
formattedtext = formattedtext.charAt(0).toUpperCase() + formattedtext.slice(1);
return formattedtext ;
                                } // end function reformatTextInput


//------------
// This function shows prompts that tell the user to enter "Rock", 
// etc and to do it again if the user types incorrectly.
// This function returns array [computerPlay, playerPlay],
// the first member being a computer generated "Rock", "Paper"
// or "Scissors". The second member is the user's input (changed 
// the correct form of to "Rock", "Paper" or "Scissors")
// The flags go with the function:

function examFunction (prompt1, prompt2) {
let flag1        = false ;  
let flag2        = false ;  
let playerPlay   = ""    ;
let computerPly = ""    ; 

do {
playerPlay = prompt(prompt1);   // this works!
// Need a line in here to turn, eg, "rocK" into "Rock"!!!!
// This line will also convert, eg, "rocL" into "Rocl" (but
// fn correctnessTest will sort that out) 
playerPlay = reformatTextInput(playerPlay) ;
// If player has typed correctly:
if (correctnessTest(playerPlay) == "Pass") {
flag1 = true       ;  
computerPly = computerPlay()   ;
                                             } else { 
    do {
playerPlay = prompt(prompt2);                   
playerPlay = reformatTextInput(playerPlay) ;
            if (correctnessTest(playerPlay) == "Pass") {
            flag1 = true   ;      
            flag2 = true   ;  
            computerPly = computerPlay()   ;
                                                         } 
        } // end inner do
while (flag2 == false) ; // end inner while
                                                    } // end else
   } // end outer do
while (flag1 == false) ; // end inner while

return [playerPlay, computerPly]
                                            } // end examFunction

//------------







//------------
// This function plays a round of R,P,S by playing the 
// computer-generated selection against the player selection. It
// returns a message that depends on the outcome of the game.
// You feed the function the player's selection and the computer's.
// This function returns an array containing 
// [0] the (string) value of either var weWin, var youWin or var draw
// [1] the value of var WLD (either "CW", "PW" or "NW"):
function playRound(playerSelection, computerSelection) {
  
let concaten = computerSelection.concat(playerSelection) ;
let result = "" ;

let weWin = `You Lose, Loser! Our ${computerSelection} beats your ${playerSelection}`;
let youWin = `Damn, we Lose! Your ${playerSelection} beats our ${computerSelection}`;
let draw = `It's a draw! ; We both chose ${computerSelection}` ;
let WLD = " " ;

// Below CW = computer wins ; PW = player wins ; NW = nobody wins (ie it's a draw)
switch(concaten) {
  case "PaperRock":
    result = weWin ;
    WLD    = "CW" ;
    break;
  case "PaperScissors":
    result = youWin ;
    WLD    = "PW" ;
    break;    
  case "RockPaper":
    result = youWin ;
    WLD    = "PW" ;
    break;
  case "RockScissors":
    result = weWin ;
    WLD    = "CW" ;
    break;
  case "ScissorsPaper":
    result = weWin ;
    WLD    = "CW" ;
    break;    
  case "ScissorsRock":
    result = youWin ;
    WLD    = "PW" ;
    break;    
  case "RockRock" :
    result = draw ;
    WLD    = "NW" ;
    break;      
  case "PaperPaper" :
    result = draw ;
    WLD    = "NW" ;
    break;      
  case "ScissorsScissors" :
    result = draw ;
    WLD    = "NW" ;
    break;      
  default: 
    result = null ;
    WLD    = `concaten has value ${concaten}`  
                    } // end switch

return [result, WLD] ;

                                                         } // end playRound

//-------------
// This is a class that encapsulates two counters, 
// comptrCounter and playerCounter. 
// Function scoreRound() uses this function.
function DoubleCounter (initCC, initPC) {
// Private variables, only accessible to private functions:
var comptrCounter,  playerCounter; 

// Private methods 
// The private getters:
function getComptrCounter(){
  return comptrCounter ;
                           } ; // end getComptrCounter

function getPlayerCounter(){
  return playerCounter  ;
                           } ; // end getPlayerCounter

// The private incrementing setters:
function incComptrCounter(){
  comptrCounter = comptrCounter + 1 ;
                           } ; // end incComptrCounter

function incPlayerCounter(){
  playerCounter = playerCounter + 1 ;
                           } ; // end incPlayerCounter

// The private initial-value setters:
function initComptrCounter(initValue){
  comptrCounter = initValue ;
                           } ; // end initComptrCounter

function initPlayerCounter(initValue){
  playerCounter = initValue ;
                           } ; // end initPlayerCounter


// Now public privileged methods (which call private methods):
// The getters:
this.retrieveComptrCounter = function () {
return getComptrCounter() ;
                                         } ; // end retrieveComptrCounter

this.retrievePlayerCounter = function () {
return getPlayerCounter() ;  
                                          } ; // end retrievePlayerCounter

// The (incrementing) setters:
this.incComptrCounter = function () {
incComptrCounter() ;
                                     } ; // end incComptrCounter

this.incPlayerCounter = function () {
incPlayerCounter() ;
                                    } ; // end incPlayerCounter

// The (initial-value) seters:
this.setComptrCounter = function (initValue) {
initComptrCounter(initValue) ;
                                     } ; // end incComptrCounter

this.setPlayerCounter = function (initValue) {
initPlayerCounter(initValue) ;
                                    } ; // end incPlayerCounter


// Constructor code (by which instantiator sets inital values of the vars):
this.setComptrCounter(initCC) ;
this.setPlayerCounter(initPC) ;

                      } // end DoubleCounters class
//-------------


// This function takes as argument the array returned by function 
// playRound, which is an array containing two members: [0] is a
// sentence that says who won; [1] is a two-letter code for who won
// . This function 
// 1) scores the round, after reading roundResult.
//    This means incrementing a counter.
//    console.logs the (long) result text.    
// 2) console.logs roundResult and the score (eg
// "The score is: Computer 3 Player 2")

function scoreRound(roundResult) {
// IMPORTANT!!!
// var scoreMessage when declared below (outside the if(){}) and then called inside the if(){}
// Gives the previous value of the counters! NOT the correct values!!!
var scoreMessage = `The score is: Computer ${doubleCounterInstance.retrieveComptrCounter()}, Player ${doubleCounterInstance.retrievePlayerCounter()}`
if (roundResult[1] == "CW") {
    // increment correct counter:
    doubleCounterInstance.incComptrCounter() ;
    console.log(`The score is: Computer: ${doubleCounterInstance.retrieveComptrCounter()} ; Player: ${doubleCounterInstance.retrievePlayerCounter()}`) ;
    // For following commented out line see IMPORTANT above.
    // console.log(scoreMessage) ;                             
    console.log(roundResult[0]) ; // a long sentence that goes "You Lose, loser …"
                              }// end if

if (roundResult[1] == "PW") {
    // increment correct counter:
    doubleCounterInstance.incPlayerCounter() ;
    console.log(`The score is: Computer: ${doubleCounterInstance.retrieveComptrCounter()} ; Player: ${doubleCounterInstance.retrievePlayerCounter()}`) ;    
    // For following commented out line see IMPORTANT above.
    // console.log(scoreMessage) ;
    console.log(roundResult[0]) ; // a long sentence that goes "Damn, you win …"
                            }// end if

if (roundResult[1] == "NW") {
    console.log(`The score is: Computer: ${doubleCounterInstance.retrieveComptrCounter()} ; Player: ${doubleCounterInstance.retrievePlayerCounter()}`) ;
    console.log(roundResult[0]) ; // a long sentence that goes "Nobody wins …"
    // For following commented out line see IMPORTANT above.
    // console.log(scoreMessage) ;                            
                            }// end if
                                  }   // end scoreRound              

// ------------





//------------

// The following fn 
// First some gobal vars + a global array that go with fn showResAndScore():
let computerScore     = 0  ;
let playerScore       = 0  ; 
let playerSelection   = "" ;
let computerSelection = "" ;
let myArray           = [] ;
let roundResult       = [] ;

function showResAndScore (firstPrompt, secndPrompt) { 
// examFunction returns array [computerPlay, playerPlay]
// eg ["Rock", "Scissors"] after asking player for his/her 
// input:  
myArray           = examFunction(firstPrompt, secndPrompt) ;
playerSelection   = myArray[0]  ;
computerSelection = myArray[1]  ;
// Function playRound returns an array containing the (string) contents 
// of either var weWin, var youWin or var draw (eg draw = "It's a 
// draw! ; We both …") and the result, ie "CW" , "PW" or "NW" (standing 
// for "computer wins" , "player wins" and "nobody wins"
roundResult = playRound(playerSelection, computerSelection)
// Need function here to 
// 1) score the round, after reading roundResult.
// 2) console.log roundResult and the score (eg
// "Computer: 3 Player: 2")
scoreRound(roundResult) ;
                                                     } // end showResAndScore

//------------

function game() {

// First instantiate a new double counter with initial
// values for each counter:
doubleCounterInstance = new DoubleCounter(0,0) ;

let myPrompt1   = `This is your first go of five. Type "Rock", "Paper" or "Scissors"`    ;
let myPrompt2   = `You mistyped. This is still your first go of five. Type "Rock", "Paper" or "Scissors"`    ;
let myPrompt3   = `This is go ` ;  
let myPrompt3a  = ` of five. Type "Rock", "Paper" or "Scissors"`    ;
let myPrompt4   = `You mistyped. This is still go `   ; 
let myPrompt4a  = ` of five. Type "Rock", "Paper" or "Scissors"`
let myPrompt5   = `This is the last go of five. Type "Rock", "Paper" or "Scissors"`    ;
let myPrompt6   = `You mistyped. This is still the last go of five. Type "Rock", "Paper" or "Scissors"`   ; 
let iterCounter = 0 ;

for (let i=1 ; i < 6 ; i++ ) { 

// First round: 
if( i == 1) { // if it's the first round:
console.log(`The result of round ${i} is:`) ;
showResAndScore(myPrompt1, myPrompt2) ;
console.log(` `) ;
            }; // end if it's the first round
         
// Rounds 2 to 4:
if( i > 1 && i < 5 ) {
console.log(`The result of round ${i} is:`) ;
showResAndScore((myPrompt3 + i + myPrompt3a), (myPrompt4 + i + myPrompt4a)) ;
console.log(` `) ;
                      } // end if i > 1 && i < 5

// Final round:
if( i === 5 ) { // if it's the last round (the fifth out of five)
console.log(`The result of round ${i} is:`) ;
showResAndScore (myPrompt5, myPrompt6) ;
console.log(` `) ;
             } // end if it's the last go
                            } // end for loop
                 } // end function game

// --------





// ///////////////////// // // ///////////////////// // 
/////////  ///  NOT USED   /////////  ////    /////////
// This function reformats player selection text input.
// This function is not used.
function reformatPlayerSelection (playerInput) {
return reformatInput(playerInput)
                                              }
// ///////////////////// // // ///////////////////// // 

    



// const playerSelection = "rock";
// const computerSelection = computerPlay();
// console.log(playRound(playerSelection, computerSelection));

// console.log(playRound("rOcK", computerSelection))