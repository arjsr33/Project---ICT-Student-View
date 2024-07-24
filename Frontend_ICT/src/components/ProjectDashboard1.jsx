import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import WeeklySubmission from './WeeklySubmission'
import axios from 'axios';

const ProjectDashboard1 = ({s_id}) => {
  const [isConditionMet, setIsConditionMet] = useState(true);
  const [student,setStudent]=useState({
    sp_id:'',
    sp_name:'',
    p_id:'',
    p_name:'',
    start_date:{}
})

  useEffect(()=>{
    axios.get(`http://localhost:5000/princy/studentswithprojects/${s_id}`)
    .then((res)=>{
        console.log(`Axios res.data(studentswithprojects) is - `)
        console.log(res.data[0])
        setStudent({
          sp_id:res.data[0].sp_id,
          sp_name:res.data[0].sp_name,
          p_id:res.data[0].p_id,
          p_name:res.data[0].p_name,
          start_date:res.data[0].start_date,
      })
        console.log('Student data is - ')
        console.log(student)
    })
  },[])

  return (
    <div>
        <Navbar/>
        <br/>
        <h2 className="text-primary py-2 text-center"><b>THE PROJECT DASHBOARD</b></h2>
        <div class="row">
        <div class="d-flex align-items-start">
          <div class="col-2 ">
          <br/>
            <div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
              <button class="nav-link navLink active" id="v-pills-pjtDoc-tab" data-bs-toggle="pill" data-bs-target="#v-pills-pjtDoc" type="button" role="tab" aria-controls="v-pills-pjtDoc" aria-selected="true">PROJECT OVERVIEW DOCUMENT</button>
              {/* <div class="vr"></div></span> */}
              <button class="nav-link navLink " id="v-pills-reference-tab" data-bs-toggle="pill" data-bs-target="#v-pills-reference" type="button" role="tab" aria-controls="v-pills-reference" aria-selected="false">REFERENCE MATERIALS</button>
              <button class="nav-link navLink" id="v-pills-weekly-tab" data-bs-toggle="pill" data-bs-target="#v-pills-weekly" type="button" role="tab" aria-controls="v-pills-weekly" aria-selected="false">WEEKLY SUBMISSION</button>
              <button class="nav-link navLink" id="v-pills-discussion-tab" data-bs-toggle="pill" data-bs-target="#v-pills-discussion" type="button" role="tab" aria-controls="v-pills-discussion" aria-selected="false">DISCUSSION FORUM</button>              
              <button class="nav-link navLink" id="v-pills-grades-tab" data-bs-toggle="pill" data-bs-target="#v-pills-grades" type="button" role="tab" aria-controls="v-pills-grades" aria-selected="false">MY GRADES</button>              
              {(isConditionMet) ? (
              <button class="nav-link navLink" id="v-pills-final-tab" data-bs-toggle="pill" data-bs-target="#v-pills-final" type="button" role="tab" aria-controls="v-pills-final" aria-selected="false" disabled>FINAL PROJECT SUBMISSION</button>
              ):(
              <button class="nav-link navLink" id="v-pills-final-tab" data-bs-toggle="pill" data-bs-target="#v-pills-final" type="button" role="tab" aria-controls="v-pills-final" aria-selected="false" >FINAL PROJECT SUBMISSION</button>
              )}
              {(isConditionMet) ? (
              <button class="nav-link navLink" id="v-pills-viva-tab" data-bs-toggle="pill" data-bs-target="#v-pills-viva" type="button" role="tab" aria-controls="v-pills-viva" aria-selected="false" disabled>VIVA VOCE</button>
              ):(
              <button class="nav-link navLink" id="v-pills-viva-tab" data-bs-toggle="pill" data-bs-target="#v-pills-viva" type="button" role="tab" aria-controls="v-pills-viva" aria-selected="false" >VIVA VOCE</button>
              )}
              {/* <button class="nav-link navLink" id="v-pills-viva-tab" data-bs-toggle="pill" data-bs-target="#v-pills-viva" type="button" role="tab" aria-controls="v-pills-viva" aria-selected="false" >VIVA VOCE</button> */}
              {/* <button class="nav-link navLink" id="v-pills-viva-tab" data-bs-toggle="pill" data-bs-target="#v-pills-viva" type="button" role="tab" aria-controls="v-pills-viva" aria-selected="false" disabled>VIVA VOCE</button> */}             
            </div>
          </div>

          <div class="col-0.25">
            <div class="d-flex" style={{height: 500}}>
                <div class="vr"></div>
            </div>
          </div>

          <div class="col-7 ">
            <div class="tab-content" id="v-pills-tabContent">
              <div class="tab-pane fade show active" id="v-pills-pjtDoc" role="tabpanel" aria-labelledby="v-pills-pjtDoc-tab" tabindex="0"><br/><br/>PROJECT OVERVIEW DOCUMENT...</div>
              <div class="tab-pane fade" id="v-pills-reference" role="tabpanel" aria-labelledby="v-pills-reference-tab" tabindex="0"><br/><br/>REFERENCE MATERIALS...</div>
              <div class="tab-pane fade" id="v-pills-weekly" role="tabpanel" aria-labelledby="v-pills-weekly-tab" tabindex="0"><WeeklySubmission s_id={s_id}/></div>
              <div class="tab-pane fade" id="v-pills-discussion" role="tabpanel" aria-labelledby="v-pills-discussion-tab" tabindex="0"><br/><br/>DISCUSSION FORUM...</div>
              <div class="tab-pane fade" id="v-pills-grades" role="tabpanel" aria-labelledby="v-pills-grades-tab" tabindex="0"><br/><br/>MY GRADES...</div>
              <div class="tab-pane fade" id="v-pills-final" role="tabpanel" aria-labelledby="v-pills-final-tab" tabindex="0"><br/><br/>FINAL PROJECT SUBMISSION...</div>
              <div class="tab-pane fade" id="v-pills-viva" role="tabpanel" aria-labelledby="v-pills-viva-tab" tabindex="0"><br/><br/>VIVA VOCE...</div>
            </div>
          </div>

          <div class="col-0.25">
            <div class="d-flex" style={{height: 500}}>
                <div class="vr"></div>
            </div>
          </div>

          <div class="col-2.5 ms-5">
            <br/>
            <div className="card h-100">
                <div className="card-body">
                    <p className="card-text"><i><u>Name</u></i><br/> <b>{student.sp_name}</b> </p>
                    <p className="card-text"><i><u>Project</u></i><br/> <b>{student.p_name}</b></p>
                    <p className="card-text"><i><u>Project Start Date</u></i><br/><b>{student.start_date.toLocaleDateString()}</b></p>
                </div>
            </div>
            <br/>
            <button><b><u>Logout</u></b></button>
          </div>
          </div>
        </div>
    </div>
  )
}

export default ProjectDashboard1