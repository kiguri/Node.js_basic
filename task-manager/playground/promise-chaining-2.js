require('../src/db/mongoose');
const Task = require('../src/models/task');


const deleteTaskAndCount = async (id) => {
    const tasks = await Task.findByIdAndDelete(id);
    return await Task.countDocuments({ completed: false });
}

deleteTaskAndCount('5f98e55d5ab7742dcc0f6cd4')
    .then(count => {
        console.log(count)
    })
    .catch(e => {
        console.log(e)
    })