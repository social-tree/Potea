declare module '*.svg' {
  const content: string
  export default content
}

declare module '@env' {
  export const SUPABASE_URL: string
  export const SUPABASE_ANON_KEY: string
}
