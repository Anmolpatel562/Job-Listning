import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getJobDetailsById,deleteJobPost } from "../auth/jobApis";
import styles from "../pages_css/JobDetails.module.css";
import rect from "../resources/rect.png";
import { toast } from "react-toastify";

const JobDetails = () => {
  const location = useLocation();
  const jobId = location.state.id;
  const navigate = useNavigate();
  const [isLoggedIn] = useState(!!localStorage.getItem("token"));
  const [isJobEditable, setIsJobEditable] = useState(false);
  const [selectedJobDetail, setSelectedJobDetail] = useState("");
  const [showDelete,setShowDelete] = useState("none");

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    try {
      const result = await getJobDetailsById(jobId);
      setIsJobEditable(result.isEditable);
      setSelectedJobDetail(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/login");
  };

  const showDeleteBox = () => {
    if(showDelete === "none"){
       setShowDelete("");
    }else{
       setShowDelete("none");
    }
  }

  const deleteButtonHandler = async() => {
    try{
      const response = await deleteJobPost(jobId);
      toast(response?.data.message);
      navigate('/jobPage');
    }catch(error){
      console.log(error);
    }
  }

  return (
    <>
      {selectedJobDetail ? (
        <>
          <div className="headerSection">
            <img className="imgHeader" src={rect} alt="headerImg" />
            <h1 className="appName">Jobfinder</h1>
            {isLoggedIn ? (
              <div className="loggedInUserDetails">
                <button onClick={logoutHandler} className="logoutBtn">
                  Logout
                </button>
                <button
                  onClick={() => navigate("/jobPage")}
                  className="logoutBtn"
                >
                  Back
                </button>
              </div>
            ) : (
              <div className="loginSignUpBtn">
                <button onClick={() => navigate("/login")} className="loginBtn">
                  Login
                </button>
                <button
                  onClick={() => navigate("/signUp")}
                  className="registerBtn"
                >
                  Register
                </button>
              </div>
            )}
          </div>
          <div style={{ marginTop: "8rem" }} className={styles.container}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "2rem",
              }}
            >
              <img
                style={{ width: "80px" }}
                src={selectedJobDetail?.logoURL}
                alt=""
              />
              <p
                style={{ fontSize: "40px", paddingTop: "1rem" }}
                className={styles.containerText}
              >
                {selectedJobDetail?.companyName}
              </p>
            </div>
          </div>
          <div className={styles.containerBottom}>
            <div className={styles.preHeading}>
              <p className={styles.lightText}>
                {selectedJobDetail?.posted} • {selectedJobDetail.jobType}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div className={styles.heading}>
                <div>
                  <p
                    style={{
                      margin: "0px",
                    }}
                    className={styles.boldText}
                  >
                    {selectedJobDetail.title}
                  </p>
                  <p className={styles.locationText}>
                    {selectedJobDetail.location}
                  </p>
                </div>
              </div>
              <div>
                {isLoggedIn && isJobEditable && (
                  <div>
                    <button
                     style={{backgroundColor:"#2899e4"}}
                      onClick={() => {
                        navigate("/addJob", {
                          state: {
                            jobDetails: selectedJobDetail,
                            edit: true,
                            jobId: jobId,
                          },
                        });
                      }}
                      className={styles.edit}
                    >
                      Edit Job
                    </button>
                    <button onClick={showDeleteBox} style={{marginLeft:"10px"}} className={styles.edit}>
                      Delete 
                    </button>
                    <div style={{display:showDelete, backgroundColor:"#faebe7",padding:".8rem",textAlign:"right",borderRadius:"10px",marginTop:"8px",fontSize:"14px"}}>
                      <p>Do you want to delete this post ?</p>
                      <button onClick={deleteButtonHandler} style={{width:"60px", border:"1px solid #f82929", backgroundColor:"#f8f7f7",borderRadius:"5px"}}>Yes</button>
                      <button onClick={showDeleteBox} style={{width:"60px", border:"1px solid #f82929", backgroundColor:"#f8f7f7",borderRadius:"5px",marginLeft:"5px"}}>No</button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.perks}>
              <div>
                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                    width: "10vw",
                  }}
                >
                  <p className={styles.lightText}>Stipend</p>
                </div>
                <p className={styles.lightText2}>
                  Rs.{selectedJobDetail.salary}/month
                </p>
              </div>
              <div>
                <p className={styles.lightText2}>
                  {selectedJobDetail.duration}
                </p>
              </div>
            </div>
            <div className={styles.info}>
              <h2>About Company</h2>
              {selectedJobDetail.aboutCompany}
              <p className={styles.lightText}>{selectedJobDetail.about}</p>
            </div>
            <div className={styles.info}>
              <h2>Skills Required</h2>
              {selectedJobDetail?.skills?.map((skill) => {
                return (
                  <p className={styles.skill} key={skill}>
                    {skill}
                  </p>
                );
              })}
            </div>
            <div className={styles.info}>
              <h2>Additional Information</h2>
              <p className={styles.lightText}>
                {selectedJobDetail.description}
              </p>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default JobDetails;
