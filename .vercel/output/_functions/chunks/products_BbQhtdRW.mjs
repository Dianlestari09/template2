import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { c as getAllProducts, n as createProduct } from "./db_CQnXq70y.mjs";
//#region src/pages/api/products.ts
var products_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var GET = async () => {
	try {
		const products = await getAllProducts();
		return new Response(JSON.stringify(products), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("GET /api/products error:", error && (error.stack || error.message || error));
		return new Response(JSON.stringify({ error: String(error && (error.message || error) || "Unknown error") }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
var POST = async ({ request }) => {
	try {
		const productId = await createProduct(await request.json());
		return new Response(JSON.stringify({ id: productId }), {
			status: 201,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("POST /api/products error:", error && (error.stack || error.message || error));
		return new Response(JSON.stringify({ error: String(error && (error.message || error) || "Unknown error") }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/products@_@ts
var page = () => products_exports;
//#endregion
export { page };
