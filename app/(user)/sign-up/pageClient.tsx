"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
	username: z.string().min(2).max(32),
	name: z.string().min(8).max(32),
	email: z.string().email(),
	password: z.string().min(8),
	confirmPassword: z.string().min(8),
}).superRefine(({ password, confirmPassword }, ctx) => {
	if (password !== confirmPassword) {
		ctx.addIssue({
			code: "custom",
			message: "Passwords do not match",
			path: ["confirmPassword"],
		})
	}
})

const SignUp = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		mode: "onChange",
		defaultValues: {
			username: "",
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values)
	}

	return (
		<>
			<h1>Sign Up to CTin2225 Hub</h1>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="max-h-min h-min space-y-4 max-w-[30rem] w-full mx-4">
					<FormField control={form.control} name="username" render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input placeholder="icyalmond" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)} />
					<FormField control={form.control} name="name" render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder="Vũ Gia Bảo" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)} />
					<FormField control={form.control} name="email" render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="icyalmond@example.com" type="email" {...field} />
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
					<FormField control={form.control} name="confirmPassword" render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm password</FormLabel>
							<FormControl>
								<Input placeholder="••••••••" type="password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)} />
					<Button type="submit">Sign up</Button>
				</form>
			</Form>
		</>
	)
}

export default SignUp
