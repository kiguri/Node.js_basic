const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0) {
                return reject('Number must > 0')
            }
            resolve(a + b);
        }, 2000)
    })
}

const doWork = async () => {
    const sum = await add(1, -9);
    const sum2 = await add(sum, 5);
    return await add(sum2, -15);
}

doWork().then(result => {
    console.log('result:', result);
}).catch(e => {
    console.log('e:', e)
})