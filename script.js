function generatePassword() {
    const length = document.getElementById('length').value || 12; // Ensure at least 12 characters
    const uppercase = document.getElementById('uppercase').checked;
    const lowercase = document.getElementById('lowercase').checked;
    const numbers = document.getElementById('numbers').checked;
    const special = document.getElementById('special').checked;
    const excludeSimilar = document.getElementById('excludeSimilar').checked;

    // Character sets
    let upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let lowerChars = "abcdefghijklmnopqrstuvwxyz";
    let numberChars = "0123456789";
    let specialChars = "!@#$%^&*()_+{}[]<>?/~|";

    // Exclude similar characters if checked
    if (excludeSimilar) {
        upperChars = upperChars.replace(/[ILO]/g, "");
        lowerChars = lowerChars.replace(/[ilo]/g, "");
        numberChars = numberChars.replace(/[10]/g, "");
    }

    // Concatenate character sets
    let allChars = "";
    if (uppercase) allChars += upperChars;
    if (lowercase) allChars += lowerChars;
    if (numbers) allChars += numberChars;
    if (special) allChars += specialChars;

    if (allChars.length === 0) {
        alert("Please select at least one character type");
        return;
    }

    // Ensure a mix of character types (uppercase, lowercase, numbers, special characters)
    let password = "";
    while (password.length < length) {
        password += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }

    // Display the generated password
    document.getElementById('password').innerText = password;
    checkPasswordStrength(password);
}

function checkPasswordStrength(password) {
    let strength = "Weak";
    let strengthColor = "red";
    let strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{12,}$/;
    let mediumRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&#]{8,}$/;

    if (strongRegex.test(password)) {
        strength = "Strong";
        strengthColor = "green";
    } else if (mediumRegex.test(password)) {
        strength = "Medium";
        strengthColor = "orange";
    }

    // Update strength text and color
    document.getElementById('strength').innerText = strength;
    document.getElementById('strength').style.color = strengthColor;
}

function copyPassword() {
    const password = document.getElementById('password').innerText;
    if (!password) {
        alert("No password generated!");
        return;
    }
    navigator.clipboard.writeText(password).then(() => {
        alert("Password copied to clipboard!");
    });
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}
