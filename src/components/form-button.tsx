"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/helpers";
import { Loader2 } from "lucide-react";
import type React from "react";
import { useFormStatus } from "react-dom";

export default function FormButton({
	size = "default",
	variant = "default",
	defaultText,
	isPending,
	className,
}: {
	size: "default" | "sm" | "lg" | "icon";
	variant:
		| "ghost"
		| "default"
		| "outline"
		| "destructive"
		| "secondary"
		| "link";
	defaultText: string;
	isPending?: boolean;
	className?: string;
}) {
	const { pending } = useFormStatus();
	return (
		<Button
			variant={variant}
			size={size}
			type="submit"
			disabled={pending || isPending}
			className={cn(className)}
		>
			{pending || isPending ? (
				<Loader2 className="w-4 h-4 animate-spin" />
			) : (
				defaultText
			)}
		</Button>
	);
}
