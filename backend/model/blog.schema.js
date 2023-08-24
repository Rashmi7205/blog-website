import {model,Schema} from 'mongoose';

const blogSchema = new Schema({
    title:{
        type:String,
        required:true,
        minLength:[5,'Title length should be atleast 5 char']
    },
    description:{
        type:String
    },
    publicUrl:{
        type:String,
    },
    author:{
        type:Object,
        required:true,
    },
    content:{
        type:String,
    },
    catagory:{
        type:Array,
    },
    image:{
        public_id :{
            type:String,
        },
        secure_url:{
            type:String,
        }
    },
    comments:{
        type:Array,
    },
    likedBy:{
        type:Array
    },
    relatedPosts:{
        type:Array
    }
},{timestamps:true});

export default model('Blogs',blogSchema);