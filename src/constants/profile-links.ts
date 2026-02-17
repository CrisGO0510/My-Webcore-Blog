export interface ProfileLink {
  url: string;
}

export interface LanguageOption {
  label: string;
  value: string;
  flag: string;
}

export const PROFILE_LINKS = {
  GITHUB: {
    url: "https://github.com/CrisGO0510",
  },

  INSTAGRAM: {
    url: "https://www.instagram.com/cristhian_0510/",
  },

  LINKEDIN: {
    url: "https://www.linkedin.com/in/cristhian-giraldo-orozco-9137492a5/",
  },
} as const satisfies Record<string, ProfileLink>;

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  {
    label: "🇪🇸 Español",
    value: "es",
    flag: "🇪🇸",
  },
  {
    label: "🇺🇸 English",
    value: "en",
    flag: "🇺🇸",
  },
] as const;

export const DEFAULT_LANGUAGE = "es";
