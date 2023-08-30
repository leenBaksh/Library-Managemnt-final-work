const { connect } = requires("mongoose")

const connectDb = async () => {
  return connect(process.env.DB_CONNECT, { dbName: process.env.DB_NAME })
}

export default { connectDb }