import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { l as getAllProjects, r as createProject } from "./db_CQnXq70y.mjs";
//#region src/pages/api/projects.ts
var projects_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var GET = async () => {
	try {
		const projects = await getAllProjects();
		return new Response(JSON.stringify(projects), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("GET /api/projects error:", error && (error.stack || error.message || error));
		return new Response(JSON.stringify({ error: String(error && (error.message || error) || "Unknown error") }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
var POST = async ({ request }) => {
	try {
		const projectId = await createProject(await request.json());
		return new Response(JSON.stringify({ id: projectId }), {
			status: 201,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("POST /api/projects error:", error && (error.stack || error.message || error));
		return new Response(JSON.stringify({ error: String(error && (error.message || error) || "Unknown error") }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/projects@_@ts
var page = () => projects_exports;
//#endregion
export { page };
