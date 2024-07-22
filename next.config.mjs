import { withPayload } from "@payloadcms/next/withPayload"

/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/i,
			use: ["@svgr/webpack"],
		})

		return config
	},
}

export default withPayload(nextConfig)
