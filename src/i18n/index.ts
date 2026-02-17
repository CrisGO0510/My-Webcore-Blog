import { createI18n } from 'vue-i18n'
import es from '../locales/es.json'
import en from '../locales/en.json'

// Tipos para los idiomas soportados
type SupportedLocale = 'es' | 'en'

// Detectar idioma del navegador o usar español por defecto
function getDefaultLocale(): SupportedLocale {
  const browserLang = navigator.language?.split('-')[0]
  const supportedLocales: SupportedLocale[] = ['es', 'en']
  
  return (supportedLocales.includes(browserLang as SupportedLocale)) ? browserLang as SupportedLocale : 'es'
}

const i18n = createI18n({
  // Usar Composition API para mejor compatibilidad con Vue 3
  legacy: false,
  
  // Idioma por defecto basado en el navegador
  locale: getDefaultLocale(),
  
  // Idioma de respaldo si no se encuentra una traducción
  fallbackLocale: 'es',
  
  // Mensajes de traducción
  messages: {
    es,
    en
  },
  
  // Configuraciones adicionales
  globalInjection: true, // Permite usar $t en templates
  warnHtmlMessage: false, // Deshabilita warnings para HTML en traducciones
})

export default i18n

// Exportar función para cambiar idioma programáticamente
export function setLocale(locale: SupportedLocale) {
  i18n.global.locale.value = locale
}

// Exportar función para obtener idioma actual
export function getCurrentLocale(): SupportedLocale {
  return i18n.global.locale.value as SupportedLocale
}

// Exportar idiomas disponibles
export const availableLocales = [
  { value: 'es', label: 'Español' },
  { value: 'en', label: 'English' }
] as const