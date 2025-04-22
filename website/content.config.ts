import { defineContentConfig, defineCollection, z } from '@nuxt/content'
import { version } from 'vue'

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
				author: z.string(),
			})
		}),
		// Define a general 'content' collection for other content
		changelog: defineCollection({
		  type: 'page',
		  source: {
		    include: 'changelog/*.md',
			},
		  schema: z.object({
				title: z.string(),
				date: z.date(),
				description: z.string().optional(),
				version: z.string(),
			  	releaseUrl: z.string().url(),
				author: z.string(),
			})
		})
	}
})
