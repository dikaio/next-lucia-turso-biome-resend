"use client";

import FormButton from "@/components/form-button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/actions/auth";
import { SignInSchema } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

export function SignInForm() {
	const [isPending, setIsPending] = useState(false);
	const router = useRouter();
	const form = useForm<z.infer<typeof SignInSchema>>({
		resolver: zodResolver(SignInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof SignInSchema>) {
		setIsPending(true);
		const res = await signIn(values);
		if (res.error) {
			toast(res.error);
			setIsPending(false);
		} else if (res.success) {
			toast("Signed in successfully");
			setTimeout(() => {
				setIsPending(false);
				router.push("/account");
			}, 5000);
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="mb-5">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										placeholder="user@example.com"
										autoComplete="email"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="mb-5">
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										autoComplete="current-password"
										placeholder="********"
										type="password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormButton
					size="lg"
					isPending={isPending}
					variant="default"
					defaultText="Sign in"
					className="w-full"
				/>
			</form>
		</Form>
	);
}
