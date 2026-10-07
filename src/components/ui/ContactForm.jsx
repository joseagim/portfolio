import { useRef, useState } from 'react'
import { CheckCircle2, CircleAlert, Send, TriangleAlert } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'
import { profile } from '../../data/profile'

// Endpoint del formulario en Formspree (https://formspree.io). Los mensajes llegan al email con el que
// se creó el formulario allí. Se puede sustituir con la variable VITE_CONTACT_ENDPOINT (ver .env.example).
// Si el valor queda vacío, el formulario abre el cliente de correo del usuario con el mensaje redactado (mailto).
const DEFAULT_ENDPOINT = 'https://formspree.io/f/mbgdggql'
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT ?? DEFAULT_ENDPOINT

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const FIELDS = ['name', 'email', 'message']

const fieldBase =
  'mt-1.5 w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-navy-400 transition-colors dark:bg-navy-950 dark:text-mist'
const fieldOk =
  'border-navy-200 hover:border-navy-300 focus-visible:border-accent-2 dark:border-navy-700 dark:hover:border-navy-600'
const fieldBad = 'border-red-500/70 focus-visible:border-red-500 dark:border-red-400/70 dark:focus-visible:border-red-400'

// Devuelve la clave del mensaje de error (contact.form.errors.*) o null si el campo es válido
function validate(name, value) {
  const v = value.trim()
  if (name === 'name') return v ? null : 'name'
  if (name === 'email') return !v ? 'email' : EMAIL_RE.test(v) ? null : 'emailInvalid'
  if (name === 'message') return v ? null : 'message'
  return null
}

export default function ContactForm() {
  const { t, lang } = useLanguage()
  const formRef = useRef(null)
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | success-mailto | error

  const setError = (name, key) => setErrors((prev) => ({ ...prev, [name]: key }))

  function onChange(e) {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    // Si el campo ya mostraba un error, se revalida mientras se escribe
    if (errors[name]) setError(name, validate(name, value))
    if (status !== 'idle' && status !== 'sending') setStatus('idle')
  }

  function onBlur(e) {
    const { name, value } = e.target
    // Un campo vacío que el usuario solo ha tocado no se marca hasta enviar; sí se avisa si el email es inválido
    if (name === 'email' && value.trim()) setError(name, validate(name, value))
  }

  async function onSubmit(e) {
    e.preventDefault()
    const form = formRef.current
    const data = new FormData(form)

    // Honeypot: los bots suelen rellenar este campo oculto
    if (data.get('_gotcha')) return

    const next = {}
    FIELDS.forEach((f) => {
      const key = validate(f, values[f])
      if (key) next[f] = key
    })
    setErrors(next)
    const firstInvalid = FIELDS.find((f) => next[f])
    if (firstInvalid) {
      form.elements[firstInvalid].focus()
      return
    }

    const name = values.name.trim()
    const email = values.email.trim()
    const message = values.message.trim()

    if (!ENDPOINT) {
      const subject = encodeURIComponent(`${lang === 'es' ? 'Contacto desde el portfolio' : 'Portfolio contact'} · ${name}`)
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`)
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
      setStatus('success-mailto')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, message, _subject: `Portfolio · ${name}` }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setValues({ name: '', email: '', message: '' })
      setErrors({})
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const sending = status === 'sending'

  // Props comunes de cada campo (accesibilidad + estilo según haya error o no)
  const fieldProps = (name) => ({
    id: `contact-${name}`,
    name,
    value: values[name],
    onChange,
    onBlur,
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': errors[name] ? `contact-${name}-error` : undefined,
    className: `${fieldBase} ${errors[name] ? fieldBad : fieldOk}`,
  })

  const fieldError = (name) =>
    errors[name] ? (
      <p id={`contact-${name}-error`} className="mt-1.5 flex items-start gap-1.5 text-[13px] text-red-600 dark:text-red-400">
        <CircleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        {t(`contact.form.errors.${errors[name]}`)}
      </p>
    ) : null

  const label = 'block text-sm font-medium text-navy-700 dark:text-navy-200'

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="card relative p-5 sm:p-6" aria-labelledby="contact-form-title">
      <h3 id="contact-form-title" className="font-mono text-sm font-semibold text-ink dark:text-white">
        <span className="text-accent" aria-hidden="true">
          &gt;{' '}
        </span>
        {t('contact.form.title')}
      </h3>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={label}>
            {t('contact.form.name')}
          </label>
          <input
            {...fieldProps('name')}
            type="text"
            autoComplete="name"
            maxLength={100}
            placeholder={t('contact.form.namePlaceholder')}
          />
          {fieldError('name')}
        </div>
        <div>
          <label htmlFor="contact-email" className={label}>
            {t('contact.form.email')}
          </label>
          <input
            {...fieldProps('email')}
            type="email"
            autoComplete="email"
            maxLength={150}
            placeholder={t('contact.form.emailPlaceholder')}
          />
          {fieldError('email')}
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="contact-message" className={label}>
          {t('contact.form.message')}
        </label>
        <textarea
          {...fieldProps('message')}
          rows={5}
          maxLength={3000}
          placeholder={t('contact.form.messagePlaceholder')}
          className={`${fieldProps('message').className} resize-y`}
        />
        {fieldError('message')}
      </div>

      {/* Honeypot anti-spam (oculto para personas) */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          No rellenar
          <input name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <button type="submit" disabled={sending} className="btn-primary h-11 px-5 font-semibold">
          <Send className="h-4 w-4" aria-hidden="true" />
          {sending ? t('contact.form.sending') : t('contact.form.send')}
        </button>

        <p role="status" aria-live="polite" className="text-sm">
          {(status === 'success' || status === 'success-mailto') && (
            <span className="inline-flex items-start gap-2 text-accent">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              {status === 'success' ? t('contact.form.success') : t('contact.form.successMailto')}
            </span>
          )}
          {status === 'error' && (
            <span className="inline-flex items-start gap-2 text-red-600 dark:text-red-400">
              <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              {t('contact.form.error', { email: profile.email })}
            </span>
          )}
        </p>
      </div>
    </form>
  )
}
