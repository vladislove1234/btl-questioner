/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  readonly VITE_SUBMIT_URL?: string
  readonly VITE_SUBMIT_TOKEN?: string
  readonly VITE_IDLE_RESET_SECONDS?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
