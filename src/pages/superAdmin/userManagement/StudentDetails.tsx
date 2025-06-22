import React from "react";
import { useParams } from "react-router-dom";

const StudentDetails = () => {
    const params = useParams()
    const {studentId} = params
  return <div>this is student details {studentId}</div>;
};

export default StudentDetails;
