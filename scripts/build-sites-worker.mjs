import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const outputPath = resolve("dist", "server", "index.js");

const workerSource = `const CACHE_BUSTED_ASSET = /\\/assets\\/|\\.[a-z0-9]{2,8}$/i;

function withHeaders(response, headers) {
  const nextHeaders = new Headers(response.headers);

  for (const [key, value] of Object.entries(headers)) {
    nextHeaders.set(key, value);
  }

  return new Response(response.body, {
    headers: nextHeaders,
    status: response.status,
    statusText: response.statusText,
  });
}

async function serveIndex(request, env) {
  const indexRequest = new Request(new URL("/index.html", request.url), request);
  const response = await env.ASSETS.fetch(indexRequest);

  if (response.status === 404) {
    return response;
  }

  return withHeaders(response, {
    "Cache-Control": "no-store",
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const assetResponse = await env.ASSETS.fetch(request);

    if (assetResponse.status !== 404) {
      if (url.pathname === "/" || url.pathname === "/index.html") {
        return withHeaders(assetResponse, {
          "Cache-Control": "no-store",
        });
      }

      return assetResponse;
    }

    if (request.method !== "GET" && request.method !== "HEAD") {
      return assetResponse;
    }

    if (CACHE_BUSTED_ASSET.test(url.pathname)) {
      return assetResponse;
    }

    return serveIndex(request, env);
  },
};
`;

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, workerSource, "utf8");
