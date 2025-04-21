<script setup>
import Accordion from '~/components/Accordion.vue'
import AccordionItem from '~/components/AccordionItem.vue'
</script>
<template>
	<div>
		<section class="py-20 md:py-32">
			<div class="container mx-auto px-4">
				<div class="max-w-4xl mx-auto text-center mb-16">
					<h1 class="mb-6">Download Circle Camera</h1>
					<p class="text-xl text-gray-400 mb-10">
						Get started with Circle Camera today - free for Windows and macOS.
					</p>
				</div>

				<div class="max-w-5xl mx-auto">
					<div class="grid md:grid-cols-2 gap-10">
						<!-- macOS Download -->
						<div class="bg-gray-900/50 p-10 rounded-xl border border-gray-800 text-center">
							<div class="w-20 h-20 mx-auto mb-6 dark:fill-gray-300">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
									<path
										d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
									/>
								</svg>
							</div>
							<h2 class="text-2xl mb-4">macOS</h2>
							<p class="text-gray-400 mb-6">Compatible with macOS 10.15 Catalina and newer</p>
							<a
								href="#"
								class="px-8 py-3 rounded-full bg-primary-dark hover:bg-primary text-white font-medium text-lg transition-colors inline-block"
							>
								Download for Mac
							</a>
							<p class="text-sm text-gray-500 mt-4">Version 1.0.0 - Released April 18, 2025</p>
						</div>

						<!-- Windows Download (Disabled) -->
						<div
							class=" p-10 rounded-xl border border-gray-800/50 text-center relative"
						>
							<div class="absolute inset-0 flex items-center justify-center">
								<span class="px-4 py-2 bg-primary mt-12 text-white rounded-full font-medium shadow-lg">
									Coming Soon</span
								>
							</div>
							<div class="filter grayscale blur-[1px] opacity-20">
								<div class="w-20 h-20 mx-auto mb-6 text-gray-400">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
										<path
											d="M0 93.7l183.6-25.3v177.4H0V93.7zm0 324.6l183.6 25.3V268.4H0v149.9zm203.8 28L448 480V268.4H203.8v177.9zm0-380.6v180.1H448V32L203.8 65.7z"
										/>
									</svg>
								</div>
								<h2 class="text-2xl mb-4 text-gray-500">Windows</h2>
								<p class="text-gray-500 mb-6">Compatible with Windows 10 and newer</p>
								<button
									disabled
									class="px-8 py-3 rounded-full bg-gray-700 text-gray-400 font-medium text-lg inline-block cursor-not-allowed"
								>
									Download for Windows
								</button>
								<p class="text-sm text-gray-600 mt-4">Version 1.0.0 - Coming Soon</p>
							</div>
						</div>
					</div>

					<!-- Installation Instructions -->
					<div class="mt-20">
						<h2 class="text-center mb-12">Installation Guide</h2>

						<div class="space-y-8">
							<!-- macOS Instructions -->
							<div class="bg-gray-900/30 p-8 rounded-xl">
								<h3 class="mb-4">Installing on macOS</h3>
								<ol class="list-decimal list-inside space-y-4 text-gray-300">
									<li>Download the DMG file using the button above</li>
									<li>Open the downloaded file</li>
									<li>Drag Circle Camera to your Applications folder</li>
									<li>Open Circle Camera from your Applications folder</li>
									<li>
										If you see a security warning, go to System Preferences > Security & Privacy and
										click "Open Anyway"
									</li>
								</ol>
							</div>

							<!-- Windows Instructions -->
							<div class="bg-gray-900/30 p-8 rounded-xl opacity-70">
								<h3 class="mb-4 text-gray-500">Installing on Windows</h3>
								<ol class="list-decimal list-inside space-y-4 text-gray-500">
									<li>Download the installer using the button above</li>
									<li>Open the downloaded file</li>
									<li>If SmartScreen appears, click "More info" and then "Run anyway"</li>
									<li>Follow the installation wizard instructions</li>
									<li>Launch Circle Camera from the Start menu or desktop shortcut</li>
								</ol>
							</div>
						</div>
					</div>

					<!-- FAQ Section -->
					<div class="mt-20">
						<h2 class="text-center mb-12">Frequently Asked Questions</h2>
						
						<Accordion :singleOpen="true">
							<AccordionItem title="Is Circle Camera free?">
								<p class="text-gray-700 dark:text-gray-300">
									Yes! Circle Camera is completely free to download and use. We may introduce premium features in the future, but the core functionality will always remain free.
								</p>
							</AccordionItem>
							
							<AccordionItem title="Can I use Circle Camera with any video conferencing app?">
								<p class="text-gray-700 dark:text-gray-300">
									Absolutely! Circle Camera works with Zoom, Microsoft Teams, Google Meet, Webex, and any other application that can access your webcam.
								</p>
							</AccordionItem>
							
							<AccordionItem title="What are the system requirements?">
								<p class="text-gray-700 dark:text-gray-300">
									Circle Camera is designed to be lightweight. It runs on macOS 10.15+ and Windows 10+. We recommend at least 4GB of RAM and any webcam compatible with your operating system.
								</p>
							</AccordionItem>

							<AccordionItem title="How do I change the border color?">
								<p class="text-gray-700 dark:text-gray-300">
									Click on the settings icon in the app, then select the "Colors" tab. From there, you can choose from preset colors or enter a custom HEX value.
								</p>
							</AccordionItem>
							
							<AccordionItem title="Does Circle Camera record video?">
								<p class="text-gray-700 dark:text-gray-300">
									No, Circle Camera is designed to be a live webcam feed only. It doesn't have recording capabilities to keep the app lightweight and focused on its core purpose.
								</p>
							</AccordionItem>
						</Accordion>
						
						<div class="text-center mt-12">
							<NuxtLink to="/faq" class="text-blue-600 dark:text-blue-500 hover:text-blue-500 dark:hover:text-blue-400">
								View all FAQs →
							</NuxtLink>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<style scoped>
/* Make SVG icons lighter in dark mode */
img[src$='.svg'] {
	filter: brightness(1.5);
}
</style>
