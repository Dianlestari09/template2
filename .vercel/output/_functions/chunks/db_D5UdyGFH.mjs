import { createClient } from "@supabase/supabase-js";
//#region src/lib/db.ts
var supabaseUrl = process.env.SUPABASE_URL || "";
var supabaseKey = process.env.SUPABASE_KEY || "";
var supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;
function normalizeTags(tags) {
	if (!tags) return "[]";
	if (Array.isArray(tags)) return JSON.stringify(tags.filter(Boolean));
	try {
		const parsed = JSON.parse(tags);
		if (Array.isArray(parsed)) return JSON.stringify(parsed);
	} catch {}
	const normalized = String(tags).split(",").map((tag) => tag.trim()).filter(Boolean);
	return JSON.stringify(normalized);
}
function normalizeJson(value) {
	if (value === void 0 || value === null) return null;
	if (typeof value === "string") {
		try {
			const parsed = JSON.parse(value);
			if (typeof parsed === "object") return JSON.stringify(parsed);
		} catch {
			const raw = value.trim();
			if (raw.indexOf("\n") !== -1 || raw.indexOf(",") !== -1) {
				const arr = raw.split(/\r?\n|,/).map((s) => s.trim()).filter(Boolean);
				return JSON.stringify(arr);
			}
			return JSON.stringify(raw);
		}
		return value;
	}
	if (typeof value === "object") return JSON.stringify(value);
	return String(value);
}
async function getPost(id) {
	if (!supabase) return null;
	const { data, error } = await supabase.from("blog_posts").select("*").eq("id", id).single();
	if (error && error.code !== "PGRST116") {
		console.error("getPost error:", error.message);
		return null;
	}
	return data;
}
async function getAllPosts() {
	if (!supabase) return [];
	const { data, error } = await supabase.from("blog_posts").select("*").order("published_at", { ascending: false });
	if (error) {
		console.error("getAllPosts error:", error.message);
		return [];
	}
	return data || [];
}
async function getPostBySlug(slug) {
	if (!supabase) return null;
	const { data, error } = await supabase.from("blog_posts").select("*").eq("slug", slug).single();
	if (error && error.code !== "PGRST116") {
		console.error("getPostBySlug error:", error.message);
		return null;
	}
	return data;
}
async function createPost(data) {
	if (!supabase) return null;
	const insertData = {
		title: data.title,
		slug: data.slug,
		excerpt: data.excerpt,
		content: data.content,
		cover_image: data.cover_image || null,
		read_time: data.read_time || 0,
		is_featured: data.is_featured ? true : false,
		tags: normalizeTags(data.tags)
	};
	const { data: result, error } = await supabase.from("blog_posts").insert([insertData]).select("id").single();
	if (error) {
		console.error("createPost error:", error.message);
		return null;
	}
	return result?.id;
}
async function updatePost(id, data) {
	if (!supabase) return;
	const updateData = {};
	if (data.title) updateData.title = data.title;
	if (data.slug) updateData.slug = data.slug;
	if (data.excerpt) updateData.excerpt = data.excerpt;
	if (data.content) updateData.content = data.content;
	if (data.cover_image !== void 0) updateData.cover_image = data.cover_image || null;
	if (data.read_time !== void 0) updateData.read_time = data.read_time;
	if (data.is_featured !== void 0) updateData.is_featured = data.is_featured ? true : false;
	if (data.tags !== void 0) updateData.tags = normalizeTags(data.tags);
	if (Object.keys(updateData).length === 0) return;
	const { error } = await supabase.from("blog_posts").update(updateData).eq("id", id);
	if (error) console.error("updatePost error:", error.message);
}
async function deletePost(id) {
	if (!supabase) return;
	const { error } = await supabase.from("blog_posts").delete().eq("id", id);
	if (error) console.error("deletePost error:", error.message);
}
async function getProject(id) {
	if (!supabase) return null;
	const { data, error } = await supabase.from("projects").select("*").eq("id", id).single();
	if (error && error.code !== "PGRST116") {
		console.error("getProject error:", error.message);
		return null;
	}
	return data;
}
async function getAllProjects() {
	if (!supabase) return [];
	const { data, error } = await supabase.from("projects").select("*").order("featured", { ascending: false }).order("year", { ascending: false }).order("published_at", { ascending: false });
	if (error) {
		console.error("getAllProjects error:", error.message);
		return [];
	}
	return data || [];
}
async function getProjectBySlug(slug) {
	if (!supabase) return null;
	const { data, error } = await supabase.from("projects").select("*").eq("slug", slug).single();
	if (error && error.code !== "PGRST116") {
		console.error("getProjectBySlug error:", error.message);
		return null;
	}
	return data;
}
async function createProject(data) {
	if (!supabase) return null;
	const insertData = {
		title: data.title,
		slug: data.slug,
		summary: data.summary,
		description: data.description || null,
		content: data.content || null,
		cover_image: data.cover_image || null,
		cover_alt: data.cover_alt || null,
		tech: normalizeJson(data.tech || "[]"),
		role: data.role || null,
		year: data.year || null,
		featured: data.featured ? true : false,
		client: data.client || null,
		duration: data.duration || null,
		links: normalizeJson(data.links || "{}"),
		images: normalizeJson(data.images || "[]")
	};
	const { data: result, error } = await supabase.from("projects").insert([insertData]).select("id").single();
	if (error) {
		console.error("createProject error:", error.message);
		return null;
	}
	return result?.id;
}
async function updateProject(id, data) {
	if (!supabase) return;
	const updateData = {};
	if (data.title) updateData.title = data.title;
	if (data.slug) updateData.slug = data.slug;
	if (data.summary) updateData.summary = data.summary;
	if (data.description !== void 0) updateData.description = data.description || null;
	if (data.content !== void 0) updateData.content = data.content || null;
	if (data.cover_image !== void 0) updateData.cover_image = data.cover_image || null;
	if (data.cover_alt !== void 0) updateData.cover_alt = data.cover_alt || null;
	if (data.tech !== void 0) updateData.tech = normalizeJson(data.tech || "[]");
	if (data.role !== void 0) updateData.role = data.role || null;
	if (data.year !== void 0) updateData.year = data.year || null;
	if (data.featured !== void 0) updateData.featured = data.featured ? true : false;
	if (data.client !== void 0) updateData.client = data.client || null;
	if (data.duration !== void 0) updateData.duration = data.duration || null;
	if (data.links !== void 0) updateData.links = normalizeJson(data.links || "{}");
	if (data.images !== void 0) updateData.images = normalizeJson(data.images || "[]");
	if (Object.keys(updateData).length === 0) return;
	const { error } = await supabase.from("projects").update(updateData).eq("id", id);
	if (error) console.error("updateProject error:", error.message);
}
async function deleteProject(id) {
	if (!supabase) return;
	const { error } = await supabase.from("projects").delete().eq("id", id);
	if (error) console.error("deleteProject error:", error.message);
}
async function getProduct(id) {
	if (!supabase) return null;
	const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
	if (error && error.code !== "PGRST116") {
		console.error("getProduct error:", error.message);
		return null;
	}
	return data;
}
async function getAllProducts() {
	if (!supabase) return [];
	const { data, error } = await supabase.from("products").select("*").order("published_at", { ascending: false });
	if (error) {
		console.error("getAllProducts error:", error.message);
		return [];
	}
	return data || [];
}
async function createProduct(data) {
	if (!supabase) return null;
	const insertData = {
		title: data.title,
		slug: data.slug,
		excerpt: data.excerpt,
		content: data.content,
		cover_image: data.cover_image || null,
		link: data.link || null,
		price: data.price || null,
		is_featured: data.is_featured ? true : false,
		tags: normalizeTags(data.tags)
	};
	const { data: result, error } = await supabase.from("products").insert([insertData]).select("id").single();
	if (error) {
		console.error("createProduct error:", error.message);
		return null;
	}
	return result?.id;
}
async function updateProduct(id, data) {
	if (!supabase) return;
	const updateData = {};
	if (data.title) updateData.title = data.title;
	if (data.slug) updateData.slug = data.slug;
	if (data.excerpt) updateData.excerpt = data.excerpt;
	if (data.content) updateData.content = data.content;
	if (data.cover_image !== void 0) updateData.cover_image = data.cover_image || null;
	if (data.link !== void 0) updateData.link = data.link || null;
	if (data.price !== void 0) updateData.price = data.price || null;
	if (data.is_featured !== void 0) updateData.is_featured = data.is_featured ? true : false;
	if (data.tags !== void 0) updateData.tags = normalizeTags(data.tags);
	if (Object.keys(updateData).length === 0) return;
	const { error } = await supabase.from("products").update(updateData).eq("id", id);
	if (error) console.error("updateProduct error:", error.message);
}
async function deleteProduct(id) {
	if (!supabase) return;
	const { error } = await supabase.from("products").delete().eq("id", id);
	if (error) console.error("deleteProduct error:", error.message);
}
//#endregion
export { updateProject as _, deleteProduct as a, getAllProducts as c, getPostBySlug as d, getProduct as f, updateProduct as g, updatePost as h, deletePost as i, getAllProjects as l, getProjectBySlug as m, createProduct as n, deleteProject as o, getProject as p, createProject as r, getAllPosts as s, createPost as t, getPost as u };
