const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const customerRepository = require('../database/repositories/customerRepository');
const UnprocessableError = require('../exceptions/UnprocessableError');

const createUser = async (userDTO) => {
    const userExist = await customerRepository.findByEmail({ email: userDTO.email });
    
    if (userExist) 
        return userExist;

    const user = {
        email: userDTO.email,
        uuid: uuidv4()
    }

    user.password = await bcrypt.hash(userDTO.password, 10);
    user.id = await customerRepository.save(user);

    return user;
}

const getUser = async (userId) => {
    const user = await customerRepository.findById({ id: userId });
    if (!user) {
        throw new UnprocessableError('User has exist for id');
    }

    return {
        uuid: user.uuid,
        expire_date: user.expire_date
    };
}

module.exports = { createUser, getUser }