import {Application} from "https://deno.land/x/oak/mod.ts"

// TODO : Replace oak
const app = new Application();

app.use((ctx) => {
  ctx.response.body = "Hello!";
});

await app.listen({ port: 8000 })

