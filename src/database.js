const config = require('config');
const PgClient = require('pg').Client;

const client = new PgClient(config.get('database'));
client.connect();

const query = sql => client
  .query(sql)
  .catch(err => console.log(err.message + '\n' + sql));

/*
const request = buildSql => params => {
  const sql = buildSql(params);
  return query(sql)
}
*/

const multipleRequest = buildSql => paramsArray => {
  let sql = '';
  paramsArray.forEach(params => {
    sql += buildSql(params);
  });

  return query(sql);
};

const insertBlockSQL = params => {
  const sql =
      `INSERT INTO "blocks"
      VALUES (${params.height}, '${params.hash}', to_timestamp(${params.time}))
      ON CONFLICT DO NOTHING;`;
  return sql;
};

module.exports.insertBlocks = multipleRequest(insertBlockSQL);
