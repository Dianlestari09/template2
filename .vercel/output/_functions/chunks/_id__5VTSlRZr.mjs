import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { _ as updateProject, o as deleteProject, p as getProject } from "./db_D5UdyGFH.mjs";
//#region src/pages/api/projects/[id].ts
var _id__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	PUT: () => PUT,
	prerender: () => false
});
var GET = async ({ params }) => {
	try {
		const project = await getProject(parseInt(params.id));
		if (!project) return new Response(JSON.stringify({ error: "Project not found" }), {
			status: 404,
			headers: { "Content-Type": "application/json" }
		});
		return new Response(JSON.stringify(project), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("GET /api/projects/:id error:", error && (error.stack || error.message || error));
		return new Response(JSON.stringify({ error: String(error && (error.message || error) || "Unknown error") }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
var PUT = async ({ params, request }) => {
	try {
		await updateProject(parseInt(params.id), await request.json());
		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("PUT /api/projects/:id error:", error && (error.stack || error.message || error));
		return new Response(JSON.stringify({ error: String(error && (error.message || error) || "Unknown error") }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
var DELETE = async ({ params }) => {
	try {
		await deleteProject(parseInt(params.id));
		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("DELETE /api/projects/:id error:", error && (error.stack || error.message || error));
		return new Response(JSON.stringify({ error: String(error && (error.message || error) || "Unknown error") }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/projects/[id]@_@ts
var page = () => _id__exports;
//#endregion
export { page };
