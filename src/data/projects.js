/*
 * ─────────────────────────────────────────────────────────────────────────────
 *  DATOS DE LOS PROYECTOS (bilingüe)
 * ─────────────────────────────────────────────────────────────────────────────
 *  - El orden del array es el orden en la home y en la navegación anterior/siguiente.
 *  - Campos comunes (slug, stack, enlaces, imágenes…) arriba; textos en `content.es` y `content.en`.
 *  - Imágenes en /public/projects/<slug>/ :
 *      cover   → portada de la tarjeta (si no existe el archivo, se muestra un placeholder).
 *      gallery → capturas del detalle: [{ src: '/projects/<slug>/1.png', alt: { es, en } }, …]
 *  - Enlaces: cualquier enlace con valor null no se muestra.
 *  - `blocks`: secciones extra que se pintan entre "Mi aportación" y "Aspectos destacados".
 *      Tipos disponibles (ver src/components/projects/ProjectBlocks.jsx):
 *      text · features · phases · architecture · deployment · methodology · recognition · tags · note
 *  - `learned`: "Qué aprendí". Si el array está vacío, la sección no se muestra.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { ChefHat, Crown, Guitar, TrainFront } from 'lucide-react'

export const projects = [
  // ───────────────────────────────────────────────────────────── 1. TFG
  {
    slug: 'tfg-chess',
    kind: 'academic', // 'academic' | 'personal'
    status: 'inProgress', // 'inProgress' | 'completed'
    badges: ['inProgress'], // 'inProgress' | 'deployed' | 'award'
    icon: Crown, // icono del placeholder cuando no hay imagen
    stack: ['C++', 'Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'React', 'Vite', 'Tailwind'],
    cover: '/projects/tfg-chess/cover.webp',
    gallery: [
      // TODO: añadir capturas cuando existan, p. ej.:
      // { src: '/projects/tfg-chess/1.png', alt: { es: 'Tablero de juego', en: 'Game board' } },
    ],
    links: {
      repos: [], // TODO: añadir { label: 'repo', url: '…' } cuando el repositorio sea público
      demo: null,
      apk: null,
    },
    repoComingSoon: true,
    content: {
      es: {
        title: 'TFG · Plataforma de ajedrez',
        context: 'Trabajo de Fin de Grado',
        team: 'Desarrollo individual',
        tagline:
          'Plataforma web para aprender, mejorar y jugar al ajedrez. Primero con Stockfish como motor y, en una segunda fase, con un motor propio desarrollado desde cero en C++.',
        summary: [
          'Mi Trabajo de Fin de Grado es una plataforma para aprender, mejorar y jugar al ajedrez. El proyecto está en curso y lo desarrollo de forma individual, junto con mi tutor del TFG. Todavía no tiene nombre propio.',
          'Se plantea en dos fases: en la primera construyo la aplicación incorporando Stockfish como motor principal; en la segunda, desarrollaré desde cero un motor de ajedrez propio.',
        ],
        contribution: [
          'Al ser un proyecto individual, me encargo de todo el ciclo de desarrollo: el diseño de la arquitectura, el backend con Java y Spring Boot, la base de datos PostgreSQL, el frontend con React y la contenerización con Docker. En la segunda fase, también del motor de ajedrez en C++.',
        ],
        blocks: [
          {
            type: 'phases',
            title: 'Fases del proyecto',
            items: [
              {
                title: 'Aplicación con Stockfish',
                text: 'Desarrollo de la plataforma incorporando Stockfish como motor principal para jugar, analizar partidas y mejorar.',
              },
              {
                title: 'Motor propio en C++',
                text: 'Desarrollo de un motor de ajedrez propio desde cero en C++, que se incorporará a la plataforma.',
              },
            ],
          },
          {
            type: 'featureGroups',
            title: 'Funcionalidades previstas',
            featured: {
              label: 'Destacado',
              title: 'Modo Show',
              text: 'Enfrentar a dos bots entre sí tantas veces como se quiera. Sirve tanto para disfrutar de una partida en directo, mediante websockets, como para simular cientos o miles de partidas y comparar estadísticas entre motores. Las simulaciones se pueden ver una a una o saltar directamente a los resultados.',
            },
            groups: [
              {
                name: 'Jugar',
                items: [
                  { title: 'Partidas contra el bot', text: 'Jugar partidas contra el motor de ajedrez.' },
                  { title: 'Partidas online', text: 'Jugar partidas en línea contra otras personas.' },
                  { title: 'Partidas en curso', text: 'Acceso a las partidas que se están jugando.' },
                ],
              },
              {
                name: 'Analizar y mejorar',
                items: [
                  { title: 'Revisión de partidas', text: 'Repasar partidas ya jugadas y analizar si cada movimiento fue bueno o malo.' },
                  {
                    title: 'Jugar contra el entrenador',
                    text: 'Como jugar contra el bot, pero pudiendo pedir el mejor movimiento, volver atrás y revisar la posición en ese momento.',
                  },
                  { title: 'Problemas', text: 'Puzzles de ajedrez para entrenar.' },
                  { title: 'Estadísticas personales', text: 'Estadísticas propias de cada jugador.' },
                ],
              },
              {
                name: 'Aprender',
                items: [
                  {
                    title: 'Reglas desde cero',
                    text: 'Aprender cómo se mueve cada pieza y las reglas básicas del ajedrez.',
                  },
                  { title: 'Aperturas y finales', text: 'Aprender aperturas y finales, como los distintos tipos de mate.' },
                ],
              },
            ],
          },
          {
            type: 'architecture',
            diagram: 'chess',
            title: 'Arquitectura',
            caption:
              'Esquema general previsto. El frontend se comunica con el backend, que es quien integra el motor de ajedrez: Stockfish en la primera fase y el motor propio en C++ en la segunda.',
          },
          {
            type: 'text',
            title: 'Motor y tiempo real',
            paragraphs: [
              'Stockfish se conectará al backend en Spring Boot, que será el encargado de comunicarse con el motor y ofrecer sus resultados al resto de la aplicación. En la segunda fase, el motor propio en C++ se integrará en ese mismo punto.',
              'Para el Modo Show en directo se utilizarán websockets, de forma que las partidas entre bots se puedan seguir en tiempo real desde el navegador.',
            ],
          },
        ],
        highlights: [
          'Arquitectura completa: frontend en React, backend en Java con Spring Boot, base de datos PostgreSQL y contenedores Docker.',
          'Integración de Stockfish en el backend como motor principal de la primera fase.',
          'Websockets para retransmitir en directo las partidas del Modo Show.',
          'Simulación de cientos o miles de partidas entre motores para comparar estadísticas.',
          'Desarrollo de un motor de ajedrez propio desde cero en C++.',
        ],
        learned: [
          // TODO: añadir aprendizajes cuando quieras (si se deja vacío, la sección no aparece)
        ],
      },
      en: {
        title: "Bachelor's Thesis · Chess platform",
        context: "Bachelor's Thesis (TFG)",
        team: 'Individual project',
        tagline:
          'A web platform to learn, improve and play chess. Stockfish powers the first phase; in the second, I will build my own chess engine from scratch in C++.',
        summary: [
          "My Bachelor's Thesis is a platform to learn, improve and play chess. It's currently in progress and I'm developing it individually, alongside my thesis supervisor. It doesn't have a name yet.",
          "The project is split into two phases: first, I'm building the application with Stockfish as its main engine; then, I will develop my own chess engine from scratch.",
        ],
        contribution: [
          "As an individual project, I'm responsible for the entire development cycle: architecture design, the Java and Spring Boot backend, the PostgreSQL database, the React frontend and containerisation with Docker. In the second phase, the C++ chess engine as well.",
        ],
        blocks: [
          {
            type: 'phases',
            title: 'Project phases',
            items: [
              {
                title: 'Application powered by Stockfish',
                text: 'Building the platform with Stockfish as the main engine for playing, analysing games and improving.',
              },
              {
                title: 'Custom C++ engine',
                text: 'Developing my own chess engine from scratch in C++, to be integrated into the platform.',
              },
            ],
          },
          {
            type: 'featureGroups',
            title: 'Planned features',
            featured: {
              label: 'Featured',
              title: 'Show mode',
              text: 'Pit two bots against each other as many times as you like. Watch a single game live, streamed over websockets, or simulate hundreds or thousands of games to compare statistics between engines. Simulations can be watched one by one, or you can jump straight to the results.',
            },
            groups: [
              {
                name: 'Play',
                items: [
                  { title: 'Play against the bot', text: 'Play games against the chess engine.' },
                  { title: 'Online games', text: 'Play online against other people.' },
                  { title: 'Ongoing games', text: 'Access to the games currently being played.' },
                ],
              },
              {
                name: 'Analyse and improve',
                items: [
                  { title: 'Game review', text: 'Go back over past games and see whether each move was good or bad.' },
                  {
                    title: 'Play against the coach',
                    text: 'Like playing the bot, but you can ask for the best move, take moves back and review the position at that point.',
                  },
                  { title: 'Puzzles', text: 'Chess problems for training.' },
                  { title: 'Personal statistics', text: 'Your own stats as a player.' },
                ],
              },
              {
                name: 'Learn',
                items: [
                  {
                    title: 'Rules from scratch',
                    text: "Learn how each piece moves and the basic rules of chess.",
                  },
                  { title: 'Openings & endgames', text: 'Learn openings and endgames, such as the different types of checkmate.' },
                ],
              },
            ],
          },
          {
            type: 'architecture',
            diagram: 'chess',
            title: 'Architecture',
            caption:
              'Planned high-level overview. The frontend talks to the backend, which integrates the chess engine: Stockfish in the first phase and the custom C++ engine in the second.',
          },
          {
            type: 'text',
            title: 'Engine & real time',
            paragraphs: [
              'Stockfish will be connected to the Spring Boot backend, which will handle communication with the engine and serve its results to the rest of the application. In the second phase, the custom C++ engine will plug into that same point.',
              'Live Show mode will use websockets, so games between bots can be followed in real time from the browser.',
            ],
          },
        ],
        highlights: [
          'End-to-end architecture: React frontend, Java and Spring Boot backend, PostgreSQL database and Docker containers.',
          'Stockfish integrated into the backend as the main engine for the first phase.',
          'Websockets to stream Show mode games live.',
          'Simulation of hundreds or thousands of engine-vs-engine games to compare statistics.',
          'Building a custom chess engine from scratch in C++.',
        ],
        learned: [],
      },
    },
  },

  // ───────────────────────────────────────────────────────────── 2. TrainTracker
  {
    slug: 'traintracker',
    kind: 'personal',
    status: 'completed',
    badges: ['deployed'],
    icon: TrainFront,
    stack: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'React', 'Vite', 'Tailwind'],
    cover: '/projects/traintracker/cover.webp',
    gallery: [
      { src: '/projects/traintracker/1.webp', alt: { es: 'Búsqueda de viajes y resultados', en: 'Trip search and results' } },
      { src: '/projects/traintracker/2.webp', alt: { es: 'Confirmación de la compra', en: 'Purchase confirmation' } },
      { src: '/projects/traintracker/3.webp', alt: { es: 'Mis billetes', en: 'My tickets' } },
      { src: '/projects/traintracker/4.webp', alt: { es: 'Código QR del billete', en: 'Ticket QR code' } },
      { src: '/projects/traintracker/5.webp', alt: { es: 'Panel de validación de QR (administrador)', en: 'QR validation panel (admin)' } },
      { src: '/projects/traintracker/6.webp', alt: { es: 'Billete pendiente de validar', en: 'Ticket pending validation' } },
      { src: '/projects/traintracker/7.webp', alt: { es: 'Billete marcado como escaneado', en: 'Ticket marked as scanned' } },
    ],
    links: {
      repos: [
        { label: 'repoFrontend', url: 'https://github.com/joseagim/train-tracker-frontend' },
        { label: 'repoApi', url: 'https://github.com/joseagim/train-tracker' },
      ],
      // URL tomada del README del repositorio del frontend
      demo: { label: 'demo', url: 'https://train-tracker-frontend.vercel.app' },
      apk: null,
    },
    content: {
      es: {
        title: 'TrainTracker',
        context: 'Proyecto personal',
        team: 'Individual',
        tagline:
          'Aplicación web full-stack para buscar y comprar viajes en tren, con API REST propia, autenticación JWT y validación de billetes mediante código QR.',
        summary: [
          'TrainTracker es una aplicación web full-stack para buscar y comprar viajes en tren. Desarrollé tanto el frontend completo como la API REST que lo alimenta.',
          'Los datos son simulados: una API sencilla genera estaciones, trenes y rutas, de forma que se pueden buscar viajes y comprar billetes como en un servicio real.',
        ],
        contribution: [
          'Es un proyecto desarrollado íntegramente por mí: la API REST con Java y Spring Boot y su base de datos PostgreSQL, el frontend con React, Vite y Tailwind, la contenerización con Docker y el despliegue remoto de las tres capas.',
        ],
        blocks: [
          {
            type: 'features',
            title: 'Funcionalidades por rol',
            items: [
              {
                title: 'Usuario',
                text: 'Busca viajes entre estaciones, compra billetes y consulta los billetes que ha comprado.',
              },
              {
                title: 'Administrador',
                text: 'Escanea el código QR de un billete y lo valida, marcándolo como escaneado.',
              },
            ],
          },
          {
            type: 'architecture',
            diagram: 'train',
            title: 'Arquitectura',
            caption:
              'Tres capas desplegadas por separado: el frontend en Vercel consume la API REST de Render, que guarda los datos en PostgreSQL alojado en Neon. La API se organiza en capas (controller, service y repository) y el esquema de la base de datos se versiona con Flyway.',
          },
          {
            type: 'note',
            text: 'La API está en el plan gratuito de Render: la primera petición tras un tiempo de inactividad puede tardar hasta unos 3 minutos. Mientras tanto, la web muestra una pantalla de espera y se recarga sola cuando el servidor responde.',
          },
          {
            type: 'note',
            text: 'Más detalles técnicos en el README del repositorio.',
            link: { label: 'Ver README', url: 'https://github.com/joseagim/train-tracker-frontend#readme' },
          },
        ],
        highlights: [
          'API REST con autenticación mediante JWT.',
          'Roles de usuario y administrador con funcionalidades diferenciadas.',
          'Validación de billetes por código QR: el administrador escanea el billete y lo marca como escaneado.',
          'Generación de datos simulados (estaciones, trenes y rutas) para poder buscar viajes y comprar billetes.',
          'Búsqueda de viajes que valida el orden de las estaciones y calcula la hora real en las paradas elegidas, con precio dinámico según distancia, hora y día de la semana.',
          'Compra de billetes segura ante concurrencia: bloqueo optimista (@Version) comprobado con un test de integración multihilo.',
          'Esquema de base de datos versionado con Flyway, documentación de la API con Swagger y tests con JUnit y Mockito.',
          'Contenerización con Docker y despliegue remoto de las tres capas: frontend en Vercel, backend en Render y base de datos en Neon.',
        ],
        learned: [
          // TODO: añadir aprendizajes (opcional)
        ],
      },
      en: {
        title: 'TrainTracker',
        context: 'Personal project',
        team: 'Solo project',
        tagline:
          'Full-stack web app to search for and book train journeys, with its own REST API, JWT authentication and QR-code ticket validation.',
        summary: [
          'TrainTracker is a full-stack web application for searching and booking train journeys. I built both the entire frontend and the REST API behind it.',
          'The data is simulated: a simple API generates stations, trains and routes, so you can search for journeys and buy tickets just like in a real service.',
        ],
        contribution: [
          'I built this project entirely on my own: the Java and Spring Boot REST API and its PostgreSQL database, the React, Vite and Tailwind frontend, containerisation with Docker and the remote deployment of all three layers.',
        ],
        blocks: [
          {
            type: 'features',
            title: 'Features by role',
            items: [
              { title: 'User', text: 'Searches for journeys between stations, buys tickets and checks the tickets they have purchased.' },
              { title: 'Administrator', text: "Scans a ticket's QR code and validates it, marking it as scanned." },
            ],
          },
          {
            type: 'architecture',
            diagram: 'train',
            title: 'Architecture',
            caption:
              'Three layers deployed separately: the Vercel frontend consumes the Render REST API, which stores its data in PostgreSQL hosted on Neon. The API is organised in layers (controller, service and repository) and the database schema is versioned with Flyway.',
          },
          {
            type: 'note',
            text: 'The API runs on Render’s free tier: the first request after a period of inactivity can take up to about 3 minutes. Meanwhile, the app shows a waiting screen and reloads by itself once the server responds.',
          },
          {
            type: 'note',
            text: 'More technical details in the repository README.',
            link: { label: 'Read the README', url: 'https://github.com/joseagim/train-tracker-frontend#readme' },
          },
        ],
        highlights: [
          'REST API secured with JWT authentication.',
          'User and administrator roles with distinct capabilities.',
          'QR-code ticket validation: the administrator scans a ticket and marks it as scanned.',
          'Simulated data generation (stations, trains and routes) to search for journeys and buy tickets.',
          'Trip search that validates station order and computes the real times at the chosen stops, with dynamic pricing by distance, time of day and day of the week.',
          'Concurrency-safe ticket purchase: optimistic locking (@Version) verified with a multi-threaded integration test.',
          'Database schema versioned with Flyway, API documented with Swagger and tested with JUnit and Mockito.',
          'Containerised with Docker, with all three layers deployed remotely: frontend on Vercel, backend on Render and database on Neon.',
        ],
        learned: [],
      },
    },
  },

  // ───────────────────────────────────────────────────────────── 3. SmartCook
  {
    slug: 'smartcook',
    kind: 'academic',
    status: 'completed',
    badges: ['award'],
    icon: ChefHat,
    stack: ['Python', 'Flask', 'MongoDB', 'React', 'Vite', 'Tailwind', 'Capacitor'],
    cover: '/projects/smartcook/cover.webp',
    galleryVariant: 'phone', // capturas de móvil (verticales)
    gallery: [
      { src: '/projects/smartcook/1.webp', alt: { es: 'Menú del mes con las comidas y cenas de cada día', en: 'Monthly menu with each day’s lunch and dinner' } },
      { src: '/projects/smartcook/2.webp', alt: { es: 'Detalle de una receta con ingredientes y duración', en: 'Recipe detail with ingredients and cooking time' } },
      { src: '/projects/smartcook/3.webp', alt: { es: 'Lista de la compra con ingredientes marcables', en: 'Shopping list with checkable ingredients' } },
      { src: '/projects/smartcook/4.webp', alt: { es: 'Configuración del horario para cocinar', en: 'Cooking schedule settings' } },
    ],
    links: {
      // El código está en la rama DEV (la rama main solo contiene el README)
      repos: [{ label: 'repo', url: 'https://github.com/croquetas-coquetas/app/tree/DEV' }],
      demo: null,
      apk: null,
    },
    content: {
      es: {
        title: 'SmartCook',
        context: 'Asignatura Gestión de Proyectos Software · UCM',
        team: 'Equipo de 10 personas',
        tagline:
          'Aplicación móvil para planificar las comidas de la semana. MVP desarrollado con Scrum por un equipo de 10 personas y ganador del Premio al Talento UCM FDI.',
        summary: [
          'SmartCook es una aplicación móvil para planificar las comidas de la semana. La desarrollamos un equipo de 10 personas en la asignatura Gestión de Proyectos Software de la Universidad Complutense de Madrid.',
          'Trabajamos con Scrum, con reunión de planificación, reuniones diarias, revisión y retrospectiva en cada sprint, y tras dos sprints entregamos un MVP funcional.',
        ],
        // Nota bajo el resumen (opcional)
        summaryNote: 'Actualmente la API no está desplegada: terminó el plan de alojamiento en el que estaba.',
        contribution: [
          'Formé parte del equipo de desarrollo, trabajando principalmente en el backend. En concreto, me encargué del algoritmo de búsqueda de recetas.',
        ],
        blocks: [
          {
            type: 'recognition',
            title: 'Reconocimiento',
            heading: 'Premio al Talento UCM FDI',
            text: 'De los 7 proyectos realizados en la asignatura, SmartCook destacó sobre el resto. Como premio, el grupo recibió un diploma firmado por el rector.',
          },
          {
            type: 'methodology',
            title: 'Gestión y metodología',
            intro:
              'La gestión del proyecto fue tan importante como el desarrollo. Trabajamos con Scrum de principio a fin.',
            roles: {
              text: 'Éramos 10 personas y repartimos los roles de Scrum: un Product Owner, un Scrum Master y el resto, el equipo de desarrollo, al que yo pertenecí. Así aprendimos a entender cómo funciona cada rol.',
              mineLabel: 'Mi rol',
              items: [
                { name: 'Product Owner', count: '1 persona' },
                { name: 'Scrum Master', count: '1 persona' },
                { name: 'Equipo de desarrollo', count: '8 personas', mine: true },
              ],
            },
            practices: [
              { title: 'Scrum', text: 'Marco ágil para organizar el trabajo en sprints.' },
              { title: 'Mapa de historias de usuario', text: 'Story map para organizar y priorizar las funcionalidades.' },
              { title: 'Jira', text: 'Gestión del sprint backlog y seguimiento de las tareas.' },
              { title: 'Team building', text: 'Dinámicas de equipo entre todos los miembros del grupo.' },
            ],
            sprintLabel: 'Sprint',
            sprints: 2,
            ceremonies: ['Planificación', 'Reuniones diarias', 'Revisión', 'Retrospectiva'],
            ceremoniesCaption: 'Ceremonias realizadas en cada sprint',
          },
          {
            type: 'architecture',
            diagram: 'smartcook',
            title: 'Arquitectura',
            caption:
              'La app (React, empaquetada para Android con Capacitor) consume una API en Flask que genera la planificación semanal y obtiene recetas e ingredientes de MongoDB. El servidor y la app Android se validan con integración continua en GitHub Actions.',
          },
        ],
        highlights: [
          'MVP funcional entregado en dos sprints.',
          'Desarrollo del algoritmo de búsqueda de recetas en el backend.',
          'Trabajo en un equipo de 10 personas con Scrum, story map y Jira.',
          'Algoritmo de planificación semanal en el backend: genera 7 días (14 comidas) cumpliendo cuotas nutricionales por grupo de alimentos, con ventana deslizante y puntuación, y sin repetir recetas de los últimos 14 días.',
          'App móvil empaquetada como APK de Android con Capacitor a partir del frontend web.',
          'Pruebas de unidad, integración, sistema y aceptación documentadas por historia de usuario, e integración continua con GitHub Actions.',
          'Premio al Talento UCM FDI: el proyecto más destacado de los 7 de la asignatura.',
        ],
        learned: [
          // TODO: añadir aprendizajes (opcional)
        ],
      },
      en: {
        title: 'SmartCook',
        context: 'Software Project Management course · UCM',
        team: 'Team of 10',
        tagline:
          'Mobile app for planning your weekly meals. An MVP built with Scrum by a team of 10 and winner of the UCM FDI Talent Award.',
        summary: [
          'SmartCook is a mobile app for planning your meals for the week. We built it as a team of 10 for the Software Project Management course at Complutense University of Madrid.',
          'We worked with Scrum, holding a planning meeting, daily stand-ups, a review and a retrospective in every sprint, and after two sprints we delivered a working MVP.',
        ],
        summaryNote: 'The API is currently not deployed: the hosting plan it was running on has ended.',
        contribution: [
          'I was part of the development team, working mainly on the backend. Specifically, I was in charge of the recipe search algorithm.',
        ],
        blocks: [
          {
            type: 'recognition',
            title: 'Recognition',
            heading: 'UCM FDI Talent Award',
            text: 'Out of the 7 projects developed in the course, SmartCook stood out from the rest. As a prize, the team received a diploma signed by the university rector.',
          },
          {
            type: 'methodology',
            title: 'Management & methodology',
            intro:
              'Managing the project mattered as much as building it. We followed Scrum from start to finish.',
            roles: {
              text: 'There were 10 of us and we split the Scrum roles: one Product Owner, one Scrum Master and the rest, the development team, which I was part of. This is how we learned to understand how each role works.',
              mineLabel: 'My role',
              items: [
                { name: 'Product Owner', count: '1 person' },
                { name: 'Scrum Master', count: '1 person' },
                { name: 'Development team', count: '8 people', mine: true },
              ],
            },
            practices: [
              { title: 'Scrum', text: 'Agile framework to organise the work into sprints.' },
              { title: 'User story map', text: 'Story map to organise and prioritise features.' },
              { title: 'Jira', text: 'Sprint backlog management and task tracking.' },
              { title: 'Team building', text: 'Team-building activities with the whole group.' },
            ],
            sprintLabel: 'Sprint',
            sprints: 2,
            ceremonies: ['Planning', 'Daily stand-ups', 'Review', 'Retrospective'],
            ceremoniesCaption: 'Ceremonies held in every sprint',
          },
          {
            type: 'architecture',
            diagram: 'smartcook',
            title: 'Architecture',
            caption:
              'The app (React, packaged for Android with Capacitor) consumes a Flask API that generates the weekly plan and reads recipes and ingredients from MongoDB. The server and the Android app are validated with continuous integration on GitHub Actions.',
          },
        ],
        highlights: [
          'Working MVP delivered in two sprints.',
          'Developed the recipe search algorithm on the backend.',
          'Teamwork in a 10-person team using Scrum, a story map and Jira.',
          'Weekly planning algorithm on the backend: generates 7 days (14 meals) while meeting nutritional quotas per food group, using a sliding window and scoring, and never repeating recipes from the last 14 days.',
          'Mobile app packaged as an Android APK with Capacitor from the web frontend.',
          'Unit, integration, system and acceptance tests documented per user story, plus continuous integration with GitHub Actions.',
          'UCM FDI Talent Award: the standout project among the 7 developed in the course.',
        ],
        learned: [],
      },
    },
  },

  // ───────────────────────────────────────────────────────────── 4. Band Souls
  {
    slug: 'band-souls',
    kind: 'academic',
    status: 'completed',
    badges: ['deployed'],
    icon: Guitar,
    stack: ['HTML', 'JavaScript', 'Phaser'],
    cover: '/projects/band-souls/cover.webp',
    galleryVariant: 'game', // capturas de juego en 16:9
    gallery: [
      { src: '/projects/band-souls/1.webp', alt: { es: 'Pantalla de título del juego', en: 'Game title screen' } },
      { src: '/projects/band-souls/2.webp', alt: { es: 'Combate contra una oleada de enemigos en la calle', en: 'Fighting a wave of enemies in the street' } },
      { src: '/projects/band-souls/3.webp', alt: { es: 'Tienda para comprar consumibles y mejorar las armas', en: 'Shop to buy consumables and upgrade weapons' } },
      { src: '/projects/band-souls/4.webp', alt: { es: 'Combate contra un boss', en: 'Boss fight' } },
      { src: '/projects/band-souls/5.webp', alt: { es: 'Oleada en el bosque con varios tipos de enemigos', en: 'Wave in the forest with several enemy types' } },
      { src: '/projects/band-souls/6.webp', alt: { es: 'Pantalla de Game Over', en: 'Game Over screen' } },
    ],
    links: {
      repos: [{ label: 'repo', url: 'https://github.com/joseagim/BandSouls_DVI' }],
      // URL de GitHub Pages configurada en el repositorio
      demo: { label: 'play', url: 'https://joseagim.github.io/BandSouls_DVI/' },
      apk: null,
    },
    content: {
      es: {
        title: 'Band Souls',
        context: 'Asignatura Desarrollo de Videojuegos Web · UCM',
        team: 'Equipo de 5 personas',
        tagline:
          'Videojuego 2D de combate por oleadas para navegador, desarrollado con Phaser tras una fase inicial de diseño del juego.',
        summary: [
          'Band Souls es un videojuego 2D de combate por oleadas que se juega directamente en el navegador. Lo desarrollamos un equipo de 5 personas en la asignatura Desarrollo de Videojuegos Web, con HTML, JavaScript y Phaser.',
          'Antes de programar dedicamos una fase inicial al diseño del juego. El resultado está desplegado en GitHub Pages y se puede jugar online.',
        ],
        contribution: [
          'Fui programador del equipo y participé tanto en la implementación como en el arte del juego. Esto es lo que hice:',
        ],
        contributionList: [
          'Arte base de Laude, el protagonista.',
          'Sistema de spawner y oleadas configurable.',
          'Assets, ataque básico y ultimate del teclado.',
          'Arte y ataques del boss Beethoven.',
        ],
        blocks: [
          {
            type: 'text',
            beforeContribution: true, // se muestra antes de "Mi aportación"
            title: 'Historia',
            paragraphs: [
              'El protagonista es Laude, guitarrista de una banda que ha sufrido un accidente del que es el único superviviente. Debe luchar contra oleadas de enemigos usando como armas los instrumentos del resto de su banda, y enfrentarse a los bosses.',
            ],
          },
          {
            type: 'tags',
            title: 'Diseño previo al desarrollo',
            text: 'Antes de escribir código diseñamos cómo se vería el juego y cuáles serían sus mecánicas y dinámicas, desde el personaje principal y el mapa hasta las armas.',
            tags: ['Personaje principal', 'Mapa', 'Armas', 'Mecánicas', 'Dinámicas', 'Aspecto visual'],
            link: {
              label: 'Ver el documento de diseño (GDD)',
              url: 'https://github.com/joseagim/BandSouls_DVI/blob/main/GDD.markdown',
            },
          },
        ],
        highlights: [
          'Fase de diseño del videojuego previa al desarrollo: aspecto visual, mecánicas y dinámicas.',
          'Combate por oleadas con bosses y armas basadas en instrumentos musicales.',
          'Sistema de progresión: subida de nivel, consumibles y mejora de armas.',
          'Desplegado en GitHub Pages y jugable desde el navegador.',
          'Desarrollo en un equipo de 5 personas.',
        ],
        learned: [
          // TODO: añadir aprendizajes (opcional)
        ],
      },
      en: {
        title: 'Band Souls',
        context: 'Web Game Development course · UCM',
        team: 'Team of 5',
        tagline: 'A 2D wave-based combat game for the browser, built with Phaser after a dedicated game design phase.',
        summary: [
          'Band Souls is a 2D wave-based combat game that runs right in the browser. We built it as a team of 5 for the Web Game Development course, using HTML, JavaScript and Phaser.',
          'Before writing any code, we spent an initial phase designing the game. The result is deployed on GitHub Pages and can be played online.',
        ],
        contribution: [
          'I was a programmer on the team and took part in both the implementation and the art of the game. This is what I did:',
        ],
        contributionList: [
          'Base art for Laude, the main character.',
          'Configurable spawner and wave system.',
          'Assets, basic attack and ultimate for the keyboard.',
          'Art and attacks for the Beethoven boss.',
        ],
        blocks: [
          {
            type: 'text',
            beforeContribution: true,
            title: 'Story',
            paragraphs: [
              'The main character is Laude, a guitarist whose band has suffered an accident that only he survived. He has to fight off waves of enemies using his bandmates’ instruments as weapons, and take on the bosses.',
            ],
          },
          {
            type: 'tags',
            title: 'Design before development',
            text: 'Before writing any code, we designed how the game would look and defined its mechanics and dynamics, from the main character and the map to the weapons.',
            tags: ['Main character', 'Map', 'Weapons', 'Mechanics', 'Dynamics', 'Look & feel'],
            link: {
              label: 'Read the game design document (GDD)',
              url: 'https://github.com/joseagim/BandSouls_DVI/blob/main/GDD.markdown',
            },
          },
        ],
        highlights: [
          'Game design phase ahead of development: look and feel, mechanics and dynamics.',
          'Wave-based combat with bosses and weapons based on musical instruments.',
          'Progression system: levelling up, consumables and weapon upgrades.',
          'Deployed on GitHub Pages and playable in the browser.',
          'Developed in a team of 5.',
        ],
        learned: [],
      },
    },
  },
]

export function getProject(slug) {
  return projects.find((p) => p.slug === slug)
}

export function getAdjacentProjects(slug) {
  const i = projects.findIndex((p) => p.slug === slug)
  if (i === -1) return { prev: null, next: null }
  return { prev: projects[i - 1] ?? null, next: projects[i + 1] ?? null }
}
