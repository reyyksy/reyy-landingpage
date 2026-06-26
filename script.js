let score = 0;
let currentColor = {};

// Generate random color
function generateRandomColor() {
    return {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256)
    };
}

// Display color on the box
function displayColor(color) {
    const colorBox = document.getElementById('colorBox');
    colorBox.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
}

// Start new game
function startNewGame() {
    currentColor = generateRandomColor();
    displayColor(currentColor);
    
    // Reset inputs
    document.getElementById('redInput').value = '';
    document.getElementById('greenInput').value = '';
    document.getElementById('blueInput').value = '';
    
    // Reset UI
    document.getElementById('feedback').textContent = '';
    document.getElementById('feedback').className = 'feedback';
    document.getElementById('hint').style.display = 'none';
    document.getElementById('guessBtn').style.display = 'inline-block';
    document.getElementById('nextBtn').style.display = 'none';
    
    // Focus on first input
    document.getElementById('redInput').focus();
}

// Check if guess is correct
function checkGuess() {
    const redInput = document.getElementById('redInput').value;
    const greenInput = document.getElementById('greenInput').value;
    const blueInput = document.getElementById('blueInput').value;
    
    // Validate inputs
    if (redInput === '' || greenInput === '' || blueInput === '') {
        document.getElementById('feedback').textContent = '⚠️ Please fill all fields!';
        document.getElementById('feedback').className = 'feedback incorrect';
        return;
    }
    
    const userGuess = {
        r: parseInt(redInput),
        g: parseInt(greenInput),
        b: parseInt(blueInput)
    };
    
    // Check if correct
    if (userGuess.r === currentColor.r && 
        userGuess.g === currentColor.g && 
        userGuess.b === currentColor.b) {
        
        score++;
        document.getElementById('score').textContent = score;
        document.getElementById('feedback').textContent = '🎉 Correct! Great job!';
        document.getElementById('feedback').className = 'feedback correct';
        
        document.getElementById('guessBtn').style.display = 'none';
        document.getElementById('nextBtn').style.display = 'inline-block';
        document.getElementById('hint').style.display = 'none';
    } else {
        document.getElementById('feedback').textContent = '❌ Not quite right...';
        document.getElementById('feedback').className = 'feedback incorrect';
        
        // Show hint
        showHint(userGuess);
    }
}

// Show helpful hints
function showHint(userGuess) {
    const hints = [];
    
    if (userGuess.r > currentColor.r) {
        hints.push(`Red is too high (should be lower than ${userGuess.r})`);
    } else if (userGuess.r < currentColor.r) {
        hints.push(`Red is too low (should be higher than ${userGuess.r})`);
    } else {
        hints.push('✓ Red is correct!');
    }
    
    if (userGuess.g > currentColor.g) {
        hints.push(`Green is too high (should be lower than ${userGuess.g})`);
    } else if (userGuess.g < currentColor.g) {
        hints.push(`Green is too low (should be higher than ${userGuess.g})`);
    } else {
        hints.push('✓ Green is correct!');
    }
    
    if (userGuess.b > currentColor.b) {
        hints.push(`Blue is too high (should be lower than ${userGuess.b})`);
    } else if (userGuess.b < currentColor.b) {
        hints.push(`Blue is too low (should be higher than ${userGuess.b})`);
    } else {
        hints.push('✓ Blue is correct!');
    }
    
    const hintElement = document.getElementById('hint');
    hintElement.innerHTML = 'Hints:<br>' + hints.join('<br>');
    hintElement.style.display = 'block';
}

// Event listeners
document.getElementById('guessBtn').addEventListener('click', checkGuess);
document.getElementById('nextBtn').addEventListener('click', startNewGame);

// Allow Enter key to submit
document.getElementById('blueInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkGuess();
    }
});

// Start the game on load
startNewGame();
