import React, { useState } from "react";
import "../pages_css/AddJob.css";
import addJob from "../resources/addJob.png";
import { toast } from "react-toastify";
import { useNavigate,useLocation } from "react-router-dom";
import {createJobPost} from "../auth/jobApis.js"


const AddJob = () => {
  
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);
  const jobData = location.state;

  const [requiredSkills] = useState([]);
  const [jobDetails, setJobDetails] = useState({
    companyName: "",
    logoURL: "",
    position: "",
    salary: "",
    location: "",
    locationType: "",
    jobType: "",
    description: "",
    aboutCompany: "",
    skills: [],
    information: "",
  });

  const addSkillsHandler = (e) => {
    if (!requiredSkills.includes(e.target.value)) {
      setJobDetails({...jobDetails,skills:[...jobDetails.skills,e.target.value]});
    }
  };

  const addJobBtn = async (req, res) => {
    console.log(jobDetails);
    const response = await createJobPost(jobDetails);
    if(response){
      toast(response.data.message);
      navigate('/jobPage');
    }
  };

  return (
    <div className="addJobContainer">
      <div className="jobLeftContainer">
        <div className="jobFormContainer">
          <h2>Add job description</h2>
          <div className="labelInputContainer">
            <div className="labelInput">
              <label htmlFor="companyName">Company Name*</label>
              <input
                className="inputFields"
                type="text"
                placeholder="Enter your company name here"
                value={jobDetails.companyName}
                onInput={(e) =>
                  setJobDetails({
                    ...jobDetails,
                    companyName: e.target.value,
                  })
                }
              />
            </div>
            <div className="labelInput">
              <label htmlFor="LogoURL">Add logo URL</label>
              <input
                className="inputFields"
                type="text"
                placeholder="Enter the link"
                value={jobDetails.logoURL}
                onInput={(e) =>
                  setJobDetails({
                    ...jobDetails,
                    logoURL: e.target.value,
                  })
                }
              />
            </div>
            <div className="labelInput">
              <label htmlFor="Position">Job position*</label>
              <input
                className="inputFields"
                type="text"
                placeholder="Enter job position"
                value={jobDetails.position}
                onInput={(e) =>
                  setJobDetails({
                    ...jobDetails,
                    position: e.target.value,
                  })
                }
              />
            </div>
            <div className="labelInput">
              <label htmlFor="Salary">Monthly salary*</label>
              <input
                className="inputFields"
                type="text"
                placeholder="Enter Amount in rupees"
                value={jobDetails.salary}
                onInput={(e) =>
                  setJobDetails({
                    ...jobDetails,
                    salary: e.target.value,
                  })
                }
              />
            </div>
            <div className="labelInput">
              <label htmlFor="JobType">Job Type*</label>
              <select
                style={{
                  color: "#C2C2C2",
                  border: "2px solid #C2C2C2",
                  borderRadius: "5px",
                }}
                onChange={(e) =>
                  setJobDetails({
                    ...jobDetails,
                    jobType: e.target.value,
                  })
                }
              >
                <option value="">Select</option>
                <option value="Full time">Full time</option>
                <option value="Part time">Part time</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div className="labelInput">
              <label htmlFor="Remote/Office">Remote/office*</label>
              <select
                style={{
                  color: "#C2C2C2",
                  border: "2px solid #C2C2C2",
                  borderRadius: "5px",
                }}
                onChange={(e) =>
                  setJobDetails({
                    ...jobDetails,
                    locationType: e.target.value,
                  })
                }
              >
                <option value="Remote">Select</option>
                <option value="Remote">Remote</option>
                <option value="Office">Office</option>
              </select>
            </div>
            <div className="labelInput">
              <label htmlFor="Location">Location*</label>
              <input
                className="inputFields"
                type="text"
                placeholder="Enter Location"
                value={jobDetails.location}
                onInput={(e) =>
                  setJobDetails({
                    ...jobDetails,
                    location: e.target.value,
                  })
                }
              />
            </div>
            <div className="labelInput">
              <label htmlFor="Description">Job Description*</label>
              <input
                className="inputFields"
                type="text"
                placeholder="Type the job description"
                value={jobDetails.description}
                onInput={(e) =>
                  setJobDetails({
                    ...jobDetails,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div className="labelInput">
              <label htmlFor="AboutCompany">About Company</label>
              <input
                className="inputFields"
                type="text"
                placeholder="Type about your company"
                value={jobDetails.aboutCompany}
                onInput={(e) =>
                  setJobDetails({
                    ...jobDetails,
                    aboutCompany: e.target.value,
                  })
                }
              />
            </div>
            <div className="skillSelectedContainer">
              <label style={{ width: "20%" }} htmlFor="SkillsRequired">
                Skills Required
              </label>
              <div className="skillRightSide">
                <input
                  readOnly
                  type="text"
                  value={jobDetails.skills}
                  style={{
                    height: "34px",
                    width: "50%",
                    border: "2px solid #C2C2C2",
                    borderRadius: "5px",
                  }}
                />
                <button onClick={()=>setJobDetails({
                  ...jobDetails,
                  skills:""
                })} className="clearSkillsBtn">Clear</button>
                <select
                  onChange={addSkillsHandler}
                  style={{
                    width: "25%",
                    color: "#C2C2C2",
                    border: "2px solid #C2C2C2",
                    borderRadius: "5px",
                  }}
                >
                  <option value="FrontEnd">Frontend</option>
                  <option value="BackEnd">Backend</option>
                  <option value="MongoDB">Mongodb</option>
                  <option value="NextJS">Next JS</option>
                  <option value="HTML">HTML</option>
                  <option value="CSS">CSS</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Java">Java</option>
                  <option value="React">React</option>
                  <option value="Pyhton">Python</option>
                  <option value="RestFul">RestFul</option>
                  <option value="TypeScript">TypeScript</option>
                  <option value="Express">Express</option>
                  <option value="ReactNative">ReactNative</option>
                  <option value="Rust">Rust</option>
                  <option value="Go">Go</option>
                  <option value="Ruby">Ruby</option>
                  <option value="VueJS">VueJS</option>
                  <option value="Ajax">Ajax</option>
                  <option value="swift">swift</option>
                  <option value="C++">C++</option>
                  <option value="PHP">PHP</option>
                  <option value="C#">C#</option>
                  <option value="Angular">Angular</option>
                  <option value="Django">Django</option>
                  <option value="Node">Node</option>
                  <option value="MySQL">MySQL</option>
                  <option value="AWS">AWS</option>
                  <option value="Microsoft Azure">Microsoft Azure</option>
                  <option value="Kotlin">Kotlin</option>
                  <option value="Flutter">Flutter</option>
                  <option value="Android">Android</option>
                  <option value="ios">ios</option>
                  <option value="Oracle">Oracle</option>
                  <option value="GoogleCloud">GoogleCloud</option>
                  <option value="Apache">Apache</option>
                </select>
              </div>
            </div>
            <div className="labelInput">
              <label htmlFor="Infromation">Information</label>
              <input
                className="inputFields"
                type="text"
                placeholder="Enter the additional information"
                value={jobDetails.information}
                onInput={(e) =>
                  setJobDetails({
                    ...jobDetails,
                    information: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <button onClick={()=>{
              navigate('/jobPage');
            }} className="cancelBtn">Cancel</button>
            <button onClick={addJobBtn} className="addJobButton">
              + Add Job
            </button>
          </div>
        </div>
      </div>
      <div className="jobRightContainer">
        <img style={{ width: "100%", height: "100%" }} src={addJob} alt=""></img>
      </div>
    </div>
  );
};

export default AddJob;
