import { createServerFileRoute } from "@tanstack/react-start/server";
import type { Browser } from "puppeteer-core";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import { z } from "zod";
import { fetchClerkAuth } from "@/lib/auth";

const generatePdfRequestSchema = z.object({
	html: z.string().min(10).max(100_000),
});

export const ServerRoute = createServerFileRoute(
	"/_authed/generate/pdf",
).methods({
	POST: async ({ request }) => {
		const { userId } = await fetchClerkAuth();
		if (!userId) {
			return new Response("You are not authorized to do this.", {
				status: 401,
			});
		}
		const body = await request.json();
		const { html } = await generatePdfRequestSchema.parseAsync(body);
		let browser: Browser | null = null;
		try {
			browser = await puppeteer.launch({
				args: puppeteer.defaultArgs({ args: chromium.args, headless: "shell" }),
				executablePath: await chromium.executablePath(),
				headless: "shell",
			});

			const page = await browser.newPage();
			await page.setContent(html, {
				waitUntil: "networkidle0",
			});

			const pdfBuffer = await page.pdf({
				format: "A4",
				printBackground: true,
			});

			const bff = Buffer.from(pdfBuffer);

			return new Response(bff, {
				headers: {
					"Content-Type": "application/pdf",
				},
			});
		} catch (error) {
			console.error("PDF generation failed:", error);
			return new Response("Failed to generate PDF", { status: 500 });
		} finally {
			await browser?.close();
		}
	},
});
