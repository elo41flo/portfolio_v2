/* --- 1. HORLOGE OPTIMISÉE --- */
function updateClock() {
    const clockElement = document.getElementById('clock');
    if (!clockElement) return; // Sécurité si l'élément n'existe pas sur la page

    const now = new Date();
    const timeString = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    
    // On ne met à jour le DOM que si l'heure a changé
    if (clockElement.textContent !== timeString) {
        clockElement.textContent = timeString;
    }
}
setInterval(updateClock, 1000);
updateClock();

/* --- 2. REDIRECTIONS SIMPLIFIÉES (Mapping) --- */
const pageRoutes = {
    "profil": "profil.html",
    "contact": "contact.html",
    "autres": "autres.html"
};

document.querySelectorAll('.suggestions button').forEach(button => {
    button.addEventListener('click', function() {
        const pageName = this.textContent.trim().toLowerCase();
        const targetPage = pageRoutes[pageName];
        
        if (targetPage) {
            window.location.href = targetPage;
        }
    });
});

/* --- 3. SCROLL & DOTS (Debouncing léger) --- */
const screen = document.querySelector('.screen');
const dots = document.querySelectorAll('.dot');

if (screen && dots.length > 0) {
    screen.addEventListener('scroll', () => {
        const pageIndex = Math.round(screen.scrollLeft / screen.clientWidth);
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === pageIndex);
        });
    }, { passive: true }); // Optimise les performances du scroll
}

/* --- NAVIGATION PAR POINTS --- */
document.querySelectorAll('.dot').forEach(dot => {
    dot.addEventListener('click', function() {
        const pageIndex = parseInt(this.getAttribute('data-page'));
        const targetX = pageIndex * screen.clientWidth;
        
        screen.scrollTo({
            left: targetX,
            behavior: 'smooth'
        });
    });
});

/* --- 4. NAVIGATION (HOME & BACK) --- */
document.querySelector('.back-button')?.addEventListener('click', () => window.history.back());

const homeBtn = document.querySelector('.home-button');
if (homeBtn && screen) {
    homeBtn.addEventListener('click', (e) => {
        const isIndex = window.location.pathname.endsWith('index.html') || window.location.pathname === '/';
        if (isIndex) {
            e.preventDefault();
            screen.scrollTo({ left: 0, behavior: 'smooth' });
        }
    });
}