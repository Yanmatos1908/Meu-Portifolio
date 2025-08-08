document.addEventListener('DOMContentLoaded', () => {

    // -------- INÍCIO DO NOVO CÓDIGO --------
    // Garante que a página sempre comece na seção de Início ao ser carregada
    if (window.location.hash) {
        window.history.replaceState('', document.title, window.location.pathname);
    }
    // -------- FIM DO NOVO CÓDIGO --------


    // Código para o efeito da barra de navegação ao rolar a página
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(15, 15, 15, 0.9)';
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.5)';
        } else {
            header.style.backgroundColor = 'transparent';
            header.style.boxShadow = 'none';
        }
    });

    // Código para as animações de entrada
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
});// Obtém o dropdown de idioma
const languageDropdown = document.getElementById('language-dropdown');

// Define o valor inicial do dropdown com base no idioma salvo
languageDropdown.value = localStorage.getItem('language') || 'pt';

// Função para aplicar traduções
function applyTranslations(lang) {
    if (!translations[lang]) {
        console.warn(`Traduções para o idioma "${lang}" não estão disponíveis. Usando português como padrão.`);
        currentLanguage = 'pt'; // Fallback para português se o idioma não estiver definido
        languageDropdown.value = currentLanguage;
    } else {
        currentLanguage = lang;
    }
    localStorage.setItem('language', currentLanguage);
    updateContent();
}

// Listener para mudança de idioma
languageDropdown.addEventListener('change', (e) => {
    applyTranslations(e.target.value);
});

// Aplica o idioma salvo na carga da página
document.addEventListener('DOMContentLoaded', () => {
    applySavedTheme();
    applyTranslations(localStorage.getItem('language') || 'pt');
    initCanvas();
});