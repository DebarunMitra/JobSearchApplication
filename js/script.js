// Author: Debarun Mitra
// Application Name: JobSearchOo
// Objective: Create a front end application for job search
class Jobsearch{
  getSearchResult(location,skills,experience,cityName){
    const monthNo={"Jan":1,"Feb":2,"Mar":3,"Apr":4,"May":5,"Jun":6,"Jul":7,"Aug":8,"Sep":9,"Oct":10,"Nov":11,"Dec":12};
    let count=0,regexLoc,regexSkill,regexCname,regexExp=/\d+/g,strExp;
    console.log(location+','+skills+','+experience+','+cityName);
    (skills==='')?regexSkill ='.*?':regexSkill = new RegExp("\\b(?:"+skills+")\\b", "gi");
    (location==='')?regexLoc = '.*?':regexLoc = new RegExp("\\b(?:"+location+")\\b", "gi");
    (cityName==='')?regexCname = '.*?':regexCname = new RegExp("\\b(?:"+cityName+")\\b", "gi");
    (experience==='')?strExp=undefined:strExp=experience;
    console.log(regexLoc+','+regexExp+','+regexSkill+','+regexCname);
    fetch('https://nut-case.s3.amazonaws.com/jobs.json').then(response=>response.json()).then(item=>{
    let data=item.data;
    let date=new Date();
    let job=data.filter(ele=>ele.skills.match(regexSkill) && ele.location.match(regexLoc) && ele.companyname.match(regexCname)).map((item)=>{
    if(strExp!==undefined){
      console.log('strExp');
      let expMatch=item.experience.match(regexExp);
      let enddate=item.enddate.split(/,| /);
      if(expMatch!==null){
        if(expMatch[0]!==undefined && parseInt(expMatch[0])<=strExp && parseInt(expMatch[0])!==0 && enddate!==''){
          if(expMatch[1]!==undefined && parseInt(expMatch[1])>=strExp){
              //console.log('expMatch[1]!==undefined && parseInt(expMatch[1])>=strExp');
              console.log(item);
              //console.log(expMatch[0]+"-"+expMatch[1]);
              let d=parseInt(enddate[1]);
              //console.log(d+"-"+monthNo[enddate[0]]+'-'+enddate[0]);
            //  console.log(item.companyname+','+item.title+','+item.jd+','+item.location+','+item.skills+','+item.salary+','+item.enddate+','+item.applylink);
              count+=1;
              this.getJobDetails(item.companyname,item.title,item.jd,item.location,item.skills,item.salary,item.experience,item.enddate,item.applylink);
          }
          else if(expMatch[1]!==undefined && parseInt(expMatch[1])===strExp){
            //console.log('!!expMatch[1]!==undefined && parseInt(expMatch[1])>=strExp');
            console.log(item);
            //console.log(expMatch[0]+"-"+expMatch[1]);
            let d=parseInt(enddate[1]);
            //console.log(d+"-"+monthNo[enddate[0]]+'-'+enddate[0]);
            //console.log(item.companyname+','+item.title+','+item.jd+','+item.location+','+item.skills+','+item.salary+','+item.enddate+','+item.applylink);
            count+=1;
            this.getJobDetails(item.companyname,item.title,item.jd,item.location,item.skills,item.salary,item.experience,item.enddate,item.applylink);
          }
        }
       //  else if(parseInt(expMatch[0])===0){
       //    console.log('parseInt(expMatch[1])===strExp');
       //   console.log(item);
       //   console.log(expMatch[0]+"-"+expMatch[1]);
       //   count+=1;
       // }
      }
     }
    else {
      console.log('Not strExp');
     console.log(item);
    // console.log(item.companyname+','+item.title+','+item.jd+','+item.location+','+item.skills+','+item.salary+','+item.enddate+','+item.applylink);
      count+=1;
      this.getJobDetails(item.companyname,item.title,item.jd,item.location,item.skills,item.salary,item.experience,item.enddate,item.applylink);
    }
  });
  console.log('count:'+count);
  }).catch(err=>console.log('ERROR:'+err));
  }
  getJobDetails(jcn,jtitle,jd,jloc,jskill,jsal,jexp,japply,jlink){
    let jobDataTag=document.createElement('p');
    jobDataTag.innerHTML ='<div class="card" style="width:90%;"><div class="card-body"><h3 class="card-title">'+jcn+'</h3>'+
    '<p class="card-text">'+jtitle+'</p>'+
    '</div>'+
    '<ul class="list-group list-group-flush">'+
        '<li class="list-group-item">'+
          '<h6 class="card-title">Job Description:</h6>'+
          '<p>'+jd+'</p>'+
        '</li>'+
          '<li class="list-group-item">'+
            '<h6 class="card-title">Job Location:</h6>'+
            '<p>'+jloc+'</p>'+
          '</li>'+
          '<li class="list-group-item">'+
            '<h6 class="card-title">Skill need:</h6>'+
            '<p>'+jskill+'</p>'+
          '</li>'+
          '<li class="list-group-item d-flex">'+
            '<div class="">'+
              '<h6 class="card-title">Salary:</h6>'+
               '<p>'+jsal+'</p>'+
            '</div>'+
            '<div class="sal-enddate">'+
              '<h6 class="card-title">Expirence:</h6>'+
              '<p>'+jexp+'</p>'+
            '</div>'+
            '<div class="sal-enddate">'+
              '<h6 class="card-title">Last Date:</h6>'+
              '<p>'+japply+'</p>'+
            '</div>'+
          '</li>'+
      '</ul>'+
      '<div class="card-body">'+
          '<a href="#" class="'+jlink+'">Apply link</a>'+
      '</div>'+
    '</div><br>';
    document.getElementById("jobContent").appendChild(jobDataTag);
  }
}
const js=new Jobsearch();
let search=document.getElementById('search');
  let loc=document.getElementById('loc');
  let exp=document.getElementById('exp');
  let skill=document.getElementById('skill');
  let cname=document.getElementById('cname');
search.addEventListener('click',function(){
  document.getElementById('jobContent').innerHTML="";
  js.getSearchResult(loc.value,skill.value,exp.value,cname.value);
//  const jso=new Jobsearch();
  //jso.getJobDetails();
},false);
