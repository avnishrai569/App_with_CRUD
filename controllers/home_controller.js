
const Post = require('../models/post');
const User = require('../models/user');

module.exports.home =  async function(req, res){

   try {
   // populate the user of each post
   // CHANGE :: populate the likes of each post and comment
     let posts = await Post.find({})
     .sort('-createdAt')
     .populate('user')
     .populate({
          path: 'comments',
          populate:{
           path: 'user'
         },
         populate:  {
          path: 'likes'
         }
       }).populate('likes');
      let users = await User.find({});

      return res.render('home',{
          title: 'Codeial | Home', 
           posts: posts,
          all_users: users
       }); 
   } catch (error) {
    console.log("Error" ,err);
    return;
   }


}




// without asynchronus way
// module.exports.home =  function(req, res){

//     // console.log(req.cookies);
//     // res.cookie('user_id', 25);
//     // return res.end('<h1> Express is up for Codeial! </h1>');
//     // Post.find({}, function(err,posts){
//     // return res.render('home', {
//     //     title: "Codeial | Home",
//     //     posts: posts

//     // });
//     // });

//     // populate the user of each post
//   Post.find({})
//     .populate('user')
//     .populate({
//         path: 'comments',
//         populate:{
//             path: 'user'
//         }
//     })
//     .exec(function(err, posts){

//         User.find({}, function(err, users){
//             return res.render('home',{
//                 title: 'Codeial | Home', 
//                 posts: posts,
//                 all_users: users
//             });            
//         });
       
//     });
// }


// module.exports.practice = function(req, res){
//     return res.end('<h1> You are under training and you practice that </h1>');
// }
// module.exports.actionName = function(req,res){}

