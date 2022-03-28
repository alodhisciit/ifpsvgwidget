import React, { useEffect } from "react";
import {
  FormControlLabel,
  Checkbox,
  TextField,
  Typography,
  Container,
  Paper,
  Grid,
  Box,
  AppBar,
  IconButton,
  Toolbar,
  Button,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/styles";
// import headerlogo from "../../../assets/images/images/logo-sample1.png";
// import footerlogo from "../../../assets/images/images/footer home-icon.png";
// import facebookicon from "../../../assets/images/images/facebook-icon.png";
import "./printfloorplan.css";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import { useHistory } from "react-router-dom";
import config from "./config";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FB6B3B, #FF8E53)",
    border: 0,
    marginBottom: 15,
    borderRadius: 15,
    color: "white",
    padding: "5px 30px",
  },

  header: {
    padding: "20px 10px !important",
  },
});

function Printfloorplan({
  floorOptions,
  selectedvalue,
  rules,
  setSelectedValues,
  setFloorOptions,
  canvasimg,
  headerlogo,
}) {
  console.log("canvas images:", canvasimg);

  let history = useHistory();
  const [images, setImages] = React.useState(canvasimg);
  const [options, setOptions] = React.useState(floorOptions);
  console.log("images:", canvasimg);
  // canvasimg.map((o,i)=>{
  //     console.log('images:', o);
  // })

  // console.log('images: ', images.length);
  const pdfExportComponent = React.useRef(null);
  useEffect(() => {
    // setTimeout(() => {
    //     // exportPDFWithComponent()
    //   }, 2000);
    // setSelectedValues({...selectedvalue});
    setOptions(floorOptions);
  }, [floorOptions]);
  useEffect(() => {
    // setTimeout(() => {
    //     // exportPDFWithComponent()
    //   }, 2000);
    // setSelectedValues({...selectedvalue});
    setImages(selectedvalue["canvasImages"]);
  }, [selectedvalue]);

  const exportPDFWithComponent = () => {
    pdfExportComponent.current.save(() => {
      window.close();
      history.push("/homebuilder-widget/614c57f3dec32742bc1c1332");
    });
  };

  return (
    <>
      <Button onClick={exportPDFWithComponent}> Download</Button>
      <PDFExport
        ref={pdfExportComponent}
        paperSize="auto"
        margin={10}
        fileName={`IFP Floorplan`}
        forcePageBreak=".page-break"
      >
        {canvasimg.map((o, i) => {
          // console.log('image:',o);
          return (
            <>
              <Grid
                container
                spacing={3}
                style={{ width: "750px" }}
                className={i === 0 ? "" : "page-break"}
              >
                <Header headerlogo={headerlogo} />
                <div className="contain-wrapper">
                  <Grid item xs={12} style={{ padding: "20px" }}>
                    <div className="hbname">Floor 1</div>
                    <div style={{ textAlign: "center" }}>
                      <img className="floorplan-img" src={o} />
                    </div>
                    {/* <div style={{pageBreakAfter:'always',clear:'both'}}></div> */}
                  </Grid>
                </div>
                <Footer />
              </Grid>
            </>
          );
        })}
        {/* <Grid container spacing={3} style={{width:'750px'}}>
        <Header/>
        <div className="contain-wrapper">
        <Grid item xs={12}> 
        <div className="hbname">First Floor</div>
            <div className ="floorplans">
                <img className="floorplan-img" src={floorplan}/>
            </div>
        </Grid>
        </div>
       <Footer/>
        </Grid> */}
        <Grid
          container
          spacing={3}
          className="page-break"
          style={{ width: "750px" }}
        >
          <Header />
          <div className="contain-wrapper">
            <Grid item xs={12} style={{ padding: "20px" }}>
              <div className="hbname">Options Selected</div>
              {options.map((o, i) => {
                return (
                  <>
                    <h3>Floor {i}</h3>
                    <ul>
                      {o.map((ob, ind) => {
                        if (rules[i]["activeElements"].includes(o._id)) {
                          return <li>{ob.name}</li>;
                        }
                      })}
                    </ul>
                  </>
                );
              })}
            </Grid>
          </div>
          <Footer />
        </Grid>
      </PDFExport>
    </>
  );
}

function Footer() {
  return (
    <>
      <Grid container className="footer">
        <Grid item xs={9} className="disclaimer">
          <Grid container>
            <Grid item xs={1}>
              <img src={""} />
            </Grid>
            <Grid item xs={11}>
              Woodside Homes reserves the right to change elevations,
              specifications, materials and prices without notice.Window
              location, porches, ceiling heights and room dimensions vary per
              elevation. The availability of certain options is subject to
              construction status and schedule. Optional features may be
              predetermined and included at additional cost on select homes.
              Renderings are artist's conception only
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <div>
            <ul className="social-media">
              <li>
                <span className="social-list">
                  {" "}
                  <img width="17" src={"facebookicon"} />
                </span>
              </li>
              <li>
                <span className="social-list">
                  {" "}
                  <img width="17" src={"facebookicon"} />
                </span>
              </li>
              <li>
                <span className="social-list">
                  {" "}
                  <img width="17" src={"facebookicon"} />
                </span>
              </li>
              <li>
                <span className="social-list">
                  {" "}
                  <img width="17" src={"facebookicon"} />
                </span>
              </li>
            </ul>
            www.ifp.com
          </div>
        </Grid>
      </Grid>
    </>
  );
}

function Header({ headerlogo }) {
  const classes = useStyles();
  return (
    <>
      <Grid item xs={12} className={classes.header}>
        <div className="headerlogoleft">
          <img src={config.baseURL + headerlogo} />
          <div className="hbname">Mcintosh</div>
        </div>
        <div className="headerlogoright">
          <img src={config.baseURL + headerlogo} />
        </div>
        <div className="description">
          4­8 Bedrooms • 2.5­5 Baths • 2­Car Garage 2,863 ­ 4,224 Sq. Ft
        </div>
      </Grid>
    </>
  );
}

export default Printfloorplan;
