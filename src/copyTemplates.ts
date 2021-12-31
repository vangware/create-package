import { readdir, writeFile } from "node:fs/promises";
import { sourceURL } from "./sourceURL.js";
import { targetURL } from "./targetURL.js";
import type { Template } from "./types/Template.js";
import type { TemplateData } from "./types/TemplateData.js";

export const copyTemplates = (answers: TemplateData) =>
	readdir(sourceURL("./templates/")).then(filenames =>
		Promise.all(
			filenames
				.filter(filename => filename.endsWith(".js"))
				.map(filename =>
					import(
						sourceURL(`./templates/${filename}`).toString()
					).then(
						({
							default: template,
						}: {
							readonly default: Template;
						}) =>
							writeFile(
								targetURL(
									`${answers.name}/${filename.replace(
										/\.js$/u,
										"",
									)}`,
								),
								template(answers),
								"utf-8",
							),
					),
				),
		),
	);
