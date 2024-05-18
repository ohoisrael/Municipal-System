import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
            unique: true,
        },
        image: {
            type: String,
            default: 'https://media.licdn.com/dms/image/C5603AQFUD_IDXpY_DQ/profile-displayphoto-shrink_800_800/0/1565153043725?e=2147483647&v=beta&t=WmyJfNcqWS4geFIFFxdBRLclcRi5zY92oIR5Up1JeKs',
        },
        category: {
            type: String,
            default: 'uncategorized',
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },

    }, { timestamps: true }
)

const Post = mongoose.model('Post', postSchema)

export default Post;