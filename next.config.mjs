/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: "/certificate-template",
            destination: "/certificate-template",
            permanent: true,
          },
        ];
      },
};

export default nextConfig;
