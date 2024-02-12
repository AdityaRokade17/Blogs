const Post = require("../models/postModel");
const Like = require("../models/likeModel");

exports.likePost = async( req, res) => {

    try {

        const{post , user} = req.body;
        const like = new Like({
            post , user
        })
        const savedLike = await like.save();

        //update post collection 
        const updatedPost = await Post.findByIdAndUpdate( post , {$push : { likes : savedLike._id}} , {new : true})
        .populate("likes").exec();

        res.json({
            post : updatedPost,
            likedId : savedLike._id
        })


    }
    catch(error){
        return res.status(400).json({
            error: "Error while Liking post",
        });
    } 
}

exports.unlikePost = async (req , res) =>{

    try{

        const{post , like} = req.body;

        const deletedLike = await Like.findOneAndDelete({post : post , _id : like});

        //udpate the post collection
        const udpatedPost = await Post.findByIdAndUpdate(post,
            {$pull: {likes: deletedLike._id} }, 
            {new: true});

        res.json({
                post:udpatedPost,
        });
    

    }
    catch(error) {
        return res.status(400).json({
            error: "Error while Unliking post",
        });
    }


}