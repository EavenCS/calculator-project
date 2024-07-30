document.addEventListener('DOMContentLoaded', () => {
    const toggleDarkModeButton = document.getElementById('toggle-dark-mode');
    const darkModeIcon = document.getElementById('dark-mode-icon');

    // Load dark mode state from localStorage
    if (localStorage.getItem('dark-mode') === 'true') {
        document.body.classList.add('dark-mode');
        darkModeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    toggleDarkModeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
            darkModeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('dark-mode', 'true');
        } else {
            darkModeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('dark-mode', 'false');
        }
    });
});
