// next.config.js
module.exports = {
    async headers() {
      return process.env.NODE_ENV === 'development' ? [
        {
          source: "/(.*)",
          headers: [
            {
              key: "Access-Control-Allow-Origin",
              value: "*", // allow requests from any origin
            },
            {
              key: "Access-Control-Allow-Methods",
              value: "GET,POST,PUT,DELETE,OPTIONS",
            },
            {
              key: "Access-Control-Allow-Headers",
              value: "Content-Type, Authorization", // allow these headers
            },
          ],
        },
      ] : []; // Do not add these headers in production
    },
  };