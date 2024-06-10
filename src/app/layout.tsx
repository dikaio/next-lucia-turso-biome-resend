import { cn } from "@/utils/helpers";
import { GeistMono as geist_mono } from "geist/font/mono";
import { GeistSans as geist_sans } from "geist/font/sans";
import type { Metadata } from "next";
import "@/styles/tailwind.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { APP } from "@/utils/constants";

export const metadata: Metadata = {
	metadataBase: new URL(`${APP.URL}`),
	title: {
		default: APP.NAME,
		template: `%s - ${APP.NAME}`,
	},
	description: APP.DESCRIPTION,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning className="h-full">
			<body className={cn("h-full", geist_sans.variable, geist_mono.variable)}>
				<Providers
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</Providers>
				<Toaster />
			</body>
		</html>
	);
}
