// test stuff:
/*
const div = document.querySelector('#content');
div.classList.toggle('visible');
const xxx = document.querySelector('#playerChoiceBox');
How to change the src attrib of an <img>:
document.getElementById("myImage").src = "landscape.jpg";
*/


// ----------- // ----------- // ----------- // ----------- // ----------- // ----------- // -----------

// INITIALISATION:
const load = () => {




                    }
window.onload = load;
// end INITIALISATION:

// First get the elements to refer to 
// The div containing the "Choose one" area (including the r, p and s <imgs>):
const container1 = document.querySelector('#container1');
// The div containing the arrow:
const arrowSVGdiv = document.querySelector('#arrowSVGdiv');
// The div containing the play area:
const container2 = document.querySelector('#container2');
// The div containing the results area:
const resultsDiv = document.querySelector('#resultsDiv');


// consts for the New game and New round buttons:
const nRbutton = document.getElementById('newRoundButton');
const nGbutton = document.getElementById('newGameButton');


const playerChoiceImage   = document.getElementById('playerChoiceImage');
const compChoiceImage     = document.getElementById('compChoiceImage');
const playerChoiceBox     = document.getElementById('playerChoiceBox');
const compChoiceBox       = document.getElementById('compChoiceBox');


// Set the <img>s in the play area to pont to no image 
playerChoiceImage.src = "" ;
compChoiceImage.src = "" ;

const whoWinsText         = document.getElementById('whoWinsText');
const playerScore         = document.getElementById('playerScore');
const computerScore       = document.getElementById('computerScore');


// consts for the <img>s in the "Choose one" area:
const rockImage     = document.getElementById('rockImage');
const paperImage    = document.getElementById('paperImage');
const scissorsImage = document.getElementById('scissorsImage');

// const for start button:
const startButton = document.getElementById('startButton');


// Make an instance of the DoubleCounter class:
doubleCounterInstance1 = new DoubleCounter(0,0) ;



// make opacity of the "choose one", play and result areas 0.3:
changeOpacity(container1, 0.3) ;
changeOpacity(arrowSVGdiv, 0.3) ;
changeOpacity(container2, 0.3) ;







// Event handlers

// -----------------------------------------------------------
// The event handlers for nRbutton and nGbutton
// differ only in that the one for nGbutton
// must reset the double counter and put its values
// in the appropriate places in the result area.

// Set click event handler for New round and New game buttons…
nRbutton.addEventListener("click", startNewRound) ;
nGbutton.addEventListener("click", startNewGame) ;

function startNewRound(){
  // Simply call startNewPlay:
  startNewPlay() ;
                        }

function startNewGame(){
  // Zero the counters in doubleCounterInstance1;
  doubleCounterInstance1.publicZeroComptrCounter() ;
  doubleCounterInstance1.publicZeroPlayerCounter() ;
  // Put the counter values in the correct 
  // places in the results area:
  playerScore.innerHTML = doubleCounterInstance1.retrievePlayerCounter() ;
  computerScore.innerHTML = doubleCounterInstance1.retrieveComptrCounter() ;
  // Call startNewPlay:
  startNewPlay() ;
                        }

// Callback startNewPlay must:
// 1) set opacity of nRbutton, nGbutton to 0.3
// 2) remove event handlers attached to nRbutton, nGbutton
// 3) re-add event listeners to the r, p and s <img>s
// 4) set opacity of "Choose one" area to 1.0
// 5) set opacity of arrow, play and result areas to 0.3
// 6) remove the existing images from the play area
// 7) Clear the "You lose" , etc text from the 
//    div it's in
function startNewPlay() {
  // 1)
  changeOpacity(nRbutton, 0.3) ;
  changeOpacity(nGbutton, 0.3) ;

  // 2) 
  nRbutton.removeEventListener("click", startNewPlay)
  nGbutton.removeEventListener("click", startNewPlay)

  // 3) 
  rockImage.addEventListener("click", rockClickStartsGame)
  paperImage.addEventListener("click", paperClickStartsGame)
  scissorsImage.addEventListener("click", scissorsClickStartsGame)
  
  // 4) and 5) 
  changeOpacity(container1, 1.0) ;
  changeOpacity(arrowSVGdiv, 0.3) ;
  changeOpacity(container2, 0.3) ;
  changeOpacity(resultsDiv, 0.3) ;
  
  // 6) 
  playerChoiceImage.src = " "
  compChoiceImage.src = " "

  // 7) 
  whoWinsText.innerHTML = " " ;
                         } // end callback startNewPlay

// -----------------------------------------------------------


// Set click event handler for start button…
startButton.addEventListener("click", startFn)                    

// The startFn callback must:
// 1) Add the event listeners to the r, p and s <img>s
// 2) Change opacity of the "Choose" area to 1
// 3) Remove the event listener from startButton
// 4) Remove the "active" class from the start button
//    so that it can't be clicked again until the 
//    player clicks the reset button.
function startFn() {
// 1)
rockImage.addEventListener("click", rockClickStartsGame)
paperImage.addEventListener("click", paperClickStartsGame)
scissorsImage.addEventListener("click", scissorsClickStartsGame)

// 2)
changeOpacity(container1, 1.0) ;

// 3)
startButton.removeEventListener("click", startFn)

// 4) 
this.classList.remove("active");
                   }


// -----------------------------------------------------------


// Set the event listeners for the r, p and s <img>s  
                                                     
// These fns set the same event listener for 
// the r/p/s <img> the player can click. The callback 
// is game1(), which takes two args that change from <img> to <img>:
// 1) a path to the image user clicks (a string)
// 2) a scaling class to add (a string)

rockImage.addEventListener("click", rockClickStartsGame)
paperImage.addEventListener("click", paperClickStartsGame)
scissorsImage.addEventListener("click", scissorsClickStartsGame)


function rockClickStartsGame(){
game1("./images/rock.jpg", "RockScale") ;
                              }

function paperClickStartsGame(){
game1("./images/paper.jpg", "PaperScale") ;
                               }

function scissorsClickStartsGame(){
game1("./images/scissors.jpg", "ScissorsScale") ;
                                  }


// Now define game1(), the callback that runs when the player clicks on
// either the r the p or the s <img>. In this fn…
// arg path is a path to the image, eg "./images/paper.jpg".
// arg classToAdd is the string for the class to add   
// to the <img> of id playerChoiceImage. This class simply scales the image correctly.
// This fn…
// 1)  puts the image the player clicked on 
//     in the "Choose" area into correct box in play area
//     and gives the <img> in that box the correct 
//     class (which it does for scaling the <img>)
// 2)  makes visible the boxes containing <img>s for 
//     player choice and computer choice
// 3)  Sets opacity of "choose" area to 0.3 
//     Sets the opacity of the svg bubble arrow to 1.0 
//     Sets the opacity of the play area to 1.0  
//     Sets the opacity of the results area to 1.0  
// 4)  Remove event ;istener from r, p, s <img>s
// 5)  Calls a fn that generates the computer choice of r, p or s
// 6)  puts the computer choice image in the correct box in play area 
// 7)  works out who won
// 8)  Shows the results area
// 9)  Displays "You win" / "Computer wins"
// 10)  Displays the score
// 11) Shows/enables New game and New round buttons

function game1(path, classToAdd) {
    
  // 1) Make <img> in play area point to same image
  //    the player clicked on in "Choose" area
  //    then apply scaling class:
  playerChoiceImage.src = path;
    addClassesToElmnt (playerChoiceImage, classToAdd )
  
  // 2)
  choiceBoxesVisibility("visible") ;
  
  // 3)
  changeOpacity(container1, 0.3) ;
  //do the following after a delay:
  setTimeout(function(){
     changeOpacity(arrowSVGdiv, 1.0) ; }, 300);
  
  setTimeout(function(){
    changeOpacity(container2, 1.0) ; }, 600);
      
    setTimeout(function(){
      changeOpacity(resultsDiv, 1.0) ; }, 900);
    
  // 4) Remove event listeners (so player cannot click again
  //    until new game or new round):
  rockImage.removeEventListener("click", rockClickStartsGame)
  paperImage.removeEventListener("click", paperClickStartsGame)
  scissorsImage.removeEventListener("click", scissorsClickStartsGame)
  
  // 5) 
  // computerPlay1() returns a random selection of one
  // of the strings 'rock', 'paper' and 'scissors':
  let computerPlay2 = computerPlay1() ; // computerPlay2 = "rock.jpg" (for example)
  let computerSelection1 = computerPlay2 ; // will be used later in this fn
  // Annoying stuff:
  computerSelection1 = removeLastNchars(computerSelection1, 4)
  computerPlay2 = ("./images/").concat(computerPlay2) // computerPlay2 = (for example) "./images/rock"
    
  // 6)
  compChoiceImage.src = computerPlay2;  

  // 7) Who won?
  // An annoying sand not interesting step:
  computerSelection1 = firstLetterUC(computerSelection1) // computerSelection1 = "Rock" (eg)  
  // Another annoying sand not interesting step:
  let playerSelection1 = removeLastNchars(classToAdd, 5) ; //    playerSelection1 = "Paper" (eg)  
                                 
  // So now we have vars holding strings 
  // representing the player selection and 
  // the computer selection.
  // playRound(arg1, arg2) takes those selections 
  // and returns array [*result*, *WLD*], where 
  // *result* is a var holding a string message 
  // (one of vars youWin, weWin, draw) and 
  // *WLD* is one of strings "CW", "PW" and"NW":
  let roundResult1 = playRound(playerSelection1, computerSelection1) 
   
  // const whoWinsText is for the <p> that shows the "who won" text
  // const playerScore is for the <p> that shows the player's score
  // const computerScore is for the <p> that shows the computer's score
  // set the inner HTML of whoWinsText:
    whoWinsText.innerHTML = roundResult1[0] ;
  // debugger
  // use fn scoreRound1 here. it will update the scores, seting :
  // the inner HTML of playerScore and of computerScore:
  scoreRound1(roundResult1) ;

  // 11) enable buttons for new game and new round:
  changeOpacity(nRbutton, 1.0) ;
  changeOpacity(nGbutton, 1.0) ;

              } // end function game1



/*
let str1 = "Hello ";
let str2 = "world!";
let res = str1.concat(str2);
*/

// Make first letter of string upper case
function firstLetterUC (strng) {
// Separate out first letter:
  let firstLetter = strng.charAt(0)  ;
// Set first letter to UC:  
  firstLetter = firstLetter.toUpperCase() ;
// return concatenated strings:  
return firstLetter.concat(strng.slice(1))
                               } // end fn

                                                     
// Remove last five letters of a string:
function removeLastFive (strng) {
  return strng.slice(0, -5)
                                 } // end fn
  
// Remove last n letters of a string:
function removeLastNchars (strng, n) {
  return strng.slice(0, -n)
                                 } // end fn



// Set some variables for html elements frequently referred to:
//--------------------------------------------------------------






// end INITIALISATION                                                      
// ----------- // ----------- // ----------- // ----------- // ----------- // ----------- // -----------

// Functions used by the event handler functions:
// This function make the divs containing player's and computer's choices of <img> visible/hidden.
// Has one arg:
// the string for the value of the visibility property of the element (ie "visible" or "hidden")
function choiceBoxesVisibility (vis) {
  playerChoiceBox.style.visibility = vis ;
  compChoiceBox.style.visibility = vis ;
                                     }

// This function adds & removes appropriate classes of an element.
// It has two args:
// 1) The element in question (arg elmnt)
// 2) An array of classes (strings) to add (arg classesToAdd)
function addClassesToElmnt (elmnt, classesToAdd) {
  elmnt.className = ''; // removes all classes from element
  let classesToAddVar    = "" ;  // blank string
  // Now loops through the strings in array classesToAdd
  // and concatenate them with blank string in var
  // classesToAddVar: 
    for (let i = 0; i < classesToAdd.length; i++) {
    classesToAddVar += classesToAdd[i] ;
                                                  } // end for
      // Now add all the classes to the element in question:                                                
    elmnt.classList.add (classesToAddVar);
                                                  }


// This fn canges an element's opacity:
// It takes two args:
// 1) a ref to the element
// 2) the value of the opacity

function changeOpacity(elmnt, opcty) {
elmnt.style.opacity = opcty ;
                                     }



// End of event listeners, their callbacks and associated functions ---- // --------- ---------- 
// --------- ---------- // --------- ---------- // --------- ---------- // --------- ---------- 








// These functions generate "Rock" /"rock.jpg", "Paper"/"paper.jpg" or "Scissors"/"scissors.jpg" randomly: 
// Generates, eg, "Rock"
function computerPlay() {
let myArray = ["Rock", "Paper", "Scissors"] ;

let myNum = Math.floor(Math.random() * 3) ;

let computerSlctn = myArray[myNum] ;

return computerSlctn ;
                        }
//----
// Generates, eg, "paper.jpg"
function computerPlay1() {
let myArray = ["rock.jpg", "paper.jpg", "scissors.jpg"] ;

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
// computer-generated selection against the player selection 
// (both strings, eg "Rock" and "Scissors"). It
// returns a message that depends on the outcome of the game.
// You feed the function the player's selection and the computer's.
// This function returns an array containing 
// [0] the (string) value of either var weWin, var youWin or var draw
// [1] the value of var WLD (either "CW", "PW" or "NW"):
function playRound(playerSelection, computerSelection) {
  
let concaten = computerSelection.concat(playerSelection) ;
let result = "" ;
let WLD = " " ;

let weWin = `You lose! Our ${computerSelection} beats your ${playerSelection}`;
let youWin = `We lose! Your ${playerSelection} beats our ${computerSelection}`;
let draw = `It's a draw! ; We both chose ${computerSelection}` ;


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

// The private zero-counters functions:
function zeroComptrCounter(){
  comptrCounter = 0 ;
                            } ; // end incComptrCounter

function zeroPlayerCounter(){
  playerCounter = 0 ;
                            } ; // end incPlayerCounter


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

// The (initial-value) setters:
this.setComptrCounter = function (initValue) {
initComptrCounter(initValue) ;
                                     } ; // end incComptrCounter

this.setPlayerCounter = function (initValue) {
initPlayerCounter(initValue) ;
                                    } ; // end incPlayerCounter

// The zero-counter functions:
this.publicZeroComptrCounter = function () {
  zeroComptrCounter() ;
                                           } ; // end retrieveComptrCounter
  
this.publicZeroPlayerCounter = function () {
  zeroPlayerCounter()
                                            } ; // end retrievePlayerCounter


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

// Created the following fn Thurs12Aug21:
// This function takes as argument the array returned by function 
// playRound, which is an array containing two members: [0] is a
// sentence that says who won; [1] is a two-letter code for who won
// . This function 
// 1) scores the round, after reading roundResult.
//    This means incrementing a counter.
//    console.logs the (long) result text.    
// 2) console.logs roundResult and the score (eg
// "The score is: Computer 3 Player 2")

function scoreRound1(roundResult) {
  // IMPORTANT!!!
  // var scoreMessage when declared below (outside the if(){}) and then called inside the if(){}
  // Gives the previous value of the counters! NOT the correct values!!!
    if (roundResult[1] == "CW") {
      // increment correct counter:
      doubleCounterInstance1.incComptrCounter() ;
      // update computer score:
      computerScore.innerHTML = doubleCounterInstance1.retrieveComptrCounter()
                               }// end if
  
  if (roundResult[1] == "PW") {
      // increment correct counter:
      doubleCounterInstance1.incPlayerCounter() ;
      // update player score:
      playerScore.innerHTML = doubleCounterInstance1.retrievePlayerCounter()
                               }// end if
  
                                 }   // end scoreRound              
  



//------------

// The following fn 
// First some gobal vars + a global array that go with fn showResAndScore():
// let computerScore     = 0  ;
// let playerScore       = 0  ; 
//let playerSelection   = "" ;
//let computerSelection = "" ;
//let myArray           = [] ;
//let roundResult       = [] ;

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

  
/*
*/


