import { D as createAstro, O as createComponent, b as addAttribute, c as Fragment, d as renderSlot, m as renderTemplate, o as renderComponent, v as maybeRenderHead } from "./server_C7mqJMxx.mjs";
import "./compiler_Y7Shd06a.mjs";
import { t as $$Container } from "./Container_DC2M1AfB.mjs";
//#region src/components/ui/Section.astro
createAstro("https://your-vercel-domain.vercel.app");
var $$Section = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Section;
	const { id, title, subtitle, eyebrow, align = "center", spacing = "lg", container = "lg", class: className = "" } = Astro.props;
	const spacingMap = {
		sm: "var(--space-2xl)",
		md: "var(--space-3xl)",
		lg: "calc(var(--space-3xl) * 1.5)"
	};
	const hasHeader = Boolean(eyebrow || title || subtitle);
	return renderTemplate`${maybeRenderHead($$result)}<section${addAttribute(id, "id")}${addAttribute(`section section--${align} ${className}`, "class")}${addAttribute(`--section-spacing: ${spacingMap[spacing]};`, "style")} data-astro-cid-5lyysmr3>${container === "none" ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`${hasHeader && renderTemplate`<header class="section__header" data-astro-cid-5lyysmr3>${eyebrow && renderTemplate`<p class="section__eyebrow" data-astro-cid-5lyysmr3>${eyebrow}</p>`}${title && renderTemplate`<h2 class="section__title" data-astro-cid-5lyysmr3>${title}</h2>`}${subtitle && renderTemplate`<p class="section__subtitle" data-astro-cid-5lyysmr3>${subtitle}</p>`}</header>`}${renderSlot($$result, $$slots["default"])}` })}` : renderTemplate`${renderComponent($$result, "Container", $$Container, {
		"size": container,
		"data-astro-cid-5lyysmr3": true
	}, { "default": ($$result) => renderTemplate`${hasHeader && renderTemplate`<header class="section__header" data-astro-cid-5lyysmr3>${eyebrow && renderTemplate`<p class="section__eyebrow" data-astro-cid-5lyysmr3>${eyebrow}</p>`}${title && renderTemplate`<h2 class="section__title" data-astro-cid-5lyysmr3>${title}</h2>`}${subtitle && renderTemplate`<p class="section__subtitle" data-astro-cid-5lyysmr3>${subtitle}</p>`}</header>`}${renderSlot($$result, $$slots["default"])}` })}`}</section>`;
}, "C:/ASTRO/template2/src/components/ui/Section.astro", void 0);
//#endregion
export { $$Section as t };
