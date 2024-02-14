const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Student = require('../models/Student');

// Routes

/**
 * GET /
 * HOME
*/
router.get('', async (req, res) => {
    try {
      // console.log(req.query);
      const locals = {
        title: "Vitti | Welcome",
        description: "Simple Blog created with NodeJs, Express & MongoDb."
      }
  
      const data = await Post.aggregate([
        { $sample: { size: 2 } }
      ]);      
  
      res.render('index', { 
        locals,
        data,
        currentRoute: '/'
      });
  
    } catch (error) {
      console.log(error);
    }
  
  });

/**
 * POST /
 * HOME - Student Login
*/
router.post('/student-login', async (req, res) => {
  try {
    const { roll, phone } = req.body;

    const student = await Student.findOne({ roll });

    if (!student) {
        return res.status(401).json({ message: 'Invalid Credentials' });
    }

    const isPhoneValid = phone === student.phone;

    if (!isPhoneValid) {
        return res.status(401).json({ message: 'Invalid Credentials' });
    }

    res.redirect('/student-page-of-all-posts');
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



/**
 * GET /
 * HOME - Student Login
*/
router.get('/student-page-of-all-posts', async (req, res) => {
  try {
    // console.log(req.query);
    const locals = {
      title: "Vitti | Welcome",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    }

    const data = await Post.find().sort({ createdAt: -1 }); 

    res.render('student-page', { 
      locals,
      data,
      currentRoute: '/'
    });

  } catch (error) {
    console.log(error);
  }

});


/**
 * GET /
 * Post :id
*/
router.get('/post/:id', async (req, res) => {
    try {
      let slug = req.params.id;
  
      const data = await Post.findById({ _id: slug });
  
      const locals = {
        title: data.title,
        description: "Simple Blog created with NodeJs, Express & MongoDb.",
      }
  
      res.render('post', { 
        locals,
        data,
        currentRoute: `/post/${slug}`
      });
    } catch (error) {
      console.log(error);
    }
  
  });
  


router.get('/about', (req,res)=>{
    res.render('about', {
      currentRoute : '/about',
    });
});

router.get('/contact', (req, res)=>{
    res.render('contact', {
      currentRoute : '/contact',
    });
});


module.exports = router;