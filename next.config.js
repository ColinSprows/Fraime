/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "oaidalleapiprodscus.blob.core.windows.net",
				port: "",
				pathname: "/private/**",
			},
			{
				protocol: "https",
				hostname: "drive.google.com",
				port: "",
				pathname: "/file/**",
			},
		],
	},
};

module.exports = nextConfig;
