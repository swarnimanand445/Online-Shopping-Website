const express              =require('express'),
      app                  =express(),
      bodyParser           =require('body-parser'),
      mongoose             =require('mongoose'),
      mongodb              =require('mongodb'),
      ObjectId             = mongodb.ObjectID,
      passport             =require("passport"),
      LocalStratergy       =require("passport-local"),
      passportLocalMongoose=require('passport-local-mongoose'),
      expressSession       =require("express-session"),
      methodOverride       =require("method-override"),
      expressSanitizer     =require("express-sanitizer"),
      User                 =require("./models/user"),
      flash                =require('connect-flash'),
      cookieParser         =require('cookie-parser'),
      connectEnsureLogin   = require('connect-ensure-login'),
      port                 =process.env.PORT||6500;

 /*------------------------------------------------------------------------------------------------------------ */  
 
               
const url=process.env.MONGO_URL||"mongodb+srv://swarnimanand445:gupta8800@test-vqkmj.mongodb.net/Shopping-Website?retryWrites=true&w=majority";
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true,ignoreUndefined:true,useCreateIndex:true},function(err,db)
{
    if(err)
    {
        console.log("Error connecting Database");
        console.log(err);
    }
    else{
        console.log("DB connected...!");
    }
});
/*------------------------------------------------------------------------------------------------------------ */     
app.set("view engine","ejs");
app.set("views","./view");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));    
app.use(methodOverride("_method"));
app.use(expressSanitizer());

/*----------------------------------------------- */
//Passport Authentication Requirements
/*------------------------------------------------ */
app.use(expressSession({
    secret:"This is Online Shopping Website ",
    resave:false,
    saveUninitialized:false,
    cookie:{maxAge:1000*60*60*6,httpOnly:true}
}));

app.use(flash());

app.use(function(req, res, next){
    res.locals.message = req.flash();
    
    next();
});

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    
    res.locals.currentUser=req.user;
    next();
});



/*------------------------------------------------------------------------------------------------------------ */ 
let register_schema=new mongoose.Schema({//mongoose.Schema is used to conevert it into json format
    name:String,
    username:String,
    email:String,
    password:String
})
let Register=mongoose.model("Register",register_schema);//mongoose.model is for convert it into formatable way

// let login_schema=new mongoose.Schema({
//     username:String,
//     password:String
// })
// let Login=mongoose.model("Login",login_schema);

let subscribe_schema=new mongoose.Schema({
    detailSubscription:String
});
let Subscribe=mongoose.model("Subscribe",subscribe_schema);

let contact_schema=new mongoose.Schema({
    name:String,
    subject:String,
    email:String,
    message:String
})
let Contact=mongoose.model("Contact",contact_schema);

let checkout_schema=new mongoose.Schema({
    username:String,
    email:String,
    address:String,
    pincode:Number,
    state:String,
    city:String,
    mobile:Number
})
let Checkout=mongoose.model("Checkout",checkout_schema);

let product_schema=new mongoose.Schema({
    
    pid:String,
    image:String,
    name:String,
    price:Number,
    discount:String,
    size:String,
    specification:String
})
let HomeProduct=mongoose.model("Product",product_schema);
let MenProduct=mongoose.model("MenProduct",product_schema);
let WomenProduct=mongoose.model("WomenProduct",product_schema);
let MenShirtProduct=mongoose.model("MenShirtProduct",product_schema);
let MenJeansProduct=mongoose.model("MenJeansProduct",product_schema);
let MenSuitsProduct=mongoose.model("MenSuitsProduct",product_schema);
let MenShoesProduct=mongoose.model("MenShoesProduct",product_schema);
let MenJacketProduct=mongoose.model("MenJacketProduct",product_schema);
let WomenJeansProduct=mongoose.model("WomenJeansProduct",product_schema);
let WomenTopProduct=mongoose.model("WomenTopProduct",product_schema);
let WomenShoesProduct=mongoose.model("WomenShoesProduct",product_schema);
let WomenDressProduct=mongoose.model("WomenDressProduct",product_schema);
let WomenKurtiProduct=mongoose.model("WomenKurtiProduct",product_schema);
let Cart=mongoose.model("Cart",product_schema);
/*------------------------------------------------------------------------------------------------------------ */ 
app.get("/",function(req,res)
{
    res.redirect("/homeDataset");
})
/*------------------------------------------------------------------------------------------------------------ */ 
app.get("/homeForm",function(req,res)
{
    res.render("homeForm");
})

app.get("/homeDataset",function(req,res)
{
    HomeProduct.find({},function(err,product)
    {
        if(err)
        {
            console.log("Something went wrong");
            console.log(err);
        }
        else
        {
            res.render("homeProduct",{product1:product})
        }
    })
})

app.get("/homeDataset/:id",function(req,res)
{
    HomeProduct.findById(req.params.id,function(err,product)
    {
        if(err)
        {
            console.log("Something went wrong");
            console.log(err);
        }
        else
        {
            res.render("showProduct",{productDetail:product})
        }
    })
})
app.post("/homeDataset",function(req,res)
{
    let id2=req.body.id1;
    let image1=req.body.image;
    let name1=req.body.name;
    let price1=req.body.price;
    let discount1=req.body.discount;
    let size1=req.body.size;
    let specification1=req.body.specification;
    let product={image:image1,pid:id2,name:name1,price:price1,discount:discount1,size:size1,specification:specification1};
    HomeProduct.create(product,function(err,product)
    {
        if(err)
        {
            console.log("Something went Wrong");
            console.log(err);
        }
        else
        {
            console.log("Home Product detail inserted successfully...");
            res.redirect("/homeDataset");
        }
    })
})
/*------------------------------------------------------------------------------------------------------------ */ 
/*------------------------------------------------------------------------------------------------------------ */ 
app.get("/menForm",function(req,res)
{
    res.render("menForm");
})
app.get("/menDataset",function(req,res)
{
    MenProduct.find({},function(err,product)
    {
        if(err)
        {
            console.log("Something went wrong");
            console.log(err);
        }
        else
        {
            res.render("menProduct",{product1:product})
        }
    })
})
app.get("/menDataset/:id",function(req,res)
{
    MenProduct.findById(req.params.id,function(err,product)
    {
        if(err)
        {
            console.log("Something went wrong");
            console.log(err);
        }
        else
        {
            res.render("showProduct",{productDetail:product})
        }
    })
})
app.post("/menDataset",function(req,res)
{
    let id2=req.body.id1;
    let image1=req.body.image;
    let name1=req.body.name;
    let price1=req.body.price;
    let discount1=req.body.discount;
    let size1=req.body.size;
    let specification1=req.body.specification;
    let product={image:image1,pid:id2,name:name1,price:price1,discount:discount1,size:size1,specification:specification1};
    MenProduct.create(product,function(err,product)
    {
        if(err)
        {
            console.log("Something went Wrong");
            console.log(err);
        }
        else
        {
            console.log(" Men Product detail inserted successfully...");
            res.redirect("/home");
        }
    })
})
/*------------------------------------------------------------------------------------------------------------ */ 
/*------------------------------------------------------------------------------------------------------------ */ 
app.get("/womenForm",function(req,res)
{
    res.render("womenForm");
})
app.get("/womenDataset",function(req,res)
{
    WomenProduct.find({},function(err,product)
    {
        if(err)
        {
            console.log("Something went wrong");
            console.log(err);
        }
        else
        {
            res.render("womenProduct",{product1:product})
        }
    })
})
app.get("/womenDataset/:id",function(req,res)
{
    WomenProduct.findById(req.params.id,function(err,product)
    {
        if(err)
        {
            console.log("Something went wrong");
            console.log(err);
        }
        else
        {
            res.render("w_showProduct",{productDetail:product})
        }
    })
})
app.post("/womenDataset",function(req,res)
{
    let id2=req.body.id1;
    let image1=req.body.image;
    let name1=req.body.name;
    let price1=req.body.price;
    let discount1=req.body.discount;
    let size1=req.body.size;
    let specification1=req.body.specification;
    let product={image:image1,pid:id2,name:name1,price:price1,discount:discount1,size:size1,specification:specification1};
    WomenProduct.create(product,function(err,product)
    {
        if(err)
        {
            console.log("Something went Wrong");
            console.log(err);
        }
        else
        {
            console.log("WomenProduct detail inserted successfully...");
            res.redirect("/homeDataset");
        }
    })
})
/*------------------------------------------------------------------------------------------------------------ */
app.get("/interiorDesign",function(req,res)
{
    res.render("interior");
});
/*------------------------------------------------------------------------------------------------------------ */ 
app.get("/discover",function(req,res)
{
    res.render("discover");
});
/*------------------------------------------------------------------------------------------------------------ */

/*------------------------------------------------------------------------------------------------------------ */ 
app.get("/menShirtForm",function(req,res)
{
    res.render("menShirtForm");
})
app.get("/menShirtDataset",function(req,res)
{
    MenShirtProduct.find({},function(err,product)
    {
        if(err)
        {
            console.log("Something went wrong");
            console.log(err);
        }
        else
        {
            res.render("menShirtProduct",{product1:product})
        }
    })
})
app.get("/menShirtDataset/:id",function(req,res)
{
    MenShirtProduct.findById(req.params.id,function(err,product)
    {
        if(err)
        {
            console.log("Something went wrong");
            console.log(err);
        }
        else
        {
            res.render("showProduct",{productDetail:product})
        }
    })
})
app.post("/menShirtDataset",function(req,res)
{
    let id2=req.body.id1;
    let image1=req.body.image;
    let name1=req.body.name;
    let price1=req.body.price;
    let discount1=req.body.discount;
    let size1=req.body.size;
    let specification1=req.body.specification;
    let product={image:image1,pid:id2,name:name1,price:price1,discount:discount1,size:size1,specification:specification1};
    MenShirtProduct.create(product,function(err,product)
    {
        if(err)
        {
            console.log("Something went Wrong");
            console.log(err);
        }
        else
        {
            console.log(" Men Shirt Product detail inserted successfully...");
            res.redirect("/homeDataset");
        }
    })
})
/*------------------------------------------------------------------------------------------------------------ */ 
/*------------------------------------------------------------------------------------------------------------ */ 
app.get("/menJacketForm",function(req,res)
{
    res.render("menJacketForm");
})
app.get("/menJacketDataset",function(req,res)
{
    MenJacketProduct.find({},function(err,product)
    {
        if(err)
        {
            console.log("Something went wrong");
            console.log(err);
        }
        else
        {
            res.render("menJacketProduct",{product1:product})
        }
    })
})
app.get("/menJacketDataset/:id",function(req,res)
{
    MenJacketProduct.findById(req.params.id,function(err,product)
    {
        if(err)
        {
            console.log("Something went wrong");
            console.log(err);
        }
        else
        {
            res.render("showProduct",{productDetail:product})
        }
    })
})
app.post("/menJacketDataset",function(req,res)
{
    let id2=req.body.id1;
    let image1=req.body.image;
    let name1=req.body.name;
    let price1=req.body.price;
    let discount1=req.body.discount;
    let size1=req.body.size;
    let specification1=req.body.specification;
    let product={image:image1,pid:id2,name:name1,price:price1,discount:discount1,size:size1,specification:specification1};
    MenJacketProduct.create(product,function(err,product)
    {
        if(err)
        {
            console.log("Something went Wrong");
            console.log(err);
        }
        else
        {
            console.log(" Men Shirt Product detail inserted successfully...");
            res.redirect("/homeDataset");
        }
    })
})
/*------------------------------------------------------------------------------------------------------------ */ 
/*------------------------------------------------------------------------------------------------------------ */ 
app.get("/menJeansForm",function(req,res)
{
    res.render("menJeansForm");
})
app.get("/menJeansDataset",function(req,res)
{
    MenJeansProduct.find({},function(err,product)
    {
        if(err)
        {
            console.log("Something went wrong");
            console.log(err);
        }
        else
        {
            res.render("menJeansProduct",{product1:product})
        }
    })
})
app.get("/menJeansDataset/:id",function(req,res)
{
    MenJeansProduct.findById(req.params.id,function(err,product)
    {
        if(err)
        {
            console.log("Something went wrong");
            console.log(err);
        }
        else
        {
            res.render("showProduct",{productDetail:product})
        }
    })
})
app.post("/menJeansDataset",function(req,res)
{
    let id2=req.body.id1;
    let image1=req.body.image;
    let name1=req.body.name;
    let price1=req.body.price;
    let discount1=req.body.discount;
    let size1=req.body.size;
    let specification1=req.body.specification;
    let product={image:image1,pid:id2,name:name1,price:price1,discount:discount1,size:size1,specification:specification1};
    MenJeansProduct.create(product,function(err,product)
    {
        if(err)
        {
            console.log("Something went Wrong");
            console.log(err);
        }
        else
        {
            console.log(" Men Shirt Product detail inserted successfully...");
            res.redirect("/homeDataset");
        }
    })
})
/*------------------------------------------------------------------------------------------------------------ */ 
/*------------------------------------------------------------------------------------------------------------ */ 
app.get("/menShoesForm",function(req,res)
{
    res.render("menShoesForm");
})
app.get("/menShoesDataset",function(req,res)
{
    MenShoesProduct.find({},function(err,product)
    {
        if(err)
        {
            console.log("Something went wrong");
            console.log(err);
        }
        else
        {
            res.render("menShoesProduct",{product1:product})
        }
    })
})
app.get("/menShoesDataset/:id",function(req,res)
{
    MenShoesProduct.findById(req.params.id,function(err,product)
    {
        if(err)
        {
            console.log("Something went wrong");
            console.log(err);
        }
        else
        {
            res.render("showProduct",{productDetail:product})
        }
    })
})
app.post("/menShoesDataset",function(req,res)
{
    let id2=req.body.id1;
    let image1=req.body.image;
    let name1=req.body.name;
    let price1=req.body.price;
    let discount1=req.body.discount;
    let size1=req.body.size;
    let specification1=req.body.specification;
    let product={image:image1,pid:id2,name:name1,price:price1,discount:discount1,size:size1,specification:specification1};
    MenShoesProduct.create(product,function(err,product)
    {
        if(err)
        {
            console.log("Something went Wrong");
            console.log(err);
        }
        else
        {
            console.log(" Shoes Product detail inserted successfully...");
            res.redirect("/homeDataset");
        }
    })
})
/*------------------------------------------------------------------------------------------------------------ */ 

/*------------------------------------------------------------------------------------------------------------ */ 
app.get("/menSuitsForm",function(req,res)
{
    res.render("menSuitsForm");
})
app.get("/menSuitsDataset",function(req,res)
{
    MenSuitsProduct.find({},function(err,product)
    {
        if(err)
        {
            console.log("Something went wrong");
            console.log(err);
        }
        else
        {
            res.render("menSuitsProduct",{product1:product})
        }
    })
})
app.get("/menSuitsDataset/:id",function(req,res)
{
    MenSuitsProduct.findById(req.params.id,function(err,product)
    {
        if(err)
        {
            console.log("Something went wrong");
            console.log(err);
        }
        else
        {
            res.render("showProduct",{productDetail:product})
        }
    })
})
app.post("/menSuitsDataset",function(req,res)
{
    let id2=req.body.id1;
    let image1=req.body.image;
    let name1=req.body.name;
    let price1=req.body.price;
    let discount1=req.body.discount;
    let size1=req.body.size;
    let specification1=req.body.specification;
    let product={image:image1,pid:id2,name:name1,price:price1,discount:discount1,size:size1,specification:specification1};
    MenSuitsProduct.create(product,function(err,product)
    {
        if(err)
        {
            console.log("Something went Wrong");
            console.log(err);
        }
        else
        {
            console.log(" Men Shirt Product detail inserted successfully...");
            res.redirect("/homeDataset");
        }
    })
})
/*------------------------------------------------------------------------------------------------------------ */
 


/*------------------------------------------------------------------------------------------------------------ */ 
app.get("/womenTopForm",function(req,res)
{
    res.render("womenTopForm");
})
app.get("/womenTopDataset",function(req,res)
{
    WomenTopProduct.find({},function(err,product)
    {
        if(err)
        {
            console.log("Something went wrong");
            console.log(err);
        }
        else
        {
            res.render("womenTopProduct",{product1:product})
        }
    })
})
app.get("/womenTopDataset/:id",function(req,res)
{
    WomenTopProduct.findById(req.params.id,function(err,product)
    {
        if(err)
        {
            console.log("Something went wrong");
            console.log(err);
        }
        else
        {
            res.render("w_showProduct",{productDetail:product})
        }
    })
})
app.post("/womenTopDataset",function(req,res)
{
    let id2=req.body.id1;
    let image1=req.body.image;
    let name1=req.body.name;
    let price1=req.body.price;
    let discount1=req.body.discount;
    let size1=req.body.size;
    let specification1=req.body.specification;
    let product={image:image1,pid:id2,name:name1,price:price1,discount:discount1,size:size1,specification:specification1};
    WomenTopProduct.create(product,function(err,product)
    {
        if(err)
        {
            console.log("Something went Wrong");
            console.log(err);
        }
        else
        {
            console.log(" Men Shirt Product detail inserted successfully...");
            res.redirect("/homeDataset");
        }
    })
})
/*------------------------------------------------------------------------------------------------------------ */ 
/*------------------------------------------------------------------------------------------------------------ */ 
app.get("/womenJeansForm",function(req,res)
{
    res.render("womenJeansForm");
})
app.get("/womenJeansDataset",function(req,res)
{
    WomenJeansProduct.find({},function(err,product)
    {
        if(err)
        {
            console.log("Something went wrong");
            console.log(err);
        }
        else
        {
            res.render("womenJeansProduct",{product1:product})
        }
    })
})
app.get("/womenJeansDataset/:id",function(req,res)
{
    WomenJeansProduct.findById(req.params.id,function(err,product)
    {
        if(err)
        {
            console.log("Something went wrong");
            console.log(err);
        }
        else
        {
            res.render("w_showProduct",{productDetail:product})
        }
    })
})
app.post("/womenJeansDataset",function(req,res)
{
    let id2=req.body.id1;
    let image1=req.body.image;
    let name1=req.body.name;
    let price1=req.body.price;
    let discount1=req.body.discount;
    let size1=req.body.size;
    let specification1=req.body.specification;
    let product={image:image1,pid:id2,name:name1,price:price1,discount:discount1,size:size1,specification:specification1};
    WomenJeansProduct.create(product,function(err,product)
    {
        if(err)
        {
            console.log("Something went Wrong");
            console.log(err);
        }
        else
        {
            console.log(" Men Shirt Product detail inserted successfully...");
            res.redirect("/homeDataset");
        }
    })
})
/*------------------------------------------------------------------------------------------------------------ */ 
/*------------------------------------------------------------------------------------------------------------ */ 
app.get("/womenDressForm",function(req,res)
{
    res.render("womenDressForm");
})
app.get("/womenDressDataset",function(req,res)
{
    WomenDressProduct.find({},function(err,product)
    {
        if(err)
        {
            console.log("Something went wrong");
            console.log(err);
        }
        else
        {
            res.render("womenDressProduct",{product1:product})
        }
    })
})
app.get("/womenDressDataset/:id",function(req,res)
{
    WomenDressProduct.findById(req.params.id,function(err,product)
    {
        if(err)
        {
            console.log("Something went wrong");
            console.log(err);
        }
        else
        {
            res.render("w_showProduct",{productDetail:product})
        }
    })
})
app.post("/womenDressDataset",function(req,res)
{
    let id2=req.body.id1;
    let image1=req.body.image;
    let name1=req.body.name;
    let price1=req.body.price;
    let discount1=req.body.discount;
    let size1=req.body.size;
    let specification1=req.body.specification;
    let product={image:image1,pid:id2,name:name1,price:price1,discount:discount1,size:size1,specification:specification1};
    WomenDressProduct.create(product,function(err,product)
    {
        if(err)
        {
            console.log("Something went Wrong");
            console.log(err);
        }
        else
        {
            console.log(" Men Shirt Product detail inserted successfully...");
            res.redirect("/homeDataset");
        }
    })
})
/*------------------------------------------------------------------------------------------------------------ */ 
/*------------------------------------------------------------------------------------------------------------ */ 
app.get("/womenKurtiForm",function(req,res)
{
    res.render("womenKurtiForm");
})
app.get("/womenKurtiDataset",function(req,res)
{
    WomenKurtiProduct.find({},function(err,product)
    {
        if(err)
        {
            console.log("Something went wrong");
            console.log(err);
        }
        else
        {
            res.render("womenKurtiProduct",{product1:product})
        }
    })
})
app.get("/womenKurtiDataset/:id",function(req,res)
{
    WomenKurtiProduct.findById(req.params.id,function(err,product)
    {
        if(err)
        {
            console.log("Something went wrong");
            console.log(err);
        }
        else
        {
            res.render("w_showProduct",{productDetail:product})
        }
    })
})
app.post("/womenKurtiDataset",function(req,res)
{
    let id2=req.body.id1;
    let image1=req.body.image;
    let name1=req.body.name;
    let price1=req.body.price;
    let discount1=req.body.discount;
    let size1=req.body.size;
    let specification1=req.body.specification;
    let product={image:image1,pid:id2,name:name1,price:price1,discount:discount1,size:size1,specification:specification1};
    WomenKurtiProduct.create(product,function(err,product)
    {
        if(err)
        {
            console.log("Something went Wrong");
            console.log(err);
        }
        else
        {
            console.log(" Shoes Product detail inserted successfully...");
            res.redirect("/homeDataset");
        }
    })
})
/*------------------------------------------------------------------------------------------------------------ */ 

/*------------------------------------------------------------------------------------------------------------ */ 
app.get("/womenShoesForm",function(req,res)
{
    res.render("womenShoesForm");
})
app.get("/womenShoesDataset",function(req,res)
{
    WomenShoesProduct.find({},function(err,product)
    {
        if(err)
        {
            console.log("Something went wrong");
            console.log(err);
        }
        else
        {
            res.render("womenShoesProduct",{product1:product})
        }
    })
})
app.get("/womenShoesDataset/:id",function(req,res)
{
    WomenShoesProduct.findById(req.params.id,function(err,product)
    {
        if(err)
        {
            console.log("Something went wrong");
            console.log(err);
        }
        else
        {
            res.render("w_showProduct",{productDetail:product})
        }
    })
})
app.post("/womenShoesDataset",function(req,res)
{
    let id2=req.body.id1;
    let image1=req.body.image;
    let name1=req.body.name;
    let price1=req.body.price;
    let discount1=req.body.discount;
    let size1=req.body.size;
    let specification1=req.body.specification;
    let product={image:image1,pid:id2,name:name1,price:price1,discount:discount1,size:size1,specification:specification1};
    WomenShoesProduct.create(product,function(err,product)
    {
        if(err)
        {
            console.log("Something went Wrong");
            console.log(err);
        }
        else
        {
            console.log(" Men Shirt Product detail inserted successfully...");
            res.redirect("/homeDataset");
        }
    })
})
/*------------------------------------------------------------------------------------------------------------ */
/*------------------------------------------------------------------------------------------------------------ */
app.get("/cart",isLoogedIn,function(req,res)
{
    Cart.find({},function(err,product)
    {
        if(err)
        {
            console.log("Something went wrong..");
            console.log(err);
        }
        else
        {
            res.render("cart",{cartProduct:product});
        }
    })
})
app.post("/cart",isLoogedIn,function(req,res)
{
    let id2=req.body.pid;
    let image1=req.body.image12;
    let name1=req.body.username;
    let price1=req.body.price;
    let discount1=req.body.discount;
    let size1=req.body.size;
    let specification1=req.body.specification;
    let product={image:image1,pid:id2,name:name1,price:price1,discount:discount1,size:size1,specification:specification1};
    Cart.create(product,function(err,product)
    {
        if(err)
        {
            console.log("Something went wrong..");
            console.log(err);
        }
        else
        {
            console.log("data stored successfly....");
            res.redirect("/cart");
        }
    })
})
app.get("/cart/delete/:id",isLoogedIn,function(req,res)
{
    Cart.findByIdAndDelete(req.params.id,function(err,product)
    {
        if(err)
        {
            console.log("Something went wrong");
            console.log(err);
        }
        else
        {
            res.redirect("/cart");
        }
    })
})
/*------------------------------------------------------------------------------------------------------------ */

/*------------------------------------------------------------------------------------------------------------ */
app.get("/checkout",isLoogedIn,function(req,res)
{
    res.render("checkout");
})
app.post("/checkout",isLoogedIn,function(req,res)
{
    let name1=req.body.username;
    let email1=req.body.email;
    let address1=req.body.address;
    let city1=req.body.city;
    let code1=req.body.code;
    let state1=req.body.state;
    let mobile1=req.body.number;
    let checkout={username:name1,email:email1,address:address1,city:city1,pincode:code1,state:state1,mobile:mobile1};
    Checkout.create(checkout,function(err,checkout)
    {
        if(err)
        {
            console.log("Something went wrong");
            console.log(err);
        }
        else
        {
            console.log("checkout details enter successfully....");
            res.redirect("/payment");
        }
    })
})
/*------------------------------------------------------------------------------------------------------------ */

app.get("/payment",isLoogedIn,function(req,res)
{
    res.render("payment");
})

/*------------------------------------------------------------------------------------------------------------ */
app.get("/userRegister",function(req,res)
{
    res.render("newUser");
})
app.post("/userRegister",function(req,res)
{
    let username1=req.body.username;
    let name1=req.body.name;
    let email1=req.body.email;
    let pwd=req.body.password;
    //let register={username:username1,email:email1,name:name1,password:pwd};
    // Register.create(register,function(err,user)
    // {
    //     if(err)
    //     {
    //         console.log("Something went Wrong");
    //         console.log(err);
    //     }
    //     else
    //     {
    //         console.log("Data inserted successfully...");
    //         //res.redirect("/homeDataset");
    //     }
    // })
    User.register(new User({email:email1,name:name1,username:username1}),pwd,function(err,user)
    {
        if(err)
        {           
            // alert("A user with the given Email-Id or User-Id is already registered with us!!! Please use a different Email-Id and User-Id to Register Yourself");
            req.flash("error",err.message);
            console.log("Something went wrong :"+err);
            return res.redirect("/userRegister");
        }
        
       else
        { 
            passport.authenticate("local")(req,res,function(){
            console.log("new user registered successfully....");
            req.flash("success", "You are Successfuly Registered.");
            return res.redirect("/userRegister");
            });
        }
    });
    
});



/*------------------------------------------------------------------------------------------------------------ */
app.get("/login",function(req,res)
{
    req.flash("error", "")
    res.render("login");
})

app.post("/userlogin", passport.authenticate("local",{
    failureRedirect: "/login",
    failureFlash: true,
}) ,function(req, res){

    req.flash("success", "Successfully Logged in");
    return res.redirect("/");
});
// app.post('/userlogin', (req, res, next) => {
//     passport.authenticate('local',
//     (err, user, info) => {
//       if (err) {
//         alert("Invalid Email-Id or Password"); 
//         //return next(err);
//         console.log("Login wrong1"+err);
//         return res.redirect('/login');
//       }
  
//       if (!user) {
//         alert("Invalid Email-Id or Password");  
//         console.log("Login wrong2"+err); 
//         return res.redirect('/login');
        
//       }
  
//       req.logIn(user, function(err) {
//           if (err) {
//           alert("Invalid Email-Id or Password");   
//           //return next(err);
//           console.log("Login wrong3"+err);
//            return res.redirect('/login');
         
//         }
  
//         return res.redirect('/');
//       });
  
//     })(req, res, next);
//   });
  
/*--------------------------------------------- */
//User Logout form
/*--------------------------------------------- */
app.get("/logout",function(req,res)
{
    req.logout();
    res.redirect("/login");
});

function isLoogedIn(req,res,next)
{
    if(req.isAuthenticated())
    {
        return next();
    }
    res.redirect("/login");
}
 /*------------------------------------------------------------------------------------------------------------ */
 
app.post("/contact",isLoogedIn,function(req,res)
{
    let name1=req.body.name;
    let email1=req.body.email;
    let subject1=req.body.subject;
    let comment1=req.body.comment;
    let contact1={name:name1,email:email1,subject:subject1,comment:comment1};
    Contact.create(contact1,function(err,contact)
    {
        if(err)
        {
            console.log("Something went wrong");
            console.log(err);
        }
        else
        {
            console.log("Contact detail susses....");
            res.redirect("/homeDataset");
        }
    })
})

/*------------------------------------------------------------------------------------------------------------ */
app.post("/subscribe",isLoogedIn,function(req,res)
{
    let subscribe=req.body.subcribe1;
    let subscribe12={detailSubscription:subscribe}
    Subscribe.create(subscribe12,function(err,subs)
    {
        if(err)
        {
            console.log("Something went wrong");
            console.log(err);   
        }
        else
        {
            res.redirect("/");
        }
    })
})
/*------------------------------------------------------------------------------------------------------------ */
app.listen(port,function()
{
    console.log("shopping server is started");
})