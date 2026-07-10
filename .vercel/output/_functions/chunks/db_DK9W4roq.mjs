import mysql from "mysql2/promise";
import fs from "fs/promises";
import path from "path";
//#region src/lib/db.ts
var pool = mysql.createPool({
	host: process.env.DB_HOST || "localhost",
	port: parseInt(process.env.DB_PORT || "3306"),
	user: process.env.DB_USER || "root",
	password: process.env.DB_PASSWORD || "",
	database: process.env.DB_NAME || "blog",
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
});
async function query(sql, values) {
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
	try {
		const raw = await fs.readFile(filePath, "utf8");
		const parsed = JSON.parse(raw);
		if (Array.isArray(parsed)) return parsed;
	} catch (_err) {}
	return [];
}
async function saveDevData(filePath, data) {
	await fs.mkdir(path.dirname(filePath), { recursive: true });
	await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
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
async function loadDevPosts() {
	return loadDevData(DEV_POSTS_PATH);
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
async function loadDevProjects() {
	return loadDevData(DEV_PROJECTS_PATH);
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
async function loadDevProducts() {
	return loadDevData(DEV_PRODUCTS_PATH);
}
async function saveDevProducts(products) {
	await saveDevData(DEV_PRODUCTS_PATH, products);
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
//#endregion
export { getPost as a, getAllProjects as i, getAllPosts as n, getPostBySlug as o, getAllProducts as r, getProjectBySlug as s, createProduct as t };
