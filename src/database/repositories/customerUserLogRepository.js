const knex = require('../index');

const findAllByCustomerId = async (customerId) => {
    const result = await knex.select('*')
        .from('customer_user_log')
        .where({ customer_id: customerId });
    
    return result;
}

const save = async (userLog, transaction) => {
    let queryBuilder = knex('customer_user_log');

    if (transaction) 
        queryBuilder = queryBuilder.transacting(transaction);
    
    const result = await queryBuilder.insert(userLog).returning('id');
    return result?.at(0).id;
}

module.exports = {
    findAllByCustomerId,
    save
}