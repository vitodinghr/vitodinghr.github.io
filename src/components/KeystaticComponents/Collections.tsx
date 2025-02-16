/**
 * * Keystatic Collection definitions that can take in languages and return the correct content
 * This makes it much cleaner to work with content in different languages
 */

import { collection, singleton, fields } from "@keystatic/core";

// components
import ComponentBlocks from "@components/KeystaticComponents/ComponentBlocks";

// utils
import { locales } from "@config/siteSettings.json";

/**
 * * Blog posts collection
 * This gets used by Astro Content Collections, so if you update this, you'll need to update the Astro Content Collections schema
 */
const Blog = (locale: (typeof locales)[number]) =>
	collection({
		label: `Blog (${locale.toUpperCase()})`,
		slugField: "title",
		path: `src/data/blog/${locale}/*/`,
		columns: ["title", "pubDate"],
		entryLayout: "content",
		format: { contentField: "content" },
		schema: {
			title: fields.slug({
				name: { label: "Title" },
				slug: {
					label: "SEO-friendly slug",
					description: "Never change the slug once a file is published!",
				},
			}),
			description: fields.text({
				label: "Description",
				validation: { isRequired: true, length: { min: 1, max: 160 } },
			}),
			draft: fields.checkbox({
				label: "Draft",
				description: "Set this post as draft to prevent it from being published.",
			}),

			authors: fields.array(
				fields.relationship({
					label: "Post author",
					collection: `authors`,
					// authors field in keystatic.config.tsx must match the collection name here (like "authorsEN" or "authorsFR")
					// collection: `authors${locale.toUpperCase()}`,
				}),
				{
					label: "Authors",
					validation: { length: { min: 1 } },
					itemLabel: (props) => props.value || "Please select an author",
				},
			),
			pubDate: fields.date({ label: "Publish Date" }),
			updatedDate: fields.date({
				label: "Updated Date",
				description: "If you update this post at a later date, put that date here.",
			}),
			heroImage: fields.image({
				label: "Hero Image",
				publicPath: "../",
				validation: { isRequired: true },
			}),
			categories: fields.array(fields.text({ label: "Category" }), {
				label: "Categories",
				description: "This is NOT case sensitive.",
				itemLabel: (props) => props.value,
				// validation: { length: { min: 1 } },
			}),
			content: fields.mdx({
				label: "Content",
				options: {
					bold: true,
					italic: true,
					strikethrough: true,
					code: true,
					heading: [2, 3, 4, 5, 6],
					blockquote: true,
					orderedList: true,
					unorderedList: true,
					table: true,
					link: true,
					image: {
						directory: `src/data/blog/${locale}/`,
						publicPath: "../",
						// schema: {
						//   title: fields.text({
						//     label: "Caption",
						//     description:
						//       "The text to display under the image in a caption.",
						//   }),
						// },
					},
					divider: true,
					codeBlock: true,
				},
				components: {
					Admonition: ComponentBlocks.Admonition,
				},
			}),
		},
	});

/**
 * * Authors collection
 * This gets used by Astro Content Collections, so if you update this, you'll need to update the Astro Content Collections schema
 */
const Authors = (locale: (typeof locales)[number] | "") =>
	collection({
		label: `Authors ${locale === "" ? "" : `(${locale.toUpperCase()})`} `,
		slugField: "name",
		path: `src/data/authors/${locale}/*/`,
		columns: ["name"],
		entryLayout: "content",
		format: { contentField: "bio" },
		schema: {
			name: fields.slug({
				name: {
					label: "Name",
					validation: {
						isRequired: true,
					},
				},
				slug: {
					label: "SEO-friendly slug",
					description: "Never change the slug once this file is published!",
				},
			}),
			avatar: fields.image({
				label: "Author avatar",
				publicPath: "../",
				validation: { isRequired: true },
			}),
			about: fields.text({
				label: "About",
				description: "A short bio about the author",
				validation: { isRequired: true },
			}),
			email: fields.text({
				label: "The author's email",
				description: "This must look something like `you@email.com`",
				validation: { isRequired: true },
			}),
			authorLink: fields.url({
				label: "Author Website or Social Media Link",
				validation: { isRequired: true },
			}),
			bio: fields.mdx({
				label: "Full Bio",
				description: "The author's full bio",
				options: {
					bold: true,
					italic: true,
					strikethrough: true,
					code: true,
					heading: [2, 3, 4],
					blockquote: true,
					orderedList: true,
					unorderedList: true,
					table: false,
					link: true,
					image: {
						directory: "src/data/authors/",
						publicPath: "../",
					},
					divider: true,
					codeBlock: false,
				},
			}),
		},
	});

/**
 * * Other Pages collection
 * For items like legal pages, about pages, etc.
 * This gets used by Astro Content Collections, so if you update this, you'll need to update the Astro Content Collections schema
 */
const OtherPages = (locale: (typeof locales)[number]) =>
	collection({
		label: `Other Pages (${locale.toUpperCase()})`,
		slugField: "title",
		path: `src/data/otherPages/${locale}/*/`,
		columns: ["title"],
		entryLayout: "content",
		format: { contentField: "content" },
		schema: {
			title: fields.slug({
				name: { label: "Title" },
				slug: {
					label: "SEO-friendly slug",
					description: "Never change the slug once a file is published!",
				},
			}),
			description: fields.text({
				label: "Description",
				validation: { isRequired: true, length: { min: 1, max: 160 } },
			}),
			draft: fields.checkbox({
				label: "Draft",
				description: "Set this page as draft to prevent it from being published.",
			}),
			content: fields.mdx({
				label: "Page Contents",
				options: {
					bold: true,
					italic: true,
					strikethrough: true,
					code: true,
					heading: [2, 3, 4, 5, 6],
					blockquote: true,
					orderedList: true,
					unorderedList: true,
					table: true,
					link: true,
					image: {
						directory: `src/data/otherPages/${locale}/`,
						publicPath: "../",
					},
					divider: true,
					codeBlock: true,
				},
				components: {
					Admonition: ComponentBlocks.Admonition,
				},
			}),
		},
	});

/**
 * * Projects collection
 * This gets used by Astro Content Collections, so if you update this, you'll need to update the Astro Content Collections schema
 */
const Projects = (locale: (typeof locales)[number]) =>
	collection({
		label: `Projects (${locale.toUpperCase()})`,
		slugField: "title",
		path: `src/data/projects/${locale}/*/`,
		columns: ["title", "completionDate"],
		entryLayout: "content",
		format: { contentField: "content" },
		schema: {
			title: fields.slug({
				name: { label: "Title" },
				slug: {
					label: "SEO-friendly slug",
					description: "Never change the slug once a file is published!",
				},
			}),
			description: fields.text({
				label: "Description",
				validation: { isRequired: true },
			}),
			image: fields.image({
				label: "Project Image",
				publicPath: "../",
				validation: { isRequired: true },
			}),
			technologies: fields.array(fields.text({ label: "Technology" }), {
				label: "Technologies Used",
				itemLabel: (props) => props.value,
				validation: { length: { min: 1 } },
			}),
			demoUrl: fields.url({
				label: "Demo URL",
				description: "Link to live demo if available",
			}),
			githubUrl: fields.url({
				label: "GitHub URL",
				description: "Link to GitHub repository",
			}),
			completionDate: fields.date({
				label: "Completion Date",
				validation: { isRequired: true },
			}),
			keyFeatures: fields.array(fields.text({ label: "Feature" }), {
				label: "Key Features",
				itemLabel: (props) => props.value,
				validation: { length: { min: 1 } },
			}),
			order: fields.number({
				label: "Display Order",
				description: "Optional: Use to control the order of projects (lower numbers appear first)",
			}),
			draft: fields.checkbox({
				label: "Draft",
				description: "Set this project as draft to prevent it from being published.",
			}),
			content: fields.mdx({
				label: "Content",
				options: {
					bold: true,
					italic: true,
					strikethrough: true,
					code: true,
					heading: [2, 3, 4, 5, 6],
					blockquote: true,
					orderedList: true,
					unorderedList: true,
					table: true,
					link: true,
					image: {
						directory: `src/data/projects/${locale}/`,
						publicPath: "../",
					},
					divider: true,
					codeBlock: true,
				},
				components: {
					Admonition: ComponentBlocks.Admonition,
				},
			}),
		},
	});

/**
 * * Resume singleton
 */
const Resume = (locale: (typeof locales)[number]) =>
	singleton({
		label: `Resume (${locale.toUpperCase()})`,
		path: `src/data/resume/${locale}/resume/index`,
		format: { data: "json" },
		schema: {
			diplomas: fields.array(
				fields.object({
					title: fields.text({ label: "Title" }),
					school: fields.text({ label: "School" }),
					year: fields.number({ label: "Year" }),
				}),
				{
					label: "Diplomas",
					itemLabel: (props) =>
						`${props.fields.title.value} - ${props.fields.school.value} (${props.fields.year.value})`,
				},
			),
			certifications: fields.array(
				fields.object({
					title: fields.text({ label: "Title" }),
					year: fields.number({ label: "Year" }),
				}),
				{
					label: "Certifications",
					itemLabel: (props) => `${props.fields.title.value} (${props.fields.year.value})`,
				},
			),
			experience: fields.array(
				fields.object({
					title: fields.text({ label: "Title" }),
					company: fields.text({ label: "Company" }),
					companyImage: fields.image({
						label: "Company Logo",
						publicPath: "./index/",
						validation: { isRequired: true },
					}),
					dates: fields.text({ label: "Dates" }),
					location: fields.text({ label: "Location" }),
					responsibilities: fields.array(fields.text({ label: "Responsibility" }), {
						label: "Responsibilities",
						itemLabel: (props) => props.value,
					}),
				}),
				{
					label: "Experience",
					itemLabel: (props) => `${props.fields.title.value} at ${props.fields.company.value}`,
				},
			),
			hardSkills: fields.array(
				fields.object({
					skill: fields.text({ label: "Skill" }),
					percentage: fields.number({
						label: "Level (%)",
						description: "Enter a percentage between 0 and 100",
						validation: {
							min: 0,
							max: 100,
							isRequired: true,
						},
					}),
				}),
				{
					label: "Hard Skills",
					itemLabel: (props) => `${props.fields.skill.value} - ${props.fields.percentage.value}%`,
				},
			),
			softSkills: fields.array(
				fields.object({
					skill: fields.text({
						label: "Skill",
						validation: { isRequired: true },
					}),
					icon: fields.text({
						label: "Icon Image",
						description: "Copy in your favorite emoji like 👑",
						validation: { isRequired: true },
					}),
				}),
				{
					label: "Soft Skills",
					itemLabel: (props) => props.fields.skill.value,
				},
			),
			languages: fields.array(
				fields.object({
					language: fields.text({
						label: "Language",
						validation: { isRequired: true },
					}),
					level: fields.number({
						label: "Proficiency Level",
						description: "Enter a value between 1 (basic) and 10 (native)",
						validation: {
							min: 1,
							max: 10,
							isRequired: true,
						},
					}),
				}),
				{
					label: "Languages",
					itemLabel: (props) =>
						`${props.fields.language.value} - Level ${props.fields.level.value}/10`,
				},
			),
			tools: fields.array(
				fields.object({
					name: fields.text({
						label: "Tool Name",
						validation: { isRequired: true },
					}),
					category: fields.text({
						label: "Category",
						description: "Tool category (e.g., 'Development', 'Design', 'DevOps')",
						validation: { isRequired: true },
					}),
					image: fields.image({
						label: "Tool Logo",
						description: "Logo or icon for the tool",
						publicPath: "./index/",
						validation: { isRequired: true },
					}),
					link: fields.url({
						label: "Tool Website",
						description: "Link to the tool's official website",
						validation: { isRequired: true },
					}),
				}),
				{
					label: "Tools & Technologies",
					itemLabel: (props) => `${props.fields.name.value} (${props.fields.category.value})`,
				},
			),
		},
	});

export default {
	Blog,
	Authors,
	OtherPages,
	Projects,
	Resume,
};
