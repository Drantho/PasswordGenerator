// declare global variables for password criteria and set to user values
var passwordLength;
var lowerCaseCriteria;
var upperCaseCriteria;
var numberCriteria;
var specialCriteria;

// declare global array varialbles for possible digits
var upperCase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
var lowerCase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var specialCharacters = ["!", "#", "$", "%", "&", "+", "@"];
var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function setCriteria() {

    // get criteria from user
    passwordLength = parseInt(prompt("Enter password length."));
    lowerCaseCriteria = confirm("Use lower case digits.");
    upperCaseCriteria = confirm("Use upper case digits");
    numberCriteria = confirm("Use numeral digits.");
    specialCriteria = confirm("Use special character digits.");        

    // display criteria
    document.getElementById("passwordLength").innerHTML = passwordLength;
    document.getElementById("useLowerCase").innerHTML = lowerCaseCriteria;
    document.getElementById("useUpperCase").innerHTML = upperCaseCriteria;
    document.getElementById("useNumerals").innerHTML = numberCriteria;
    document.getElementById("useSpecialCharacters").innerHTML = specialCriteria;

    // if invalid criteria set, call setCriteria() again
    if(!checkCriteria() || !checkLength()){
        console.log("attempt to call setCriteria again.");
        setCriteria();
    }else{
        // auto generate a password after criteria is set
        generatePassword();
    }    
}

// main function loops through getDigit() passwordLength times
function generatePassword() {

    // check if user has set criteria yet - call setCriteria() if not
    if (passwordLength !== undefined) {

        // declare empty variable to store password for use later
        var password = "";

        // Check to make sure user has selected at least 1 criteria and appropriate length 
        if (checkCriteria() && checkLength()) {
            // console.log("passwordLength: ", passwordLength)

            // loop through and concat getDigit() to password passwordLength times
            for (var i = 0; i < passwordLength; i++) {

                // store getDigit() result in a temporary variable for logging
                var tempDigit = getDigit();
                
                // console.log("tempDigit: ", tempDigit);
                password = password.concat(tempDigit);
            }
            console.log("Password: ", password);

            // set html - passwordResult element's inner html to password
            document.getElementById("passwordResult").innerHTML = password;
        }

        // criteria failed. attempt to set valid criteria again
        else{
            setCriteria();
        }

    }
    // page is in initial state. set criteria before generating a password
    else {
        setCriteria();
    }
}

// check if at least 1 criteria selected will return true if at least 1 criteria selected - false otherwise
function checkCriteria() {
    if(!lowerCaseCriteria && !upperCaseCriteria && !numberCriteria && !specialCriteria){
        alert("Select at least one criteria");
    }
    return lowerCaseCriteria || upperCaseCriteria || numberCriteria || specialCriteria;
}

// check if appropriate length entered - true if between 8 and 128 inclusive
function checkLength() {
    if(passwordLength < 8 || passwordLength > 128){
        alert("Password must be at least 8 characters and no more than 128 characters");
    }
    return passwordLength >= 8 && passwordLength <= 128;
}

// returns single digit based on set criteria
function getDigit() {

    // empty array will hold all digits from selected criteria
    var possibleDigits = [];

    // adds all lower case digits to possibleDigits if lowerCaseCriteria === true 
    if (lowerCaseCriteria) {
        // console.log("lowerCaseCriteria: " + lowerCaseCriteria + " adding", lowerCase);
        possibleDigits = possibleDigits.concat(lowerCase);
    }

    // adds all upper case digits to possibleDigits if upperCaseCriteria === true
    if (upperCaseCriteria) {
        possibleDigits = possibleDigits.concat(upperCase);
    }

    // adds all numeral digits to possibleDigits if numberCriteria === true
    if (numberCriteria) {
        possibleDigits = possibleDigits.concat(numbers);
    }

    // adds all special character digits to possibleDigits if specialCriteria === true
    if (specialCriteria) {
        possibleDigits = possibleDigits.concat(specialCharacters);
    }

    // console.log("possibleDigits: ", possibleDigits);

    // select random element from possible digits and return it
    return possibleDigits[Math.floor(Math.random() * possibleDigits.length)];
}

// copy password to clipboard
function copy() {
    var copyText = document.getElementById("passwordResult");
    
    // desktop syntax
    copyText.select();
    
    // mobile syntax
    copyText.setSelectionRange(0, 99999)
    
    document.execCommand("copy");
}