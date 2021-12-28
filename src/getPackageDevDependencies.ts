import { readFile } from "node:fs/promises";
import { sourceURL } from "./sourceURL.js";

export const getPackageDevDependencies = () =>
	readFile(sourceURL("../package.json"), "utf-8")
		.then(JSON.parse)
		.then(
			({
				devDependencies,
			}: {
				readonly devDependencies: Record<string, string>;
			}) => devDependencies,
		);
