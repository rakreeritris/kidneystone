import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import axios from "axios";
const UploadForm = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [blood, setBlood] = useState("");
  const [file, setfile] = useState("");
  const [ml_output, setml_output] = useState();

  const handleClick = async () => {
    console.log(name, number, blood, file);
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("number", number);
    formdata.append("name", name);
    formdata.append("blood", blood);
    const resp = await axios.post(
      "http://localhost:8000/senddetaials",
      formdata
    );
    console.log(resp);
    setml_output(resp.data);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#3b3e3d",
          width: "80%",
          margin: "auto",
          top: "110px",
          position: "relative",
          color: "white",
        }}
      >
        <Typography variant="h5" component="h6">
          ENTER DETAILS
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            marginTop: "30px",
            marginBottom: "20px",
            justifyContent: "space-between",
            width: "60%",
          }}
        >
          <Typography variant="h5">Patient Name</Typography>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Patient Name"
            style={{
              width: "50%",
            }}
          ></input>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            marginTop: "30px",
            marginBottom: "20px",
            justifyContent: "space-between",
            width: "60%",
          }}
        >
          <Typography variant="h5">Patient Number</Typography>
          <input
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Patient Number"
            style={{
              width: "50%",
            }}
          ></input>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            marginTop: "30px",
            marginBottom: "20px",
            justifyContent: "space-between",
            width: "60%",
          }}
        >
          <Typography variant="h5">Patient Blood Group</Typography>
          <input
            type="text"
            value={blood}
            onChange={(e) => setBlood(e.target.value)}
            placeholder="Patient blood group"
            style={{
              width: "50%",
            }}
          ></input>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            marginTop: "30px",
            marginBottom: "20px",
            justifyContent: "space-between",
            width: "60%",
          }}
        >
          <Typography variant="h5">Upload Report</Typography>
          <input
            type="file"
            onChange={(e) => setfile(e.target.files[0])}
            style={{
              width: "50%",
            }}
          ></input>
        </Box>
        <Button onClick={() => handleClick()}>Generate Report</Button>
      </Box>
      {ml_output && (
        <Typography
          sx={{
            position: "relative",
            top: "8vw",
            fontSize: "2vw",
            color: "red",
            fontFamily: "monospace",
          }}
        >
          Result- {ml_output}
        </Typography>
      )}
    </>
  );
};

export default UploadForm;
