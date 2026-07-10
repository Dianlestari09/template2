import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { D as createAstro, O as createComponent, b as addAttribute, m as renderTemplate, o as renderComponent, v as maybeRenderHead } from "./server_C7mqJMxx.mjs";
import "./compiler_Y7Shd06a.mjs";
import { t as $$BaseLayout } from "./BaseLayout_hBMFtw2l.mjs";
import { t as withBase } from "./url_CGAqnK3O.mjs";
import { r as $$Header, t as $$Footer } from "./Footer_Dn3ReZgh.mjs";
import { t as $$Container } from "./Container_DC2M1AfB.mjs";
import { n as getAllPosts } from "./db_DK9W4roq.mjs";
import { t as $$PostGrid } from "./PostGrid_BLkYh0I9.mjs";
//#region src/pages/tags/[tag].astro
var _tag__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Tag,
	file: () => $$file,
	getStaticPaths: () => getStaticPaths,
	url: () => $$url
});
createAstro("https://your-vercel-domain.vercel.app");
var getStaticPaths = (async () => {
	const posts = mapRowsToPosts(await getAllPosts());
	return collectTags(posts).map(({ tag, slug }) => ({
		params: { tag: slug },
		props: {
			tag,
			posts: postsByTag(posts, slug)
		}
	}));
});
var $$Tag = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Tag;
	const { tag, posts: rawPosts } = Astro.props;
	const posts = Array.isArray(rawPosts) ? rawPosts : [];
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": `#${tag}`,
		"description": `Artikel dengan tag "${tag}" di arsip SeminarKit.`,
		"data-astro-cid-aezt6mnq": true
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Header", $$Header, { "data-astro-cid-aezt6mnq": true })}${maybeRenderHead($$result)}<main id="main" tabindex="-1" class="main-content" data-astro-cid-aezt6mnq><section class="section" data-astro-cid-aezt6mnq>${renderComponent($$result, "Container", $$Container, { "data-astro-cid-aezt6mnq": true }, { "default": ($$result) => renderTemplate`<header class="tag-header" data-astro-cid-aezt6mnq><a${addAttribute(withBase("/tags"), "href")} class="tag-back" data-astro-cid-aezt6mnq>← All tags</a><h1 class="tag-title" data-astro-cid-aezt6mnq><span class="tag-hash" data-astro-cid-aezt6mnq>#</span>${tag}</h1><p class="tag-count" data-astro-cid-aezt6mnq>${posts.length} ${posts.length === 1 ? "artikel" : "artikel"}</p></header>${renderComponent($$result, "PostGrid", $$PostGrid, {
		"posts": posts,
		"data-astro-cid-aezt6mnq": true
	})}` })}</section></main>${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-aezt6mnq": true })}` })}`;
}, "C:/ASTRO/template2/src/pages/tags/[tag].astro", void 0);
var $$file = "C:/ASTRO/template2/src/pages/tags/[tag].astro";
var $$url = "/tags/[tag]";
//#endregion
//#region \0virtual:astro:page:src/pages/tags/[tag]@_@astro
var page = () => _tag__exports;
//#endregion
export { page };
