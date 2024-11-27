import {Application} from "https://deno.land/x/oak/mod.ts"

// TODO : Replace oak
const app = new Application();

app.use((ctx) => {
  ctx.response.headers.set("Content-Type", "text/html");
  ctx.response.body = "<h1>Hello World</h1>";
});

await app.listen({ port: 8000 })

