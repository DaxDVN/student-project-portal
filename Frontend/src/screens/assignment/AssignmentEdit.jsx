import AssignmentForm from "../../components/assignment/AssignmentForm.jsx";
import HeaderContent from '../../components/common/layout/HeaderContent.jsx';
import React from "react";

const AssignmentEdit = () => {
  return (
    <>
      <HeaderContent
        pageTitle={"Assignment Edit"}
        pageName={"Assignment Edit"}
        prePage={"Assignment"}
      />
      <AssignmentForm />
    </>
  );
};

export default AssignmentEdit;
