const fastify = require("fastify");
const app = fastify();
const port = process.env.PORT || 3000;
const mysql = require("@fastify/mysql");
require("dotenv").config();

// fastify mysql plugin
app.register(mysql, {
  connectionString: process.env.DATABASE_URL,
});

app.get("/users", (req, res) => {
  app.mysql.query("SELECT * FROM users", (err, data) => {
    if (err) {
      res.send({
        status: "error",
        error: err,
      });
    }

    res.send({
      success: true,
      data: data,
    });
  });
});

app.get('/users/:id', function (req, res) {
  const userId = req.params.id;
  const query = 'SELECT * FROM users WHERE id = ?';
  app.mysql.query(query, [userId], function (error, results, fields) {
      if (error) throw error;
      res.send(results);
  });
});




app.listen({ port }, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  console.log(`Server is running on ${address}`);
});


app.route({
  method: 'GET',
  url: '/get',
  schema: {
    querystring: {
      name: { type: 'string' },
      excitement: { type: 'integer' }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          hello: { type: 'string' }
        }
      }
    }
  },
  handler: function (request, reply) {
    reply.send({ hello: 'world' })
  }
})
