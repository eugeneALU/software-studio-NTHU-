const moment = require('moment');

if (!global.db) {
    const pgp = require('pg-promise')();
    db = pgp(process.env.DB_URL);
    // 'postgres://postgres@localhost:5432/weathermood'
}

// list todo 
function listTodos(unaccomplishedOnly = 'false', searchText = '', start) {
    const where = [];
    if (unaccomplishedOnly === 'true') {
        where.push('donets IS NULL');
    }
    if (searchText) {
        where.push(`text ILIKE '%$1:value%'`);   
    }
    if (start){
        where.push('id < $2');
    }
    const sql = `
        SELECT *
        FROM todos
        ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
        ORDER BY id DESC
        LIMIT 10
    `;
    return db.any(sql, [searchText, start]);
}
// create todo 
function createTodo(mood, text) {
    const sql = `
        INSERT INTO todos ($<this:name>)
        VALUES ($<mood>, $<text>)
        RETURNING *
    `;
    return db.one(sql, {mood, text});

}
// accomplihs todo 
function accomplishTodo(todoId) {
    let now = moment().unix();
    const sql = `
        UPDATE todos
        SET donets = $2
        WHERE id  = $1
        RETURNING *
    `;
    return db.one(sql, [todoId, now]);
}

module.exports = {
    listTodos,
    createTodo,
    accomplishTodo
}