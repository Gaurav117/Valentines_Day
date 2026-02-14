// Create floating hearts background
function createFloatingHearts() {
    const heartsContainer = document.getElementById('heartsContainer');
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💓', '💝'];
    
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 15 + 's';
        heart.style.animationDuration = (15 + Math.random() * 10) + 's';
        heartsContainer.appendChild(heart);
    }
}

// Dodging "No" button logic
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const buttonsContainer = document.querySelector('.buttons-container');

let isDodging = false;

// Function to move "No" button to random position
function moveNoButton() {
    if (isDodging) return;
    
    isDodging = true;
    
    const container = buttonsContainer.getBoundingClientRect();
    const button = noBtn.getBoundingClientRect();
    
    // Calculate available space
    const maxX = window.innerWidth - button.width - 40;
    const maxY = window.innerHeight - button.height - 40;
    
    // Generate random position
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    // Apply position
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    
    setTimeout(() => {
        isDodging = false;
    }, 100);
}

// Detect mouse proximity to "No" button (very sensitive)
document.addEventListener('mousemove', (e) => {
    const button = noBtn.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Calculate distance from mouse to button center
    const buttonCenterX = button.left + button.width / 2;
    const buttonCenterY = button.top + button.height / 2;
    
    const distance = Math.sqrt(
        Math.pow(mouseX - buttonCenterX, 2) + 
        Math.pow(mouseY - buttonCenterY, 2)
    );
    
    // If mouse is within 150px of the button, move it (very sensitive)
    if (distance < 150) {
        moveNoButton();
    }
});

// Also move on touch for mobile
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});

// Prevent clicking "No" button
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton();
});

// "Yes" button click handler
yesBtn.addEventListener('click', () => {
    showCelebration();
});

// Show celebration with falling roses
function showCelebration() {
    const overlay = document.getElementById('celebrationOverlay');
    overlay.classList.add('active');
    
    // Create falling roses
    createFallingRoses();
    
    // Play celebration sound (optional - you can add audio if needed)
    // const audio = new Audio('celebration.mp3');
    // audio.play();
}

// Create falling roses animation
function createFallingRoses() {
    const rosesContainer = document.getElementById('rosesContainer');
    const roseSymbols = ['🌹', '🌺', '💐', '🌷'];
    
    // Create initial batch of roses
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createRose(rosesContainer, roseSymbols);
        }, i * 100);
    }
    
    // Continue creating roses
    setInterval(() => {
        createRose(rosesContainer, roseSymbols);
    }, 300);
}

function createRose(container, symbols) {
    const rose = document.createElement('div');
    rose.className = 'rose';
    rose.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    rose.style.left = Math.random() * 100 + '%';
    rose.style.animationDuration = (3 + Math.random() * 3) + 's';
    rose.style.fontSize = (30 + Math.random() * 30) + 'px';
    
    container.appendChild(rose);
    
    // Remove rose after animation completes
    setTimeout(() => {
        rose.remove();
    }, 6000);
}

// Initialize on page load
window.addEventListener('load', () => {
    createFloatingHearts();
});