import { SignUpForm } from "@/components/sign-up-form";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
	const { user } = await validateRequest();

	if (user) {
		return redirect("/account");
	}

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<div className="w-80 mx-auto">
				<SignUpForm />
			</div>
		</div>
	);
}
