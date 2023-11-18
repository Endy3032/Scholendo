export const payloadApiUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}/api`
	: `${process.env.PAYLOAD_CMS_URL ?? process.env.NEXT_PUBLIC_APP_URL}/api`
