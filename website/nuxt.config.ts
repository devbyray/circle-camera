// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	devtools: { enabled: true },
	css: ['~/assets/css/main.css'],
	modules: ['@nuxt/content', '@nuxt/fonts', '@nuxt/icon', '@nuxt/image'],
	vite: {
		plugins: [tailwindcss()]
	},
	content: {
		experimental: { nativeSqlite: true }
	}
})
