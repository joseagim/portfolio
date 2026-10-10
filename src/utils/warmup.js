// Precalentamiento de APIs alojadas en planes gratuitos que se "duermen" tras un rato sin uso
// (p. ej. Render). Una petición mínima basta para despertarlas, así que se lanza en cuanto alguien
// abre el portfolio: cuando llegue a la demo, la API ya está lista.

const KEY_PREFIX = 'warmup:'

export function warmUp(url, minIntervalMs = 5 * 60 * 1000) {
  // Evita repetir la petición si ya se hizo hace poco en esta sesión
  try {
    const last = Number(sessionStorage.getItem(KEY_PREFIX + url) || 0)
    if (Date.now() - last < minIntervalMs) return
    sessionStorage.setItem(KEY_PREFIX + url, String(Date.now()))
  } catch {
    // sessionStorage no disponible: se envía igualmente
  }

  // no-cors: no hace falta leer la respuesta (basta con que el servidor reciba la petición),
  // así que no depende de la configuración CORS de la API ni genera errores en consola.
  // keepalive: la petición sigue su curso aunque el visitante cambie de página o cierre la pestaña.
  fetch(url, {
    mode: 'no-cors',
    cache: 'no-store',
    credentials: 'omit',
    referrerPolicy: 'no-referrer',
    keepalive: true,
  }).catch(() => {})
}
