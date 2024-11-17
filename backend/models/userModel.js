const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;
const userSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required:[true,"Firstname required"],
        trim:true,
        text:true
    },
    last_name:{
        type:String,
        required:[true,"Lastname required"],
        trim:true,
        text:true
    },
    username:{
        type:String,
        required:[true,"Username required"],
        trim:true,
        text:true,
        unique:true
    },
    email:{
        type:String,
        required:[true,"Email required"],
        trim:true,
        text:true,
        unique:true,
    },
    password:{
        type:String,
        required:[true,"password required"],
    },
    picture:{
        type:String,
        trim:true,
        default:""
    },
    cover:{
        type:String,
        trim:true
    },
    gender:{
        type:String,
        required:[true,"gender required"],
        trim:true,
    },
    bYear:{
        type:Number,
        required:[true,"DoB required"],
        trim:true,
    },
    bMonth:{
        type:Number,
        required:[true,"DoB required"],
        trim:true,
    },
    bDay:{
        type:Number,
        required:[true,"DoB required"],
        trim:true,
    },
    Verfied:{
        type:Boolean,
        default:false
    },
    friends:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    },
    followers:{
        type:Array,
        default:[]
    },
    requests:{
        type:Array,
        default:[]
    },
    search:[
        {
            user:{
                type:ObjectId,
                ref:"User"
            }
        }
    ],
    details:{
        bio:{
            type:String,
        },
        otherName:{
            type:String,
        },
        job:{
            type:String,
        },
        workplace:{
            type:String,
        },
        highSchool:{
            type:String,
        },
        college:{
            type:String,
        },
        currentCity:{
            type:String,
        },
        hometown:{
            type:String,
        },
        relationship:{
            type:String,
            enum:['Single','In a relationship','Married','Divorced']
        },
        instagram:{
            type:String,
        },
    },
    savedPosts:[
        {
            post:{
                type:ObjectId,
                ref:"Post"
            },
            savedAt:{
                type:Date,
                required:true
            }
        }
    ]
},{
    timestamps:true,
})

module.exports = mongoose.model("User",userSchema);