import httpProxy from "http-proxy";

export const config = {
    api: {
        // Enable externalResolver option in Next.js
        externalResolver: true,
        bodyParser: false,
    },
};

export default (req: any, res: any) =>
    new Promise((resolve, reject) => {
        const proxy: httpProxy = httpProxy.createProxy();
        proxy.once("proxyRes", resolve).once("error", reject).web(req, res, {
            changeOrigin: true,
            target: process.env.NEXT_PUBLIC_API_PROXY_URL,
        });
    });