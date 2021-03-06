import { HOST, USER } from "../constants.js";
import type { TemplateData } from "../types/TemplateData.js";
import { userClean } from "../userClean.js";

export default ({ name, description, devDependencies }: TemplateData) =>
	JSON.stringify(
		{
			name,
			// eslint-disable-next-line sort-keys
			description,
			version: "1.0.0",
			// eslint-disable-next-line sort-keys
			author: {
				email: "hello@vangware.com",
				name: "Vangware",
				url: "https://vangware.com",
			},
			bugs: `${HOST}/${USER}/${userClean(name)}/issues`,
			devDependencies: Object.fromEntries(
				[
					"@evilmartians/lefthook",
					"@types/node",
					"@vangware/configs",
					"@vangware/test",
					"@vangware/types",
					"c8",
					"eslint",
					"npm-run-all",
					"prettier",
					"rimraf",
					"stylelint",
					"ts-node",
					"typedoc",
					"typescript",
				].map(key => [key, devDependencies[key]]),
			),
			exports: {
				".": "./dist/index.js",
			},
			files: ["dist"],
			homepage: `${HOST}/${USER}/${userClean(name)}#readme`,
			keywords: ["typescript", "vangware"],
			license: "MIT",
			repository: {
				type: "git",
				url: `${HOST}/${USER}/${userClean(name)}.git`,
			},
			scripts: {
				clean: "rimraf ./dist",
				compile: "tsc --project ./tsconfig.dist.json",
				document: "typedoc",
				"git:pre-push":
					"run-s --print-label clean pre-compile lint test document",
				lint: "eslint {src,tests} --ext .ts",
				"lint:fix": "eslint {src,tests} --ext .ts --fix",
				"pre-compile": "tsc --noEmit --project tsconfig.dist.json",
				prepare: "lefthook install",
				prepublishOnly: "run-s --print-label clean compile prettify",
				prettify:
					"prettier --write --loglevel warn './dist/**/*.{js,ts}'",
				test: "NODE_OPTIONS='--loader ts-node/esm' c8 test",
			},
			type: "module",
			types: "./dist/index.d.ts",
		},
		undefined,
		"	",
	);
