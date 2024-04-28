import React, { useEffect, useState } from "react";
import "../pages_css/JobPage.css";
import rect from "../resources/rect.png";
import cross from "../resources/cross.png";
import axios from "axios";
import empReq from "../resources/empReq.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const JobPage = () => {
  const [skills, setSkills] = useState([]);
  const [jobList, setJobList] = useState([]);
  const [inputJob, setInputJob] = useState("");
  const [userName,setUserName] = useState("");

  useEffect(()=>{
    setUserName(JSON.parse(localStorage.getItem("name")));
  },[])
  

  useEffect(() => {
    fetchJobs();
  }, [inputJob]);

  const fetchJobs = async () => {
    try {
      await axios
        .get(`https://job-listing-backend-1.onrender.com/getAllJobs?searchPosition=${inputJob}`)
        .then((res) => {
          setJobList(res.data.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchfilteredJob = async () => {
    try {
      if (skills.length > 0) {
        await axios
          .get(`https://job-listing-backend-1.onrender.com/getAllJobs?skills=${skills}`)
          .then((res) => {
            setJobList(res.data.data);
          });
      } else {
        fetchJobs();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addChip = (e) => {
    if (!skills.includes(e.target.value)) {
      setSkills([...skills, e.target.value]);
    }
  };

  const removeChipHandler = (val) => {
    var updatedSkills = skills.filter((skill) => skill !== val);
    setSkills(updatedSkills);
  };

  const navigate = useNavigate();

  const loginBtnHandler = () => {
    navigate("/Login");
  };

  const signUpBtnHandler = () => {
    navigate("/SignUp");
  };

  const addJobHandler = () => {
    navigate("/AddJob");
  };

  const logoutBtnBtnHandler = () => {
    localStorage.clear("name");
    localStorage.clear("token");
    setUserName("");
    toast("User Logged Out Successfully !!");
  }

  const viewDetailsHandler = (id) => {
    navigate('/jobDetails',{
      state:{id}
    });
  }

  return (
    <div className="JobPageContainer">
      <div className="headerSection">
        <img className="imgHeader" src={rect} alt="headerImg"/>
        <h1 className="appName">Jobfinder</h1>
        {userName ? (
          <div className="loggedInUserDetails">
            <button onClick={logoutBtnBtnHandler} className="logoutBtn">
              Logout
            </button>
            <div className="userNameDiv">
              Hello ! {userName}
            </div>
          </div>
        ) : (
          <div className="loginSignUpBtn">
            <button onClick={loginBtnHandler} className="loginBtn">
              Login
            </button>
            <button onClick={signUpBtnHandler} className="registerBtn">
              Register
            </button>
          </div>
        )}
      </div>
      <div className="mainSection">
        <div className="jobListContainer">
          <div className="seachJobContainer">
            <div className="searchBar">
              <span
                style={{
                  position: "absolute",
                  left: "1%",
                  top: "17%",
                  fontSize: "20px",
                  paddingLeft: ".5rem",
                }}
              >
                <i
                  style={{ color: "grey" }}
                  className="fa-solid fa-magnifying-glass"
                ></i>
              </span>
              <input
                className="jobSearchBar"
                type="text"
                style={{
                  width: "100%",
                  height: "42px",
                  border: "2px solid #E9E7EA",
                  borderRadius: "5px",
                  paddingLeft: "3rem",
                }}
                value={inputJob}
                onChange={(e) => {
                  setInputJob(e.target.value);
                }}
                placeholder="Type any job title"
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  flexWrap: "wrap",
                  width: "70%",
                }}
              >
                <select onChange={addChip} name="skills" className="skillbtn">
                  <option>skills</option>
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
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: ".5rem",
                    flexWrap: "wrap",
                    width: "70%",
                  }}
                >
                  {skills ? (
                    skills.map((skill) => {
                      return (
                        <div key={skill} className="chipContainer">
                          <div
                            style={{
                              paddingLeft: "1rem",
                              paddingRight: "1rem",
                              width: "70%",
                            }}
                          >
                            {skill}
                          </div>
                          <span
                            onClick={() => removeChipHandler(skill)}
                            className="cross"
                          >
                            <img src={cross} style={{ paddingTop: ".4rem" }} alt=""/>
                          </span>
                        </div>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "1rem",
                  gap: "1rem",
                  width: "30%",
                }}
              >
                <button onClick={fetchfilteredJob} className="applyFilterBtn">
                  Apply Filter
                </button>
                <button onClick={addJobHandler} className="addJobBtn">
                  + Add Job
                </button>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "3.5rem", paddingBottom: "1.5rem" }}>
            {jobList ? (
              jobList.map((job) => {
                return (
                  <div className="eachJob" key={job._id}>
                    <div style={{ width: "8%" }}>
                      <img
                        className="companyLogo"
                        src={job.logoURL}
                        alt="Logo"
                      />
                    </div>
                    <div style={{ width: "90%" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          flexWrap: "wrap",
                        }}
                      >
                        <div
                          style={{
                            width: "40%",
                            display: "flex",
                            flexDirection: "column",
                            gap: ".5rem",
                            flexWrap: "wrap",
                          }}
                        >
                          <div>{job.companyName}</div>
                          <div
                            style={{
                              display: "flex",
                              gap: "1rem",
                              color: "#9C9C9C",
                              fontSize: "14px",
                              flexWrap: "wrap",
                            }}
                          >
                            <span>
                              <img
                                src={empReq}
                                alt=""
                                width={"18px"}
                                height={"18px"}
                                style={{ paddingBottom: ".2rem" }}
                              />
                              &nbsp;&nbsp;11-50
                            </span>
                            <div>₹{job.salary}</div>
                            <div>{job.location}</div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              gap: "1rem",
                              color: "#ED5353",
                              fontSize: "14px",
                            }}
                          >
                            <div>{job.locationType}</div>
                            <div>{job.jobType}</div>
                          </div>
                        </div>
                        <div
                          style={{
                            width: "50%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "end",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              gap: "1rem",
                              flexWrap: "wrap",
                            }}
                          >
                            {job.skills.map((skill) => {
                              return (
                                <div
                                  className="skillChip"
                                  key={skill}
                                  style={{ fontSize: "10px" }}
                                >
                                  {skill}
                                </div>
                              );
                            })}
                          </div>
                          <div onClick={() => viewDetailsHandler(job._id)} className="viewDetailBtn">View Details</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPage;
