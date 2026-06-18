import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    // Projects that have a full blog write-up no longer keep a separate case
    // study; the blog is the deep dive. Redirect the old case-study URLs so any
    // existing links and search results land on the blog post.
    return [
      {
        source: "/projects/contextiq-rag",
        destination: "/blog/contextiq-hybrid-rag-retrieval",
        permanent: true,
      },
      {
        source: "/projects/voiceprint",
        destination: "/blog/measuring-a-writing-voice",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
