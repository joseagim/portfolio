# Portfolio · José Antonio Gimeno San Martín

Web personal para presentar mi perfil y mis proyectos.

**Stack:** React · Vite · Tailwind CSS · React Router · lucide-react

## Qué incluye

### Secciones
- **Portada:** presentación con ventana de terminal, foto, disponibilidad, descarga de CV y enlaces a GitHub, LinkedIn y email.
- **Sobre mí:** texto de presentación, datos rápidos (formación, ubicación, idiomas, disponibilidad), cualidades y tecnologías por categorías.
- **Experiencia:** línea de tiempo vertical con la formación (2023 – 2027) y las prácticas que busco.
- **Proyectos:** tarjetas con portada, tecnologías y etiquetas de estado (en curso, desplegado, premio).
- **Contacto:** email con botón de copiar, LinkedIn, GitHub, ubicación y formulario de mensaje.

### Páginas de proyecto
TFG (plataforma de ajedrez), TrainTracker, SmartCook y Band Souls, cada uno con:
- Galería en carrusel con visor ampliado.
- Resumen, aportación personal, aspectos destacados y ficha lateral.
- Enlaces a repositorio y demo cuando existen.
- Contenido específico: fases, funcionalidades, diagramas de arquitectura, metodología Scrum, historia o reconocimiento.
- Navegación al proyecto anterior y siguiente.

### Funcionalidades
- **Bilingüe (ES / EN):** detecta el idioma del navegador y recuerda la elección. Incluye textos, proyectos y meta tags.
- **Modo oscuro y claro:** oscuro por defecto, con toggle y sin parpadeo al cargar.
- **CV descargable** en español e inglés desde un menú.
- **Formulario de contacto** con validación propia y envío mediante Formspree.
- **SEO básico:** título y descripción dinámicos, Open Graph, favicon y atributo `lang` actualizado.
- **Accesible y responsive:** HTML semántico, navegación por teclado, imágenes con texto alternativo y diseño mobile-first.

## Ejecutar en local

```bash
npm install
npm run dev
```

## Estructura

```
src/
  components/   layout, secciones, proyectos y elementos de interfaz
  data/         contenido: perfil, proyectos y experiencia
  i18n/         textos en español e inglés
  hooks/        tema, meta tags y portapapeles
  pages/        inicio, detalle de proyecto y 404
public/         foto, CV e imágenes de cada proyecto
```
