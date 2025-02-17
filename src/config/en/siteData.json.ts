import { type SiteDataProps } from "../types/configDataTypes";

// Update this file with your site specific information
const siteData: SiteDataProps = {
	name: "VitoDing",
	// Your website's title and description (meta fields)
	title:
		"VitoDing - Seek truth from facts",
	description:
		"A website for Ding Haoran's personal use, showcasing his research and exploration of technology, business and investment.",

	// Your information for blog post purposes
	author: {
		name: "Cosmic Themes",
		email: "creator@cosmicthemes.com",
		twitter: "Cosmic_Themes",
	},

	// default image for meta tags if the page doesn't have an image already
	defaultImage: {
		src: "/images/cosmic-themes-logo.png",
		alt: "Cosmic Themes logo",
	},
};

export default siteData;
