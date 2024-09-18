let scrollInterval;

// Espera 5 segundos después de cargar la página y luego comienza a hacer scroll lento hacia abajo
window.onload = function() {
    console.log("Página cargada, esperando 5 segundos...");
    setTimeout(function() {
        console.log("Iniciando scroll lento...");
        scrollSlowly();
    }, 3000); // Espera de 5 segundos
};

// Inicia el scroll lento
function scrollSlowly() {
    scrollInterval = setInterval(function() {
        // Si no estamos en la parte inferior, seguimos haciendo scroll
        if (window.pageYOffset + window.innerHeight < document.body.scrollHeight) {
            console.log("Haciendo scroll...");
            window.scrollBy(0, 1); // Scroll lento hacia abajo
        } else {
            clearInterval(scrollInterval); // Detener el scroll si llegamos al fondo
            console.log("Llegamos al fondo, deteniendo el scroll...");
        }
    }, 10); // Velocidad del scroll
}

// Detectar cuando el usuario usa la rueda del mouse
window.addEventListener('wheel', function() {
    if (scrollInterval) {
        clearInterval(scrollInterval);
        scrollInterval = null;
        console.log("Rueda del mouse detectada, deteniendo el scroll automático...");
    }
});

// Escucha los eventos de interacción táctil en dispositivos móviles
window.addEventListener('touchstart', function() {
    if (scrollInterval) {
        clearInterval(scrollInterval);
        scrollInterval = null;
        console.log("Interacción táctil detectada (touchstart), deteniendo el scroll automático...");
    }
});

window.addEventListener('touchmove', function() {
    if (scrollInterval) {
        clearInterval(scrollInterval);
        scrollInterval = null;
        console.log("Interacción táctil detectada (touchmove), deteniendo el scroll automático...");
    }
});

window.addEventListener('touchend', function() {
    if (scrollInterval) {
        clearInterval(scrollInterval);
        scrollInterval = null;
        console.log("Interacción táctil detectada (touchend), deteniendo el scroll automático...");
    }
});
// Botón para volver al inicio
const scrollTopBtn = document.getElementById('scrollTopBtn');
window.onscroll = function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("progressBar").style.width = scrolled + "%";

    if (winScroll > 100) {
        scrollTopBtn.style.display = "block";
    } else {
        scrollTopBtn.style.display = "none";
    }
};

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Botón para cambiar entre modo claro/oscuro
const toggleThemeButton = document.getElementById('toggleTheme');
toggleThemeButton.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
});