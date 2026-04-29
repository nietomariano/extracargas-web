/* ============================================================
   EXTRACARGAS — main.js
   ============================================================ */

/* ── Menú hamburguesa (mobile) ── */
const hamburger  = document.getElementById('hamburger');
const menuMobile = document.getElementById('menuMobile');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('abierto');
  menuMobile.classList.toggle('abierto');
});

function cerrarMenu() {
  hamburger.classList.remove('abierto');
  menuMobile.classList.remove('abierto');
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

/* ── Formulario de contacto ── */
function enviarFormulario() {
  const nombre  = document.getElementById('campo-nombre').value.trim();
  const email   = document.getElementById('campo-email').value.trim();
  const mensaje = document.getElementById('campo-detalle').value.trim();

  if (!nombre || !email || !mensaje) {
    alert('Por favor completá al menos Nombre, Correo electrónico y Detalle de la carga.');
    return;
  }

  document.getElementById('form-enviar').style.display = 'none';
  document.getElementById('form-exito').style.display = 'block';
}
