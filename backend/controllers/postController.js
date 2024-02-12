const Post =require("../models/postModel");

exports.createPost = async (req , res) => {

    try {

        const {title , body} = req.body;

        const post = new Post( {

            title , body
        });

        const savedPost = await post.save();

        res.json({
            post : savedPost
        })
    }
    catch(err){
        return res.status(400).json({
            error : "Error while creating post"
        })
    }
}

exports.getAllPosts = async (req , res) => {

    try {

        const posts = await Post.find().populate("likes").populate("comments").exec();
        res.json({
            posts,
        })
        console.log("possssssssssssssssssssssss:::",posts)
    }
    catch(err){
        return res.status(400).json({
            error : "Error while fetching Posts"
        })
    } 
}

exports.deletePost = async (req, res) => {
    try{

        const{id} = req.params;
        await Post.findByIdAndDelete(id);

        res.json({
            success : true,
            message : "Delelte Succesfully"
        })
    }catch(error){
        console.log(error);
        res.json({
            success : false,
            message : "delete error"
        })
    }
}

exports.updatePost = async (req , res) => {

    try{
        const {id} = req.params;
        const {title , body} = req.body;

        const updatedPost = await Post.findByIdAndUpdate(
            {_id : id},
            {title , body },
            {new : true}
        )

        res.json({
            success : true,
            data : updatedPost,
            message : "updated succesfully"
        })
    }catch(error){
        console.error(error);
        res.status(500)
        .json({
            success:false,
            error:error.message,
            message:'Server Error',
        });
    }
}