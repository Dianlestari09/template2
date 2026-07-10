import mysql from "mysql2/promise";
import fs from "fs/promises";
import os from "os";
import path from "path";
//#region src/lib/db.ts
var pool = typeof process.env.DB_HOST !== "undefined" && typeof process.env.DB_USER !== "undefined" && typeof process.env.DB_NAME !== "undefined" ? mysql.createPool({
	host: process.env.DB_HOST || "localhost",
	port: parseInt(process.env.DB_PORT || "3306"),
	user: process.env.DB_USER || "root",
	password: process.env.DB_PASSWORD || "",
	database: process.env.DB_NAME || "blog",
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
}) : null;
function getTempDevPath(filePath) {
	return path.join(os.tmpdir(), "astro-dev-data", path.basename(filePath));
}
async function tryReadFile(filePath) {
	try {
		return await fs.readFile(filePath, "utf8");
	} catch (err) {
		if (err.code === "ENOENT") return null;
		throw err;
	}
}
async function query(sql, values) {
	if (!pool) throw new Error("Database not configured");
	const connection = await pool.getConnection();
	try {
		const [results] = await connection.execute(sql, values);
		return results;
	} finally {
		connection.release();
	}
}
var DEV_POSTS_PATH = path.join(process.cwd(), "src", "data", "dev-posts.json");
var DEV_PROJECTS_PATH = path.join(process.cwd(), "src", "data", "dev-projects.json");
var DEV_PRODUCTS_PATH = path.join(process.cwd(), "src", "data", "dev-products.json");
async function loadDevData(filePath) {
	const fallbackPath = getTempDevPath(filePath);
	const primary = await tryReadFile(filePath);
	if (primary !== null) try {
		const parsed = JSON.parse(primary);
		if (Array.isArray(parsed)) return parsed;
	} catch {}
	const fallback = await tryReadFile(fallbackPath);
	if (fallback !== null) try {
		const parsed = JSON.parse(fallback);
		if (Array.isArray(parsed)) return parsed;
	} catch {}
	return [];
}
async function saveDevData(filePath, data) {
	const payload = JSON.stringify(data, null, 2);
	const tempPath = getTempDevPath(filePath);
	try {
		await fs.mkdir(path.dirname(filePath), { recursive: true });
		await fs.writeFile(filePath, payload, "utf8");
		return;
	} catch (err) {
		if (err.code !== "EACCES" && err.code !== "EPERM" && err.code !== "EISDIR" && err.code !== "ENOENT") throw err;
	}
	await fs.mkdir(path.dirname(tempPath), { recursive: true });
	await fs.writeFile(tempPath, payload, "utf8");
}
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
async function loadDevPosts() {
	return loadDevData(DEV_POSTS_PATH);
}
async function saveDevPosts(posts) {
	await saveDevData(DEV_POSTS_PATH, posts);
}
async function getPost(id) {
	try {
		return (await query("SELECT * FROM blog_posts WHERE id = ?", [id]))[0];
	} catch (err) {
		console.error("getPost: DB error, falling back to file store", err && (err.code || err.message || err));
		return (await loadDevPosts()).find((p) => Number(p.id) === Number(id));
	}
}
async function getAllPosts() {
	try {
		return await query("SELECT * FROM blog_posts ORDER BY published_at DESC");
	} catch (err) {
		console.error("getAllPosts: DB error, falling back to file store", err && (err.code || err.message || err));
		return (await loadDevPosts()).sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
	}
}
async function getPostBySlug(slug) {
	try {
		return (await query("SELECT * FROM blog_posts WHERE slug = ? LIMIT 1", [slug]))[0];
	} catch (err) {
		console.error("getPostBySlug: DB error, falling back to file store", err && (err.code || err.message || err));
		return (await loadDevPosts()).find((p) => p.slug === slug);
	}
}
async function createPost(data) {
	try {
		return (await query(`INSERT INTO blog_posts (title, slug, excerpt, content, cover_image, read_time, is_featured, tags, published_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`, [
			data.title,
			data.slug,
			data.excerpt,
			data.content,
			data.cover_image || null,
			data.read_time || 0,
			data.is_featured ? 1 : 0,
			normalizeTags(data.tags)
		])).insertId;
	} catch (err) {
		console.error("createPost: DB error, falling back to file store", err && (err.code || err.message || err));
		const posts = await loadDevPosts();
		const id = posts.reduce((m, p) => Math.max(m, Number(p.id) || 0), 0) + 1;
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const p = {
			id,
			title: data.title,
			slug: data.slug,
			excerpt: data.excerpt,
			content: data.content,
			cover_image: data.cover_image || null,
			read_time: data.read_time || 0,
			is_featured: data.is_featured ? 1 : 0,
			tags: normalizeTags(data.tags),
			published_at: now
		};
		posts.push(p);
		await saveDevPosts(posts);
		return id;
	}
}
async function updatePost(id, data) {
	const fields = [];
	const values = [];
	if (data.title) {
		fields.push("title = ?");
		values.push(data.title);
	}
	if (data.slug) {
		fields.push("slug = ?");
		values.push(data.slug);
	}
	if (data.excerpt) {
		fields.push("excerpt = ?");
		values.push(data.excerpt);
	}
	if (data.content) {
		fields.push("content = ?");
		values.push(data.content);
	}
	if (data.cover_image !== void 0) {
		fields.push("cover_image = ?");
		values.push(data.cover_image || null);
	}
	if (data.read_time !== void 0) {
		fields.push("read_time = ?");
		values.push(data.read_time);
	}
	if (data.is_featured !== void 0) {
		fields.push("is_featured = ?");
		values.push(data.is_featured ? 1 : 0);
	}
	if (data.tags !== void 0) {
		fields.push("tags = ?");
		values.push(normalizeTags(data.tags));
	}
	if (fields.length === 0) return;
	values.push(id);
	try {
		await query(`UPDATE blog_posts SET ${fields.join(", ")} WHERE id = ?`, values);
		return;
	} catch (err) {
		console.error("updatePost: DB error, falling back to file store", err && (err.code || err.message || err));
		const posts = await loadDevPosts();
		const idx = posts.findIndex((p) => Number(p.id) === Number(id));
		if (idx === -1) return;
		const p = posts[idx];
		if (data.title) p.title = data.title;
		if (data.slug) p.slug = data.slug;
		if (data.excerpt) p.excerpt = data.excerpt;
		if (data.content) p.content = data.content;
		if (data.cover_image !== void 0) p.cover_image = data.cover_image || null;
		if (data.read_time !== void 0) p.read_time = data.read_time;
		if (data.is_featured !== void 0) p.is_featured = data.is_featured ? 1 : 0;
		if (data.tags !== void 0) p.tags = normalizeTags(data.tags);
		posts[idx] = p;
		await saveDevPosts(posts);
		return;
	}
}
async function deletePost(id) {
	try {
		await query("DELETE FROM blog_posts WHERE id = ?", [id]);
	} catch (err) {
		console.error("deletePost: DB error, falling back to file store", err && (err.code || err.message || err));
		await saveDevPosts((await loadDevPosts()).filter((p) => Number(p.id) !== Number(id)));
	}
}
async function loadDevProjects() {
	return loadDevData(DEV_PROJECTS_PATH);
}
async function saveDevProjects(projects) {
	await saveDevData(DEV_PROJECTS_PATH, projects);
}
async function getProject(id) {
	try {
		return (await query("SELECT * FROM projects WHERE id = ?", [id]))[0];
	} catch (err) {
		console.error("getProject: DB error, falling back to file store", err && (err.code || err.message || err));
		return (await loadDevProjects()).find((p) => Number(p.id) === Number(id));
	}
}
async function getAllProjects() {
	try {
		return await query("SELECT * FROM projects ORDER BY featured DESC, year DESC, published_at DESC");
	} catch (err) {
		console.error("getAllProjects: DB error, falling back to file store", err && (err.code || err.message || err));
		return (await loadDevProjects()).sort((a, b) => {
			if ((b.featured ? 1 : 0) - (a.featured ? 1 : 0) !== 0) return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
			if ((b.year || 0) !== (a.year || 0)) return (b.year || 0) - (a.year || 0);
			return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
		});
	}
}
async function getProjectBySlug(slug) {
	try {
		return (await query("SELECT * FROM projects WHERE slug = ? LIMIT 1", [slug]))[0];
	} catch (err) {
		console.error("getProjectBySlug: DB error, falling back to file store", err && (err.code || err.message || err));
		return (await loadDevProjects()).find((p) => p.slug === slug || String(p.id) === slug);
	}
}
async function createProject(data) {
	try {
		return (await query(`INSERT INTO projects (title, slug, summary, description, content, cover_image, cover_alt, tech, role, year, featured, client, duration, links, images, published_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`, [
			data.title,
			data.slug,
			data.summary,
			data.description || null,
			data.content || null,
			data.cover_image || null,
			data.cover_alt || null,
			normalizeJson(data.tech || "[]"),
			data.role || null,
			data.year || null,
			data.featured ? 1 : 0,
			data.client || null,
			data.duration || null,
			normalizeJson(data.links || "{}"),
			normalizeJson(data.images || "[]")
		])).insertId;
	} catch (err) {
		console.error("createProject: DB error, falling back to file store", err && (err.code || err.message || err));
		const projects = await loadDevProjects();
		const id = projects.reduce((m, p) => Math.max(m, Number(p.id) || 0), 0) + 1;
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const entry = {
			id,
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
			featured: data.featured ? 1 : 0,
			client: data.client || null,
			duration: data.duration || null,
			links: normalizeJson(data.links || "{}"),
			images: normalizeJson(data.images || "[]"),
			published_at: now
		};
		projects.push(entry);
		await saveDevProjects(projects);
		return id;
	}
}
async function updateProject(id, data) {
	const fields = [];
	const values = [];
	if (data.title) {
		fields.push("title = ?");
		values.push(data.title);
	}
	if (data.slug) {
		fields.push("slug = ?");
		values.push(data.slug);
	}
	if (data.summary) {
		fields.push("summary = ?");
		values.push(data.summary);
	}
	if (data.description !== void 0) {
		fields.push("description = ?");
		values.push(data.description || null);
	}
	if (data.content !== void 0) {
		fields.push("content = ?");
		values.push(data.content || null);
	}
	if (data.cover_image !== void 0) {
		fields.push("cover_image = ?");
		values.push(data.cover_image || null);
	}
	if (data.cover_alt !== void 0) {
		fields.push("cover_alt = ?");
		values.push(data.cover_alt || null);
	}
	if (data.tech !== void 0) {
		fields.push("tech = ?");
		values.push(normalizeJson(data.tech || "[]"));
	}
	if (data.role !== void 0) {
		fields.push("role = ?");
		values.push(data.role || null);
	}
	if (data.year !== void 0) {
		fields.push("year = ?");
		values.push(data.year || null);
	}
	if (data.featured !== void 0) {
		fields.push("featured = ?");
		values.push(data.featured ? 1 : 0);
	}
	if (data.client !== void 0) {
		fields.push("client = ?");
		values.push(data.client || null);
	}
	if (data.duration !== void 0) {
		fields.push("duration = ?");
		values.push(data.duration || null);
	}
	if (data.links !== void 0) {
		fields.push("links = ?");
		values.push(normalizeJson(data.links || "{}"));
	}
	if (data.images !== void 0) {
		fields.push("images = ?");
		values.push(normalizeJson(data.images || "[]"));
	}
	if (fields.length === 0) return;
	values.push(id);
	try {
		await query(`UPDATE projects SET ${fields.join(", ")} WHERE id = ?`, values);
		return;
	} catch (err) {
		console.error("updateProject: DB error, falling back to file store", err && (err.code || err.message || err));
		const projects = await loadDevProjects();
		const idx = projects.findIndex((p) => Number(p.id) === Number(id));
		if (idx === -1) return;
		const entry = projects[idx];
		if (data.title) entry.title = data.title;
		if (data.slug) entry.slug = data.slug;
		if (data.summary) entry.summary = data.summary;
		if (data.description !== void 0) entry.description = data.description || null;
		if (data.content !== void 0) entry.content = data.content || null;
		if (data.cover_image !== void 0) entry.cover_image = data.cover_image || null;
		if (data.cover_alt !== void 0) entry.cover_alt = data.cover_alt || null;
		if (data.tech !== void 0) entry.tech = normalizeJson(data.tech || "[]");
		if (data.role !== void 0) entry.role = data.role || null;
		if (data.year !== void 0) entry.year = data.year || null;
		if (data.featured !== void 0) entry.featured = data.featured ? 1 : 0;
		if (data.client !== void 0) entry.client = data.client || null;
		if (data.duration !== void 0) entry.duration = data.duration || null;
		if (data.links !== void 0) entry.links = normalizeJson(data.links || "{}");
		if (data.images !== void 0) entry.images = normalizeJson(data.images || "[]");
		projects[idx] = entry;
		await saveDevProjects(projects);
		return;
	}
}
async function deleteProject(id) {
	try {
		await query("DELETE FROM projects WHERE id = ?", [id]);
	} catch (err) {
		console.error("deleteProject: DB error, falling back to file store", err && (err.code || err.message || err));
		await saveDevProjects((await loadDevProjects()).filter((p) => Number(p.id) !== Number(id)));
	}
}
async function loadDevProducts() {
	return loadDevData(DEV_PRODUCTS_PATH);
}
async function saveDevProducts(products) {
	await saveDevData(DEV_PRODUCTS_PATH, products);
}
async function getProduct(id) {
	try {
		return (await query("SELECT * FROM products WHERE id = ?", [id]))[0];
	} catch (err) {
		console.error("getProduct: DB error, falling back to file store", err && (err.code || err.message || err));
		return (await loadDevProducts()).find((p) => Number(p.id) === Number(id));
	}
}
async function getAllProducts() {
	try {
		return await query("SELECT * FROM products ORDER BY published_at DESC");
	} catch (err) {
		console.error("getAllProducts: DB error, falling back to file store", err && (err.code || err.message || err));
		return (await loadDevProducts()).sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
	}
}
async function createProduct(data) {
	try {
		return (await query(`INSERT INTO products (title, slug, excerpt, content, cover_image, link, price, is_featured, tags, published_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`, [
			data.title,
			data.slug,
			data.excerpt,
			data.content,
			data.cover_image || null,
			data.link || null,
			data.price || null,
			data.is_featured ? 1 : 0,
			normalizeTags(data.tags)
		])).insertId;
	} catch (err) {
		console.error("createProduct: DB error, falling back to file store", err && (err.code || err.message || err));
		const products = await loadDevProducts();
		const id = products.reduce((m, p) => Math.max(m, Number(p.id) || 0), 0) + 1;
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const product = {
			id,
			title: data.title,
			slug: data.slug,
			excerpt: data.excerpt,
			content: data.content,
			cover_image: data.cover_image || null,
			link: data.link || null,
			price: data.price || null,
			is_featured: data.is_featured ? 1 : 0,
			tags: normalizeTags(data.tags),
			published_at: now
		};
		products.push(product);
		await saveDevProducts(products);
		return id;
	}
}
async function updateProduct(id, data) {
	const fields = [];
	const values = [];
	if (data.title) {
		fields.push("title = ?");
		values.push(data.title);
	}
	if (data.slug) {
		fields.push("slug = ?");
		values.push(data.slug);
	}
	if (data.excerpt) {
		fields.push("excerpt = ?");
		values.push(data.excerpt);
	}
	if (data.content) {
		fields.push("content = ?");
		values.push(data.content);
	}
	if (data.cover_image !== void 0) {
		fields.push("cover_image = ?");
		values.push(data.cover_image || null);
	}
	if (data.link !== void 0) {
		fields.push("link = ?");
		values.push(data.link || null);
	}
	if (data.price !== void 0) {
		fields.push("price = ?");
		values.push(data.price || null);
	}
	if (data.is_featured !== void 0) {
		fields.push("is_featured = ?");
		values.push(data.is_featured ? 1 : 0);
	}
	if (data.tags !== void 0) {
		fields.push("tags = ?");
		values.push(normalizeTags(data.tags));
	}
	if (fields.length === 0) return;
	values.push(id);
	try {
		await query(`UPDATE products SET ${fields.join(", ")} WHERE id = ?`, values);
		return;
	} catch (err) {
		console.error("updateProduct: DB error, falling back to file store", err && (err.code || err.message || err));
		const products = await loadDevProducts();
		const idx = products.findIndex((p) => Number(p.id) === Number(id));
		if (idx === -1) return;
		const product = products[idx];
		if (data.title) product.title = data.title;
		if (data.slug) product.slug = data.slug;
		if (data.excerpt) product.excerpt = data.excerpt;
		if (data.content) product.content = data.content;
		if (data.cover_image !== void 0) product.cover_image = data.cover_image || null;
		if (data.link !== void 0) product.link = data.link || null;
		if (data.price !== void 0) product.price = data.price || null;
		if (data.is_featured !== void 0) product.is_featured = data.is_featured ? 1 : 0;
		if (data.tags !== void 0) product.tags = normalizeTags(data.tags);
		products[idx] = product;
		await saveDevProducts(products);
		return;
	}
}
async function deleteProduct(id) {
	try {
		await query("DELETE FROM products WHERE id = ?", [id]);
	} catch (err) {
		console.error("deleteProduct: DB error, falling back to file store", err && (err.code || err.message || err));
		await saveDevProducts((await loadDevProducts()).filter((p) => Number(p.id) !== Number(id)));
	}
}
//#endregion
export { updateProject as _, deleteProduct as a, getAllProducts as c, getPostBySlug as d, getProduct as f, updateProduct as g, updatePost as h, deletePost as i, getAllProjects as l, getProjectBySlug as m, createProduct as n, deleteProject as o, getProject as p, createProject as r, getAllPosts as s, createPost as t, getPost as u };
