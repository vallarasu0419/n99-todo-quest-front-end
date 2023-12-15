import { Typography } from "@mui/material";
import React from "react";

function DiscussHub() {
  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "600" }}>
        Welcome ____!
      </Typography>

      <Typography variant="subtitle1" sx={{ fontWeight: "500" }}>
        Welcome to DiscussHub Chats! Spark meaningful conversations, share
        insights, and connect with a vibrant community. Dive into diverse
        discussions, embrace different viewpoints, and make every chat an
        enriching experience. Join the dialogue, foster connections, and let
        your voice be heard. Happy chatting at DiscussHub!
      </Typography>
    </div>
  );
}

export default DiscussHub;
