"use client"

import { Button } from "/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "/components/ui/form"
import { Input } from "/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import * as z from "zod"
import styles from "../../styles.module.css"
import ForgotPassword from "./forgotPassword"

const formSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
})

const SignIn = () => {
	const router = useRouter()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		mode: "onChange",
		defaultValues: {
			email: "",
			password: "",
		},
	})

	const { formState: { errors } } = form

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const result = await fetch(`/api/users/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: values.email,
					password: values.password,
				}),
			})

			const data = await result.json()

			if (!result.ok) {
				form.setError("root.login", {
					type: "validate",
					message: data.errors[0].message,
				})
			} else if (data.message == "Auth Passed") router.push("/")
		} catch (e) {
			console.error(e)
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
				<FormField control={form.control} name="email" render={({ field }) => (
					<FormItem>
						<FormLabel>Email</FormLabel>
						<FormControl>
							<Input placeholder="icyalmond@example.com" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)} />
				<FormField control={form.control} name="password" render={({ field }) => (
					<FormItem>
						<FormLabel>Password</FormLabel>
						<FormControl>
							<Input placeholder="••••••••" type="password" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)} />
				{errors.root?.login && <p className="text-red-500">{errors.root.login.message}</p>}
				<ForgotPassword />
				<Button type="submit">Sign in</Button>
			</form>
		</Form>
	)
}

export default SignIn
