const passport = require('passport');
const {body, validationResult, check} = require('express-validator');

const User = require('../../models/user.model/User');

const controllerUser = {};

controllerUser.signUpUserGet = (req, res) => {
    res.render('user/signup',{
        title:'Sign Up'
    })
}

controllerUser.signUpUserPost = [
    body('name', 'Name must not be empty.').trim().isLength({ min: 3 }).escape(),
    body('flastname', 'First Last Name must not be empty.').trim().isLength({ min: 3 }).escape(),
    body('slastname', 'Second Last Name must not be empty.').trim().isLength({ min: 3 }).escape(),
    body('street', 'Street must not be empty.').trim().isLength({ min: 3 }).escape(),
    body('city', 'City must not be empty.').trim().isLength({ min: 3 }).escape(),
    body('codepostal', 'Code Postal must not be empty.').trim().isLength({ min: 3 }).escape(),
    body('date', 'Date must not be empty.').isLength({ min: 1 }).escape(),
    body('email').isEmail().normalizeEmail().trim().withMessage('Invalid Email')
    .custom(async(email)=>{
        const emailUser = await User.findOne({email: email});
        if(emailUser){
            throw new Error('Email al ready in use.');
        }
    }),
    body('password').matches('^[0-9a-zA-Z ]+$').withMessage('The password must contain a minimum of eight characters, at least one uppercase letter, one lowercase letter and one number').trim(),
    body('conpassword').trim().custom(async(conpassword, {req})=>{
        const password = req.body.password;
        if(password != conpassword){
            throw new Error('Passwords dont match');
        }
    }),

    async(req, res, next) => {
        const errors = validationResult(req);

        const{
            name,
            flastname,
            slastname,
            street,
            city,
            codepostal,
            date,
            email,
            password
        } = req.body;

        if(!errors.isEmpty()){
            console.log(errors);
            res.render('user/signup',{
                title:'Sign Up',
                name,
                flastname,
                slastname,
                street,
                city,
                codepostal,
                date,
                email,
                errors: errors.array()
            });
        }else{
            const newUser = new User({
                name,
                flastname,
                slastname,
                street,
                city,
                codepostal,
                date,
                email,
                password
            });

            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            console.log(newUser);
            res.redirect('signin');
        }
    }
]

controllerUser.signInUserGet = (req, res) => {
    res.render('user/signin', {
        title: 'Sign In'
    });
}

controllerUser.signInUserPost = passport.authenticate('local', {
    failureRedirect: '/user/signin',
    successRedirect:'/',
    failureFlash: true
})

controllerUser.logOutGet = (req, res) => {
    req.logout();
    res.redirect('/');
}



module.exports = controllerUser;