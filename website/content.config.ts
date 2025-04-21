import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
	collections: {
		// Define the 'blog' collection for blog posts
		blog: defineCollection({
			// Use appropriate type for markdown blog posts
			type: 'page',
			// Include all markdown files in the blog directory
			source: {
				include: 'blog/**/*.md'
			},
			schema: z.object({
				title: z.string(),
				date: z.date(),
				content: z.string(),
				description: z.string().optional(),
        tags: z.array(z.string()).optional(),
        image: z.string(),
			})
		})
		// Define a general 'content' collection for other content
		// content: defineCollection({
		//   type: 'page',
		//   source: {
		//     include: '**/*.md',
		//     exclude: ['blog/**/*.md'] // Exclude blog posts to avoid duplication
		//   }
		// })
	}
})
