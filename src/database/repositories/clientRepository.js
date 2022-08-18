const knex = require('../index');

const findOneByToken = async ({ token }) => {
    const result = await knex.select('*')
        .from('client')
        .where({ token, active: true });

    return result?.at(0);
}

module.exports = {
    findOneByToken
}