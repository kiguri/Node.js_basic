const express = require('express');
require('./db/mongoose');

const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

//run
app.listen(port, () => {
    console.log(`Server is up on http://localhost:${port}`);
});

const Task = require('./models/task')
const User = require('./models/user')

const main = async () => {
    const user = await User.findById('5f9bacb4213ccf4650b9fae4');
    await user.populate('tasks').execPopulate();
    console.log(user.tasks)
}

main()