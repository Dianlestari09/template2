import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { s as getAllPosts, t as createPost } from "./db_D5UdyGFH.mjs";
//#region src/pages/api/posts.ts
var posts_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var GET = async () => {
	try {
		const posts = await getAllPosts();
		return new Response(JSON.stringify(posts), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("GET /api/posts error:", error && (error.stack || error.message || error));
		const payload = { error: String(error && (error.message || error) || "Unknown error") };
		if (process.env.NODE_ENV !== "production" && error && error.stack) payload.stack = error.stack;
		return new Response(JSON.stringify(payload), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
var POST = async ({ request }) => {
	try {
		const postId = await createPost(await request.json());
		return new Response(JSON.stringify({ id: postId }), {
			status: 201,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/posts@_@ts
var page = () => posts_exports;
//#endregion
export { page };
