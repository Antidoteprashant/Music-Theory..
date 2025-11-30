window.addEventListener('DOMContentLoaded', () => {
    alert("Welcome to Music Theory!");
});

function showSection(sectionId) {
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        section.classList.remove('active');
        section.classList.remove('highlighted');
    });

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

const highlightBtn = document.getElementById('highlight-btn');
if (highlightBtn) {
    highlightBtn.addEventListener('click', () => {
        const activeSection = document.querySelector('section.active');
        if (activeSection) {
            activeSection.classList.toggle('highlighted');
        }
    });
}

const notes = ["A", "B", "C", "D", "E", "F", "G"];
const randomNoteBtn = document.getElementById('random-note-btn');
const noteDisplay = document.getElementById('random-note-display');

if (randomNoteBtn && noteDisplay) {
    randomNoteBtn.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * notes.length);
        const randomNote = notes[randomIndex];

        noteDisplay.textContent = randomNote;

        noteDisplay.style.transform = "scale(1.5)";
        setTimeout(() => {
            noteDisplay.style.transform = "scale(1)";
        }, 200);
    });
}
