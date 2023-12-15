import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import VideoChatIcon from "@mui/icons-material/VideoChat";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import SearchIcon from "@mui/icons-material/Search";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React, { useEffect, useState } from "react";
import { cookies, instance } from "./Api";
import Swal from "sweetalert2";
import moment from "moment";

function Chat() {
  const userID = cookies.get("userID");
  const name = cookies.get("name");
  const [getMessage, setGetMessage] = useState([]);
  const [postMessage, setPostMessage] = useState("");

  const postmessage = async () => {
    const datetime = new Date();
    const isoFormattedTime = datetime.toISOString();
    try {
      const response = await instance.post(
        `/api/message?from=${userID}&to=${
          userID === 1 ? "2" : "1"
        }&text=${postMessage}&time=${isoFormattedTime}&name=${name}`
      );
      if (response.status === 200) {
        getmessage();
        setPostMessage("");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response.data.description,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops... SomeThing Went Worng",
      });
      return error;
    }
  };
  const getmessage = async () => {
    try {
      const response = await instance.get("/api/getMessage");
      if (response.status === 200) {
        setGetMessage(response.data);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response.data.description,
        });
      }
      return true;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.description,
      });
      return error;
    }
  };

  const detelemessage = async (msgId) => {
    try {
      const response = await instance.delete(
        `/api/deleteMessage?msgId=${msgId}`
      );
      if (response.status === 200) {
        getmessage();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops... SomeThing Went Worng",
        });
      }
      return true;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.description,
      });
      return error;
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      getmessage();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  const userIDString = String(userID);

  return (
    <div style={{ height: "83vh" }}>
      <div
        style={{
          height: "50px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", paddingLeft: "10px" }}>
          <Avatar>H</Avatar> <span style={{ padding: "8%" }}>{name}</span>
        </div>
        <div
          style={{
            paddingRight: "40px",
            width: "150px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <IconButton>
            <VideoChatIcon sx={{ fontSize: "30px" }} />
          </IconButton>
          <IconButton>
            <LocalPhoneOutlinedIcon sx={{ fontSize: "30px" }} />
          </IconButton>
          <IconButton>
            <SearchIcon sx={{ fontSize: "30px" }} />
          </IconButton>
        </div>
      </div>
      <div
        style={{
          overflow: "auto",
          height: "68vh",
          padding: "10px",
        }}
      >
        {getMessage.map((msg) => (
          <div key={msg.message_id}>
            {/* <Card
              sx={{
                backgroundColor:
                  msg.from_user === userIDString ? "red" : "green",
                margin: "8px",
              }}
            >
              <CardContent> */}
            <Grid container spacing={2}>
              {msg.from_user === userIDString ? (
                <>
                  <Grid item xl={6} lg={6} md={6} sm={6} xs={6}></Grid>
                  <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                    <Typography className="userChat">
                      <Typography>
                        <IconButton
                          onClick={() => detelemessage(msg.message_id)}
                        >
                          <DeleteForeverIcon className="deleteIcon" />
                        </IconButton>
                        &nbsp;&nbsp;{msg.message_text}
                      </Typography>
                      <Typography variant="caption">
                        {moment(msg.date_time).format("HH:mm")}
                      </Typography>
                    </Typography>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                    {/* <Card sx={{ margin: "10px" }}> */}
                    <Typography>{msg.message_text}</Typography>
                    <Typography variant="caption">
                      {moment(msg.date_time).format("HH:mm")}
                    </Typography>
                    {/* </Card> */}
                  </Grid>
                  <Grid item xl={6} lg={6} md={6} sm={6} xs={6}></Grid>
                </>
              )}
            </Grid>
            {/* </CardContent>
            </Card> */}
          </div>
        ))}
      </div>
      <div
        style={{
          position: "relative",
          bottom: "1px",
          display: "flex",
        }}
      >
        <TextField
          fullWidth
          placeholder="Type a message"
          name="email"
          value={postMessage}
          onChange={(e) => setPostMessage(e.target.value)}
        />
        &nbsp;&nbsp;
        <Button onClick={() => postmessage()} variant="outlined">
          send
        </Button>
      </div>
    </div>
  );
}

export default Chat;
