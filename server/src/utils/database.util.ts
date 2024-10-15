export default {
    port: 3000,
    dbUri: 'mongodb://localhost:27017/deliveroo-clone',
    dbName: 'deliveroo-clone',
    connect: async () => {
        console.log('Database connected')
    },
}
