import { $ } from "bun";

const VERSION_FILE = ".version";

const status = await $`git status --porcelain`.quiet();
if (status.text() && !process.env.FORCE) {
	console.error("There are uncommitted changes. Commit them before releasing or run with FORCE=true.");
	process.exit(1);
}

const semverPart = Bun.argv[2] || "patch";
const current = (await Bun.file(VERSION_FILE).text()).trim().replace(/^v/, "");
const parts = current.split(".").map(Number);

if (parts.length !== 3 || parts.some((part) => !Number.isInteger(part))) {
	throw new Error(`Malformed ${VERSION_FILE}: ${current}`);
}

const version = `v${bump(parts as [number, number, number], semverPart)}`;
await Bun.write(VERSION_FILE, `${version}\n`);

await $`git add ${VERSION_FILE}`;
await $`git commit -m ${version}`;
await $`git push`;

if (process.env.TAG === "true") {
	await $`git tag ${version}`;
	await $`git push origin ${version}`;
}

console.log(version);

function bump(semver: [number, number, number], semverPart = "patch") {
	switch (semverPart) {
		case "major":
			semver[0]++;
			semver[1] = 0;
			semver[2] = 0;
			break;
		case "minor":
			semver[1]++;
			semver[2] = 0;
			break;
		case "patch":
			semver[2]++;
			break;
		default:
			throw new Error(`Invalid semver part: ${semverPart}`);
	}

	return semver.join(".");
}
