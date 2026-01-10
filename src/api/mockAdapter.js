import homepageData from "../data/homepageData";

const ok = (config, data) => ({
  data,
  status: 200,
  statusText: "OK",
  headers: { "Content-Type": "application/json" },
  config,
  request: {},
});

const notFound = (config) => {
  const err = new Error(`Mock endpoint not found: ${config.method?.toUpperCase()} ${config.url}`);
  err.response = { status: 404, data: { message: err.message } };
  err.config = config;
  throw err;
};

export default async function mockAdapter(config) {
  const method = (config.method || "get").toLowerCase();
  const url = config.url || "";

  if (method === "get" && (url === "/homepage" || url === "homepage")) {
    return ok(config, homepageData);
  }

  return notFound(config);
}
