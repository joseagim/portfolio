/*
 * Línea de tiempo de la sección "Experiencia" (de arriba abajo, en el orden del array).
 *   type: 'year'       → marcador de año sobre la línea (año + pie opcional)
 *   type: 'education'  → tarjeta de estudios universitarios
 *   type: 'school'     → tarjeta de estudios previos (p. ej. bachillerato)
 *   type: 'course'     → tarjeta de curso o formación complementaria (admite badge y tools)
 *   type: 'internship' → tarjeta de prácticas (borde discontinuo: "lo que busco")
 * Los textos traducibles van como { es, en }. Para añadir una entrada nueva basta con
 * insertar un objeto en el lugar que le corresponda en la línea.
 */
export const timeline = [
  {
    type: 'year',
    year: '2021',
    caption: { es: 'Inicio del bachillerato', en: 'Start of the baccalaureate' },
  },
  {
    type: 'school',
    title: { es: 'Bachillerato de Ciencias', en: 'Science Baccalaureate' },
    org: { es: 'Colegio Sagrado Corazón Fuencarral', en: 'Sagrado Corazón Fuencarral School' },
    period: { es: 'Sept. 2021 – jun. 2023', en: 'Sep 2021 – Jun 2023' },
  },
  {
    type: 'course',
    title: { es: 'Videogame Camp', en: 'Videogame Camp' },
    org: { es: 'ESNE (actualmente UDIT)', en: 'ESNE (now UDIT)' },
    period: { es: 'Julio 2022', en: 'July 2022' },
    badge: { es: 'Con diploma', en: 'Diploma awarded' },
    description: {
      es: 'Curso en el que aprendimos arte, diseño y programación de videojuegos.',
      en: 'Course where we learned game art, design and programming.',
    },
    tools: [
      { name: 'Aseprite', use: { es: 'pixel art', en: 'pixel art' } },
      { name: 'Construct 3', use: { es: 'programación', en: 'programming' } },
    ],
  },
  {
    type: 'year',
    year: '2023',
    caption: { es: 'Inicio del grado', en: 'Start of the degree' },
  },
  {
    type: 'education',
    title: { es: 'Grado en Ingeniería del Software', en: 'BSc in Software Engineering' },
    org: { es: 'Universidad Complutense de Madrid (UCM)', en: 'Complutense University of Madrid (UCM)' },
    period: { es: '2023 – actualidad', en: '2023 – present' },
    status: 'inProgress', // clave de badges.* (ver src/i18n)
    // "Lo que he aprendido": lista corta basada en lo realizado en el grado y en los proyectos
    learned: {
      es: [
        'Algoritmos y estructuras de datos.',
        'Desarrollo de aplicaciones y APIs REST con Java, Python y JavaScript.',
        'Bases de datos SQL y NoSQL, y despliegue de servicios con Docker.',
        'Gestión de proyectos con Scrum en equipos de hasta 10 personas.',
        'Diseño y desarrollo de videojuegos web con Phaser.',
      ],
      en: [
        'Algorithms and data structures.',
        'Building applications and REST APIs with Java, Python and JavaScript.',
        'SQL and NoSQL databases, and service deployment with Docker.',
        'Project management with Scrum in teams of up to 10 people.',
        'Designing and developing web games with Phaser.',
      ],
    },
    // Proyectos relacionados: slug de src/data/projects.js y, opcionalmente, una etiqueta corta
    projects: [{ slug: 'tfg-chess', label: { es: 'TFG', en: 'Thesis' } }, { slug: 'smartcook' }, { slug: 'band-souls' }],
  },
  {
    type: 'internship',
    title: { es: 'Prácticas en desarrollo de software', en: 'Software development internship' },
    org: { es: 'Lo que estoy buscando', en: "What I'm looking for" },
    period: { es: 'A partir de 2027 · Jornada de mañana', en: 'From 2027 · Morning schedule' },
    badge: { es: 'Buscando', en: 'Looking' },
    description: {
      es: 'Unas prácticas en las que participar en proyectos reales y seguir creciendo como desarrollador, con perfil backend y web.',
      en: 'An internship where I can take part in real projects and keep growing as a developer, with a backend and web profile.',
    },
  },
  {
    type: 'year',
    year: '2027',
    caption: { es: 'Graduación prevista · junio', en: 'Expected graduation · June' },
  },
]
