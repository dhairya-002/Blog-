const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.get("", async (req, res) => {
  try {
    const locals = {
      title: "Blogingo",
      description: "nodeJs Blog created with bla bla",
    };

    let perPage = 10;
    let page = req.query.page || 1;
    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec(); //executes aggregate pileline

    const count = await Post.countDocuments({});
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render('index', {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      currentRoute: '/'
    });
  } catch (error) {
    console.log(error);
  }
});




router.get('/post/:id', async (req, res) => {

  try {
    let slug = req.params.id
    const data = await Post.findById({ _id: slug });
    const locals = {
      title: data.title,
      description: "nodeJs Blog created with bla bla",
    };
    res.render("post", {
      locals,
      data,
      currentRoute: `/post/${slug}`
    });
  } catch (error) {
    console.log(error);
  }
});

// p o s t   r o u t e .... s e a r c h  t e r m 

router.post('/search', async (req, res) => {
try {
  const locals = {
    title: "Seach",
    description: "Simple Blog created with NodeJs, Express & MongoDb."
  }

  let searchTerm = req.body.searchTerm;
  const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")

  const data = await Post.find({
    $or: [
      { title: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
      { body: { $regex: new RegExp(searchNoSpecialChar, 'i') } }
    ]
  });

  res.render("search", {
    data,
    locals,
    currentRoute: '/'
  });

} catch (error) {
  console.log(error);
}

});










router.get("/about", (req, res) => {
  res.render("about", {
    currentRoute: "/about"
  });


});


router.get("/contact", (req, res) => {
  res.render("contact", {
    currentRoute: "/contact"
  });


});




module.exports = router;
// function insertPostData() {
//     Post.insertMany([
//         {
//             title: "NodeJs is awesome",
//             body: "NodeJs is a server side javascript framework",

//         },
//         {

//             title: "ReactJs is awesome",
//             body: "ReactJs is a client side javascript framework",
//         },
//         {
//             title: "AngularJs is awesome",
//             body: "AngularJs is a client side javascript framework",
//         },
//         {
//             title: "VueJs is awesome",
//             body: "VueJs is a client side javascript framework",
//         },

//     ])
// }
// insertPostData()
