import React, { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Card,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import { cookies, instance } from "./Api";
import Swal from "sweetalert2";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await instance.get("/api/auth/login", {
        params: {
          email: email,
          password: pass,
        },
      });
      if (response.status === 200) {
        cookies.set("userID", JSON.stringify(response.data.userId));
        cookies.set("name", JSON.stringify(response.data.name));
        cookies.set("email", JSON.stringify(response.data.email));
        if (response.status === 200) {
          console.log(cookies.get("userID"));
          navigate("/dashboard/discussHub");
        }
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
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundImage: "linear-gradient(to right, #f0f0ff 70%, #dcdcf4 70%)",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Grid container spacing={2}>
        <Grid
          item
          xl={5}
          lg={5}
          md={5}
          sm={12}
          xs={12}
          sx={{
            alignSelf: "center",
            textAlignLast: "center",
          }}
        >
          <Box
            sx={{
              "@media screen and (max-width: 900px)": {
                paddingTop: "40px",
              },
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: "600" }}>
              DiscussHub:
            </Typography>
            <Typography>
              Where Conversations Unfold, Ideas Flourish, and Community Thrives.
            </Typography>
          </Box>
        </Grid>
        <Grid item xl={7} lg={7} md={7} sm={12} xs={12}>
          <Container
            component="main"
            maxWidth="xs"
            sx={{
              height: "96vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              "@media screen and (max-width: 900px)": {
                height: "79vh",
              },
            }}
          >
            <Card sx={{ borderRadius: "20px" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "30px",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in to DiscussHub
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Log In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="#" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Card>
          </Container>
          ;
        </Grid>
      </Grid>
    </Box>
  );
}

export default Login;
