document.addEventListener('DOMContentLoaded', () => {
  // Alle Überschriften auf der Seite
  const headers = document.querySelectorAll('.main-content h1, .main-content h2, .main-content h3');

  const usedIds = {}; // Objekt, um Duplikate zu tracken

  headers.forEach(header => {
    // Basis-ID erzeugen
    let baseId = header.textContent
      .toLowerCase()
      .replace(/[^\w]+/g, '-')  // Leerzeichen & Sonderzeichen -> Bindestriche
      .replace(/^-+|-+$/g, ''); // führende/trailing Bindestriche entfernen

    // Prüfen, ob diese ID schon verwendet wurde
    if (usedIds[baseId]) {
      usedIds[baseId] += 1;
      baseId += '-' + usedIds[baseId]; // Index anhängen
    } else {
      usedIds[baseId] = 1;
    }

    header.id = baseId; // ID setzen
  });

  const navLinks = document.querySelectorAll('.scroll-nav a');

  // Scrollspy
  window.addEventListener('scroll', () => {
    let current = '';
    const offset = 120; // optional, z.B. Höhe der Topbar berücksichtigen

    headers.forEach(header => {
      if (window.scrollY >= header.offsetTop - offset) {
        current = header.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  });
});

