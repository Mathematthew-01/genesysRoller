//Global variables
var diceRollString;
var diceRollNum;
var finalSum = 0;

//arrays
var boostDice = ["blank", "blank", "success", "succadv", "advadv", "advantage"];
var setbackDice = ["blank", "failure", "threat"];
var abilityDice = ["blank", "success", "success", "succsucc", "advantage", "advantage", "succadv", "advadv"];
var difficultyDice = ["blank", "failure", "failfail", "threat", "threat", "threat", "thretthret", "failthret"];
var proficiencyDice = ["blank", "success", "success", "succsucc", "succsucc", "advantage", "succadv", "succadv", "succadv", "advadv", "advadv", "triumph"];
var challengeDice = ["blank", "failure ", "failure ", "failfail", "failfail", "threat", "threat", "failthret", "failthret", "thretthret", "despair"];

var lastRollArray = [];
var allDiceResults = [];
var allDiceNumConv = [];

//On load UI
document.getElementById("success_failure").innerHTML = "Success: 0";
document.getElementById("advantage_threat").innerHTML = "Advantage: 0";
document.getElementById("triumph_despair").innerHTML = "Triumph: 0 / Despair: 0";

//Functions

//Boost dice randomizer
function randomBoostDice()
{
  diceRollString = boostDice[Math.floor(Math.random()*boostDice.length)]; 
  resultCalculation();
}

//Ability dice randomizer
function randomAbilityDice()
{ 
  diceRollString = abilityDice[Math.floor(Math.random()*abilityDice.length)];    
  resultCalculation();
}

//Proficiency dice randomizer
function randomProficiencyDice()
{
  diceRollString = proficiencyDice[Math.floor(Math.random()*proficiencyDice.length)];    
  resultCalculation();
}

//Setback dice randomizer
function randomSetbackDice()
{
  diceRollString = setbackDice[Math.floor(Math.random()*setbackDice.length)];    
  resultCalculation();
}

//Difficulty dice randomizer
function randomDifficultyDice()
{
  diceRollString = difficultyDice[Math.floor(Math.random()*difficultyDice.length)];    
  resultCalculation();
}

//Challenge dice randomizer
function randomChallengeDice()
{
  diceRollString = challengeDice[Math.floor(Math.random()*challengeDice.length)];    
  resultCalculation();
}

//Result calculation

function resultCalculation() 
{ 
  allDiceResults.push(diceRollString);

//convert string to number
  diceRollNum = diceRollString;

  var lastRollContainer = diceRollNum;
  var converter = lastRollContainer; 
  var diceRollNum = converter.replace(/blank/g,'0').replace(/success/g,'1').replace(/succsucc/g,'2').replace(/succadv/g,'1').replace(/advantage/g,'0').replace(/advadv/g,'0').replace(/triumph/g,'1').replace(/failure/g,'-1').replace(/failfail/g,'-2').replace(/failthret/g,'-1').replace(/thretthret/g,'0').replace(/threat/g,'0').replace(/despair/g,'0');

    allDiceNumConv.push(diceRollNum);
    lastRollArray.push(diceRollString);
    if (lastRollArray.length > 1){
      lastRollArray.shift();
    } 

  //invoke functions
  diceResultCalc();
  createUI();

  //logs
  console.log("Latest roll string: " + diceRollString);
  console.log("Latest roll number: " + diceRollNum);
  console.log("AllDiceResults array: " + allDiceResults);
  console.log("AllDiceNumConv array: " + allDiceNumConv);
}

function diceResultCalc() 
{
  var finalSum = allDiceNumConv.reduce(function(prev, curr){
  return (Number(prev) || 0) + (Number(curr) || 0);
  });
  console.log("Final sum: " + finalSum);

var successCount;
successCount = allDiceResults.filter(x => x == "success").length;
console.log("Success count = " + successCount);

var succsuccCount;
succsuccCount = allDiceResults.filter(x => x == "succsucc").length * 2;
console.log("SuccSucc count = " + succsuccCount);

var advantageCount;
advantageCount = allDiceResults.filter(x => x == "advantage").length;
console.log("Advantage count = " + advantageCount);

var advadvCount;
advadvCount = allDiceResults.filter(x => x == "advadv").length * 2;
console.log("AdvAdv count = " + advadvCount);

var succadvCount;
succadvCount = allDiceResults.filter(x => x == "succadv").length;
console.log("SuccAdv count = " + succadvCount);

var failureCount;
failureCount = allDiceResults.filter(x => x = "failure").length;
console.log("Failure count = " + failureCount);

var failfailCount;
failfailCount = allDiceResults.filter(x => x == "failfail").length * 2;
console.log("FailFail count = " + failfailCount);

var threatCount;
threatCount = allDiceResults.filter(x => x == "threat").length;
console.log("Threat count = " + threatCount);

var thretthretCount;
thretthretCount = allDiceResults.filter(x => x == "thretthret").length * 2;
console.log("ThretThret count = " + thretthretCount);

var failthretCount;
failthretCount = allDiceResults.filter(x => x == "failthret").length;
console.log("FailThret count = " + failthretCount);

var triumphCount;
triumphCount = allDiceResults.filter(x => x == "triumph").length;
console.log("Triumph count = " + triumphCount);

var despairCount;
despairCount = allDiceResults.filter(x => x == "despair").length;
console.log("Despair count = " + despairCount);


//publishing results

  //success or failure

    if (finalSum == 0) {
    document.getElementById("success_failure").innerHTML = "Success: 0";
    } 
    if (finalSum > 0) {
    document.getElementById("success_failure").innerHTML = "Success: " + (triumphCount + successCount + succsuccCount + succadvCount - failureCount - failfailCount - failthretCount - despairCount);
    } 
    if (finalSum < 0) {
    document.getElementById("success_failure").innerHTML = "Failure: " + (despairCount + failureCount + failfailCount + failthretCount - successCount - succsuccCount - succadvCount - triumphCount);
    } 

  //advantage or threat

    var advantageTotal = advantageCount + advadvCount + succadvCount;
    var threatTotal = threatCount + thretthretCount + failthretCount;

    if (advantageTotal - threatTotal > 0) {
    document.getElementById("advantage_threat").innerHTML = "Advantage: " + (advantageCount + advadvCount + succadvCount - threatCount - thretthretCount - failthretCount);
    } 
    if (advantageTotal - threatTotal < 0) {
    document.getElementById("advantage_threat").innerHTML = "Threat: " + (threatCount + thretthretCount + failthretCount - advantageCount - advadvCount - succadvCount);
    } 
     if (advantageTotal - threatTotal == 0) {
    document.getElementById("advantage_threat").innerHTML = "Advantage: ";
    }     

  //triumph or despair

    if (triumphCount > 0 || despairCount > 0) {
    document.getElementById("triumph_despair").innerHTML = "Triumph: " + triumphCount + " / Despair: "  + despairCount;
    }    
    
}

function createUI(){

  if (diceRollString == "blank"){
  for (var c in lastRollArray) {
    var newElement = document.createElement('div');
    newElement.id = lastRollArray[c]; newElement.className = "resultBox resultBlank";
    newElement.innerHTML = lastRollArray[c];
    document.body.appendChild(newElement);
  }
  }

  else if (diceRollString == "success"){
  for (var c in lastRollArray) {
    var newElement = document.createElement('div');
    newElement.id = lastRollArray[c]; newElement.className = "resultBox resultSuccess";
    newElement.innerHTML = lastRollArray[c];
    document.body.appendChild(newElement);
  }
  }

  else if (diceRollString == "succsucc"){
  for (var c in lastRollArray) {
    var newElement = document.createElement('div');
    newElement.id = lastRollArray[c]; newElement.className = "resultBox resultSuccsucc";
    newElement.innerHTML = lastRollArray[c];
    document.body.appendChild(newElement);
  }
  }

  else if (diceRollString == "succadv"){
  for (var c in lastRollArray) {
    var newElement = document.createElement('div');
    newElement.id = lastRollArray[c]; newElement.className = "resultBox resultSuccadv";
    newElement.innerHTML = lastRollArray[c];
    document.body.appendChild(newElement);
  }
  }

  else if (diceRollString == "advadv"){
  for (var c in lastRollArray) {
    var newElement = document.createElement('div');
    newElement.id = lastRollArray[c]; newElement.className = "resultBox resultAdvadv";
    newElement.innerHTML = lastRollArray[c];
    document.body.appendChild(newElement);
  }
  }

  else if (diceRollString == "advantage"){
  for (var c in lastRollArray) {
    var newElement = document.createElement('div');
    newElement.id = lastRollArray[c]; newElement.className = "resultBox resultAdvantage";
    newElement.innerHTML = lastRollArray[c];
    document.body.appendChild(newElement);
  }
  }

  else if (diceRollString == "triumph"){
  for (var c in lastRollArray) {
    var newElement = document.createElement('div');
    newElement.id = lastRollArray[c]; newElement.className = "resultBox resultTriumph";
    newElement.innerHTML = lastRollArray[c];
    document.body.appendChild(newElement);
  }
  }

  else if (diceRollString == "failfail"){
  for (var c in lastRollArray) {
    var newElement = document.createElement('div');
    newElement.id = lastRollArray[c]; newElement.className = "resultBox resultFailfail";
    newElement.innerHTML = lastRollArray[c];
    document.body.appendChild(newElement);
  }
  }

   else if (diceRollString == "threat"){
  for (var c in lastRollArray) {
    var newElement = document.createElement('div');
    newElement.id = lastRollArray[c]; newElement.className = "resultBox resultThreat";
    newElement.innerHTML = lastRollArray[c];
    document.body.appendChild(newElement);
  }
  }

  else if (diceRollString == "thretthret"){
  for (var c in lastRollArray) {
    var newElement = document.createElement('div');
    newElement.id = lastRollArray[c]; newElement.className = "resultBox resultThretthret";
    newElement.innerHTML = lastRollArray[c];
    document.body.appendChild(newElement);
  }
  }

  else if (diceRollString == "failthret"){
  for (var c in lastRollArray) {
    var newElement = document.createElement('div');
    newElement.id = lastRollArray[c]; newElement.className = "resultBox resultFailthret";
    newElement.innerHTML = lastRollArray[c];
    document.body.appendChild(newElement);
  }
  }

  else if (diceRollString == "despair"){
  for (var c in lastRollArray) {
    var newElement = document.createElement('div');
    newElement.id = lastRollArray[c]; newElement.className = "resultBox resultDespair";
    newElement.innerHTML = lastRollArray[c];
    document.body.appendChild(newElement);
  }
  }

  else {
  for (var c in lastRollArray) {
    var newElement = document.createElement('div');
    newElement.id = lastRollArray[c]; newElement.className = "resultBox resultFailure";
    newElement.innerHTML = lastRollArray[c];
    document.body.appendChild(newElement);
  }
  }

} 