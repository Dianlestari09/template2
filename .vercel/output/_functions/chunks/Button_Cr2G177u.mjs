import { D as createAstro, O as createComponent, d as renderSlot, m as renderTemplate, o as renderComponent } from "./server_C7mqJMxx.mjs";
import "./compiler_Y7Shd06a.mjs";
//#region src/components/ui/Button.astro
createAstro("https://your-vercel-domain.vercel.app");
var $$Button = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Button;
	const { href, variant = "glass", size = "md", type = "button", fullWidth = false, disabled = false, external = false, class: className = "", ...rest } = Astro.props;
	return renderTemplate`${renderComponent($$result, "Tag", href ? "a" : "button", {
		"class": [
			"btn",
			`btn--${variant}`,
			`btn--${size}`,
			fullWidth && "btn--full",
			className
		].filter(Boolean).join(" "),
		"href": href,
		"type": href ? void 0 : type,
		"rel": external ? "noopener noreferrer" : void 0,
		"target": external ? "_blank" : void 0,
		"aria-disabled": href && disabled ? "true" : void 0,
		"disabled": !href && disabled ? true : void 0,
		...rest,
		"data-astro-cid-j6ocf6pu": true
	}, { "default": ($$result) => renderTemplate`${renderSlot($$result, $$slots["default"])}` })}`;
}, "D:/Kuliah/Magang/template2/src/components/ui/Button.astro", void 0);
//#endregion
export { $$Button as t };
