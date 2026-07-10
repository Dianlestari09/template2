import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { Z as UnknownContentCollectionError, tt as AstroError } from "./errors-data_99NpHCJB.mjs";
import { c as isRemotePath, d as removeBase } from "./path_CGAFNvKS.mjs";
import { D as createAstro, O as createComponent, T as unescapeHTML, _ as generateCspDigest, b as addAttribute, m as renderTemplate, n as spreadAttributes, o as renderComponent, v as maybeRenderHead } from "./server_C7mqJMxx.mjs";
import { s as VALID_INPUT_FORMATS } from "./_astro_assets_BjRDDCvc.mjs";
import "./compiler_Y7Shd06a.mjs";
import { t as $$BaseLayout } from "./BaseLayout_hBMFtw2l.mjs";
import { n as siteConfig } from "./url_CGAqnK3O.mjs";
import { r as $$Header, t as $$Footer } from "./Footer_Dn3ReZgh.mjs";
import { t as $$Container } from "./Container_DC2M1AfB.mjs";
import { t as $$Button } from "./Button_BxPVawMq.mjs";
import { t as $$GlassCard } from "./GlassCard_BGeSJzan.mjs";
import { t as $$Section } from "./Section_1RJEfjAJ.mjs";
import { t as $$Picture } from "./Picture_Bqotq_aC.mjs";
import { r as getAllProducts, t as createProduct } from "./db_DK9W4roq.mjs";
import * as devalue from "devalue";
import "html-escaper";
import * as z from "zod/v4";
import { Traverse } from "neotraverse/modern";
//#region node_modules/astro/dist/assets/runtime.js
function createSvgComponent({ meta, attributes, children, styles }) {
	const hasStyles = styles.length > 0;
	const Component = createComponent({
		async factory(result, props) {
			const normalizedProps = normalizeProps(attributes, props);
			if (hasStyles && result.cspDestination) for (const style of styles) {
				const hash = await generateCspDigest(style, result.cspAlgorithm);
				result._metadata.extraStyleHashes.push(hash);
			}
			return renderTemplate`<svg${spreadAttributes(normalizedProps)}>${unescapeHTML(children)}</svg>`;
		},
		propagation: hasStyles ? "self" : "none"
	});
	Object.defineProperty(Component, "toJSON", {
		value: () => meta,
		enumerable: false
	});
	return Object.assign(Component, meta);
}
var ATTRS_TO_DROP = [
	"xmlns",
	"xmlns:xlink",
	"version"
];
var DEFAULT_ATTRS = {};
function dropAttributes(attributes) {
	for (const attr of ATTRS_TO_DROP) delete attributes[attr];
	return attributes;
}
function normalizeProps(attributes, props) {
	return dropAttributes({
		...DEFAULT_ATTRS,
		...attributes,
		...props
	});
}
var CONTENT_IMAGE_FLAG = "astroContentImageFlag";
var IMAGE_IMPORT_PREFIX = "__ASTRO_IMAGE_";
//#endregion
//#region node_modules/astro/dist/assets/utils/resolveImports.js
function imageSrcToImportId(imageSrc, filePath) {
	imageSrc = removeBase(imageSrc, IMAGE_IMPORT_PREFIX);
	if (isRemotePath(imageSrc)) return;
	const ext = imageSrc.split(".").at(-1)?.toLowerCase();
	if (!ext || !VALID_INPUT_FORMATS.includes(ext)) return;
	const params = new URLSearchParams(CONTENT_IMAGE_FLAG);
	if (filePath) params.set("importer", filePath);
	return `${imageSrc}?${params.toString()}`;
}
//#endregion
//#region node_modules/astro/dist/content/data-store.js
var ImmutableDataStore = class ImmutableDataStore {
	_collections = /* @__PURE__ */ new Map();
	constructor() {
		this._collections = /* @__PURE__ */ new Map();
	}
	get(collectionName, key) {
		return this._collections.get(collectionName)?.get(String(key));
	}
	entries(collectionName) {
		return [...(this._collections.get(collectionName) ?? /* @__PURE__ */ new Map()).entries()];
	}
	values(collectionName) {
		return [...(this._collections.get(collectionName) ?? /* @__PURE__ */ new Map()).values()];
	}
	keys(collectionName) {
		return [...(this._collections.get(collectionName) ?? /* @__PURE__ */ new Map()).keys()];
	}
	has(collectionName, key) {
		const collection = this._collections.get(collectionName);
		if (collection) return collection.has(String(key));
		return false;
	}
	hasCollection(collectionName) {
		return this._collections.has(collectionName);
	}
	collections() {
		return this._collections;
	}
	/**
	* Attempts to load a DataStore from the virtual module.
	* This only works in Vite.
	*/
	static async fromModule() {
		try {
			const data = await import("./_astro_data-layer-content_DS_440Q9.mjs");
			if (data.default instanceof Map) return ImmutableDataStore.fromMap(data.default);
			const map = devalue.unflatten(data.default);
			return ImmutableDataStore.fromMap(map);
		} catch {}
		return new ImmutableDataStore();
	}
	static async fromMap(data) {
		const store = new ImmutableDataStore();
		store._collections = data;
		return store;
	}
};
function dataStoreSingleton() {
	let instance = void 0;
	return {
		get: async () => {
			if (!instance) instance = ImmutableDataStore.fromModule();
			return instance;
		},
		set: (store) => {
			instance = store;
		}
	};
}
var globalDataStore = dataStoreSingleton();
//#endregion
//#region node_modules/astro/dist/content/loaders/errors.js
function formatZodError(error) {
	return error.issues.map((issue) => `  **${issue.path.join(".")}**: ${issue.message}`);
}
var LiveCollectionError = class LiveCollectionError extends Error {
	collection;
	message;
	cause;
	constructor(collection, message, cause) {
		super(message);
		this.collection = collection;
		this.message = message;
		this.cause = cause;
		this.name = "LiveCollectionError";
		if (cause?.stack) this.stack = cause.stack;
	}
	static is(error) {
		return error instanceof LiveCollectionError;
	}
};
var LiveEntryNotFoundError = class extends LiveCollectionError {
	constructor(collection, entryFilter) {
		super(collection, `Entry ${collection} \u2192 ${typeof entryFilter === "string" ? entryFilter : JSON.stringify(entryFilter)} was not found.`);
		this.name = "LiveEntryNotFoundError";
	}
	static is(error) {
		return error?.name === "LiveEntryNotFoundError";
	}
};
var LiveCollectionValidationError = class extends LiveCollectionError {
	constructor(collection, entryId, error) {
		super(collection, [
			`**${collection} \u2192 ${entryId}** data does not match the collection schema.
`,
			...formatZodError(error),
			""
		].join("\n"));
		this.name = "LiveCollectionValidationError";
	}
	static is(error) {
		return error?.name === "LiveCollectionValidationError";
	}
};
var LiveCollectionCacheHintError = class extends LiveCollectionError {
	constructor(collection, entryId, error) {
		super(collection, [
			`**${String(collection)}${entryId ? ` \u2192 ${String(entryId)}` : ""}** returned an invalid cache hint.
`,
			...formatZodError(error),
			""
		].join("\n"));
		this.name = "LiveCollectionCacheHintError";
	}
	static is(error) {
		return error?.name === "LiveCollectionCacheHintError";
	}
};
//#endregion
//#region node_modules/astro/dist/content/runtime.js
var cacheHintSchema = z.object({
	tags: z.array(z.string()).optional(),
	lastModified: z.date().optional()
});
async function parseLiveEntry(entry, schema, collection) {
	try {
		const parsed = await z.safeParseAsync(schema, entry.data);
		if (!parsed.success) return { error: new LiveCollectionValidationError(collection, entry.id, parsed.error) };
		if (entry.cacheHint) {
			const cacheHint = cacheHintSchema.safeParse(entry.cacheHint);
			if (!cacheHint.success) return { error: new LiveCollectionCacheHintError(collection, entry.id, cacheHint.error) };
			entry.cacheHint = cacheHint.data;
		}
		return { entry: {
			...entry,
			data: parsed.data
		} };
	} catch (error) {
		return { error: new LiveCollectionError(collection, `Unexpected error parsing entry ${entry.id} in collection ${collection}`, error) };
	}
}
function createGetCollection({ liveCollections }) {
	return async function getCollection(collection, filter) {
		if (collection in liveCollections) throw new AstroError({
			...UnknownContentCollectionError,
			message: `Collection "${collection}" is a live collection. Use getLiveCollection() instead of getCollection().`
		});
		const hasFilter = typeof filter === "function";
		const store = await globalDataStore.get();
		if (store.hasCollection(collection)) {
			const { default: imageAssetMap } = await import("./content-assets_CfYAXCXY.mjs");
			const result = [];
			for (const rawEntry of store.values(collection)) {
				const data = updateImageReferencesInData(rawEntry.data, rawEntry.filePath, imageAssetMap);
				let entry = {
					...rawEntry,
					data,
					collection
				};
				if (hasFilter && !filter(entry)) continue;
				result.push(entry);
			}
			return result;
		} else {
			console.warn(`The collection ${JSON.stringify(collection)} does not exist or is empty. Please check your content config file for errors.`);
			return [];
		}
	};
}
function createGetEntry({ liveCollections }) {
	return async function getEntry(collectionOrLookupObject, lookup) {
		let collection, lookupId;
		if (typeof collectionOrLookupObject === "string") {
			collection = collectionOrLookupObject;
			if (!lookup) throw new AstroError({
				...UnknownContentCollectionError,
				message: "`getEntry()` requires an entry identifier as the second argument."
			});
			lookupId = lookup;
		} else {
			collection = collectionOrLookupObject.collection;
			lookupId = "id" in collectionOrLookupObject ? collectionOrLookupObject.id : collectionOrLookupObject.slug;
		}
		if (collection in liveCollections) throw new AstroError({
			...UnknownContentCollectionError,
			message: `Collection "${collection}" is a live collection. Use getLiveEntry() instead of getEntry().`
		});
		if (typeof lookupId === "object") throw new AstroError({
			...UnknownContentCollectionError,
			message: `The entry identifier must be a string. Received object.`
		});
		const store = await globalDataStore.get();
		if (store.hasCollection(collection)) {
			const entry = store.get(collection, lookupId);
			if (!entry) {
				console.warn(`Entry ${collection} → ${lookupId} was not found.`);
				return;
			}
			const { default: imageAssetMap } = await import("./content-assets_CfYAXCXY.mjs");
			const data = updateImageReferencesInData(entry.data, entry.filePath, imageAssetMap);
			const result = {
				...entry,
				data,
				collection
			};
			warnForPropertyAccess(result.data, "slug", `[content] Attempted to access deprecated property on "${collection}" entry.
The "slug" property is no longer automatically added to entries. Please use the "id" property instead.`);
			warnForPropertyAccess(result, "render", `[content] Invalid attempt to access "render()" method on "${collection}" entry.
To render an entry, use "render(entry)" from "astro:content".`);
			return result;
		}
	};
}
function warnForPropertyAccess(entry, prop, message) {
	if (!(prop in entry)) {
		let _value = void 0;
		Object.defineProperty(entry, prop, {
			get() {
				if (_value === void 0) console.error(message);
				return _value;
			},
			set(v) {
				_value = v;
			},
			enumerable: false
		});
	}
}
function createGetLiveCollection({ liveCollections }) {
	return async function getLiveCollection(collection, filter) {
		if (!(collection in liveCollections)) return { error: new LiveCollectionError(collection, `Collection "${collection}" is not a live collection. Use getCollection() instead of getLiveCollection() to load regular content collections.`) };
		try {
			const context = {
				filter,
				collection
			};
			const response = await liveCollections[collection].loader?.loadCollection?.(context);
			if (response && "error" in response) return { error: response.error };
			const { schema } = liveCollections[collection];
			let processedEntries = response.entries;
			if (schema) {
				const entryResults = await Promise.all(response.entries.map((entry) => parseLiveEntry(entry, schema, collection)));
				for (const result of entryResults) if (result.error) return { error: result.error };
				processedEntries = entryResults.map((result) => result.entry);
			}
			let cacheHint = response.cacheHint;
			if (cacheHint) {
				const cacheHintResult = cacheHintSchema.safeParse(cacheHint);
				if (!cacheHintResult.success) return { error: new LiveCollectionCacheHintError(collection, void 0, cacheHintResult.error) };
				cacheHint = cacheHintResult.data;
			}
			if (processedEntries.length > 0) {
				const entryTags = /* @__PURE__ */ new Set();
				let latestModified;
				for (const entry of processedEntries) if (entry.cacheHint) {
					if (entry.cacheHint.tags) entry.cacheHint.tags.forEach((tag) => entryTags.add(tag));
					if (entry.cacheHint.lastModified instanceof Date) {
						if (latestModified === void 0 || entry.cacheHint.lastModified > latestModified) latestModified = entry.cacheHint.lastModified;
					}
				}
				if (entryTags.size > 0 || latestModified || cacheHint) {
					const mergedCacheHint = {};
					if (cacheHint?.tags || entryTags.size > 0) mergedCacheHint.tags = [.../* @__PURE__ */ new Set([...cacheHint?.tags || [], ...entryTags])];
					if (cacheHint?.lastModified && latestModified) mergedCacheHint.lastModified = cacheHint.lastModified > latestModified ? cacheHint.lastModified : latestModified;
					else if (cacheHint?.lastModified || latestModified) mergedCacheHint.lastModified = cacheHint?.lastModified ?? latestModified;
					cacheHint = mergedCacheHint;
				}
			}
			return {
				entries: processedEntries,
				cacheHint
			};
		} catch (error) {
			return { error: new LiveCollectionError(collection, `Unexpected error loading collection ${collection}${error instanceof Error ? `: ${error.message}` : ""}`, error) };
		}
	};
}
function createGetLiveEntry({ liveCollections }) {
	return async function getLiveEntry(collection, lookup) {
		if (!(collection in liveCollections)) return { error: new LiveCollectionError(collection, `Collection "${collection}" is not a live collection. Use getCollection() instead of getLiveEntry() to load regular content collections.`) };
		try {
			const lookupObject = {
				filter: typeof lookup === "string" ? { id: lookup } : lookup,
				collection
			};
			let entry = await liveCollections[collection].loader?.loadEntry?.(lookupObject);
			if (entry && "error" in entry) return { error: entry.error };
			if (!entry) return { error: new LiveEntryNotFoundError(collection, lookup) };
			const { schema } = liveCollections[collection];
			if (schema) {
				const result = await parseLiveEntry(entry, schema, collection);
				if (result.error) return { error: result.error };
				entry = result.entry;
			}
			return {
				entry,
				cacheHint: entry.cacheHint
			};
		} catch (error) {
			return { error: new LiveCollectionError(collection, `Unexpected error loading entry ${collection} → ${typeof lookup === "string" ? lookup : JSON.stringify(lookup)}`, error) };
		}
	};
}
function updateImageReferencesInData(data, fileName, imageAssetMap) {
	const copy = structuredClone(data);
	new Traverse(copy).forEach(function(ctx, val) {
		if (typeof val === "string" && val.startsWith("__ASTRO_IMAGE_")) {
			const src = val.replace(IMAGE_IMPORT_PREFIX, "");
			const id = imageSrcToImportId(src, fileName);
			if (!id) {
				ctx.update(src);
				return;
			}
			const imported = imageAssetMap?.get(id);
			if (imported) if (imported.__svgData) {
				const { __svgData: svgData, ...meta } = imported;
				ctx.update(createSvgComponent({
					meta,
					...svgData
				}));
			} else ctx.update(imported);
			else ctx.update(src);
		}
	});
	return copy;
}
//#endregion
//#region \0astro:content
var liveCollections = {};
var getCollection = createGetCollection({ liveCollections });
createGetEntry({ liveCollections });
createGetLiveCollection({ liveCollections });
createGetLiveEntry({ liveCollections });
//#endregion
//#region src/components/landing/Hero.astro
createAstro("https://your-vercel-domain.vercel.app");
var $$Hero = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Hero;
	const { hero } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<section class="landing-hero" data-astro-cid-qmrutqly>${renderComponent($$result, "Container", $$Container, {
		"size": "xl",
		"class": "landing-hero__inner",
		"data-astro-cid-qmrutqly": true
	}, { "default": ($$result) => renderTemplate`<div class="landing-hero__copy" data-astro-cid-qmrutqly><p class="landing-hero__eyebrow" data-astro-cid-qmrutqly>${hero.subtitle}</p><h1 data-astro-cid-qmrutqly>${hero.title}</h1><p class="landing-hero__description" data-astro-cid-qmrutqly>${hero.description}</p><div class="landing-hero__actions" data-astro-cid-qmrutqly>${renderComponent($$result, "Button", $$Button, {
		"href": hero.cta.primary.href,
		"external": true,
		"variant": "solid",
		"size": "md",
		"data-astro-cid-qmrutqly": true
	}, { "default": ($$result) => renderTemplate`${hero.cta.primary.text}<span aria-hidden="true" data-astro-cid-qmrutqly>↗</span>` })}${hero.cta.secondary && renderTemplate`${renderComponent($$result, "Button", $$Button, {
		"href": hero.cta.secondary.href,
		"external": true,
		"variant": "outline",
		"size": "md",
		"data-astro-cid-qmrutqly": true
	}, { "default": ($$result) => renderTemplate`${hero.cta.secondary.text}` })}`}</div><p class="landing-hero__note" data-astro-cid-qmrutqly>Tautan paket dan detail produk. Cek opsi paket langsung di halaman produk.</p></div><div class="landing-hero__visual"${addAttribute(!hero.image, "aria-hidden")} data-astro-cid-qmrutqly><span class="landing-hero__index" data-astro-cid-qmrutqly>01 / PERLENGKAPAN SEMINAR</span>${hero.image ? renderTemplate`${renderComponent($$result, "Picture", $$Picture, {
		"src": hero.image,
		"alt": hero.title || "Perlengkapan seminar profesional",
		"width": 960,
		"height": 1200,
		"loading": "eager",
		"fetchpriority": "high",
		"class": "landing-hero__image",
		"data-astro-cid-qmrutqly": true
	})}` : renderTemplate`<div class="landing-hero__placeholder" data-astro-cid-qmrutqly></div>`}<div class="landing-hero__caption" data-astro-cid-qmrutqly><span data-astro-cid-qmrutqly>Perlengkapan acara</span><span data-astro-cid-qmrutqly>Dibuat untuk bertahan</span></div></div>` })}</section>`;
}, "C:/ASTRO/template2/src/components/landing/Hero.astro", void 0);
//#endregion
//#region src/components/landing/Features.astro
createAstro("https://your-vercel-domain.vercel.app");
var $$Features = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Features;
	const { features } = Astro.props;
	return renderTemplate`${renderComponent($$result, "Section", $$Section, {
		"id": "features",
		"eyebrow": "Koleksi",
		"title": "Dirancang untuk berguna.",
		"subtitle": "Objek yang dipilih untuk fungsi dan kualitas.",
		"align": "left",
		"container": "xl",
		"data-astro-cid-nikkmkia": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="features-grid" data-astro-cid-nikkmkia>${features.map((feature, index) => renderTemplate`${renderComponent($$result, "GlassCard", $$GlassCard, {
		"padding": "lg",
		"radius": "xl",
		"class": "feature-card",
		"data-astro-cid-nikkmkia": true
	}, { "default": ($$result) => renderTemplate`<div class="feature-card__top" data-astro-cid-nikkmkia><span class="feature-card__number" data-astro-cid-nikkmkia>${String(index + 1).padStart(2, "0")}</span><span class="feature-card__glyph" aria-hidden="true" data-astro-cid-nikkmkia>${feature.icon ?? "✦"}</span></div><h3 data-astro-cid-nikkmkia>${feature.title}</h3><p data-astro-cid-nikkmkia>${feature.description}</p>` })}`)}</div>` })}`;
}, "C:/ASTRO/template2/src/components/landing/Features.astro", void 0);
//#endregion
//#region src/components/landing/Benefits.astro
createAstro("https://your-vercel-domain.vercel.app");
var $$Benefits = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Benefits;
	const { benefits } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<section class="benefits" aria-labelledby="benefits-title" data-astro-cid-eqv6qeos>${renderComponent($$result, "Container", $$Container, {
		"size": "xl",
		"data-astro-cid-eqv6qeos": true
	}, { "default": ($$result) => renderTemplate`<div class="benefits__intro" data-astro-cid-eqv6qeos><p data-astro-cid-eqv6qeos>Mengapa penting</p><h2 id="benefits-title" data-astro-cid-eqv6qeos>Cara yang lebih rapi untuk menyelenggarakan acara yang lebih baik.</h2></div><ol class="benefits__list" data-astro-cid-eqv6qeos>${benefits.map((benefit, index) => renderTemplate`<li data-astro-cid-eqv6qeos><span data-astro-cid-eqv6qeos>${String(index + 1).padStart(2, "0")}</span><div data-astro-cid-eqv6qeos><h3 data-astro-cid-eqv6qeos>${benefit.title}</h3><p data-astro-cid-eqv6qeos>${benefit.description}</p></div></li>`)}</ol>` })}</section>`;
}, "C:/ASTRO/template2/src/components/landing/Benefits.astro", void 0);
//#endregion
//#region src/components/landing/Pricing.astro
createAstro("https://your-vercel-domain.vercel.app");
var $$Pricing = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Pricing;
	const { plans } = Astro.props;
	return renderTemplate`${renderComponent($$result, "Section", $$Section, {
		"id": "pricing",
		"eyebrow": "Pilihan Paket",
		"title": "Pilih paket awal Anda.",
		"subtitle": "Pilih paket sesuai kebutuhan acara. Pembelian dilakukan melalui tautan eksternal.",
		"container": "xl",
		"data-astro-cid-j7xdwx4a": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="pricing-grid" data-astro-cid-j7xdwx4a>${plans.map((plan) => renderTemplate`${renderComponent($$result, "GlassCard", $$GlassCard, {
		"padding": "lg",
		"radius": "xl",
		"class:list": ["pricing-card", { "pricing-card--featured": plan.highlighted }],
		"data-astro-cid-j7xdwx4a": true
	}, { "default": ($$result) => renderTemplate`${plan.coverImage && renderTemplate`<img class="pricing-card__image"${addAttribute(plan.coverImage, "src")}${addAttribute(plan.name || "Gambar paket", "alt")} loading="lazy" data-astro-cid-j7xdwx4a>`}<div class="pricing-card__heading" data-astro-cid-j7xdwx4a><div data-astro-cid-j7xdwx4a><p class="pricing-card__name" data-astro-cid-j7xdwx4a>${plan.name}</p>${plan.highlighted && renderTemplate`<span class="pricing-card__label" data-astro-cid-j7xdwx4a>Direkomendasikan</span>`}</div><p class="pricing-card__price" data-astro-cid-j7xdwx4a>${plan.price}${plan.period && renderTemplate`<span data-astro-cid-j7xdwx4a> / ${plan.period}</span>`}</p></div><p class="pricing-card__description" data-astro-cid-j7xdwx4a>${plan.description}</p><ul data-astro-cid-j7xdwx4a>${plan.features.map((feature) => renderTemplate`<li data-astro-cid-j7xdwx4a><span aria-hidden="true" data-astro-cid-j7xdwx4a>✓</span>${feature}</li>`)}</ul>${renderComponent($$result, "Button", $$Button, {
		"href": plan.cta.href,
		"external": true,
		"variant": plan.highlighted ? "solid" : "outline",
		"fullWidth": true,
		"data-astro-cid-j7xdwx4a": true
	}, { "default": ($$result) => renderTemplate`${plan.cta.text}` })}` })}`)}</div>` })}`;
}, "C:/ASTRO/template2/src/components/landing/Pricing.astro", void 0);
//#endregion
//#region src/components/landing/Gallery.astro
createAstro("https://your-vercel-domain.vercel.app");
var $$Gallery = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Gallery;
	const { images } = Astro.props;
	return renderTemplate`${renderComponent($$result, "Section", $$Section, {
		"id": "gallery",
		"eyebrow": "Dalam konteks",
		"title": "Contoh penggunaan produk di acara nyata.",
		"subtitle": "Galeri responsif untuk foto produk dan dokumentasi acara.",
		"container": "xl",
		"data-astro-cid-enmaku4m": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="gallery" data-astro-cid-enmaku4m>${images.map((image, index) => renderTemplate`<figure${addAttribute(["gallery__item", `gallery__item--${index + 1}`], "class:list")} data-astro-cid-enmaku4m>${renderComponent($$result, "Picture", $$Picture, {
		"src": image.src,
		"alt": image.alt,
		"width": 1200,
		"height": 900,
		"sizes": "(max-width: 760px) 100vw, 50vw",
		"class": "gallery__image",
		"data-astro-cid-enmaku4m": true
	})}${image.caption && renderTemplate`<figcaption data-astro-cid-enmaku4m><span data-astro-cid-enmaku4m>${String(index + 1).padStart(2, "0")}</span>${image.caption}</figcaption>`}</figure>`)}</div>` })}`;
}, "C:/ASTRO/template2/src/components/landing/Gallery.astro", void 0);
//#endregion
//#region src/components/landing/Testimonials.astro
createAstro("https://your-vercel-domain.vercel.app");
var $$Testimonials = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Testimonials;
	const { testimonials } = Astro.props;
	return renderTemplate`${renderComponent($$result, "Section", $$Section, {
		"id": "stories",
		"eyebrow": "Laporan Lapangan",
		"title": "Dipakai dan direkomendasikan.",
		"container": "xl",
		"data-astro-cid-zp66fga7": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="testimonials" data-astro-cid-zp66fga7>${testimonials.map((testimonial, index) => renderTemplate`<figure class="testimonial" data-astro-cid-zp66fga7><div class="testimonial__meta" data-astro-cid-zp66fga7><span data-astro-cid-zp66fga7>${String(index + 1).padStart(2, "0")}</span>${testimonial.rating && renderTemplate`<span class="testimonial__rating"${addAttribute(`${testimonial.rating} out of 5 stars`, "aria-label")} data-astro-cid-zp66fga7>${"★".repeat(testimonial.rating)}</span>`}</div><blockquote data-astro-cid-zp66fga7>“${testimonial.content}”</blockquote><figcaption data-astro-cid-zp66fga7><span class="testimonial__initials" aria-hidden="true" data-astro-cid-zp66fga7>${testimonial.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</span><span data-astro-cid-zp66fga7><strong data-astro-cid-zp66fga7>${testimonial.name}</strong><small data-astro-cid-zp66fga7>${testimonial.role}${testimonial.company ? `, ${testimonial.company}` : ""}</small></span></figcaption></figure>`)}</div>` })}`;
}, "C:/ASTRO/template2/src/components/landing/Testimonials.astro", void 0);
//#endregion
//#region src/components/landing/Faq.astro
createAstro("https://your-vercel-domain.vercel.app");
var $$Faq = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Faq;
	const { items } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<section class="faq" id="faq" aria-labelledby="faq-title" data-astro-cid-tycplb2i>${renderComponent($$result, "Container", $$Container, {
		"size": "md",
		"data-astro-cid-tycplb2i": true
	}, { "default": ($$result) => renderTemplate`<p class="faq__eyebrow" data-astro-cid-tycplb2i>Pertanyaan Umum</p><h2 id="faq-title" data-astro-cid-tycplb2i>Sebelum Anda memulai.</h2><div class="faq__list" data-astro-cid-tycplb2i>${items.map((item, index) => renderTemplate`<details data-astro-cid-tycplb2i><summary data-astro-cid-tycplb2i><span data-astro-cid-tycplb2i>${String(index + 1).padStart(2, "0")}</span>${item.question}<i aria-hidden="true" data-astro-cid-tycplb2i>+</i></summary><p data-astro-cid-tycplb2i>${item.answer}</p></details>`)}</div>` })}</section>`;
}, "C:/ASTRO/template2/src/components/landing/Faq.astro", void 0);
//#endregion
//#region src/components/landing/FinalCta.astro
createAstro("https://your-vercel-domain.vercel.app");
var $$FinalCta = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$FinalCta;
	const { cta } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<section class="final-cta" data-astro-cid-x5xn55qe>${renderComponent($$result, "Container", $$Container, {
		"size": "xl",
		"data-astro-cid-x5xn55qe": true
	}, { "default": ($$result) => renderTemplate`<div class="final-cta__panel" data-astro-cid-x5xn55qe><span class="final-cta__mark" aria-hidden="true" data-astro-cid-x5xn55qe>✦</span><p data-astro-cid-x5xn55qe>Selanjutnya</p><h2 data-astro-cid-x5xn55qe>${cta.title}</h2><div class="final-cta__footer" data-astro-cid-x5xn55qe><p data-astro-cid-x5xn55qe>${cta.description}</p>${renderComponent($$result, "Button", $$Button, {
		"href": cta.button.href,
		"external": true,
		"variant": "solid",
		"size": "md",
		"data-astro-cid-x5xn55qe": true
	}, { "default": ($$result) => renderTemplate`${cta.button.text}<span aria-hidden="true" data-astro-cid-x5xn55qe>↗</span>` })}</div></div>` })}</section>`;
}, "C:/ASTRO/template2/src/components/landing/FinalCta.astro", void 0);
//#endregion
//#region src/pages/landing/index.astro
var landing_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	function parseFeatures(value) {
		if (Array.isArray(value)) return value.filter(Boolean).map(String);
		if (typeof value === "string") {
			try {
				const parsed = JSON.parse(value);
				if (Array.isArray(parsed)) return parsed.filter(Boolean).map(String);
			} catch {}
			return value.split(",").map((item) => item.trim()).filter(Boolean);
		}
		return [];
	}
	function mapProductToPlan(product, fallback = {}) {
		const features = parseFeatures(product.features ?? product.tags ?? product.content ?? []);
		const slug = product.slug || fallback.slug || "produk";
		return {
			name: product.title || fallback.name || "Produk SeminarKit",
			price: product.price || fallback.price || "Hubungi",
			description: product.excerpt || fallback.description || "Paket seminar profesional yang siap dipakai.",
			features,
			highlighted: Boolean(product.is_featured || fallback.highlighted),
			cta: {
				text: "Lihat detail",
				href: `/landing/${slug}`
			},
			coverImage: product.cover_image || fallback.coverImage || "",
			slug
		};
	}
	const [entry] = await getCollection("landing");
	if (!entry) throw new Error("Add at least one entry to src/content/landing.");
	const { hero, features, benefits, pricing, gallery, testimonials, faq, finalCta } = entry.data;
	const safePricing = Array.isArray(pricing) ? pricing : [];
	const safeFeatures = Array.isArray(features) ? features : [];
	const safeBenefits = Array.isArray(benefits) ? benefits : [];
	const safeGallery = Array.isArray(gallery) ? gallery : [];
	const safeTestimonials = Array.isArray(testimonials) ? testimonials : [];
	const safeFaq = Array.isArray(faq) ? faq : [];
	const existingProducts = await getAllProducts();
	const productsFromDb = Array.isArray(existingProducts) ? existingProducts : [];
	if (!productsFromDb.length && safePricing.length > 0) await Promise.all(safePricing.map((plan, index) => createProduct({
		title: plan.name || `Paket Seminar ${index + 1}`,
		slug: `paket-${(plan.name || `produk-${index + 1}`).toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
		excerpt: plan.description || "Paket seminar profesional.",
		content: [plan.description, ...plan.features || []].join("\n"),
		price: plan.price || "Hubungi",
		link: plan.cta?.href || "/about",
		is_featured: Boolean(plan.highlighted),
		tags: (plan.features || []).join(", ")
	})));
	const displayPlans = (productsFromDb.length > 0 ? productsFromDb : safePricing).map((product, index) => {
		return mapProductToPlan(product, safePricing[index] || safePricing[0]);
	});
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": `${hero.title} | ${siteConfig.name}`,
		"description": hero.description,
		"data-astro-cid-xobb2ryj": true
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Header", $$Header, { "data-astro-cid-xobb2ryj": true })}${maybeRenderHead($$result)}<main id="main" tabindex="-1" data-astro-cid-xobb2ryj>${renderComponent($$result, "Hero", $$Hero, {
		"hero": hero,
		"data-astro-cid-xobb2ryj": true
	})}${safeFeatures.length > 0 && renderTemplate`${renderComponent($$result, "Features", $$Features, {
		"features": safeFeatures,
		"data-astro-cid-xobb2ryj": true
	})}`}${safeBenefits.length > 0 && renderTemplate`${renderComponent($$result, "Benefits", $$Benefits, {
		"benefits": safeBenefits,
		"data-astro-cid-xobb2ryj": true
	})}`}${safeGallery.length > 0 && renderTemplate`${renderComponent($$result, "Gallery", $$Gallery, {
		"images": safeGallery,
		"data-astro-cid-xobb2ryj": true
	})}`}${displayPlans.length > 0 && renderTemplate`${renderComponent($$result, "Pricing", $$Pricing, {
		"plans": displayPlans,
		"data-astro-cid-xobb2ryj": true
	})}`}${safeTestimonials.length > 0 && renderTemplate`${renderComponent($$result, "Testimonials", $$Testimonials, {
		"testimonials": safeTestimonials,
		"data-astro-cid-xobb2ryj": true
	})}`}${safeFaq.length > 0 && renderTemplate`${renderComponent($$result, "Faq", $$Faq, {
		"items": safeFaq,
		"data-astro-cid-xobb2ryj": true
	})}`}${finalCta && renderTemplate`${renderComponent($$result, "FinalCta", $$FinalCta, {
		"cta": finalCta,
		"data-astro-cid-xobb2ryj": true
	})}`}</main>${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-xobb2ryj": true })}` })}`;
}, "C:/ASTRO/template2/src/pages/landing/index.astro", void 0);
var $$file = "C:/ASTRO/template2/src/pages/landing/index.astro";
var $$url = "/landing";
//#endregion
//#region \0virtual:astro:page:src/pages/landing/index@_@astro
var page = () => landing_exports;
//#endregion
export { page };
