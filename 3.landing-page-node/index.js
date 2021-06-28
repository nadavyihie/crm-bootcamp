const express = require('express');
const app = express();
const axios = require('axios')

const mustacheExpress = require('mustache-express');
const { response } = require('express');
app.engine('html', mustacheExpress());
app.use(express.static('views'));
app.set('view engine', 'html');
app.set('views', __dirname + '/views');



app.get('/admin', async function(req, res) {
  let leadsArr=await getLeads();
  console.log(leadsArr);
  const data= {leadsArr};
  res.render('adminPage',data);
});

app.get('/', function(req, res) {

    returnTime();
    const data={ img:'css/background.jpg',
                time: returnTime(),
                topNavs:[
                  {navItem:'About'},
                  {navItem:'Store'},
                  {navItem:'Custome service'},
                  {navItem:'Contact us'}
                ],
                inputs: [
                  {
                    name:"fullName"
                  },
                  {
                    name:"email"
                  },
                  {
                    name:"phoneNumber"
                  }
                ]             
          };
  


  
  res.render('landPage',data);
});



app.listen( '8080', () => {
  console.log(`Server running at http://localhost:8080/`);
});

const returnTime=() => {
  let currentTime=new Date();
  let currentHour=currentTime.getHours();
  console.log(currentHour);
  if(currentHour>=5&&currentHour<12){
    return 'morning';
  }
  if(currentHour>=12&&currentHour<18){
    return 'afternoon';
  }
  if(currentHour>=18&&currentHour<22){
    return 'evening';
  }
  return 'night';

}

const getLeads= async () =>{
  
  try{
    const res = await axios.get('http://localhost:8004/admin')

    leadsArr = res.data;
    
    return leadsArr;
  }

  catch(exc){
    console.error(exc.error)
  }
}