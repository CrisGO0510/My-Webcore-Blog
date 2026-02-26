/**
 * TIPOS GLOBALES PARA COMPONENTES
 * 
 * Este archivo contiene todas las interfaces que usan los componentes
 * de la aplicación. Mantener centralizado facilita la consistencia.
 */

import type { Ref, ComputedRef } from 'vue'

// ==================== TIPOS BASE ====================

/**
 * Posiciones comunes para elementos en la pantalla
 */
export type Position = 'left' | 'center' | 'right' | 'top' | 'bottom'

/**
 * Tamaños estándar para componentes
 */
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

/**
 * Variantes de tema para componentes
 */
export type Variant = 'primary' | 'secondary' | 'accent' | 'danger' | 'warning' | 'success'

// ==================== COMPONENT PROPS ====================

/**
 * Props para el componente Heart3D
 */
export interface Heart3DProps {
  position: 'left' | 'right'
}

/**
 * Props para el componente Header
 */
export interface HeaderProps {
  // El header no recibe props actualmente, pero preparamos la interface
}

/**
 * Props para el componente DvdLogo
 */
export interface DvdLogoProps {
  // El DvdLogo no recibe props actualmente, pero preparamos la interface
}

/**
 * Props para el componente EyeTracker
 */
export interface EyeTrackerProps {
  // El EyeTracker no recibe props actualmente, pero preparamos la interface
}

// ==================== COMPONENT EMITS ====================

/**
 * Eventos que puede emitir el componente Header
 */
export interface HeaderEmits {
  // Definir cuando identifiquemos los eventos
}

/**
 * Eventos que puede emitir el componente Heart3D
 */
export interface Heart3DEmits {
  // Definir cuando identifiquemos los eventos
}

// ==================== TIPOS DE CONFIGURACIÓN ====================

/**
 * Configuración de animaciones Three.js
 */
export interface ThreeJSConfig {
  antialias: boolean
  alpha: boolean
  powerPreference: 'high-performance' | 'low-power' | 'default'
}

/**
 * Configuración de efectos visuales
 */
export interface VisualEffectsConfig {
  glowIntensity: number
  hueShift: number
  glowRadius: number
  scanlineDistortion: number
  purpleOpacity: number
}

// ==================== TIPOS DE DATOS ====================

/**
 * Estructura de traducciones para el Header
 */
export interface HeaderTranslations {
  title: string
  tooltips: {
    ankh: string
    github: string
    instagram: string
    language: string
  }
}

/**
 * Información de perfil para enlaces sociales
 */
export interface ProfileLink {
  url: string
  icon: string
  label: string
  color?: string
}

/**
 * Configuración de idioma
 */
export interface LanguageConfig {
  value: 'es' | 'en'
  label: string
}

/**
 * Tipo de idiomas soportados
 */
export type SupportedLanguage = 'es' | 'en'

/**
 * Return type del composable useGlobalLanguage
 */
export interface UseGlobalLanguageReturn {
  language: Ref<SupportedLanguage>
  languageInfo: ComputedRef<LanguageConfig>
  availableLanguages: readonly LanguageConfig[]
  changeLanguage: (newLang: SupportedLanguage) => void
  toggleLanguage: () => void
  initializeLanguage: () => void
  isSpanish: ComputedRef<boolean>
  isEnglish: ComputedRef<boolean>
}

/**
 * Offset del mouse para efectos visuales
 */
export interface MouseOffset {
  x: number
  y: number
}

/**
 * Efectos cyberpunk calculados
 */
export interface CyberpunkEffects {
  intensity: number
  hueShift: number
  glowRadius: number
  scanlineDistortion: number
}