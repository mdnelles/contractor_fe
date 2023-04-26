import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import CuiboidFBLR from "../../../components/Anim/CuiboidFBLR";
import { CuboidGlobal1 } from "../../../components/Anim/_styles";
import { setAnims } from "../../../features/anims/animsSlice";

import inovative from "../../../assets/sm/inovative.png";
import nodereact from "../../../assets/sm/node-react.png";
import aws from "../../../assets/sm/aws.png";
import react from "../../../assets/sm/react.png";
import postgres from "../../../assets/sm/postgres.png";

import github from "../../../assets/sm/github.png";
import "../public.css";
import TileImg from "../../../components/Anim/TileImg";

export default function Home(): JSX.Element {
  const dispatch = useAppDispatch();
  const session: any = useAppSelector((state) => state.session);
  const anims: any = useAppSelector((state) => state.anims);
  const [arrNum, arrNumSet] = useState(0);

  const delay = 5000;

  setTimeout(() => {
    const num1 = anims.num1 === 3 ? 0 : anims.num1 + 1;
    const num2 = anims.num2 === 0 ? 3 : anims.num2 - 1;
    dispatch(
      setAnims({
        ...anims,
        num1,
        num2,
      })
    );
  }, session.speed * 2 + delay);

  return (
    <>
      <div style={{ padding: 30 }} />

      <div>
        <Grid container spacing={2}>
          <Grid
            item
            container
            spacing={0}
            xs={12}
            lg={6}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <div style={{ paddingTop: 25 }}>
              <CuiboidFBLR
                front={<TileImg img={react} txt="Front End Engineering" />}
                right={<TileImg img={aws} txt="Cloud Computing" />}
                back={
                  <TileImg img={github} txt="Continuous Integration (CI/CD)" />
                }
                left={<TileImg img={postgres} txt="Database Administration" />}
                css={CuboidGlobal1}
                body={undefined}
                width={220}
                height={260}
                depth={250}
                animCount={anims.num1}
              />
            </div>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Card>
              <CardMedia
                component="img"
                height="150"
                image={inovative}
                alt="green iguana"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                ></Typography>
                <Typography variant="body2" color="text.secondary">
                  At contratistaits all about building dynamic efficient
                  solutions on Javascript / Typescript frameworks to help
                  business.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={(e) => {
                    window.location.href = "company_request-a-quote";
                    e.preventDefault();
                  }}
                >
                  Quote
                </Button>
                <Button
                  size="small"
                  onClick={(e) => {
                    window.location.href = "company_contact";
                    e.preventDefault();
                  }}
                >
                  Contact
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item lg={12}>
            <div style={{ padding: 40 }} />
          </Grid>

          <Grid item xs={12} lg={6}>
            <Card>
              <CardMedia
                component="img"
                height="150"
                image={nodereact}
                alt="NodeJS React"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                ></Typography>
                <Typography variant="body2" color="text.secondary">
                  Complete solutions from dashboards and Front End (FE) branding
                  to Back End (BE) programming and cloud integration with
                  databases.
                </Typography>
              </CardContent>
              <CardActions></CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} lg={6}>
            <ul className="a">
              <li>Work smarter with custom tools</li>
              <li>
                Centralize workflow with online customers - reach new markets
              </li>
              <li>
                Achieve the benefits of a web presence and a mobile app with a
                single entity
              </li>
              <li>Cement brand and stand out</li>
            </ul>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
