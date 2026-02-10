import { Hono } from "hono";
const index = new Hono();
import packageJson from "../../package.json";

index.get("/", async (c) => {
  return c.json({
    status: "Running",
    name: packageJson.name,
    description: packageJson.description,
    version: packageJson.version,
    repository: packageJson.homepage,
    author: packageJson.author,
    license: packageJson.license,
  });
});

export default index;
