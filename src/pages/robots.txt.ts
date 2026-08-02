import type { APIRoute } from "astro";

const siteRoot = new URL(import.meta.env.BASE_URL, import.meta.env.SITE);
const robotsTxt = `
User-agent: *
Disallow: ${new URL("_astro/", siteRoot).pathname}

Sitemap: ${new URL("sitemap-index.xml", siteRoot).href}
`.trim();

export const GET: APIRoute = () => {
	return new Response(robotsTxt, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	});
};
