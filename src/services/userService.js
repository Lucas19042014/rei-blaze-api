const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const customerRepository = require('../database/repositories/customerRepository');

const createUser = async (userDTO) => {
    const userExist = await customerRepository.findByEmail({ email: userDTO.email });
    if (userExist) {
        throw new Error('User has exist for email');
    }

    const user = {
        name: userDTO.name,
        email: userDTO.email,
        uuid: uuidv4()
    }

    user.password = await bcrypt.hash(userDTO.password, 10);

    await customerRepository.save(user);

    return user;
}

const getUser = async (userId) => {
    const user = await customerRepository.findById({ id: userId });
    if (!user) {
        throw new Error('User has exist for id');
    }

    return {
        uuid: user.uuid,
        name: user.name,
        expire_date: user.expire_date
    };
}

module.exports = { createUser, getUser }