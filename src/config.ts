import type {
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";
import managedSettings from "./site-settings.json";

type ManagedLink =
	| { kind: "preset"; preset: "home" | "archive" | "about" }
	| { kind: "link"; name: string; url: string; external?: boolean };

const presetMap = {
	home: LinkPreset.Home,
	archive: LinkPreset.Archive,
	about: LinkPreset.About,
} as const;

function assertManagedSettings(): void {
	if (managedSettings.schemaVersion !== 1) {
		throw new Error("Unsupported managed site settings schema");
	}
	if (!managedSettings.site.title.trim() || !managedSettings.profile.name.trim()) {
		throw new Error("Managed site title and profile name are required");
	}
	if (managedSettings.site.themeColor.hue < 0 || managedSettings.site.themeColor.hue > 360) {
		throw new Error("Managed theme hue must be between 0 and 360");
	}
}

assertManagedSettings();

export const siteConfig: SiteConfig = managedSettings.site as SiteConfig;

export const navBarConfig: NavBarConfig = {
	links: (managedSettings.navigation.links as ManagedLink[]).map((link) =>
		link.kind === "preset"
			? presetMap[link.preset]
			: { name: link.name, url: link.url, external: link.external },
	),
};

export const profileConfig: ProfileConfig = managedSettings.profile;

export const licenseConfig: LicenseConfig = managedSettings.license;

export const expressiveCodeConfig: ExpressiveCodeConfig = managedSettings.expressiveCode;
