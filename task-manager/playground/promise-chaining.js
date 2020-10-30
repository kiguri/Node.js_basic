require('../src/db/mongoose');
const User = require('../src/models/user');

//
// User.findByIdAndUpdate('5f98e15d28e6631c88199ef5', { age: 1 })
//     .then(user => {
//         console.log(user);
//         return User.countDocuments({ age: 1 })
//     })
//     .then(result => {
//         console.log(result)
//     })
//     .catch(e => {
//         console.log(e)
//     })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age: age });
    return await User.countDocuments({ age: age });
}

updateAgeAndCount('5f98e15d28e6631c88199ef5', 2)
    .then(count => {
        console.log(count);
    })
    .catch(e => {
        console.log(e);
    })