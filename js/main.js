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
async function enviarFormulario() {
  const nombre   = document.getElementById('campo-nombre').value.trim();
  const email    = document.getElementById('campo-email').value.trim();
  const telefono = document.getElementById('campo-telefono').value.trim();
  const origen   = document.getElementById('campo-origen').value.trim();
  const destino  = document.getElementById('campo-destino').value.trim();
  const equipo   = document.getElementById('campo-equipo').value;
  const detalle  = document.getElementById('campo-detalle').value.trim();

  if (!nombre || !email || !detalle) {
    alert('Por favor completá al menos Nombre, Correo electrónico y Detalle de la carga.');
    return;
  }

  const btn = document.querySelector('#form-enviar .btn-rojo');
  btn.disabled = true;
  btn.textContent = 'Enviando…';

  try {
    const response = await fetch('https://formspree.io/f/xzdykkwz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ nombre, email, telefono, origen, destino, equipo, detalle })
    });

    if (response.ok) {
      document.getElementById('form-enviar').style.display = 'none';
      document.getElementById('form-exito').style.display  = 'block';
    } else {
      throw new Error('server error');
    }
  } catch {
    btn.disabled = false;
    btn.textContent = 'Solicitar cotización →';
    alert('Hubo un error al enviar. Por favor intentá de nuevo o contactanos por WhatsApp.');
  }
}
