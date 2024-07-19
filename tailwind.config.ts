import type { Config } from "tailwindcss"
import twAnimate from "tailwindcss-animate"
import { black, blue, current, emerald, inherit, orange, red, teal, transparent, white, yellow, zinc } from "tailwindcss/colors"
import plugin from "tailwindcss/plugin"

const config = {
	content: [
		"./src/app/**/*.{ts,tsx}",
		"./src/components/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		colors: {
			inherit,
			current,
			transparent,
			black,
			white,
			gray: zinc,
			red,
			orange,
			yellow,
			green: emerald,
			teal,
			blue,
		},
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [
		twAnimate,
		plugin(function({ addBase, theme }) {
			addBase({
				h1: { fontSize: theme("fontSize.2xl"), fontWeight: theme("fontWeight.bold") },
				h2: { fontSize: theme("fontSize.xl"), fontWeight: theme("fontWeight.semibold") },
				h3: { fontSize: theme("fontSize.lg"), fontWeight: theme("fontWeight.medium") },
			})
		}),
	],
} satisfies Config

export default config
