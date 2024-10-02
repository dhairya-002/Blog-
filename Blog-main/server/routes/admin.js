// const express = require("express");
// const router = express.Router();
// const Post = require("../models/Post");
// const User = require("../models/User");
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken');
// const adminLayout = '../views/layout/admin'
// const jwtSecret = process.env.JWT_SECRET
// // ------------------------------------------------------------------------
// // check login
// const authMiddlewear = (req, res, next) => {
//     const token = req.cookies.token;
//     if (!token) {
//         return res.status(401).json({
//             message: 'unauthorised'
//         })
//     }
//     try {
//         const decoded = jwt.verify(token, jwtSecret)
//         req.userId = decoded.userId;
//         next()

//     } catch (error) {
//         return res.status(401).json({
//             message: 'unauthorised'
//         })
//     }
// }

// //------------------------------------------------------------------------------------------
// //GET/ ADMIN -LOGIN PAGE
// router.get('/admin', async (req, res) => {
//     try {
//         const locals = {
//             title: 'Admin Dashboard',
//             description: 'this is the admon dashboard'
//         }
//         const data = await Post.find()

//         res.render('admin/index', {
//             locals,
//             layout: adminLayout
//         });

//     } catch (error) {
//         console.log(error);
//     }
// });


// // router.get('/admin', async (req, res) => {

// //     const locals = {
// //         title: 'Admin Dashboard',
// //         description: 'this is the admon dashboard'
// //     }
// //     try {
// //         let slug = req.params.id
// //         const data = await Post.find()
// //         res.render('admin', { locals, data });

// //     } catch (error) {
// //         console.log(error);
// //     }
// // });


// //-----------------------------------------------------------------------------------------------------
// // POST 
// // ADMIN-CHECK LOGIN

// router.post('/admin', async (req, res) => {
//     try {
//         const {
//             username,
//             password
//         } = req.body

//         const user = await User.findOne({
//             username
//         });
//         if (!user) {
//             return res.status(401).json({
//                 message: 'invalid credentials'
//             })
//         }
//         const isPasswordValid = await bcrypt.compare(password, user.password);

//         if (!isPasswordValid) {
//             return res.status(401).json({
//                 message: 'invalid credentials'
//             })
//         }
//         const token = jwt.sign({
//             userId: user._id
//         }, jwtSecret)
//         res.cookie('token', token, {
//             httpOnly: true
//         });
//         res.redirect('dashboard');

//     } catch (error) {
//         console.log(error);
//     }
// });
// // --------------------------------------------

// // GET
// // ADMIN-CHECK LOGIN

// router.get('/dashboard', authMiddlewear, async (req, res) => {
//     try {
//         const locals = {
//             title: 'Dashboard',
//             description: 'this is dashboard'

//         }
//         const data = await Post.find()
//         res.render('admin/dashboard', {
//             locals,
//             data,
//             layout: adminLayout

//         })


//     } catch (error) {
//         console.log(error)
//     }
// });

// //--------------------------------------------------------------------------------

// //GET
// //admin-create-newpost

// router.get('/add-post', authMiddlewear, async (req, res) => {
//     try {
//         const locals = {
//             title: 'add-post',


//         }
//         const data = await Post.find()
//         res.render('admin/add-post', {
//             locals,
//             data,
//             layout: adminLayout

//         })


//     } catch (error) {
//         console.log(error)
//     }
// });
// //------------------------------------------------------------------

// //GET
// //admin-post-data
// router.post('/add-post', authMiddlewear, async (req, res) => {
//     try {
//         try {
//             const newPost = new Post({
//                 title: req.body.title,
//                 body: req.body.body
//             })
//             await Post.create(newPost)
//             res.redirect('/dashboard')
//         } catch (error) {
//             console.log(error)
//         }



//     } catch (error) {
//         console.log(error)
//     }
// });
// //-------------------------------------------------------------------------------
// //GET          the post that neeeds to be updated

// //edit post data api
// router.get('/edit-post/:id', authMiddlewear, async (req, res) => {
//     try {
//         const locals = {
//             title: 'Edit-post',


//         }
//       const data=await Post.findOne({_id:req.params.id})
//         res.render('/admin/edit-post',{
//             locals,
//             data,
//             layout:adminLayout
//         })
//     }
//     catch (error) {
//         console.log(error)
//     }
// });



// //-------------------------------------------------------------------------------
// //PUT
// //edit post data api
// router.put('/edit-post/:id', authMiddlewear, async (req, res) => {
//     try {
        
//         await Post.findByIdAndUpdate(req.params.id,{
//             title:req.body.title,
//             body:req.body.body,
//             updatedAt:Date.now()
//         })
//        res.redirect(`/edit-post/${req.params.id}`)
//     } 
//     catch (error) {
//         console.log(error)
//     }
// });
// //-------------------------------------------------------------------------------
// //DELETE
// //delete data api
// router.put('/delete-post/:id', authMiddlewear, async (req, res) => {
//     try {

//         await Post.deleteOne({_id:req.params.id})

//         res.redirect('/dashboard')
//     }
//     catch (error) {
//         console.log(error)
//     }
// });






// //---------------------------------------------------------------------------------------------------------

// // POST
// // ADMIN-register
// router.post('/register', async (req, res) => {
//     try {
//         const {
//             username,
//             password
//         } = req.body;
//         const hashedPassword = await bcrypt.hash(password, 10);

//         try {
//             const user = await User.create({
//                 username,
//                 password: hashedPassword
//             });
//             res.status(201).json({
//                 message: 'User Created',
//                 user
//             });
//         } catch (error) {
//             if (error.code === 11000) {
//                 res.status(409).json({
//                     message: 'User already in use'
//                 });
//             }
//             res.status(500).json({
//                 message: 'Internal server error'
//             })
//         }

//     } catch (error) {
//         console.error('Error during registration:', error);
//         res.status(500).json({
//             message: 'Internal server error',
//             error: error.message
//         });
//     }
// });
// // router.post('/register', async (req, res) => {
// //     try {
// //         const { username, password } = req.body;

// //         // Check if username already exists
// //         const existingUser = await User.findOne({ username });
// //         if (existingUser) {
// //             return res.status(409).json({ message: 'Username already in use' });
// //         }

// //         // Hash the password
// //         const hashedPassword = await bcrypt.hash(password, 10);

// //         // Create the new user
// //         const user = new User({ username, password: hashedPassword });
// //         await user.save();

// //         res.status(201).json({ message: 'User Created', user });
// //     } catch (error) {
// //         console.error('Error during registration:', error);
// //         // Check if response headers have already been sent
// //         if (!res.headersSent) {
// //             res.status(500).json({ message: 'Internal server error', error: error.message });
// //         }
// //     }
// // });

// //GET
// //admin-LOGOUT

// router.put('/logout', (req, res) => {
//    res.clearCookie('token')
//    res.redirect('/')
// });


// module.exports = router;


const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminLayout = '../views/layout/admin';
const jwtSecret = process.env.JWT_SECRET;


/**
 * 
 * Check Login
*/
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
}


/**
 * GET /
 * Admin - Login Page
*/
router.get('/admin', async (req, res) => {
    try {
        const locals = {
            title: "Admin",
            description: "Simple Blog created with NodeJs, Express & MongoDb."
        }

        res.render('admin/index', { locals, layout: adminLayout });
    } catch (error) {
        console.log(error);
    }
});


/**
 * POST /
 * verify the login of admin
*/
router.post('/admin', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, jwtSecret);
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/dashboard');

    } catch (error) {
        console.log(error);
    }
});


/**
 * GET /
 * what admin can see after being logged in 
 */
router.get('/dashboard', authMiddleware, async (req, res) => {
    try {
        const locals = {
            title: 'Dashboard',
            description: 'Simple Blog created with NodeJs, Express & MongoDb.'
        }

        const data = await Post.find();
        res.render('admin/dashboard', {
            locals,
            data,
            layout: adminLayout
        });

    } catch (error) {
        console.log(error);
    }

});


/**
 * GET /
 * Admin - Create New Post
*/
router.get('/add-post', authMiddleware, async (req, res) => {
    try {
        const locals = {
            title: 'Add Post',
            description: 'Simple Blog created with NodeJs, Express & MongoDb.'
        }

        const data = await Post.find();
        res.render('admin/add-post', {
            locals,
            layout: adminLayout
        });

    } catch (error) {
        console.log(error);
    }

});


/**
 * POST /
 * Admin - Create New Post
*/
router.post('/add-post', authMiddleware, async (req, res) => {
    try {
        try {
            const newPost = new Post({
                title: req.body.title,
                body: req.body.body
            });

            await Post.create(newPost);
            res.redirect('/dashboard');
        } catch (error) {
            console.log(error);
        }

    } catch (error) {
        console.log(error);
    }
});


/**
 * GET /
 * Admin - Create New Post
*/
router.get('/edit-post/:id', authMiddleware, async (req, res) => {
    try {

        const locals = {
            title: "Edit Post",
            description: "Free NodeJs User Management System",
        };

        const data = await Post.findOne({ _id: req.params.id });

        res.render('admin/edit-post', {
            locals,
            data,
            layout: adminLayout
        })

    } catch (error) {
        console.log(error);
    }

});


/**
 * PUT /
 * Admin - Create New Post
*/
router.put('/edit-post/:id', authMiddleware, async (req, res) => {
    try {

        await Post.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            body: req.body.body,
            updatedAt: Date.now()
        });

        res.redirect(`/edit-post/${req.params.id}`);

    } catch (error) {
        console.log(error);
    }

});


// router.post('/admin', async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     if(req.body.username === 'admin' && req.body.password === 'password') {
//       res.send('You are logged in.')
//     } else {
//       res.send('Wrong username or password');
//     }

//   } catch (error) {
//     console.log(error);
//   }
// });


/**
 * POST /
 * Admin - Register
*/
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const user = await User.create({ username, password: hashedPassword });
            res.status(201).json({ message: 'User Created', user });
        } catch (error) {
            if (error.code === 11000) {
                res.status(409).json({ message: 'User already in use' });
            }
            res.status(500).json({ message: 'Internal server error' })
        }

    } catch (error) {
        console.log(error);
    }
});


/**
 * DELETE /
 * Admin - Delete Post
*/
router.delete('/delete-post/:id', authMiddleware, async (req, res) => {

    try {
        await Post.deleteOne({ _id: req.params.id });
        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
    }

});


/**
 * GET /
 * Admin Logout
*/
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    //res.json({ message: 'Logout successful.'});
    res.redirect('/');
});


module.exports = router;