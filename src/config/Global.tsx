const config = {
    baseUrl: process.env.NODE_ENV === "production" ? "/api" : "http://172.86.99.237:4004/api",
    sourceBlogUrl: "https://www.singlequiver.com/enelpico/wp-json/wp/v2",
};

export default config;