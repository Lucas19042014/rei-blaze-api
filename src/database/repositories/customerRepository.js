const knex = require('../index');

const findByEmail = async ({ email }) => {
    const result = await knex.select('*')
        .from('customer_user')
        .where({ email });
    
    return result?.at(0);
}

const findById = async ({ id }) => {
    const result = await knex.select('*')
        .from('customer_user')
        .where({ id });
    
    return result?.at(0);
}

const findByUuid = async ({ uuid }) => {
    const result = await knex.select('*')
        .from('customer_user')
        .where({ uuid });
    
    return result?.at(0);
}

const findAll = async () => {
    const result = await knex.select('*')
        .from('customer_user');
    
    return result;
}

const save = async (user) => {
    return knex('customer_user').insert(user);
}

module.exports = {
    findAll,
    findById,
    findByUuid,
    findByEmail,
    save
}