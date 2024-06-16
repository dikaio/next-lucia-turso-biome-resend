import FormButton from "@/components/form-button";
import { signOut } from "@/lib/actions/auth";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
export default async function AccountPage() {
	const { user } = await validateRequest();

	if (!user) {
		return redirect("/signin");
	}

	return (
		<main>
			<p>{user.email}</p>
			<form action={signOut}>
				<FormButton
					size="default"
					variant="default"
					defaultText="Sign out"
					className="min-w-40"
				/>
			</form>
		</main>
	);
}
