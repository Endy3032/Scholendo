const { withPayload } = require("@payloadcms/next-payload")
const path = require("path")

/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		typedRoutes: true,
		serverActions: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	reactStrictMode: false,
	images: {
		domains: [
			"localhost",
			process.env.NEXT_PUBLIC_APP_URL,
		],
	},
}


module.exports = withPayload(nextConfig, { configPath: path.resolve(__dirname, "payload", "payload.config.ts") })
