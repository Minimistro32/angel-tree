// initialize connection
const db = require('../dbConfig');

module.exports = {
    create,
    select,
    selectAll,
    selectClaimed,
    selectUnclaimed,
    countClaimed,
    update,
    del,
    truncate
};

// CREATE
async function create(gift) {
    console.log("DB CREATE\n", gift);
    return await db('gift').insert(gift, ['id']);
    // const [id] = await db('gift').insert(gift);
    // return id;
}

// READ
async function selectAll() {
    return await db('gift');
}

async function select(id, columns=null) {
    if (columns === null) {
        return await db('gift').where('id', id).first();
    } else {
        return await db('gift').where('id', id).first(columns);
    }
}

async function selectUnclaimed(exclude=null) {
    if (exclude === null) {
        return await db('gift').whereNull('venmo'); //if we have their venmo we can charge them
    } else {
        return await db('gift').whereNull('venmo').whereNot('id', exclude);
    }
}

async function selectClaimed() {
    return await db('gift').whereNotNull('venmo');
}

async function countClaimed() {
    claimed = await db('gift').whereNotNull('venmo');
    return claimed.length;
}

// todo: UPDATE video 11 - https://www.youtube.com/watch?v=JWMf7AUzMkA&list=PLKii3VqdFnoZY6EBxb2K37D0wrEmS-5RD&index=11
function update(id, changes) {
    console.log("DB UPDATE " + id + "\n", changes);
    return db('gift')
        .where('id', id)
        .update(changes)
        .then(() => {
            return select(id);
        });
}

// DELETE 
async function del(id) {
    console.log("DB DELETE " + id);
    return await db('gift').where('id', id).del();
}

async function truncate() {
    console.log("DB TRUNCATE");
    return await db('gift').truncate();
}