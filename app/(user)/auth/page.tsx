import { AlertProvider } from "hooks/alert"
import { Metadata } from "next"
import Auth from "./pageClient"
import { TabProvider } from "./tabContext"

export const metadata: Metadata = {
	title: "Authenticate",
}

const AuthPage = () => (
	<AlertProvider>
		<TabProvider>
			<Auth />
		</TabProvider>
	</AlertProvider>
)

export default AuthPage
