import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import AutoImport from "astro-auto-import";
import react from "@astrojs/react";
import keystatic from "@keystatic/astro";
import netlify from "@astrojs/netlify";
import compress from "@playform/compress";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
	site: "https://vitodinghr.github.io",
	adapter: netlify({
		imageCDN: false,
	}),
	redirects: {
		"/admin": "/keystatic",
	},
	// i18n configuration must match src/config/translations.json.ts
	i18n: {
		defaultLocale: "en",
		locales: ["en", "fr"],
		routing: {
			prefixDefaultLocale: false,
		},
	},
	markdown: {
		shikiConfig: {
			// Shiki Themes: https://shiki.style/themes
			theme: "css-variables",
			wrap: true,
		},
	},
	integrations: [
		// example auto import component into blog post mdx files
		AutoImport({
			imports: [
				// https://github.com/delucis/astro-auto-import
				"@components/admonition/Admonition.astro",
			],
		}),
		mdx(),
		react(),
		icon(),
		keystatic(),
		sitemap(),
		compress({
			HTML: true,
			JavaScript: true,
			CSS: true,
			Image: false, // astro:assets handles this. Enabling this can dramatically increase build times
			SVG: false, // astro-icon handles this
		}),
	],

	vite: {
		plugins: [tailwindcss()],
		// stop inlining short scripts to fix issues with ClientRouter: https://github.com/withastro/astro/issues/12804
		build: {
			assetsInlineLimit: 0,
		},
	},

	// this is used by default with Starwind UI
	experimental: {
		svg: {
			mode: "sprite",
		},
	},
});
