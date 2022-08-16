const knex = require('../index');

const findByCustomerId = async ({ customer_id }) => {
    const result = await knex.select('*')
        .from('customer_auth_token')
        .where({ customer_id, active: true })

    return result;
}

const findOneByToken = async ({ token }) => {
    const result = await knex.select('*')
        .from('customer_auth_token')
        .where({ auth_token: token, active: true });

    return result?.at(0);
}

const update = async (authToken) => {
    return knex('customer_auth_token')
        .where({ id: authToken.id })
        .update(authToken);
}

const save = async (authToken) => {
    return knex('customer_auth_token').insert(authToken);
}

module.exports = {
    findByCustomerId,
    findOneByToken,
    update,
    save
}