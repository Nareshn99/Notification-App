const amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost', (err0, connection) => {
    if (err0) {
        throw err0
    }
    connection.createChannel((err1, channel) => {
        if (err1) {
            throw err1
        }
        const pushQueue = 'pushInBasikMarketing'
        const pullQueue = 'pullfromBasikMarketing'
        channel.assertQueue(pushQueue)
        channel.assertQueue(pullQueue)
        channel.consume(pushQueue, (message) => {
            const data = JSON.parse(message.content.toString())
            channel.sendToQueue(pullQueue, Buffer.from(JSON.stringify(data)))
        }, { noAck: true })
    })
})