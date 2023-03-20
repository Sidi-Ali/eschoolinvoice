const express = require( "express" );
const bodyParser = require( "body-parser" );
const ejs = require( "ejs" );
const mysql = require( "mysql" );

// const EventEmitter = require('events');
// const emitter = new EventEmitter();
//
// emitter.on("click")


//jquery
// require("jsdom-global")()
// const { JSDOM } = require( "jsdom" );
// const { window } = new JSDOM( "" );
// const $ = require( "jquery" )( window );

let app = express();

// app.use('/js',exp.static(__dirname + '/node_modules/jquery/dist'))

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

const connection = mysql.createConnection({
  host:"eschoolinvoicemysqlserver.mysql.database.azure.com",
  username:"eschooladmin",
  password:"Password@1",
  database:"eschoolinvoicedb",
  port:3306, 
  ssl:{ca:fs.readFileSync("{ca-cert filename}")}

//   var conn=mysql.createConnection({host:"eschoolinvoicemysqlserver.mysql.database.azure.com", user:"eschooladmin", password:"{your_password}", database:"{your_database}", port:3306, ssl:{ca:fs.readFileSync("{ca-cert filename}")}});
  
  
//   host: "localhost",
//   user: "sideee",
//   password: "sweet",
//   database: "nmfInvoiceDB"
});


let period = "";
let invoiceTo = "";
let msTeamsChannel = "";
let parentsEmail = "";
let paymentReference = "";
let agreedLessonPlan = "";


let hourscmpltd_121 = "";
let hourscmpltdPackageB = "";
let hourscmpltdPackageA = "";
let hourlyRate121 = "";
let hourlyRateB = "";
let hourlyRateA = "";
let fees_121 = "";
let feesPackageB = "";
let feesPackageA = "";
let totalFees = "";

connection.connect(function(err){
  if (err){
    console.log(err.message);
  }else{
    console.log("db " + connection.state);
  }
});

app.post("/", function(req, res){
  var sendTo = req.body.parent;
  // console.log(typeof(sendTo));
  // console.log(sendTo);

  connection.query("select * from invoiceTable where invoiceTo = ?;", sendTo, function(err, rows){
    if (!err){
      // console.log(typeof(rows));
      // console.log(rows.length);
      // console.log(rows[0].period);
      // console.log(rows[0].totalFees);
      // console.log(rows);

      period = rows[0].period;
      invoiceTo = rows[0].invoiceTo;
      msTeamsChannel = rows[0].msTeamsChannel;
      parentsEmail = rows[0].parentsEmail;
      paymentReference = rows[0].paymentReference;
      agreedLessonPlan = rows[0].agreedLessonPlan;
      hourscmpltd_121 = rows[0].hoursCompleted_121;
      hourscmpltdPackageB = rows[0].hoursCompleredPackageB;
      hourscmpltdPackageA = rows[0].hoursCompletedPackageA;
      hourlyRate121 = "£2.30";
      hourlyRateB = "£2.99";
      hourlyRateA = "£3.80";
      fees_121 = rows[0].fees_121;
      feesPackageB = rows[0].feesPackageB;
      feesPackageA = rows[0].feesPackageA;
      totalFees = rows[0].totalFees;

      res.redirect("/");

    }else{

      console.log(err);
    }
  })

});

app.get("/", function(req, res){
  res.render("index", {indexPeriod: period, indexInvoiceTo: invoiceTo , hours121: hourscmpltd_121, hoursB: hourscmpltdPackageB, hoursA: hourscmpltdPackageA, hourlyRate121: hourlyRate121, hourlyRateB: hourlyRateB, hourlyRateA: hourlyRateA, total121: fees_121, totalB: feesPackageB, totalA: feesPackageA, total: totalFees, lessonSchedule: agreedLessonPlan, paymentRef: paymentReference });
})

app.listen(3000, function(){
  console.log("Listening on port 3000.");
});
