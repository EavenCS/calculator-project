// darkMode.js
document.addEventListener('DOMContentLoaded', function() {
    const toggleDarkMode = document.getElementById('toggleDarkMode');
    const darkModeEnabled = localStorage.getItem('darkModeEnabled') === 'true';

    // Set initial mode based on localStorage
    if (darkModeEnabled) {
        document.body.classList.add('dark-mode');
        toggleDarkMode.checked = true;
    }

    toggleDarkMode.addEventListener('change', function() {
        const isDarkMode = toggleDarkMode.checked;
        document.body.classList.toggle('dark-mode', isDarkMode);
        localStorage.setItem('darkModeEnabled', isDarkMode); // Save the mode in localStorage
    });
});
