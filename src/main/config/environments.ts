export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://192.168.15.55:27017/clean-node-api',
  port: process.env.PORT || 5050,
  salt: 12,
  secretKey: process.env.SECRET_KEY || '2512@mt'
}
