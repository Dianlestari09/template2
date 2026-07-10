import { D as createAstro, O as createComponent, d as renderSlot, m as renderTemplate, o as renderComponent } from "./server_C7mqJMxx.mjs";
import "./compiler_Y7Shd06a.mjs";
//#region src/components/ui/Container.astro
createAstro("https://your-vercel-domain.vercel.app");
var $$Container = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Container;
	const { size = "lg", as: Tag = "div", class: className = "" } = Astro.props;
	return renderTemplate`${renderComponent($$result, "Tag", Tag, {
		"class": `container ${className}`,
		"style": `--container-width: ${{
			sm: "var(--container-3xl)",
			md: "var(--container-4xl)",
			lg: "var(--container-6xl)",
			xl: "var(--container-max)",
			full: "100%"
		}[size]};`,
		"data-astro-cid-ygbe67ah": true
	}, { "default": ($$result) => renderTemplate`${renderSlot($$result, $$slots["default"])}` })}`;
}, "D:/Kuliah/Magang/template2/src/components/ui/Container.astro", void 0);
//#endregion
export { $$Container as t };
