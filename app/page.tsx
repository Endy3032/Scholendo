import Link from "next/link"
import { getPayloadClient } from "payload/client"

const Page = async () => {
	// const payload = await getPayloadClient()
	// const data = await payload.find({
	// 	collection: "activities",
	// })

	return (
		<div>
			<h1>User links</h1>
			<ul>
				<li>
					<Link href="/sign-up">Sign Up</Link>
				</li>
				<li>
					<Link href="/sign-in">Sign In</Link>
				</li>
				<li>
					<Link href="/sign-out">Sign Out</Link>
				</li>
				<li>
					<Link href="/auth">Authenticate</Link>
				</li>
			</ul>
		</div>
	)
}

export default Page
