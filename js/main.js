/* ============================================================
   EXTRACARGAS — main.js
   ============================================================ */

/* ── Menú hamburguesa (mobile y desktop) ── */
const hamburger    = document.getElementById('hamburger');
const menuMobile   = document.getElementById('menuMobile');
const menuDesktop  = document.getElementById('menuDesktop');

hamburger.addEventListener('click', (e) => {
  e.stopPropagation();
  hamburger.classList.toggle('abierto');

  /* En mobile abre el menú mobile; en desktop el desplegable */
  if (window.innerWidth < 769) {
    menuMobile.classList.toggle('abierto');
  } else {
    menuDesktop.classList.toggle('abierto');
  }
});

/* Cerrar el menú desktop al hacer clic fuera */
document.addEventListener('click', () => {
  hamburger.classList.remove('abierto');
  if (menuDesktop) menuDesktop.classList.remove('abierto');
  if (menuMobile)  menuMobile.classList.remove('abierto');
});

function cerrarMenu() {
  hamburger.classList.remove('abierto');
  if (menuMobile)  menuMobile.classList.remove('abierto');
  if (menuDesktop) menuDesktop.classList.remove('abierto');
}

/* ── Animación fade-up al hacer scroll ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

/* ── Formulario Formspree — envío AJAX sin recargar la página ── */
const formContacto = document.getElementById('form-contacto');

if (formContacto) {
  formContacto.addEventListener('submit', async function(e) {
    e.preventDefault();

    const btnEnviar  = document.getElementById('form-enviar');
    const msgExito   = document.getElementById('form-exito');
    const submitBtn  = btnEnviar.querySelector('button');

    /* Estado: enviando */
    submitBtn.textContent = 'Enviando…';
    submitBtn.disabled = true;

    try {
      const response = await fetch(formContacto.action, {
        method: 'POST',
        body: new FormData(formContacto),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        /* Éxito: ocultar botón, mostrar mensaje */
        btnEnviar.style.display = 'none';
        msgExito.style.display = 'block';
        formContacto.reset();
      } else {
        /* Error del servidor */
        submitBtn.textContent = 'Hubo un error. Intentá de nuevo.';
        submitBtn.disabled = false;
      }
    } catch (error) {
      /* Error de red */
      submitBtn.textContent = 'Error de conexión. Intentá de nuevo.';
      submitBtn.disabled = false;
    }
  });
}

/* ── Carrusel de galería ── */
const pista        = document.getElementById('carruselPista');
const btnPrev      = document.getElementById('carruselPrev');
const btnNext      = document.getElementById('carruselNext');
const contenedorPuntos = document.getElementById('carruselPuntos');

if (pista) {
  const slides = pista.querySelectorAll('.carrusel-slide');
  let actual = 0;

  /* Crear puntos de navegación */
  slides.forEach((_, i) => {
    const punto = document.createElement('button');
    punto.classList.add('carrusel-punto');
    punto.setAttribute('aria-label', `Ir a imagen ${i + 1}`);
    if (i === 0) punto.classList.add('activo');
    punto.addEventListener('click', () => irA(i));
    contenedorPuntos.appendChild(punto);
  });

  function actualizarPuntos() {
    contenedorPuntos.querySelectorAll('.carrusel-punto').forEach((p, i) => {
      p.classList.toggle('activo', i === actual);
    });
  }

  function irA(index) {
    actual = (index + slides.length) % slides.length;
    pista.style.transform = `translateX(-${actual * 100}%)`;
    actualizarPuntos();
  }

  btnPrev.addEventListener('click', () => irA(actual - 1));
  btnNext.addEventListener('click', () => irA(actual + 1));

  /* Avance automático cada 4 segundos */
  setInterval(() => irA(actual + 1), 4000);
}
