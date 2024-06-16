import { SignInForm } from "@/components/sign-in-form";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SignInPage() {
	const { user } = await validateRequest();

	if (user) {
		return redirect("/account");
	}

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<div className="w-80 mx-auto">
				<SignInForm />
			</div>
		</div>
	);
}
