const fastify = require("fastify");
const app = fastify();
const port = process.env.PORT || 3000;

app.listen({ port }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
