// theme.client.ts - Only runs on client side
export default defineNuxtPlugin(() => {
  // Check for theme preference in localStorage or use system preference
  const theme = localStorage.getItem('theme')
  const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
  
  // Apply the theme immediately
  if (theme === 'dark' || (!theme && systemDarkMode)) {
    document.documentElement.classList.add('dark')
  } else if (theme === 'light' || (!theme && !systemDarkMode)) {
    document.documentElement.classList.remove('dark')
  }
})