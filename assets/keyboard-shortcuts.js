/* =========================
   Keyboard Shortcuts Module
   ========================= */

function initKeyboardShortcuts() {
    // Add keyboard event listener for option selection
    document.addEventListener('keydown', function(event) {
        // Only handle keyboard shortcuts when not paused and not editing username
        if (isPaused || event.target.contentEditable === 'true') {
            return;
        }

        // Handle number keys 1, 2, 3 for option selection
        if (event.key === '1' || event.key === '2' || event.key === '3') {
            event.preventDefault();
            
            const optionIndex = parseInt(event.key) - 1;
            const optionButtons = document.querySelectorAll('.option-button');
            
            // Check if the option button exists and is not disabled
            if (optionButtons[optionIndex] && !optionButtons[optionIndex].disabled) {
                const selectedOption = optionButtons[optionIndex].textContent;
                checkAnswer(selectedOption);
            }
        }
    });
}

// Add visual indicators for keyboard shortcuts
function addKeyboardHints() {
    const optionButtons = document.querySelectorAll('.option-button');
    optionButtons.forEach((button, index) => {
        // Add keyboard hint as a data attribute that can be styled with CSS
        button.setAttribute('data-keyboard-hint', `${index + 1}`);
    });
}