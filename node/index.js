const express = require("express");
const app = express();
const port = 5000;
const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};
const util = require("util");
const mysql = require("mysql");

app.get("/", (req, res) => {
  addName();
  let results = ["<h1>Full Cycle Rocks!</h1>"];

  getNames().then((rows) => {
    results.push("<ul>");
    rows.forEach((row) => {
      results.push(`<li>${row.name} ${row.id}</li>`);
    });
    results.push("</ul>");
    res.send(results.join(""));
  });
});

async function addName() {
  const sql = `INSERT INTO people(name) values('John')`;
  return execute(sql);
}

function getNames() {
  const sql = "select id, name from people";
  return execute(sql);
}

async function execute(sql) {
  const connection = mysql.createConnection(config);
  const query = util.promisify(connection.query).bind(connection);

  try {
    const rows = await query(sql);
    return rows;
  } finally {
    connection.end();
  }
}

app.listen(port, () => {
  console.log(`Rodando na porta ${port}`);
});
