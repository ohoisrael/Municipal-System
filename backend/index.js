import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.route.js'
import cookieParser from 'cookie-parser'
import postRoutes from './routes/post.route.js'
import commentRoutes from './routes/comment.route.js'
import paymentRoutes from './routes/payment.route.js'
import propertyRoutes from './routes/property.route.js'
import path from 'path'

dotenv.config()

mongoose.connect(process.env.MONGO_DB_URI)
    .then(() => {
        console.log('MongoDb is connected')
    })
    .catch((err) => {
        console.log(err)
    })

    const __dirname = path.resolve()

const app = express();

app.use(express.json())
app.use(cookieParser())

app.listen(3000, () => {
    console.log("Server is running on Port 3000")
})

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/post', postRoutes)
app.use('/api/comment', commentRoutes)
app.use('/api/payment', paymentRoutes)
app.use('/api/property', propertyRoutes)

app.use(express.static(path.join(__dirname, '/frontend/dist')))

app.get('*', (req, res)=> {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error'
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})