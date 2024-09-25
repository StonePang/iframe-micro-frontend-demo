/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    // 支持iframe跨域
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
