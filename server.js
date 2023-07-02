const fastify = require("fastify");
const app = fastify();
const port = process.env.PORT || 3000;

app.listen({ port, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});

app.get("/", async (request, reply) => {
  reply.send({ hello: "world" });
});

app.get("/:id", async (request, reply) => {
  const { id } = request.params;
  reply.send({ hello: "world", id: id });
});
