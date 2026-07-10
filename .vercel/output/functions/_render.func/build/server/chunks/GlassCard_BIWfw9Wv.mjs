import { D as createAstro, O as createComponent, d as renderSlot, m as renderTemplate, o as renderComponent } from "./server_C7mqJMxx.mjs";
import "./compiler_Y7Shd06a.mjs";
//#region src/components/ui/GlassCard.astro
createAstro("https://your-vercel-domain.vercel.app");
var $$GlassCard = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$GlassCard;
	const { href, as, padding = "lg", radius = "lg", interactive, external = false, class: className = "" } = Astro.props;
	return renderTemplate`${renderComponent($$result, "Tag", href ? "a" : as ?? "div", {
		"class": [
			"glass-card",
			(interactive ?? Boolean(href)) && "glass-card--interactive",
			className
		].filter(Boolean).join(" "),
		"href": href,
		"rel": external ? "noopener noreferrer" : void 0,
		"target": external ? "_blank" : void 0,
		"style": `--card-padding: ${{
			none: "0",
			sm: "var(--space-md)",
			md: "var(--space-lg)",
			lg: "var(--space-xl)",
			xl: "var(--space-2xl)"
		}[padding]}; --card-radius: ${{
			sm: "var(--radius-sm)",
			md: "var(--radius-md)",
			lg: "var(--radius-lg)",
			xl: "var(--radius-xl)"
		}[radius]};`,
		"data-astro-cid-6tkeen25": true
	}, { "default": ($$result) => renderTemplate`${renderSlot($$result, $$slots["default"])}` })}`;
}, "D:/Kuliah/Magang/template2/src/components/ui/GlassCard.astro", void 0);
//#endregion
export { $$GlassCard as t };
