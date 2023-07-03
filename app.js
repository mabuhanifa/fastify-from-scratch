const fastify = require("fastify");
const app = fastify();
const port = process.env.PORT || 3000;
const mysql = require("@fastify/mysql");
require("dotenv").config();

app.register(mysql, {
  connectionString: process.env.DATABASE_URL,
});

app.get("/", (req, res) => {
  app.mysql.query("SELECT * FROM users", (err, data) => {
    if (err) {
      res.send({
        status: "error",
        error,
      });
    }
    res.send({ success: true, data: data });
  });
});

app.listen({ port }, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  console.log(`Server is running on ${address}`);
});
