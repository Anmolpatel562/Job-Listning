import React, { useEffect, useState } from "react";
import "../pages_css/JobPage.css";
import rect from "../resources/rect.png";
import cross from "../resources/cross.png";
import axios from "axios";
import empReq from "../resources/empReq.png";

const JobPage = () => {
  const [skills, setSkills] = useState([]);
  const [jobList, setJobList] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async (req, res) => {
    try {
      await axios.get("http://localhost:4000/getAllJobs").then((res) => {
        setJobList(res.data.data);
      });
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

  return (
    <div className="JobPageContainer">
      <div className="headerSection">
        <img className="imgHeader" src={rect} />
        <h1 className="appName">Jobfinder</h1>
        <div className="loginSignUpBtn">
          <button className="loginBtn">Login</button>
          <button className="registerBtn">Register</button>
        </div>
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
                  height: "50px",
                  border: "2px solid #E9E7EA",
                  borderRadius: "5px",
                  paddingLeft: "3rem",
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
                </select>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1rem",
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
                              width: "75%",
                            }}
                          >
                            {skill}
                          </div>
                          <span
                            onClick={() => removeChipHandler(skill)}
                            className="cross"
                          >
                            <img src={cross} style={{ paddingTop: ".4rem" }} />
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
                }}
              >
                <button className="applyFilterBtn">Apply Filter</button>
                <button className="clearBtn">Clear</button>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "3.5rem",paddingBottom:"1.5rem" }}>
            {jobList ? (
              jobList.map((job) => {
                return (
                  <div className="eachJob" key={job._id}>
                    <div style={{ width: "8%" }}>
                      <img className="companyLogo" src={job.logoURL} alt="" />
                    </div>
                    <div style={{ width: "90%" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          flexWrap:"wrap"
                        }}
                      >
                        <div
                          style={{
                            width: "40%",
                            display: "flex",
                            flexDirection: "column",
                            gap: ".5rem",
                            flexWrap:"wrap"
                          }}
                        >
                          <div>{job.companyName}</div>
                          <div
                            style={{
                              display: "flex",
                              gap: "1rem",
                              color: "#9C9C9C",
                              fontSize: "14px",
                              flexWrap:"wrap"
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
                        <div style={{ width: "50%",display:"flex",flexDirection:"column",alignItems:"end",justifyContent:"center" }}>
                          <div style={{ display: "flex", gap: "1rem",flexWrap:"wrap" }}>
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
                          <div className="viewDetailBtn">View Details</div>
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
