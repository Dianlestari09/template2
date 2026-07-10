import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { a as deleteProduct, f as getProduct, g as updateProduct } from "./db_CQnXq70y.mjs";
//#region src/pages/api/products/[id].ts
var _id__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	PUT: () => PUT,
	prerender: () => false
});
var GET = async ({ params }) => {
	try {
		const product = await getProduct(parseInt(params.id));
		if (!product) return new Response(JSON.stringify({ error: "Product not found" }), {
			status: 404,
			headers: { "Content-Type": "application/json" }
		});
		return new Response(JSON.stringify(product), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("GET /api/products/:id error:", error && (error.stack || error.message || error));
		return new Response(JSON.stringify({ error: String(error && (error.message || error) || "Unknown error") }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
var PUT = async ({ params, request }) => {
	try {
		await updateProduct(parseInt(params.id), await request.json());
		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("PUT /api/products/:id error:", error && (error.stack || error.message || error));
		return new Response(JSON.stringify({ error: String(error && (error.message || error) || "Unknown error") }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
var DELETE = async ({ params }) => {
	try {
		await deleteProduct(parseInt(params.id));
		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("DELETE /api/products/:id error:", error && (error.stack || error.message || error));
		return new Response(JSON.stringify({ error: String(error && (error.message || error) || "Unknown error") }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/products/[id]@_@ts
var page = () => _id__exports;
//#endregion
export { page };
