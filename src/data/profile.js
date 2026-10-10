// Datos personales y de contacto. Los textos traducibles van como { es, en }.
import { CalendarClock, CodeXml, Container, GraduationCap, Languages, Layers, MapPin, Monitor } from 'lucide-react'

export const profile = {
  name: 'José Antonio Gimeno San Martín',
  shortName: 'José Antonio Gimeno',
  photo: '/profile-square.jpg',
  email: 'gimenosmja@gmail.com',
  links: {
    github: 'https://www.github.com/joseagim',
    linkedin: 'https://www.linkedin.com/in/joseagim',
  },
  location: { es: 'Madrid, España', en: 'Madrid, Spain' },
  // Los PDF van en /public/cv/
  cv: {
    es: { href: '/cv/CV_Español.pdf', filename: 'CV_Jose_Antonio_Gimeno_ES.pdf' },
    en: { href: '/cv/CV_English.pdf', filename: 'CV_Jose_Antonio_Gimeno_EN.pdf' },
  },
}

export const quickFacts = [
  {
    id: 'education',
    icon: GraduationCap,
    value: {
      es: 'Grado en Ingeniería del Software · UCM',
      en: 'BSc in Software Engineering · UCM',
    },
    detail: {
      es: '2023 – actualidad · Graduación prevista en junio de 2027',
      en: '2023 – present · Expected graduation June 2027',
    },
  },
  {
    id: 'location',
    icon: MapPin,
    value: { es: 'Madrid', en: 'Madrid' },
  },
  {
    id: 'languages',
    icon: Languages,
    value: { es: 'Español (nativo) · Inglés (B2)', en: 'Spanish (native) · English (B2)' },
  },
  {
    id: 'availability',
    icon: CalendarClock,
    value: { es: 'A partir de 2027', en: 'From 2027' },
    detail: { es: 'Jornada de mañana', en: 'Morning schedule' },
  },
]

export const softSkills = [
  { es: 'Responsable', en: 'Responsible' },
  { es: 'Gran capacidad de aprendizaje', en: 'Fast learner' },
  { es: 'Ganas de aprender', en: 'Eager to learn' },
  { es: 'Apasionado por las nuevas tecnologías', en: 'Passionate about new technologies' },
  { es: 'Resolutivo', en: 'Solution-oriented' },
]

export const skillGroups = [
  {
    id: 'languages',
    icon: CodeXml,
    title: { es: 'Lenguajes y bases de datos', en: 'Languages & databases' },
    items: ['Java', 'C++', 'JavaScript', 'Python', 'MySQL', 'PostgreSQL', 'MongoDB'],
  },
  {
    id: 'frameworks',
    icon: Layers,
    title: { es: 'Frameworks', en: 'Frameworks' },
    items: ['Spring Boot', 'Flask', 'React', 'Tailwind'],
  },
  {
    id: 'devops',
    icon: Container,
    title: { es: 'DevOps', en: 'DevOps' },
    items: ['Docker', 'Git', 'Vercel', 'Render', 'Neon'],
  },
  {
    id: 'tools',
    icon: Monitor,
    title: { es: 'Entornos y herramientas', en: 'IDEs and tools' },
    items: ['IntelliJ', 'VS Code', 'Visual Studio', 'Postman'],
  },
]
