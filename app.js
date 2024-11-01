// Import required modules
const express = require('express');
const bodyparser =require('body-parser');
const multer = require('multer');
const path = require('path');


const pg = require('pg');
const { fileURLToPath } = require('url');


// Create an Express application
const app = express();
const port = 3000;
app.use(bodyparser.urlencoded({exteded:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs'); 
app.use(express.static(path.join(__dirname,'public')));
app.use('/uplods',express.static(path.join(__dirname,'uploads')));
//const upload =multer({dest:"uploads/"});

// Create a PostgreSQL Pool
const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'jobportal',
  password: '8374119781',
  port: 5432,
});


   db.connect();
  console.log("database connected");
  
  



app.get("/views/index.ejs",(req,res)=>{
  res.render("index.ejs");
});
app.get("/views/download.ejs",async(req,res)=>{
  const result=await db.query("select * from applications")
    const res1=result.rows;
    console.log(res1);
    
  res.render("download.ejs",{res1});
});
app.get("/views/about.ejs",(req,res)=>{
  res.render("about.ejs");
});
app.get("/views/jslogin.ejs",(req,res)=>{
  res.render("jslogin.ejs");
});
app.get("/views/emplogin.ejs",(req,res)=>{
  res.render("emplogin.ejs");
});
app.get("/views/admin-login.ejs",(req,res)=>{
  res.render("admin-login.ejs");
});
app.get("/views/contact.ejs",(req,res)=>{
  res.render("contact.ejs");
});
app.get("/views/empreg.ejs",(req,res)=>{
  res.render("empreg.ejs");
});
app.get("/views/jobseeker-dashboard.ejs",(req,res)=>{
  res.render("jobseeker-dashboard.ejs");
});
app.get("/views/jsreg.ejs",(req,res)=>{
  res.render("jsreg.ejs");
});

app.get("/views/admin-dashboard.ejs",(req,res)=>{
  res.render("admin-dashboard.ejs");
});
app.get("/views/jsfeedback.ejs",(req,res)=>{
  res.render("jsfeedback.ejs");
});

app.get("/views/jsprofile.ejs",(req,res)=>{
  res.render("jsprofile.ejs");
});

app.get("/deletejob",(req,res)=>{

  res.render("deletejob.ejs");
});
app.get("/views/managejobs.ejs",(req,res)=>{
  res.render("managejobs.ejs");
});
app.get("/downloads",(req,res)=>{
  const resume=db.query("select resume_path from applications");
  console.log(resume.rows);
  const application=resume.rows;
  res.render("download.ejs",application)
})
app.get("/views/postedjobs.ejs",async (req,res)=>{
  const result=await db.query("select * from jobs")
    const res1=result.rows;
    console.log(res1);
    res.render("postedjobs.ejs",{res1})
  
  
});

app.get("/views/Employer-dashboard.ejs",(req,res)=>{
  res.render("Employer-dashboard.ejs");
});
app.get("/views/uplods/",(req,res)=>{
  res.render("/views/uploads/");
}); 
app.get("/views/list.ejs",async(req,res)=>{

  const result=await db.query("select * from jobs")
  const res2=result.rows;
  console.log(res2);
  res.render("list.ejs",{res2})
  //res.render("list.ejs");
});

app.get("/views/adminlogout.ejs",(req,res)=>{
  res.render("adminlogout.ejs");
});
app.get("/views/emplogout.ejs",(req,res)=>{
  res.render("emplogout.ejs");
});
app.get("/views/jobApplication.ejs",(req,res)=>{
  res.render("jobApplication.ejs");
});
app.get("/views/jslogout.ejs",(req,res)=>{
  res.render("jslogout.ejs");
});
app.get("/views/deletejob.ejs",async(req,res)=>{
  const result=await db.query("select * from jobs")
  const res1=result.rows;
  console.log(res1);
  res.render("deletejob.ejs",{res1});
});
app.get("/views/feedback.ejs",async(req,res)=>{
  const result=await db.query("select * from feedback")
  const res1=result.rows;
  console.log(res1);
  res.render("feedback.ejs",{res1});
});

app.get("/",(req,res)=>{
  res.render("index.ejs");
});


app.get("/views/job.ejs",async (req,res)=>{
  const result=await db.query("select * from jobs")
  const res1=result.rows;
  console.log(res1);
  //const query = `
     // SELECT jobs.*, employers.company_name, employers.contact_person, employers.company_address, employers.email, employers.mobile_no
      //FROM jobs
     // INNER JOIN employers ON jobs.employer_id = employers.id
    
    //const { rows } = await db.query(query);

  res.render("job.ejs",{res1});
  
});

app.get("/views/empdetails.ejs",async (req,res)=>{
  const result=await db.query("select * from employers")
  const res1=result.rows;
  console.log(res1);
  res.render("empdetails.ejs",{res1});
  
});
app.get("/views/application.ejs",async (req,res)=>{
  const result=await db.query("select * from applications")
    const res1=result.rows;
    console.log(res1);
    res.render("application.ejs",{res1})
});

app.get("/views/applicationdata.ejs",async (req,res)=>{
  const result=await db.query("select * from applications")
    const res1=result.rows;
    console.log(res1);
    res.render("applicationdata.ejs",{res1})
  
  
});

//  employer registration
app.post("/create-employer-profile",async (req,res)=>{
  const company=req.body.company_name;
  const contact=req.body.contact_person;
  const companyad    =req.body.company_address;
  const email      =req.body.email;
  const mobile      =req.body.mobile_no;
  const  place     =req.body.work_place;
  const   username    =req.body.username;
  const  password      =req.body.password;
  const  employerid    =req.body.employer_id;
  console.log(company + companyad + email + mobile +contact+place+username+password+employerid);

  await db.query('INSERT INTO employers (company_name, contact_person, company_address, email, mobile_no, work_place, username, password, employer_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9)',[company,contact,companyad,email,mobile,place,username,password,employerid]);
  res.send('Registration successful!');
});
// employer login
app.post('/emplog', async (req, res) => {
  const { username, password } = req.body;
  try {

    const query = 'SELECT * FROM employers WHERE username = $1 AND password = $2';
    const result = await db.query(query, [username, password]);
    if (result.rows.length > 0) {
      res.render("Employer-dashboard.ejs");
    } else {
      // Invalid credentials
      res.send('Invalid username or password');
    }
  
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Login failed');
  }
});

// Route to handle employer logout
  app.post("/employer/logout", (req, res) => {
    res.render("index.ejs"); // Render to employer login page after logout
  
});


// jobseeker registration
app.post("/register",async (req,res)=>{
  const fullname =req.body.full_name;
  const father =req.body.father_name;
  const gender   =req.body.gender;
  const dob     =req.body.date_of_birth;
  const qualification  =req.body.qualification;
  const skills     =req.body.skills;
  const  contact   =req.body.contact_number;
  const  email     =req.body.email;
 const   username    =req.body.username;
  const  password      =req.body.password;
  console.log(fullname+father+gender+dob+qualification+skills+contact+email+username+password);
await db.query('INSERT INTO jobseekers (full_name, father_name, gender, date_of_birth, qualification, skills, contact_number, email, username, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [fullname, father, gender, dob, qualification, skills, contact, email,username, password]);
  res.send('Registration successfull');
});

// jobseeker login
app.post('/jslog', async (req, res) => {
  const { username, password } = req.body;
  try {
   // const client = await pool.connect();
    const query = 'SELECT * FROM jobseekers WHERE username = $1 AND password = $2';
    const result = await db.query(query, [username, password]);
    if (result.rows.length > 0) {
    res.render("jobseeker-dashboard.ejs");
    } else {
      // Invalid credentials
      res.send('Invalid username or password');
    }
    
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Login failed');
  }
});

// Route to handle job seeker logout
app.post('/jobseeker/logout', (req, res) => {
  res.render("index.ejs"); // Render to job seeker login page after logout
    
});

app.post("/submit-feedback",async (req,res)=>{
  const feedback =req.body.feedback;
  
  console.log(feedback);
await db.query('INSERT INTO feedback (feedback) VALUES ($1)', [feedback]);
  res.send('feedback successfull');
});


// Sample admin credentials (replace this with database interaction)
const admins = [
  { id: 1, username: 'admin', password: 'admin' }
];

//admin login
app.post('/admin/login', async (req, res) => {
  const { username, password } = req.body;
  try {
   
    const query = 'SELECT * FROM admins WHERE username = $1 AND password = $2';
    const result = await db.query(query, [username, password]);
    if (result.rows.length > 0) {
      
      res.render("admin-dashboard.ejs");
    } else {
      // Invalid credentials
      res.send('Invalid username or password');
    }
    
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Login failed');
  }
});

// Route to handle admin logout
app.post('/admin/logout', async (req, res) => {
  res.render("index.ejs"); // Redirect to admin login page after logout

});

// Serve the manage jobs page
app.post('/managejobs', async (req, res) => {
  try {
    const result=await db.query("select * from jobs")
    const res1=result.rows;
    console.log(res1);
    res.render("postedjobs.ejs",{res1})
  
  } catch (error) {
    console.error('Error retrieving jobs:', error);
    res.status(500).send('Error retrieving jobs');
  }
});

//submit the job
app.post('/submit-job', async (req, res) => {
  
    const jobtitle =req.body.job_title;
    const vacancy =req.body.total_vacancy;
    const   salary =req.body.salary;
    const qualification  =req.body.qualification;
    const skills     =req.body.skills;
    console.log(jobtitle+vacancy+salary+qualification+skills);
  
    await db.query('INSERT INTO jobs(job_title, total_vacancy, salary,  qualification, skills) VALUES ($1, $2, $3, $4, $5)', [jobtitle, vacancy, salary, qualification, skills]);
    res.send('jobs are posted');
    res.render("/views/Employer-dashboard.ejs");
  });
   

//list of jobs
app.post("/views/list.ejs",async (req,res)=>{
  const result=await db.query("select * from jobs")
  const res2=result.rows;
  console.log(res2);
  res.render("list.ejs",{res2})
});

app.use(express.urlencoded({extended:false}));


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname )
  }
});

const upload = multer({ storage });
//jobApplication form
app.post("/upload", upload.single('resume'),async (req,res)=>{
  console.log(req.body);
  console.log(req.file);
  const name=req.body.fullname;
  const father=req.body.fathername;
  const dob    =req.body.dob;
  const gender  =req.body.gender;
  const resumePath = req.file.path;
  
  const  email     =req.body.email;
  const   contact   =req.body.contactnumber;
  const  address      =req.body.address;
  console.log(name+ father+ dob + gender + resumePath + email+contact+address);

 await db.query('INSERT INTO applications (fullname, fathername, dob, gender, resume_path, email, contactnumber, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',[name,father,dob,gender,resumePath,email,contact,address]);
  res.send('application successful!');
});
//application post
app.post('/application',async (req,res)=>{
  const result=await db.query("select resume from applications")
  const res1=result.rows;
  console.log(res1);
  res.render("application.ejs",{res1})
});

//applicationdata post
app.post('/applicationdata',async (req,res)=>{
  const result=await db.query("select resume from applications")
  const res1=result.rows;
  console.log(res1);
  res.render("applicationdata.ejs",{res1})
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
