import { D as createAstro, O as createComponent, b as addAttribute, c as Fragment, m as renderTemplate, o as renderComponent, v as maybeRenderHead } from "./server_C7mqJMxx.mjs";
import "./compiler_Y7Shd06a.mjs";
import { t as withBase } from "./url_CGAqnK3O.mjs";
//#region src/components/blog/Pagination.astro
createAstro("https://your-vercel-domain.vercel.app");
var $$Pagination = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Pagination;
	const { currentPage, totalPages, basePath = "/blog" } = Astro.props;
	const pageUrl = (n) => withBase(n === 1 ? basePath : `${basePath}/page/${n}`);
	const windowSize = 2;
	const start = Math.max(1, currentPage - windowSize);
	const end = Math.min(totalPages, currentPage + windowSize);
	const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
	const prevUrl = currentPage > 1 ? pageUrl(currentPage - 1) : void 0;
	const nextUrl = currentPage < totalPages ? pageUrl(currentPage + 1) : void 0;
	return renderTemplate`${totalPages > 1 && renderTemplate`${maybeRenderHead($$result)}<nav class="pagination" aria-label="Pagination" data-astro-cid-lzwwthbz>${prevUrl ? renderTemplate`<a class="pagination__edge"${addAttribute(prevUrl, "href")} rel="prev" aria-label="Previous page" data-astro-cid-lzwwthbz>← Prev</a>` : renderTemplate`<span class="pagination__edge pagination__edge--disabled" aria-hidden="true" data-astro-cid-lzwwthbz>← Prev</span>`}<ul class="pagination__list" data-astro-cid-lzwwthbz>${start > 1 && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<li data-astro-cid-lzwwthbz><a class="pagination__num"${addAttribute(pageUrl(1), "href")} data-astro-cid-lzwwthbz>1</a></li>${start > 2 && renderTemplate`<li class="pagination__ellipsis" aria-hidden="true" data-astro-cid-lzwwthbz>…</li>`}` })}`}${pages.map((n) => renderTemplate`<li data-astro-cid-lzwwthbz>${n === currentPage ? renderTemplate`<span class="pagination__num pagination__num--current" aria-current="page" data-astro-cid-lzwwthbz>${n}</span>` : renderTemplate`<a class="pagination__num"${addAttribute(pageUrl(n), "href")} data-astro-cid-lzwwthbz>${n}</a>`}</li>`)}${end < totalPages && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`${end < totalPages - 1 && renderTemplate`<li class="pagination__ellipsis" aria-hidden="true" data-astro-cid-lzwwthbz>…</li>`}<li data-astro-cid-lzwwthbz><a class="pagination__num"${addAttribute(pageUrl(totalPages), "href")} data-astro-cid-lzwwthbz>${totalPages}</a></li>` })}`}</ul>${nextUrl ? renderTemplate`<a class="pagination__edge"${addAttribute(nextUrl, "href")} rel="next" aria-label="Next page" data-astro-cid-lzwwthbz>Next →</a>` : renderTemplate`<span class="pagination__edge pagination__edge--disabled" aria-hidden="true" data-astro-cid-lzwwthbz>Next →</span>`}</nav>`}`;
}, "D:/Kuliah/Magang/template2/src/components/blog/Pagination.astro", void 0);
//#endregion
export { $$Pagination as t };
