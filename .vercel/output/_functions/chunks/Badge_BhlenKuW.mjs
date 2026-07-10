import { D as createAstro, O as createComponent, b as addAttribute, d as renderSlot, m as renderTemplate, v as maybeRenderHead } from "./server_C7mqJMxx.mjs";
import "./compiler_Y7Shd06a.mjs";
//#region src/components/ui/Badge.astro
createAstro("https://your-vercel-domain.vercel.app");
var $$Badge = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Badge;
	const { variant = "neutral", size = "md", class: className = "" } = Astro.props;
	const classes = [
		"badge",
		`badge--${variant}`,
		`badge--${size}`,
		className
	].filter(Boolean).join(" ");
	return renderTemplate`${maybeRenderHead($$result)}<span${addAttribute(classes, "class")} data-astro-cid-gysip5ha>${renderSlot($$result, $$slots["default"])}</span>`;
}, "C:/ASTRO/template2/src/components/ui/Badge.astro", void 0);
//#endregion
export { $$Badge as t };
