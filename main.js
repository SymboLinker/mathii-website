/*
KOMMAGETALLEN IN JAVASCRIPT ZIJN ONNAUWKEURIG EN HIERDOOR ONGESCHIKT VOOR DEZE WEBSITE.
OPLOSSING: DE VISUELE REPRESENTATIE AANPASSEN "ALSOF" HET EEN KOMMAGETAL OF VEELVOUD VAN EEN MACHT VAN TIEN IS,
VIA HET INVOEGEN VAN EEN KOMMA AAN DE STRING WAARVAN DE PLAATS VIA EEN OMWEG BEREKEND WORDT.
*/


function makeExercisePrime(i) {
  var primeMin = document.getElementById("primeMin").value;
  var primeMax = document.getElementById("primeMax").value;
  var num = getRandomArithmetic(primeMin,primeMax);
  var workNum = num;
  var factorization = "";
  for (var j = 2; j <= workNum ; j++) {
    var workExp = 0;
    while (workNum % j === 0) {
      workExp += 1;
      workNum /= j;
    }
    if (workExp === 1) {
      factorization += " x " + j;
    }
    if (workExp > 1) {
      factorization += " x " + j + "<sup>" + workExp + "</sup>";
    }
  }
  factorization = factorization.slice(3);

  var prefixExercise = 'exercise';
  document.getElementById(prefixExercise + i).innerHTML = "<sup>&nbsp</sup>" + num;
  var prefixAnswer = 'answer';
  document.getElementById(prefixAnswer + i).innerHTML = factorization;
}
function makeExercisesPrime() {
  for(var i = 1; i <= 15; i++) {
    makeExercisePrime(i);
    for (j=1; j<i;j++) {
      var prefixExercise = 'exercise';
      var iEx = document.getElementById(prefixExercise + i).innerHTML;
      var jEx = document.getElementById(prefixExercise + j).innerHTML;
      if (jEx ===iEx) {
        makeExercisePrime(i);
      }
    }
  }
}

function sortNumber(a,b) {
    return a - b;
}
function startSubitizing() {
  var subitizeMin = document.getElementById("subitizeMin").value;
  var subitizeMax = document.getElementById("subitizeMax").value;
  
  let settings = new dotsy.Settings();
  settings.width = 56;
  settings.height = 56;
  settings.unit = 'vmin';
  let dots = [];
  let numberOfOrangeDots = getRandomIntInclusive(subitizeMin, subitizeMax);
  for (let i = 0; i < numberOfOrangeDots; i++) {
      dots.push(new dotsy.Dot(2, 'orange'));
  }
  settings.dots = dots;
  let html = dotsy.getHtml(settings);
        
  document.getElementById('gridBorder').innerHTML = '<div id="grid">' + html + '</div>';
  document.getElementById('subitizeNumber').innerHTML = numberOfOrangeDots;
}
function showGrid() {
  showById('grid');
  makeInvisibleById('grid');
  showById('gridStuff');
  var subitizeNumber = Number(document.getElementById('subitizeNumber').innerHTML);
  var perDotTime = Number(document.getElementById("perDot").value);
  var startDotTime = Number(document.getElementById("startDot").value);
  var viewTime = perDotTime*subitizeNumber + startDotTime;
  var startTime = 300;
  var stopTime = 300 + viewTime;
  setTimeout('makeVisibleById(\'grid\')',startTime);
  setTimeout('makeInvisibleById(\'grid\')',stopTime);
}
function makeInvisibleById (id) {
  document.getElementById(id).style.visibility = "hidden";
}
function makeVisibleById (id) {
  document.getElementById(id).style.visibility = "";
}

function changeColorNight() {
  document.body.style.color = "white";
  document.body.style.background = "black";
  var elts = document.getElementsByClassName("button");
  for(var e = 0; e < elts.length; e++) { // For each element
    var elt = elts[e];
    elt.style.background = 'black';
  }
}

function changeColorStartup() {
  document.body.style.color = "black";
  document.body.style.background = "#EEF";
  for (let elt of document.getElementsByClassName("special")) {
    elt.style.background = '#DEF';
  }
  for (let elt of document.getElementsByClassName("basic")) {
    elt.style.background = '#FFE';
  }
  for (let elt of document.getElementsByClassName("next")) {
    elt.style.background = '#EFE';
  }
  for (let elt of document.getElementsByClassName("check")) {
    elt.style.background = '#FDD';
  }
  for (let elt of document.getElementsByClassName("back")) {
    elt.style.background = '';
  }
  for (let elt of document.getElementsByClassName("again")) {
    elt.style.background = '#FFE';
  }
  for (let elt of document.getElementsByClassName("hide")) {
    elt.style.background = '';
  }
  for (let elt of document.getElementsByClassName("prime")) {
    elt.style.background = '#EFE';
  }
}

function changeColorDay() {
  document.body.style.color = "black";
  document.body.style.background = "white";
  for(let elt of document.getElementsByClassName("button")) {
    elt.style.background = 'white';
  }
}

function getRandomIntInclusive(min,max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomArithmetic(min,max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  if (((max-10)/min) < 10 && min >= 0) {
    return getRandomIntInclusive(min,max);
  } else if (min >= 0){
    for (var i=1; i<=15; i++) {
      if (Math.pow(10,i) > min)  {
        var smallExp = i;
        break;
      }
    }
    for (var i=1; i<=15; i++) {
      if (Math.pow(10,i) > max-10) {
        var greatExp = i-1;
        break;
      }
    }
    var partS = greatExp - smallExp + 2;

    var pickPart = getRandomIntInclusive(1,partS);
    var localMin = Math.pow(10,(smallExp + pickPart - 2));
    var localMax = Math.pow(10,(smallExp + pickPart-1));
    if (pickPart === 1){
      return getRandomIntInclusive(min,localMax);
    } else if (pickPart === partS) {
      return getRandomIntInclusive(localMin,max);
    } else {
      return getRandomIntInclusive(localMin,localMax);
    }
  } else if (min < 0 && max > 0) {
    for (var i=1; i<=15; i++) {
      if (Math.pow(10,i) > -min - 10)  {
        var negPartExp = i-1;
        break;
      }
    }
    for (var i=1; i<=15; i++) {
      if (Math.pow(10,i) > max-10) {
        var posPartExp = i-1;
        break;
      }
    }

    var partS = posPartExp + negPartExp + 2;

    var pickPart = getRandomIntInclusive(1,partS);
    if (pickPart === 1) {
      var localMax = - Math.pow(10,(negPartExp));
      return getRandomIntInclusive(min,localMax);
    } else if (pickPart === partS) {
      var localMin = Math.pow(10,(posPartExp));
      return getRandomIntInclusive(localMin,max);
    } else if (pickPart - negPartExp - 1 > 0) {
    var localMin = Math.pow(10,(pickPart - 2 - negPartExp));
    var localMax = Math.pow(10,(pickPart - 1 - negPartExp));
    return getRandomIntInclusive(localMin,localMax);
    } else if (pickPart - negPartExp - 2 < 0) {
      var localMin = - Math.pow(10,(negPartExp - pickPart + 2));
      var localMax = - Math.pow(10,(negPartExp - pickPart + 1));
      return getRandomIntInclusive(localMin,localMax);
    }
  }
}

function makeBlind() {
  for (var i=1; i<=15; i++) {
    var prefixExercise = 'exercise';
    var iEx = document.getElementById(prefixExercise + i).innerHTML;
    var prefixBlindEx = 'blindEx';
    document.getElementById(prefixBlindEx + i).innerHTML = iEx;

    var prefixAnswer = 'answer';
    var iAns = document.getElementById(prefixAnswer + i).innerHTML;
    var prefixBlindAns = 'blindAns';
    document.getElementById(prefixBlindAns + i).innerHTML = " = "+ iAns;
  }
  document.getElementById('blindCount').innerHTML = 1;

  for (var i = 1; i <= 15; i++) {
    var prefix = 'blindEx';
    var ex = prefix + i;
    hideById(ex);
    var prefix = 'blindAns';
    var answer = prefix + i;
    hideById(answer);
  }
  document.getElementById('blindEx1').style.display = '';
  if (document.getElementById('geenBreuken').checked) {
    var len = document.getElementById('blindEx1').innerHTML.length;
    setTimeout("hideById('blindEx1')",250*(len-2));
  } else {
    setTimeout("hideById('blindEx1')",2000);
  }
}

function nextBlind() {
  var blindCount = Number(document.getElementById('blindCount').innerHTML);
  var prefixBlindEx = 'blindEx';
  document.getElementById(prefixBlindEx + blindCount).style.display = 'none';
  var prefixBlindAns = 'blindAns';
  document.getElementById(prefixBlindAns + blindCount).style.display = 'none';
  if (blindCount < 15) {
    blindCount += 1;
    document.getElementById('blindCount').innerHTML = blindCount;

    var prefixBlindEx = 'blindEx';
    document.getElementById(prefixBlindEx + blindCount).style.display = '';
    if (document.getElementById('geenBreuken').checked) {
      var len = document.getElementById(prefixBlindEx + blindCount).innerHTML.length;
      setTimeout('hideBlind(' + prefixBlindEx + blindCount + ')',250*(len-2));
    } else {
      setTimeout('hideBlind(' + prefixBlindEx + blindCount + ')',2000);
    }
  } else {
    makeBlind();
  }
}

function showBlind() {
  var blindCount = Number(document.getElementById('blindCount').innerHTML);
  var prefixBlindEx = 'blindEx';
  document.getElementById(prefixBlindEx + blindCount).style.display = '';
  var prefixBlindAns = 'blindAns';
  document.getElementById(prefixBlindAns + blindCount).style.display = '';
}

function hideBlind(){
  var blindCount = Number(document.getElementById('blindCount').innerHTML);
  var prefixBlindEx = 'blindEx';
  document.getElementById(prefixBlindEx + blindCount).style.display = 'none';
  var prefixBlindAns = 'blindAns';
  document.getElementById(prefixBlindAns + blindCount).style.display = 'none';
}

function hideTimeQuestions() {
  for (var i = 1; i <= 15; i++) {
    var prefix = 'timeQuestion';
    var answer = prefix + i;
    hideById(answer);
  }
}

function startGetalGeheugen() {
  var getalGeheugenAantalGetallen = document.getElementById("getalGeheugenAantalGetallen").value;

  document.getElementById('timeCurrent').innerHTML = 0;

  var getalGeheugenMin = Math.pow(10, document.getElementById("getalGeheugenMin").value-1) + 1;
  var getalGeheugenMax = Math.pow(10, document.getElementById("getalGeheugenMax").value) - 1;

  for (var i = 1; i <= getalGeheugenAantalGetallen; i++) {
    var getalGeheugenGetal = getRandomArithmetic(getalGeheugenMin,getalGeheugenMax);
    var prefix = 'timeQuestion';
    document.getElementById(prefix + i).innerHTML = getalGeheugenGetal;
  }
  hideTimeQuestions();
}
function volgendeGetalGeheugen() {
  var timeCurrent = Number(document.getElementById("timeCurrent").innerHTML);
  var prefix = 'timeQuestion';
  if (timeCurrent > 0) {
  var currentId = prefix + timeCurrent;
    hideById(currentId);
  }
  timeCurrent = timeCurrent + 1;
  document.getElementById("timeCurrent").innerHTML = timeCurrent;
  console.log(timeCurrent);

  setTimeoutCurrent();
  var getalGeheugenAantalGetallen = document.getElementById("getalGeheugenAantalGetallen").value;
  if (Number(timeCurrent) === Number(getalGeheugenAantalGetallen)) {
    showById('checken');
    hideById('volgende');
  }
}
function setTimeoutCurrent() {
  var timeCurrent = Number(document.getElementById("timeCurrent").innerHTML);
  var prefix = 'timeQuestion';
  var timeoutCurrent = prefix + timeCurrent;
  setTimeout('showById(' +"'"+ timeoutCurrent + "'"+ ')',300);
  setTimeout('hideById(' +"'"+ timeoutCurrent + "'"+ ')',2000);
}
function getalGeheugenChecken() {
  var getalGeheugenAantalGetallen = document.getElementById("getalGeheugenAantalGetallen").value;
  for (var i = 1; i <= Number(getalGeheugenAantalGetallen); i++) {
    var prefix = 'timeQuestion';
    var answer = prefix + i;
    showById(answer);
  }
}


function returnLargerOrSmallerNumberAsString(numberToChange,commaPlace) {
  var numberString = numberToChange.toString();
  if (numberString[0] === '-') {
    // IF NEGATIVE
    var newNumber = numberString.slice(1,numberString.length);
    var numberLength = newNumber.length;
    if (commaPlace === 0) {
        var ret = numberString;
      } else if (commaPlace < 0) {
        // then the number has decimal places.
        if (-commaPlace >= numberLength) {
          // like -0,0035
          var zeros = "";
          for (var i=1; i <= -commaPlace - numberLength; i++) {
            zeros += "0";
          }
          var ret = "-0" + languageDecimalPoint + zeros + newNumber;

        } else if (-commaPlace < numberLength) {
          // then the comma must be put somewhere in between, like -23.4
          var ret = "-" + newNumber.slice(0,numberLength + commaPlace) +  languageDecimalPoint  + newNumber.slice(numberLength + commaPlace,numberLength);
        }
      } else {
        // the number is as -14200000
        var zeros = "";
        for (var i=1; i <= commaPlace; i++) {
          zeros += "0";
        }
        var ret = "-" + newNumber + zeros;
      }
    } else {
      // IF POSITIVE
    var numberLength = numberString.length;
    if (commaPlace === 0) {
      var ret = numberString;
    } else if (commaPlace < 0) {
      // then the number has decimal places.
      if (-commaPlace >= numberLength) {
        // like 0.0035
        var zeros = "";
        for (var i=1; i <= -commaPlace - numberLength; i++) {
          zeros += "0";
        }
        var ret = "0" + languageDecimalPoint + zeros + numberString;

      } else if (-commaPlace < numberLength) {
        // then the comma must be put somewhere in between. like 23.4
        var ret = numberString.slice(0,numberLength + commaPlace) +  languageDecimalPoint  + numberString.slice(numberLength + commaPlace,numberLength);
      }
    } else {
      // the number is as 14200000
      var zeros = "";
      for (var i=1; i <= commaPlace; i++) {
        zeros += "0";
      }
      var ret = numberString + zeros;
    }
  }
  return ret;
}

function cleanNumber(numberIn) {
  var newNumber = numberIn.toString();
  if (newNumber.indexOf(languageDecimalPoint) !== -1) {
    while (newNumber[newNumber.length - 1] === '0') {
      var newNumber = newNumber.substr(0,newNumber.length - 1);
    }
    if (newNumber[newNumber.length - 1] === languageDecimalPoint) {
      var newNumber = newNumber.substr(0,newNumber.length - 1);
    }
  }
  return newNumber;
}

function checkBoxCheck(id) {
  document.getElementById(id).checked = true;
}

function getNumerator(b,aMin,aMax) {
  if (aMin === 0 && getRandomIntInclusive(0,1) === 0) {
    var a = getRandomArithmetic(1,b-1);
    return a;
  } else {

  }


}

function makeExerciseBreukenOptellen(i) {
  var bdMin = document.getElementById("breukenOptellenBDmin").value;
  var bdMax = document.getElementById("breukenOptellenBDmax").value;
  var fMin = document.getElementById("breukenOptellenMin").value;
  var fMax = document.getElementById("breukenOptellenMax").value;

  var gehelenFilteren = document.getElementById("breukenGeheelFilterenOptellen").checked;
  var eenOfNulGehelen = !gehelenFilteren;

  if (eenOfNulGehelen) {
    var eenGehele = (getRandomIntInclusive(0,1) < 1);
    var gehelenFilteren = !eenGehele;
  }

  if (eenGehele) {
    var wholeNumber = getRandomIntInclusive(1,2);
  }

  //NumberOne (wholeNumber = 1)
  var b = getRandomArithmetic(bdMin,bdMax);
  if (Number(fMin) === 0 && Number(fMax) > 2 && getRandomIntInclusive(0,3) === 0 && wholeNumber === 2) {
    var a = getRandomArithmetic(1,b-1);
  } else  if (wholeNumber === 1) {
    while (b === 2) {
      b = getRandomArithmetic(bdMin,bdMax);
    }
    var a = b*getRandomArithmetic(fMin+1,fMax-1);
    if (document.getElementById("breukenVereenvoudigen").checked && document.getElementById("geenGemixteBreuken").checked ) {
      while (gcd(a,b) !==1) {
        a = b*getRandomArithmetic(fMin+1,fMax-1);
      }
    }
  } else {
    var a = getRandomArithmetic(fMin + 1, fMax * b - 1);
    if (document.getElementById("breukenVereenvoudigen").checked && (gehelenFilteren || wholeNumber === 2)) {
      while (gcd(a,b) !== 1) {
        a = getRandomArithmetic(fMin + 1, fMax * b - 1);
      }
    } else if (!document.getElementById("breukenVereenvoudigen").checked && (gehelenFilteren || wholeNumber === 2)) {
      while (a % b === 0) {
        a = getRandomArithmetic(fMin + 1, fMax * b - 1);
      }
    }
  }

  if (a === b) {
    a *= getRandomArithmetic(2,fMax -1);
  }

  //NumberTwo (wholeNumber = 2)
  var d = getRandomArithmetic(bdMin,bdMax);
  if (Number(fMin) === 0 && Number(fMax) > 2 && getRandomIntInclusive(0,3) === 0 && wholeNumber === 1) {
    var c = getRandomArithmetic(1,d-1);
  } else if (wholeNumber === 2 ) {
    while (d === 2) {
      d = getRandomArithmetic(bdMin,bdMax);
    }
    var c = d*getRandomArithmetic(fMin+1,fMax-1);
    if (document.getElementById("breukenVereenvoudigen").checked && document.getElementById("geenGemixteBreuken").checked ) {
      while (gcd(c,d) !==1) {
        c = d*getRandomArithmetic(fMin+1,fMax-1);
      }
    }
  } else {
    var c = getRandomArithmetic(fMin + 1, fMax * d - 1);
    if (document.getElementById("breukenVereenvoudigen").checked && (gehelenFilteren || wholeNumber === 1) ) {
      while (gcd(c,d) !== 1) {
        c = getRandomArithmetic(fMin + 1, fMax * d - 1);
      }
    } else if (!document.getElementById("breukenVereenvoudigen").checked && (gehelenFilteren || wholeNumber === 1)) {
      while (c % d === 0) {
        c = getRandomArithmetic(fMin + 1, fMax * d - 1);
      }
    }
  }

  if (c === d) {
    c *= getRandomArithmetic(2,fMax -1);
  }

  var f = b*d;
  var e = a*d + b*c;
  var ggdEF = gcd(e,f);
  var e = e / ggdEF;
  var f = f / ggdEF;


  var prefixExercise = 'exercise';
  document.getElementById(prefixExercise + i).innerHTML = cssFraction(a,b) + " + " + cssFraction(c,d);
  var prefixAnswer = 'answer';
  document.getElementById(prefixAnswer + i).innerHTML = cssFraction(e,f);
}

function makeExerciseBreukenAftrekken(i) {
  var bdMin = document.getElementById("breukenAftrekkenBDmin").value;
  var bdMax = document.getElementById("breukenAftrekkenBDmax").value;
  var fMin = document.getElementById("breukenAftrekkenMin").value;
  var fMax = document.getElementById("breukenAftrekkenMax").value;

  var gehelenFilteren = document.getElementById("breukenGeheelFilterenAftrekken").checked;
  var eenOfNulGehelen = !gehelenFilteren;

  if (eenOfNulGehelen) {
    var eenGehele = (getRandomIntInclusive(0,1) < 1);
    var gehelenFilteren = !eenGehele;
  }

  if (eenGehele) {
    var wholeNumber = getRandomIntInclusive(1,2);
  }

//NumberOne (wholeNumber = 1)
  var b = getRandomArithmetic(bdMin,bdMax);
  if (Number(fMin) === 0 && Number(fMax) > 2 && getRandomIntInclusive(0,3) === 0 && wholeNumber === 2) {
    var a = getRandomArithmetic(1,b-1);
  } else  if (wholeNumber === 1) {
    while (b === 2) {
      b = getRandomArithmetic(bdMin,bdMax);
    }
    var a = b*getRandomArithmetic(fMin+1,fMax-1);
    if (document.getElementById("breukenVereenvoudigen").checked && document.getElementById("geenGemixteBreuken").checked ) {
      while (gcd(a,b) !==1) {
        a = b*getRandomArithmetic(fMin+1,fMax-1);
      }
    }
  } else {
    var a = getRandomArithmetic(fMin + 1, fMax * b - 1);
    if (document.getElementById("breukenVereenvoudigen").checked && (gehelenFilteren || wholeNumber === 2)) {
      while (gcd(a,b) !== 1) {
        a = getRandomArithmetic(fMin + 1, fMax * b - 1);
      }
    } else if (!document.getElementById("breukenVereenvoudigen").checked && (gehelenFilteren || wholeNumber === 2)) {
      while (a % b === 0) {
        a = getRandomArithmetic(fMin + 1, fMax * b - 1);
      }
    }
  }

  if (a === b) {
    a *= getRandomArithmetic(2,fMax -1);
  }

//NumberTwo (wholeNumber = 2)
  var d = getRandomArithmetic(bdMin,bdMax);
  if (Number(fMin) === 0 && Number(fMax) > 2 && getRandomIntInclusive(0,3) === 0 && wholeNumber === 1) {
    var c = getRandomArithmetic(1,d-1);
  } else if (wholeNumber === 2 ) {
    while (d === 2) {
      d = getRandomArithmetic(bdMin,bdMax);
    }
    var c = d*getRandomArithmetic(fMin+1,fMax-1);
    if (document.getElementById("breukenVereenvoudigen").checked && document.getElementById("geenGemixteBreuken").checked ) {
      while (gcd(c,d) !==1) {
        c = d*getRandomArithmetic(fMin+1,fMax-1);
      }
    }
  } else {
    var c = getRandomArithmetic(fMin + 1, fMax * d - 1);
    if (document.getElementById("breukenVereenvoudigen").checked && (gehelenFilteren || wholeNumber === 1) ) {
      while (gcd(c,d) !== 1) {
        c = getRandomArithmetic(fMin + 1, fMax * d - 1);
      }
    } else if (!document.getElementById("breukenVereenvoudigen").checked && (gehelenFilteren || wholeNumber === 1)) {
      while (c % d === 0) {
        c = getRandomArithmetic(fMin + 1, fMax * d - 1);
      }
    }
  }

  if (c === d) {
    c *= getRandomArithmetic(2,fMax -1);
  }

  var f = b*d;
  var e = a*d - b*c;
  var ggdEF = gcd(e,f);
  var e = e / ggdEF;
  var f = f / ggdEF;

  var prefixExercise = 'exercise';
  document.getElementById(prefixExercise + i).innerHTML = cssFraction(a,b) + " - " + cssFraction(c,d);
  var prefixAnswer = 'answer';
  document.getElementById(prefixAnswer + i).innerHTML = cssFraction(e,f);
}

function makeExerciseBreukenVermenigvuldigen(i) {
  var bdMin = document.getElementById("breukenVermenigvuldigenBDmin").value;
  var bdMax = document.getElementById("breukenVermenigvuldigenBDmax").value;
  var fMin = document.getElementById("breukenVermenigvuldigenMin").value;
  var fMax = document.getElementById("breukenVermenigvuldigenMax").value;

  var gehelenFilteren = document.getElementById("breukenGeheelFilterenVermenigvuldigen").checked;
  var eenGehele = document.getElementById("breukenEenGeheleVermenigvuldigen").checked;
  var eenOfNulGehelen = document.getElementById("breukenEenOfNulGehelenVermenigvuldigen").checked;

  if (eenOfNulGehelen) {
    var eenGehele = (getRandomIntInclusive(0,1) < 1);
    var gehelenFilteren = !eenGehele;
  }

  if (eenGehele) {
    var wholeNumber = getRandomIntInclusive(1,2);
  }

//NumberOne (wholeNumber = 1)
  var b = getRandomArithmetic(bdMin,bdMax);
  if (Number(fMin) === 0 && Number(fMax) > 2 && getRandomIntInclusive(0,3) === 0 && wholeNumber === 2) {
    var a = getRandomArithmetic(1,b-1);
  } else  if (wholeNumber === 1) {
    while (b === 2) {
      b = getRandomArithmetic(bdMin,bdMax);
    }
    var a = b*getRandomArithmetic(fMin+1,fMax-1);
    if (document.getElementById("breukenVereenvoudigen").checked && document.getElementById("geenGemixteBreuken").checked ) {
      while (gcd(a,b) !==1) {
        a = b*getRandomArithmetic(fMin+1,fMax-1);
      }
    }
  } else {
    var a = getRandomArithmetic(fMin + 1, fMax * b - 1);
    if (document.getElementById("breukenVereenvoudigen").checked && (gehelenFilteren || wholeNumber === 2)) {
      while (gcd(a,b) !== 1) {
        a = getRandomArithmetic(fMin + 1, fMax * b - 1);
      }
    } else if (!document.getElementById("breukenVereenvoudigen").checked && (gehelenFilteren || wholeNumber === 2)) {
      while (a % b === 0) {
        a = getRandomArithmetic(fMin + 1, fMax * b - 1);
      }
    }
  }

  if (a === b) {
    a *= getRandomArithmetic(2,fMax -1);
  }

//NumberTwo (wholeNumber = 2)
  var d = getRandomArithmetic(bdMin,bdMax);
  if (Number(fMin) === 0 && Number(fMax) > 2 && getRandomIntInclusive(0,3) === 0 && wholeNumber === 1) {
    var c = getRandomArithmetic(1,d-1);
  } else if (wholeNumber === 2 ) {
    while (d === 2) {
      d = getRandomArithmetic(bdMin,bdMax);
    }
    var c = d*getRandomArithmetic(fMin+1,fMax-1);
    if (document.getElementById("breukenVereenvoudigen").checked && document.getElementById("geenGemixteBreuken").checked ) {
      while (gcd(c,d) !==1) {
        c = d*getRandomArithmetic(fMin+1,fMax-1);
      }
    }
  } else {
    var c = getRandomArithmetic(fMin + 1, fMax * d - 1);
    if (document.getElementById("breukenVereenvoudigen").checked && (gehelenFilteren || wholeNumber === 1) ) {
      while (gcd(c,d) !== 1) {
        c = getRandomArithmetic(fMin + 1, fMax * d - 1);
      }
    } else if (!document.getElementById("breukenVereenvoudigen").checked && (gehelenFilteren || wholeNumber === 1)) {
      while (c % d === 0) {
        c = getRandomArithmetic(fMin + 1, fMax * d - 1);
      }
    }
  }

  if (c === d) {
    c *= getRandomArithmetic(2,fMax -1);
  }

  var f = b*d;
  var e = a*c;
  var ggdEF = gcd(e,f);
  var e = e / ggdEF;
  var f = f / ggdEF;

  var prefixExercise = 'exercise';
  document.getElementById(prefixExercise + i).innerHTML = cssFraction(a,b) + " x " + cssFraction(c,d);
  var prefixAnswer = 'answer';
  document.getElementById(prefixAnswer + i).innerHTML = cssFraction(e,f);
}

function makeExerciseBreukenDelen(i) {
  var abcdMax = document.getElementById("breukenDelenABCDmax").value;

  var linkerGetalGeheel = document.getElementById("linkerGetalGeheel").checked;
  var rechterGetalKleinerEen = document.getElementById("rechterGetalKleinerEen").checked;

  if (linkerGetalGeheel) {
    if (rechterGetalKleinerEen) {
      var b = 1;
      var a = getRandomArithmetic(1,abcdMax);
      var d = getRandomArithmetic(2,abcdMax);
      var c = getRandomArithmetic(1,d-1);
      while (c % d === 0 || (document.getElementById("breukenVereenvoudigen").checked && gcd(c,d) !== 1)) {
        c = getRandomArithmetic(1, d-1);
      }
    } else {
      var b = 1;
      var a = getRandomArithmetic(1,abcdMax);
      var d = getRandomArithmetic(2,abcdMax);
      var c = getRandomArithmetic(1,abcdMax);
      while (c % d === 0 || (document.getElementById("breukenVereenvoudigen").checked && gcd(c,d) !== 1)) {
        c = getRandomArithmetic(1, abcdMax);
      }
    }
  } else {

    var eenOfNulGehelen = document.getElementById("breukenEenOfNulGehelenDelen").checked;
    var gehelenFilteren = document.getElementById("breukenGeheelFilterenDelen").checked;

    if (eenOfNulGehelen) {
      var eenGehele = (getRandomIntInclusive(0,1) < 1);
      var gehelenFilteren = !eenGehele;
    }

    if (eenGehele) {
      var wholeNumber = getRandomIntInclusive(1,2);
    }

  //NumberOne (wholeNumber = 1)
    if (getRandomIntInclusive(0,2) === 0 && !(wholeNumber === 1)) {
      //NumberOne smaller than one
      var b = getRandomArithmetic(2,abcdMax);
      var a = getRandomArithmetic(1,b-1);
      if (document.getElementById("breukenVereenvoudigen").checked) {
        while (gcd(a,b) !== 1) {
          var a = getRandomArithmetic(1,b-1);
        }
      }
    } else  if (wholeNumber === 1) {
      var b = 1;
      var a = getRandomArithmetic(1,abcdMax);
    } else {
      var b = getRandomArithmetic(2,abcdMax-1);
      var a = getRandomArithmetic(b, 2*abcdMax);
      if (document.getElementById("breukenVereenvoudigen").checked && (gehelenFilteren || wholeNumber === 2)) {
        while (gcd(a,b) !== 1) {
          a = getRandomArithmetic(b, 2*abcdMax);
        }
      } else if (!document.getElementById("breukenVereenvoudigen").checked && (gehelenFilteren || wholeNumber === 2)) {
          while (a % b === 0) {
            a = getRandomArithmetic(b, 2*abcdMax);
          }
        }
      }


      //NumberTwo (wholeNumber = 2)
    if (getRandomIntInclusive(0,1) === 0 && !(wholeNumber === 2)) {
      var d = getRandomArithmetic(2,abcdMax);
      var c = getRandomArithmetic(1,d-1);
      if (document.getElementById("breukenVereenvoudigen").checked) {
        while (gcd(c,d) !== 1) {
          var c = getRandomArithmetic(1,d-1);
        }
      }
    } else  if (wholeNumber === 2) {
      var d = 1;
      var c = getRandomArithmetic(2,abcdMax);
    } else {
      var d = getRandomArithmetic(2,abcdMax-1);
      var c = getRandomArithmetic(d, abcdMax);
      if (document.getElementById("breukenVereenvoudigen").checked && (gehelenFilteren || wholeNumber === 1)) {
        while (gcd(c,d) !== 1) {
          c = getRandomArithmetic(d, abcdMax);
        }
      } else if (!document.getElementById("breukenVereenvoudigen").checked && (gehelenFilteren || wholeNumber === 1)) {
        while (c % d === 0) {
          c = getRandomArithmetic(d, abcdMax);
        }
      }
    }
  }

  var f = b*c;
  var e = a*d;
  var ggdEF = gcd(e,f);
  var e = e / ggdEF;
  var f = f / ggdEF;

  var prefixExercise = 'exercise';
  document.getElementById(prefixExercise + i).innerHTML = cssFraction(a,b) + " : " + cssFraction(c,d);
  var prefixAnswer = 'answer';
  document.getElementById(prefixAnswer + i).innerHTML = cssFraction(e,f);
}

function cssFraction(a,b) {
  // Let op: wordt niet automatisch vereenvoudigd!
  var neg = "";
  if (a*b < 0) {
    neg = "-"
  }
  if (a < 0) {
    a = -a;
  }
  if (b < 0) {
    b = -b;
  }
  if (document.getElementById("geenGemixteBreuken").checked || (a < b)) {
    var fraction = '<div class="frac"><span class="topWhite">' + a + '</span><span class="symbol">/</span><span class="bottom">' + b + '</span></div>'
    } else if (a % b === 0 && document.getElementById("breukenVereenvoudigen").checked) {
      var fraction = a/b;
    } else {
      var whole = Math.floor(a/b);
      var rest = a % b;
      if (rest === 0) {
        var fraction = whole
      } else if (whole !== 0){
      var fraction = whole + '<div class="frac"><span class="topWhite">' + rest + '</span><span class="symbol">/</span><span class="bottom">' + b + '</span></div>';
    } else {
      var fraction = ' <div class="frac"><span class="topWhite">' + rest + '</span><span class="symbol">/</span><span class="bottom">' + b + '</span></div>';
    }
  }
  return neg + fraction;
}

function makeExerciseOptellen(i) {
  if (document.getElementById("welBreuken").checked) {
    makeExerciseBreukenOptellen(i);
  } else {
    var userInputOptellenMin = document.getElementById("userInputOptellenMin").value;
    var userInputOptellenMax = document.getElementById("userInputOptellenMax").value;

    var optellenA = getRandomArithmetic(userInputOptellenMin,userInputOptellenMax);
    var optellenB = getRandomArithmetic(userInputOptellenMin,userInputOptellenMax);

    if (document.getElementById("welGroteGetallen").checked && document.getElementById("welKleineGetallen").checked) {
      var commaType = getRandomIntInclusive(1,2);
    }

    if (!(document.getElementById("welGroteGetallen").checked || document.getElementById("welKleineGetallen").checked)) {
      var optellenC = optellenA + optellenB;
      var verschuivingA = 0;
      var verschuivingB = 0;
      var verschuivingC = 0;
    } else if (document.getElementById("welKleineGetallen").checked && !(document.getElementById("welGroteGetallen").checked) || commaType === 1) {
      var kleineGetallenMin = document.getElementById("kleineGetallenMin").value;
      var kleineGetallenMax = document.getElementById("kleineGetallenMax").value;

      var kleineGetallenVerschuivingA = getRandomIntInclusive(kleineGetallenMin,kleineGetallenMax);
      var kleineGetallenVerschuivingB = getRandomIntInclusive(kleineGetallenMin,kleineGetallenMax);

      if (kleineGetallenVerschuivingA <= kleineGetallenVerschuivingB) {
        var verschil = kleineGetallenVerschuivingB - kleineGetallenVerschuivingA;
        var optellenAtijdelijk = optellenA * Math.pow(10,verschil);
        var optellenC = optellenAtijdelijk + optellenB;
        var verschuivingA = -kleineGetallenVerschuivingA;
        var verschuivingB = -kleineGetallenVerschuivingB;
        var verschuivingC = -kleineGetallenVerschuivingB;
      } else {
        // (kleineGetallenVerschuivingB < kleineGetallenVerschuivingA)
        var verschil = kleineGetallenVerschuivingA - kleineGetallenVerschuivingB;
        var optellenBtijdelijk = optellenB * Math.pow(10,verschil);
        var optellenC = optellenA + optellenBtijdelijk;
        var verschuivingA = -kleineGetallenVerschuivingA;
        var verschuivingB = -kleineGetallenVerschuivingB;
        var verschuivingC = -kleineGetallenVerschuivingA;
      }
    } else if (document.getElementById("welGroteGetallen").checked && !(document.getElementById("welKleineGetallen").checked) || commaType === 2) {
      var groteGetallenMin = document.getElementById("groteGetallenMin").value;
      var groteGetallenMax = document.getElementById("groteGetallenMax").value;
      var groteGetallenVerschuivingA = getRandomIntInclusive(groteGetallenMin,groteGetallenMax);
      var groteGetallenVerschuivingB = getRandomIntInclusive(groteGetallenMin,groteGetallenMax);

      if (groteGetallenVerschuivingB <= groteGetallenVerschuivingA) {
        var verschil = groteGetallenVerschuivingA - groteGetallenVerschuivingB;
        var optellenAtijdelijk = optellenA * Math.pow(10,verschil);
        var optellenC = optellenAtijdelijk + optellenB;
        var verschuivingA = groteGetallenVerschuivingA;
        var verschuivingB = groteGetallenVerschuivingB;
        var verschuivingC = groteGetallenVerschuivingB;
      } else if (groteGetallenVerschuivingA < groteGetallenVerschuivingB) {
        var verschil = groteGetallenVerschuivingB - groteGetallenVerschuivingA;
        var optellenBtijdelijk = optellenB * Math.pow(10,verschil);
        var optellenC = optellenA + optellenBtijdelijk;
        var verschuivingA = groteGetallenVerschuivingA;
        var verschuivingB = groteGetallenVerschuivingB;
        var verschuivingC = groteGetallenVerschuivingA;
      }
    }
      var prefixExercise = 'exercise';
      document.getElementById(prefixExercise + i).innerHTML = returnLargerOrSmallerNumberAsString(optellenA,verschuivingA) + " + " + returnLargerOrSmallerNumberAsString(optellenB,verschuivingB);
      var prefixAnswer = 'answer';
      document.getElementById(prefixAnswer + i).innerHTML = cleanNumber(returnLargerOrSmallerNumberAsString(optellenC,verschuivingC));
    }
  }


function makeExerciseAftrekken(i) {
  if (document.getElementById("welBreuken").checked) {
    makeExerciseBreukenAftrekken(i);
  } else {
    var userInputAftrekkenMin = document.getElementById("userInputAftrekkenMin").value;
    var userInputAftrekkenMax = document.getElementById("userInputAftrekkenMax").value;

    var aftrekkenA = getRandomArithmetic(userInputAftrekkenMin,userInputAftrekkenMax);
    var aftrekkenB = getRandomArithmetic(userInputAftrekkenMin,userInputAftrekkenMax);

    if (document.getElementById("welGroteGetallen").checked && document.getElementById("welKleineGetallen").checked) {
      var commaType = getRandomIntInclusive(1,2);
    }

    if (!(document.getElementById("welGroteGetallen").checked || document.getElementById("welKleineGetallen").checked)) {
      var aftrekkenC = aftrekkenA - aftrekkenB;
      var verschuivingA = 0;
      var verschuivingB = 0;
      var verschuivingC = 0;
    } else if (document.getElementById("welKleineGetallen").checked && !(document.getElementById("welGroteGetallen").checked) || commaType === 1) {
      var kleineGetallenMin = document.getElementById("kleineGetallenMin").value;
      var kleineGetallenMax = document.getElementById("kleineGetallenMax").value;

      var kleineGetallenVerschuivingA = getRandomIntInclusive(kleineGetallenMin,kleineGetallenMax);
      var kleineGetallenVerschuivingB = getRandomIntInclusive(kleineGetallenMin,kleineGetallenMax);

      if (kleineGetallenVerschuivingA <= kleineGetallenVerschuivingB) {
        var verschil = kleineGetallenVerschuivingB - kleineGetallenVerschuivingA;
        var aftrekkenAtijdelijk = aftrekkenA * Math.pow(10,verschil);
        var aftrekkenC = aftrekkenAtijdelijk - aftrekkenB;
        var verschuivingA = -kleineGetallenVerschuivingA;
        var verschuivingB = -kleineGetallenVerschuivingB;
        var verschuivingC = -kleineGetallenVerschuivingB;
      } else {
        // (kleineGetallenVerschuivingB < kleineGetallenVerschuivingA)
        var verschil = kleineGetallenVerschuivingA - kleineGetallenVerschuivingB;
        var aftrekkenBtijdelijk = aftrekkenB * Math.pow(10,verschil);
        var aftrekkenC = aftrekkenA - aftrekkenBtijdelijk;
        var verschuivingA = -kleineGetallenVerschuivingA;
        var verschuivingB = -kleineGetallenVerschuivingB;
        var verschuivingC = -kleineGetallenVerschuivingA;
      }
    } else if (document.getElementById("welGroteGetallen").checked && !(document.getElementById("welKleineGetallen").checked) || commaType === 2) {
      var groteGetallenMin = document.getElementById("groteGetallenMin").value;
      var groteGetallenMax = document.getElementById("groteGetallenMax").value;
      var groteGetallenVerschuivingA = getRandomIntInclusive(groteGetallenMin,groteGetallenMax);
      var groteGetallenVerschuivingB = getRandomIntInclusive(groteGetallenMin,groteGetallenMax);

      if (groteGetallenVerschuivingB <= groteGetallenVerschuivingA) {
        var verschil = groteGetallenVerschuivingA - groteGetallenVerschuivingB;
        var aftrekkenAtijdelijk = aftrekkenA * Math.pow(10,verschil);
        var aftrekkenC = aftrekkenAtijdelijk - aftrekkenB;
        var verschuivingA = groteGetallenVerschuivingA;
        var verschuivingB = groteGetallenVerschuivingB;
        var verschuivingC = groteGetallenVerschuivingB;
      } else if (groteGetallenVerschuivingA < groteGetallenVerschuivingB) {
        var verschil = groteGetallenVerschuivingB - groteGetallenVerschuivingA;
        var aftrekkenBtijdelijk = aftrekkenB * Math.pow(10,verschil);
        var aftrekkenC = aftrekkenA - aftrekkenBtijdelijk;
        var verschuivingA = groteGetallenVerschuivingA;
        var verschuivingB = groteGetallenVerschuivingB;
        var verschuivingC = groteGetallenVerschuivingA;
      }
    }
    if (document.getElementById("aftrekkenCnonNegative").checked) {
      while (aftrekkenC < 0) {
        var aftrekkenA = getRandomArithmetic(userInputAftrekkenMin,userInputAftrekkenMax);
        var aftrekkenB = getRandomArithmetic(userInputAftrekkenMin,userInputAftrekkenMax);

        if (document.getElementById("welGroteGetallen").checked && document.getElementById("welKleineGetallen").checked) {
          var commaType = getRandomIntInclusive(1,2);
        }
        if (!(document.getElementById("welGroteGetallen").checked || document.getElementById("welKleineGetallen").checked)) {
          var aftrekkenC = aftrekkenA - aftrekkenB;
          var verschuivingA = 0;
          var verschuivingB = 0;
          var verschuivingC = 0;
        } else if (document.getElementById("welKleineGetallen").checked && !(document.getElementById("welGroteGetallen").checked) || commaType === 1) {
          var kleineGetallenMin = document.getElementById("kleineGetallenMin").value;
          var kleineGetallenMax = document.getElementById("kleineGetallenMax").value;

          var kleineGetallenVerschuivingA = getRandomIntInclusive(kleineGetallenMin,kleineGetallenMax);
          var kleineGetallenVerschuivingB = getRandomIntInclusive(kleineGetallenMin,kleineGetallenMax);

          if (kleineGetallenVerschuivingA <= kleineGetallenVerschuivingB) {
            var verschil = kleineGetallenVerschuivingB - kleineGetallenVerschuivingA;
            var aftrekkenAtijdelijk = aftrekkenA * Math.pow(10,verschil);
            var aftrekkenC = aftrekkenAtijdelijk - aftrekkenB;
            var verschuivingA = -kleineGetallenVerschuivingA;
            var verschuivingB = -kleineGetallenVerschuivingB;
            var verschuivingC = -kleineGetallenVerschuivingB;
          } else {
            // (kleineGetallenVerschuivingB < kleineGetallenVerschuivingA)
            var verschil = kleineGetallenVerschuivingA - kleineGetallenVerschuivingB;
            var aftrekkenBtijdelijk = aftrekkenB * Math.pow(10,verschil);
            var aftrekkenC = aftrekkenA - aftrekkenBtijdelijk;
            var verschuivingA = -kleineGetallenVerschuivingA;
            var verschuivingB = -kleineGetallenVerschuivingB;
            var verschuivingC = -kleineGetallenVerschuivingA;
          }
        } else if (document.getElementById("welGroteGetallen").checked && !(document.getElementById("welKleineGetallen").checked) || commaType === 2) {
          var groteGetallenMin = document.getElementById("groteGetallenMin").value;
          var groteGetallenMax = document.getElementById("groteGetallenMax").value;
          var groteGetallenVerschuivingA = getRandomIntInclusive(groteGetallenMin,groteGetallenMax);
          var groteGetallenVerschuivingB = getRandomIntInclusive(groteGetallenMin,groteGetallenMax);

          if (groteGetallenVerschuivingB <= groteGetallenVerschuivingA) {
            var verschil = groteGetallenVerschuivingA - groteGetallenVerschuivingB;
            var aftrekkenAtijdelijk = aftrekkenA * Math.pow(10,verschil);
            var aftrekkenC = aftrekkenAtijdelijk - aftrekkenB;
            var verschuivingA = groteGetallenVerschuivingA;
            var verschuivingB = groteGetallenVerschuivingB;
            var verschuivingC = groteGetallenVerschuivingB;
          } else if (groteGetallenVerschuivingA < groteGetallenVerschuivingB) {
            var verschil = groteGetallenVerschuivingB - groteGetallenVerschuivingA;
            var aftrekkenBtijdelijk = aftrekkenB * Math.pow(10,verschil);
            var aftrekkenC = aftrekkenA - aftrekkenBtijdelijk;
            var verschuivingA = groteGetallenVerschuivingA;
            var verschuivingB = groteGetallenVerschuivingB;
            var verschuivingC = groteGetallenVerschuivingA;
          }
        }
      }
    }
    var prefixExercise = 'exercise';
    document.getElementById(prefixExercise + i).innerHTML = returnLargerOrSmallerNumberAsString(aftrekkenA,verschuivingA) + " - " + returnLargerOrSmallerNumberAsString(aftrekkenB,verschuivingB);
    var prefixAnswer = 'answer';
    document.getElementById(prefixAnswer + i).innerHTML = cleanNumber(returnLargerOrSmallerNumberAsString(aftrekkenC,verschuivingC));
  }
}

function randomGroteOfKleineVerschuiving() {
  var kleineGetallenMin = document.getElementById("kleineGetallenMin").value;
  var kleineGetallenMax = document.getElementById("kleineGetallenMax").value;
  var groteGetallenMin = document.getElementById("groteGetallenMin").value;
  var groteGetallenMax = document.getElementById("groteGetallenMax").value;

  var randomGroterKleiner = getRandomIntInclusive(1,2);
  if (randomGroterKleiner === 1) {
    return -getRandomIntInclusive(kleineGetallenMin,kleineGetallenMax);
  } else {
    return getRandomIntInclusive(groteGetallenMin,groteGetallenMax);
  }
}

function makeExerciseVermenigvuldigen(i) {
  if (document.getElementById("welBreuken").checked) {
    makeExerciseBreukenVermenigvuldigen(i);
  } else {
    var userInputVermenigvuldigenAmin = document.getElementById("userInputVermenigvuldigenAmin").value;
    var userInputVermenigvuldigenAmax = document.getElementById("userInputVermenigvuldigenAmax").value;
    var userInputVermenigvuldigenBmin = document.getElementById("userInputVermenigvuldigenBmin").value;
    var userInputVermenigvuldigenBmax = document.getElementById("userInputVermenigvuldigenBmax").value;

    var vermenigvuldigenA = getRandomArithmetic(userInputVermenigvuldigenAmin,userInputVermenigvuldigenAmax);
    var vermenigvuldigenB = getRandomArithmetic(userInputVermenigvuldigenBmin,userInputVermenigvuldigenBmax);
    var vermenigvuldigenC = vermenigvuldigenA * vermenigvuldigenB;

    if (!(document.getElementById("welGroteGetallen").checked || document.getElementById("welKleineGetallen").checked)) {
      var verschuivingA = 0;
      var verschuivingB = 0;

    } else if (document.getElementById("welKleineGetallen").checked && !(document.getElementById("welGroteGetallen").checked)) {
      var kleineGetallenMin = document.getElementById("kleineGetallenMin").value;
      var kleineGetallenMax = document.getElementById("kleineGetallenMax").value;

      var verschuivingA = -getRandomIntInclusive(kleineGetallenMin,kleineGetallenMax);
      var verschuivingB = -getRandomIntInclusive(kleineGetallenMin,kleineGetallenMax);
    } else if (document.getElementById("welGroteGetallen").checked && !(document.getElementById("welKleineGetallen").checked)) {
      var groteGetallenMin = document.getElementById("groteGetallenMin").value;
      var groteGetallenMax = document.getElementById("groteGetallenMax").value;
      var verschuivingA = getRandomIntInclusive(groteGetallenMin,groteGetallenMax);
      var verschuivingB = getRandomIntInclusive(groteGetallenMin,groteGetallenMax);
    } else if (document.getElementById("welGroteGetallen").checked && document.getElementById("welKleineGetallen").checked) {
      var verschuivingA = randomGroteOfKleineVerschuiving();
      var verschuivingB = randomGroteOfKleineVerschuiving();
    }

    var verschuivingC = verschuivingA + verschuivingB;

    var prefixExercise = 'exercise';
    document.getElementById(prefixExercise + i).innerHTML = returnLargerOrSmallerNumberAsString(vermenigvuldigenA,verschuivingA) + " x " + returnLargerOrSmallerNumberAsString(vermenigvuldigenB,verschuivingB);
    var prefixAnswer = 'answer';
    document.getElementById(prefixAnswer + i).innerHTML = cleanNumber(returnLargerOrSmallerNumberAsString(vermenigvuldigenC,verschuivingC));
  }
}
function cssFractionWholeNumbers(a,b) {
  var neg = "";
  if (a*b < 0) {
    neg = "-"
  }
  if (a < 0) {
    a = -a;
  }
  if (b < 0) {
    b = -b;
  }
  var whole = Math.floor(a/b);
  var rest = a % b;
  if (rest === 0) {
    var fraction = whole
  } else if (whole !== 0){
    ggd = gcd(rest,b);
    rest = rest / ggd;
    b = b / ggd;
    var fraction = whole + '<div class="frac" style="font-size:1.5vh;"><span class="topWhite">' + rest + '</span><span class="symbol">/</span><span class="bottom">' + b + '</span></div>';
  } else {
    var fraction = ' <div class="frac" style="font-size:1.5vh;"><span class="topWhite">' + rest + '</span><span class="symbol">/</span><span class="bottom">' + b + '</span></div>';
  }
  return neg + fraction;
}

function makeExerciseDelen(i) {
  if (document.getElementById("welBreuken").checked) {
    makeExerciseBreukenDelen(i);
  } else {
    var delenAmin = document.getElementById("delenAmin").value;
    var delenAmax = document.getElementById("delenAmax").value;
    var delenBmin = document.getElementById("delenBmin").value;
    var delenBmax = document.getElementById("delenBmax").value;
    var delenCmin = document.getElementById("delenCmin").value;
    var delenCmax = document.getElementById("delenCmax").value;

    var delenCaantalDecimalen = document.getElementById("delenCaantalDecimalen").value;

    var kleineGetallenMin = document.getElementById("kleineGetallenMin").value;
    var kleineGetallenMax = document.getElementById("kleineGetallenMax").value;
    var groteGetallenMin = document.getElementById("groteGetallenMin").value;
    var groteGetallenMax = document.getElementById("groteGetallenMax").value;

    var delenB = getRandomArithmetic(delenBmin,delenBmax);


    if (!(document.getElementById("welGroteGetallen").checked || document.getElementById("welKleineGetallen").checked)) {
      if (document.getElementById("delenAwaardenGebruiken").checked) {
        var delenA = getRandomArithmetic(delenAmin,delenAmax);
        if (document.getElementById("delenCgeheel").checked) {
          // A vervangen omdat random uitkomen op een gehele C een kleinere kans heeft bij een grote B of minder goed deelbare A
          var delenCmin = Math.ceil(delenAmin/delenB);
          var delenCmax = Math.floor(delenAmax/delenB);
          var delenC = getRandomArithmetic(delenCmin,delenCmax);
          var delenA = delenB * delenC;

          var prefixExercise = 'exercise';
          document.getElementById(prefixExercise + i).innerHTML = delenA + " : " + delenB;
          var prefixAnswer = 'answer';
          document.getElementById(prefixAnswer + i).innerHTML = delenC;

        } else if (document.getElementById("delenCmetRest").checked) {
          var delenCgeheeldeel = Math.floor(delenA/delenB);
          var delenCrest = delenA - delenB*delenCgeheeldeel;

          var prefixExercise = 'exercise';
          document.getElementById(prefixExercise + i).innerHTML = delenA + " : " + delenB;
          var prefixAnswer = 'answer';
          document.getElementById(prefixAnswer + i).innerHTML = delenCgeheeldeel + languageRest + delenCrest;

        } else if (document.getElementById("delenCmetDecimalen").checked) {
          var nieuweA = delenA*Math.pow(10,delenCaantalDecimalen);
          var nieuweC = Math.round(nieuweA/delenB);
          var verschuivingA = -delenCaantalDecimalen;
          var verschuivingC = -delenCaantalDecimalen;
          var verschuivingB = 0;

          var prefixExercise = 'exercise';
          document.getElementById(prefixExercise + i).innerHTML = cleanNumber(returnLargerOrSmallerNumberAsString(nieuweA,verschuivingA)) + " : " + returnLargerOrSmallerNumberAsString(delenB,verschuivingB);
          var prefixAnswer = 'answer';
          document.getElementById(prefixAnswer + i).innerHTML = cleanNumber(returnLargerOrSmallerNumberAsString(nieuweC,verschuivingC));
        } else {
          var prefixExercise = 'exercise';
          document.getElementById(prefixExercise + i).innerHTML = '<div style="display:inline-block;font-size:3.8vh;position:relative;"> &nbsp </div>' + delenA + " : " + delenB;
          var prefixAnswer = 'answer';
          document.getElementById(prefixAnswer + i).innerHTML = cssFractionWholeNumbers(delenA,delenB);

        }
      } else { // C-waardeinstelling gebruiken bij de niet-KOMMAGROOT-instelling
        if (document.getElementById("delenCgeheel").checked) {
          var delenC = getRandomArithmetic(delenCmin,delenCmax);
          var delenA = delenB * delenC;

          var prefixExercise = 'exercise';
          document.getElementById(prefixExercise + i).innerHTML = delenA + " : " + delenB;
          var prefixAnswer = 'answer';
          document.getElementById(prefixAnswer + i).innerHTML = delenC;

        } else if (document.getElementById("delenCmetRest").checked) {
          var delenAmin = delenB * delenCmin;
          var delenAmax = delenB * delenCmax;
          var delenA = getRandomArithmetic(delenAmin,delenAmax);
          var delenCgeheeldeel = Math.floor(delenA/delenB);
          var delenCrest = delenA - delenB*delenCgeheeldeel;
          var prefixExercise = 'exercise';
          document.getElementById(prefixExercise + i).innerHTML = delenA + " : " + delenB;
          var prefixAnswer = 'answer';
          document.getElementById(prefixAnswer + i).innerHTML = delenCgeheeldeel + languageRest + delenCrest;

        } else if (document.getElementById("delenCmetBreukRest").checked) {
          var delenAmin = delenB * delenCmin;
          var delenAmax = delenB * delenCmax;
          var delenA = getRandomArithmetic(delenAmin,delenAmax);

          var prefixExercise = 'exercise';
          document.getElementById(prefixExercise + i).innerHTML = '<div style="display:inline-block;font-size:3.8vh;position:relative;"> &nbsp </div>' + delenA + " : " + delenB;
          var prefixAnswer = 'answer';
          document.getElementById(prefixAnswer + i).innerHTML = cssFractionWholeNumbers(delenA,delenB);

        } else if (document.getElementById("delenCmetDecimalen").checked) {
          var delenAmin = delenB * delenCmin;
          var delenAmax = delenB * delenCmax;
          var delenA = getRandomArithmetic(delenAmin,delenAmax);

          var nieuweA = delenA*Math.pow(10,delenCaantalDecimalen);
          var nieuweC = Math.round(nieuweA/delenB);
          var verschuivingA = -delenCaantalDecimalen;
          var verschuivingC = -delenCaantalDecimalen;
          var verschuivingB = 0;

          var prefixExercise = 'exercise';
          document.getElementById(prefixExercise + i).innerHTML = cleanNumber(returnLargerOrSmallerNumberAsString(nieuweA,verschuivingA)) + " : " + returnLargerOrSmallerNumberAsString(delenB,verschuivingB);
          var prefixAnswer = 'answer';
          document.getElementById(prefixAnswer + i).innerHTML = cleanNumber(returnLargerOrSmallerNumberAsString(nieuweC,verschuivingC));
          }
        }
      } else { // met KOMMAGROOT-instellingen, alleen A en B worden gebruikt.

        var delenA = getRandomArithmetic(delenAmin,delenAmax);
        if (document.getElementById("welKleineGetallen").checked && !(document.getElementById("welGroteGetallen").checked)) {
          var verschuivingA = -getRandomIntInclusive(kleineGetallenMin,kleineGetallenMax);
          var verschuivingB = -getRandomIntInclusive(kleineGetallenMin,kleineGetallenMax);

        } else if (document.getElementById("welGroteGetallen").checked && !(document.getElementById("welKleineGetallen").checked)) {
          var verschuivingA = getRandomIntInclusive(groteGetallenMin,groteGetallenMax);
          var verschuivingB = getRandomIntInclusive(groteGetallenMin,groteGetallenMax);
          var verschuivingC = verschuivingA - verschuivingB;
          while (verschuivingC < 0) {
            var verschuivingA = getRandomIntInclusive(groteGetallenMin,groteGetallenMax);
            var verschuivingB = getRandomIntInclusive(groteGetallenMin,groteGetallenMax);
            var verschuivingC = verschuivingA - verschuivingB;
          }
        } else if (document.getElementById("welGroteGetallen").checked && document.getElementById("welKleineGetallen").checked) {
          var verschuivingA = randomGroteOfKleineVerschuiving();
          var verschuivingB = randomGroteOfKleineVerschuiving();
        }
        var delenAtijdelijk = delenA * Math.pow(10,Number(delenCaantalDecimalen) + Number(verschuivingA) - Number(verschuivingB));
        var delenC = Math.round(delenAtijdelijk/delenB);
        var verschuivingC = - delenCaantalDecimalen;

        var prefixExercise = 'exercise';
        document.getElementById(prefixExercise + i).innerHTML = cleanNumber(returnLargerOrSmallerNumberAsString(delenA,verschuivingA)) + " : " + returnLargerOrSmallerNumberAsString(delenB,verschuivingB);
        var prefixAnswer = 'answer';
        document.getElementById(prefixAnswer + i).innerHTML = cleanNumber(returnLargerOrSmallerNumberAsString(delenC,verschuivingC));
    }
  }
}

function delenMetGrootOfKlein() {
  if (document.getElementById("welGroteGetallen").checked || document.getElementById("welKleineGetallen").checked) {
    hideById('normaal 1');
    hideById('delenCwaarden');
    hideById('CinstellingNormaal');
    showById('delenAwaarden');
    } else {
    showById('CinstellingNormaal');
    showById('normaal 1');
    if (document.getElementById("delenCwaardenGebruiken").checked) {
    showById('delenCwaarden');
    hideById('delenAwaarden');
  } else {
    showById('delenAwaarden');
    hideById('delenCwaarden');
    }
  }
}


function makeExercisesVermenigvuldigen() {
  for(var i = 1; i <= 15; i++) {
    makeExerciseVermenigvuldigen(i);
    for (j=1; j<i;j++) {
      var prefixExercise = 'exercise';
      var iEx = document.getElementById(prefixExercise + i).innerHTML;
      var jEx = document.getElementById(prefixExercise + j).innerHTML;
      if (jEx ===iEx) {
        makeExerciseVermenigvuldigen(i);
      }
    }
  }
}

function makeExercisesOptellen() {
  for(var i = 1; i <= 15; i++) {
    makeExerciseOptellen(i);
    for (j=1; j<i;j++) {
      var prefixExercise = 'exercise';
      var iEx = document.getElementById(prefixExercise + i).innerHTML;
      var jEx = document.getElementById(prefixExercise + j).innerHTML;
      if (jEx ===iEx) {
        makeExerciseOptellen(i);
      }
    }
  }
}

function makeExercisesAftrekken() {
  for(var i = 1; i <= 15; i++) {
    makeExerciseAftrekken(i);
    for (j=1; j<i;j++) {
      var prefixExercise = 'exercise';
      var iEx = document.getElementById(prefixExercise + i).innerHTML;
      var jEx = document.getElementById(prefixExercise + j).innerHTML;
      if (jEx ===iEx) {
        makeExerciseAftrekken(i);
      }
    }
  }
}

function makeExercisesDelen() {
  for(var i = 1; i <= 15; i++) {
    makeExerciseDelen(i);
    for (j=1; j<i;j++) {
      var prefixExercise = 'exercise';
      var iEx = document.getElementById(prefixExercise + i).innerHTML;
      var jEx = document.getElementById(prefixExercise + j).innerHTML;
      if (jEx ===iEx) {
        makeExerciseDelen(i);
      }
    }
  }
}

function makeExercisesGcd(){
  for(var i = 1; i <= 15; i++) {
    makeExerciseGcd(i);
    for (j=1; j<i;j++) {
      var prefixExercise = 'exercise';
      var iEx = document.getElementById(prefixExercise + i).innerHTML;
      var jEx = document.getElementById(prefixExercise + j).innerHTML;
      if (jEx ===iEx) {
        makeExerciseGcd(i);
      }
    }
  }
}

function makeExercisesLcm() {
  for(var i = 1; i <= 15; i++) {
    makeExerciseLcm(i);
    for (j=1; j<i;j++) {
      var prefixExercise = 'exercise';
      var iEx = document.getElementById(prefixExercise + i).innerHTML;
      var jEx = document.getElementById(prefixExercise + j).innerHTML;
      if (jEx ===iEx) {
        makeExerciseLcm(i);
      }
    }
  }
}

function makeExercisesMix() {
  for(var i = 1; i <= 15; i++) {
    var randType = getRandomIntInclusive(1,6);

    if (randType === 1) {
      makeExerciseOptellen(i);
      for (j=1; j<i;j++) {
        var prefixExercise = 'exercise';
        var iEx = document.getElementById(prefixExercise + i).innerHTML;
        var jEx = document.getElementById(prefixExercise + j).innerHTML;
        if (jEx ===iEx) {
          makeExerciseOptellen(i);
        }
      }
    } else if (randType === 2) {
      makeExerciseAftrekken(i);
      for (j=1; j<i;j++) {
        var prefixExercise = 'exercise';
        var iEx = document.getElementById(prefixExercise + i).innerHTML;
        var jEx = document.getElementById(prefixExercise + j).innerHTML;
        if (jEx ===iEx) {
          makeExerciseAftrekken(i);
        }
      }
    } else if (randType === 3 || randType === 4) {
      makeExerciseVermenigvuldigen(i);
      for (j=1; j<i;j++) {
        var prefixExercise = 'exercise';
        var iEx = document.getElementById(prefixExercise + i).innerHTML;
        var jEx = document.getElementById(prefixExercise + j).innerHTML;
        if (jEx ===iEx) {
          makeExerciseVermenigvuldigen(i);
        }
      }
    } else if (randType === 5 || randType === 6) {
      makeExerciseDelen(i);
      for (j=1; j<i;j++) {
        var prefixExercise = 'exercise';
        var iEx = document.getElementById(prefixExercise + i).innerHTML;
        var jEx = document.getElementById(prefixExercise + j).innerHTML;
        if (jEx ===iEx) {
          makeExerciseDelen(i);
        }
      }
    }
  }
}


function makeExerciseGcd(i) {
  var gcdMax = document.getElementById("gcdMax").value;

  var gcdCmax = gcdMax / 5;
  var gcdC = getRandomArithmetic(1,gcdCmax);

  var factorA = getRandomIntInclusive(2,gcdMax / gcdC);
  var factorA = factorA / gcd(gcdC,factorA);
  var factorB = getRandomIntInclusive(3,gcdMax / gcdC);
  var factorB = factorB / gcd(gcdC,factorB);
  if (gcd(factorA,factorB) > 1) {
    var tempB = factorB / gcd(factorA,factorB);
    if (gcd(factorA,tempB) === 1) {
      var factorB = tempB;
    } else {
      var factorA = factorA / gcd(factorA,factorB);
    }
  }
  var gcdA = gcdC * factorA;
  var gcdB = gcdC * factorB;
  if (gcdA === gcd(gcdA,gcdB) || gcdB === gcd(gcdA,gcdB) || gcd(gcdA,gcdB)%10 === 0) {
    var gcdC = getRandomArithmetic(1,gcdCmax);

    var factorA = getRandomIntInclusive(2,gcdMax / gcdC);
    var factorA = factorA / gcd(gcdC,factorA);
    var factorB = getRandomIntInclusive(3,gcdMax / gcdC);
    var factorB = factorB / gcd(gcdC,factorB);
    if (gcd(factorA,factorB) > 1) {
      var tempB = factorB / gcd(factorA,factorB);
      if (gcd(factorA,tempB) === 1) {
        var factorB = tempB;
      } else {
        var factorA = factorA / gcd(factorA,factorB);
      }
    }
    var gcdA = gcdC * factorA;
    var gcdB = gcdC * factorB;
  }
  var prefixExercise = 'exercise';
  document.getElementById(prefixExercise + i).innerHTML = languageGcd + "(" + gcdA + ", " + gcdB + ")";
  var prefixAnswer = 'answer';
  document.getElementById(prefixAnswer + i).innerHTML = gcd(gcdA,gcdB);
}

function gcd(a,b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (true) {
    if (b > a) {var temp = a; a = b; b = temp;}
    if (b == 0) return a;
    a %= b;
    if (a == 0) return b;
    b %= a;
  }
}

function makeExerciseLcm(i) {
  var lcmMin = document.getElementById("lcmMin").value;
  var lcmMax = document.getElementById("lcmMax").value;

  var lcmA = getRandomArithmetic(lcmMin,lcmMax);
  var lcmB = getRandomArithmetic(lcmMin,lcmMax);
  if (isPrime(lcmA) || isPrime(lcmB)) {
    lcmA = getRandomArithmetic(lcmMin,lcmMax);
    lcmB = getRandomArithmetic(lcmMin,lcmMax);
  }
  var gcdNow = gcd(lcmA,lcmB);
  var lcm = lcmA / gcdNow * lcmB;

  if (gcdNow == 1 || lcm === gcdNow || gcdNow%10 === 0) {
    lcmA = getRandomArithmetic(lcmMin,lcmMax);
    lcmB = getRandomArithmetic(lcmMin,lcmMax);
    if (isPrime(lcmA) || isPrime(lcmB)) {
      lcmA = getRandomArithmetic(lcmMin,lcmMax);
      lcmB = getRandomArithmetic(lcmMin,lcmMax);
    }
    var gcdNow = gcd(lcmA,lcmB);
    var lcm = lcmA / gcdNow * lcmB;
  }

  var prefixExercise = 'exercise';
  document.getElementById(prefixExercise + i).innerHTML = languageLcm + "(" + lcmA + ", " + lcmB + ")";
  var prefixAnswer = 'answer';
  document.getElementById(prefixAnswer + i).innerHTML = lcm;
}

function isPrime(n) {
  var m = Math.sqrt(n);
  var isPrime = true;
  for (var i = 2; i <= m; i++) {
    if (n % i == 0) {
        isPrime = false;
        break;
    }
  }
  return isPrime;
}


function hideByClassName(name) {
  for (let elt of document.getElementsByClassName(name)) {
    elt.style.display = 'none';
  }
}

function showByClassName(name) {
  for (let elt of document.getElementsByClassName(name)) {
    elt.style.display = '';
  }
}


function showById(id) {
  document.getElementById(id).style.display = "";
}

function hideById(id) {
  document.getElementById(id).style.display = "none";
}

function hideOnlyIfChecked(toHideId,checkBoxId) {
  if (document.getElementById(checkBoxId).checked) {
    hideById(toHideId);
  } else {
    showById(toHideId);
  }
}

function showOnlyIfChecked(toShowId,checkBoxId) {
  if (document.getElementById(checkBoxId).checked) {
    showById(toShowId);
  } else {
    hideById(toShowId);
  }
}

function showOnlyIfUnchecked(toShowId,checkBoxId) {
  if (!document.getElementById(checkBoxId).checked) {
    showById(toShowId);
  } else {
    hideById(toShowId);
  }
}

function showAnswers() {
  var prefixA = 'answer'
  for (var i = 1; i <= 15; i++) {
    document.getElementById(prefixA + i).style.display='';
  }
}

function hideAnswers() {
  var prefixA = 'answer';
  for (var i = 1; i <= 15; i++) {
    document.getElementById(prefixA + i).style.display='none';
  }
}

function showAnswer(i) {
  var prefixA = 'answer';
  document.getElementById(prefixA + i).style.display='';
}

function hideButton(i) {
  var prefixA = 'ansBut';
  document.getElementById(prefixA + i).style.display='none';
}

function hideButtons() {
  var prefixA = 'ansBut';
  for (var i = 1; i <= 15; i++) {
    document.getElementById(prefixA + i).style.display='none';
  }
}

function showButtons() {
  var prefixA = 'ansBut';
  for (var i = 1; i <= 15; i++) {
    document.getElementById(prefixA + i).style.display='';
  }
}


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
function setIfAvailable(setting) {
  let value = urlParams.get(setting);
  if (value) {
    console.log(setting);
    if (value == 'checked') {
      document.getElementById(setting).checked = value;
    } else {
      document.getElementById(setting).value = value;

    }
  }

}

window.addEventListener('DOMContentLoaded', (event) => {
  setIfAvailable("primeMin");
  setIfAvailable("primeMax");
  setIfAvailable("subitizeMin");
  setIfAvailable("subitizeMax");
  setIfAvailable("getalGeheugenAantalGetallen");
  setIfAvailable("getalGeheugenMax");
  setIfAvailable("getalGeheugenMin");
  setIfAvailable("breukenOptellenBDmin");
  setIfAvailable("breukenOptellenBDmax");
  setIfAvailable("breukenOptellenMin");
  setIfAvailable("breukenOptellenMax");
  setIfAvailable("breukenGeheelFilterenOptellen");
  setIfAvailable("breukenVereenvoudigen");
  setIfAvailable("geenGemixteBreuken");
  setIfAvailable("breukenDelenABCDmax");
  setIfAvailable("linkerGetalGeheel");
  setIfAvailable("rechterGetalKleinerEen");
  setIfAvailable("userInputOptellenMin");
  setIfAvailable("userInputOptellenMax");
  setIfAvailable("welBreuken");
  setIfAvailable("geenGemixteBreuken");
  setIfAvailable("welGroteGetallen");
  setIfAvailable("welKleineGetallen");
  setIfAvailable("kleineGetallenMin");
  setIfAvailable("kleineGetallenMax");
  setIfAvailable("groteGetallenMin");
  setIfAvailable("groteGetallenMax");
  setIfAvailable("userInputVermenigvuldigenAmin");
  setIfAvailable("userInputVermenigvuldigenAmax");
  setIfAvailable("userInputVermenigvuldigenBmin");
  setIfAvailable("userInputVermenigvuldigenBmax");
  setIfAvailable("delenAmin");
  setIfAvailable("delenAmax");
  setIfAvailable("delenBmin");
  setIfAvailable("delenBmax");
  setIfAvailable("delenCmin");
  setIfAvailable("delenCmax");
  setIfAvailable("delenCaantalDecimalen");
  setIfAvailable("delenCgeheel");
  setIfAvailable("delenCmetBreukRest");
  setIfAvailable("delenCmetDecimalen");
  setIfAvailable("gcdMax");
  setIfAvailable("lcmMin");
  setIfAvailable("lcmMax");
  setIfAvailable("delenAwaardenGebruiken");
  setIfAvailable("userInputAftrekkenMin");
  setIfAvailable("userInputAftrekkenMax");
  setIfAvailable("aftrekkenCnonNegative");
});
