/** @type {import('postcss-load-config').Config} */
const config = {
	plugins: {
		tailwindcss: {},
		autoprefixer: {},
		...(process.env.NODE_ENV !== "development" ? { cssnano: {} } : {})
	},
}

export default config
