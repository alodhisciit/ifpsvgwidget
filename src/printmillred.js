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
// import footerlogo from "../../../assets/images/images/footer home-icon.png";
// import facebookicon from "../../../assets/images/images/facebook-icon.png";
import SvgImport from "./views/utilities/Svgimport";
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
  elevation,
  setopenLoader,
  optionsChecked,
  draggedFurnitures,
  setSVGarray,
}) {
  let history = useHistory();
  const [images, setImages] = React.useState([]);
  const [options, setOptions] = React.useState([]);

  useEffect(() => {
    setOptions(floorOptions.options);
    setImages(canvasimg);
  }, [floorOptions]);
  // canvasimg.map((o,i)=>{
  //     console.log('images:', o);
  // })

  function Footer() {
    return (
      <>
        <Grid container className="footer">
          <Grid item xs={9} className="disclaimer">
            <Grid container>
              <Grid item xs={1}>
                <img src={"footerlogo"} />
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
                    <img
                      width="17"
                      src={
                        config.baseURL +
                        "uploads/2022-03-15T05-04-41.004Z-facebook-icon.png"
                      }
                    />
                  </span>
                </li>
                <li>
                  <span className="social-list">
                    {" "}
                    <img
                      width="17"
                      src={
                        config.baseURL +
                        "uploads/2022-03-15T05-06-37.786Z-twiter-icon.png"
                      }
                    />
                  </span>
                </li>
                <li>
                  <span className="social-list">
                    {" "}
                    <img
                      width="17"
                      src={
                        config.baseURL +
                        "uploads/2022-03-15T05-05-21.567Z-insta-icon.png"
                      }
                    />
                  </span>
                </li>
                {/* <li>
                                  <span className="social-list">
                                      {' '}
                                      <img width="17" src={facebookicon} />
                                  </span>
                              </li> */}
              </ul>
              www.ifp.com
            </div>
          </Grid>
        </Grid>
      </>
    );
  }

  function Header() {
    const classes = useStyles();
    return (
      <>
        <Grid item xs={12} className={classes.header}>
          <div className="headerlogoleft">
            <img
              src={config.baseURL + selectedvalue.homebuilder.brandImage}
              style={{ height: "37px" }}
            />
            {/* <img src={headerlogo} /> */}
            <div className="hbname">{selectedvalue.homebuilder.name}</div>
          </div>
          <div className="headerlogoright">
            {/* <img src={headerlogo} /> */}
          </div>
          <div className="description">
            4­8 Bedrooms • 2.5­5 Baths • 2­Car Garage 2,863 ­ 4,224 Sq. Ft
          </div>
        </Grid>
      </>
    );
  }
  // console.log('images: ', images.length);
  const pdfExportComponent = React.useRef(null);
  useEffect(() => {
    console.log("options checked: ", optionsChecked);
  }, []);

  useEffect(() => {
    // setTimeout(() => {
    //     // exportPDFWithComponent()
    //   }, 2000);
    // setSelectedValues({...selectedvalue});
    // setImages(selectedvalue['canvasImages']);
    setTimeout(() => {
      setopenLoader(false);
    }, 9000);
  }, [canvasimg]);

  const exportPDFWithComponent = () => {
    pdfExportComponent.current.save(() => {
      window.close();
      history.push("/homebuilder-widget/6218ab892f728945187addd9");
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
        {floorOptions.floorplan.map((o, i) => {
          console.log("fllo", o);
          return (
            <Grid container spacing={3} style={{ width: "750px" }}>
              <Header />
              <div className="contain-wrapper">
                <Grid item xs={12} style={{ padding: "20px" }}>
                  <div className="hbname">{floorOptions.floorplan[i].name}</div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ width: "60%", margin: "20px auto" }}>
                      <div
                        className="frame"
                        id={`frame-${o["_id"]}`}
                        style={{ position: "relative" }}
                      >
                        <SvgImport
                          url={o["imagePath"]}
                          ids={o["_id"]}
                          setSVGarray={setSVGarray}
                          index={i}
                          optionsChecked={optionsChecked}
                          draggedFurnitures={draggedFurnitures}
                          cached={false}
                        />
                      </div>
                    </div>{" "}
                  </div>
                </Grid>
              </div>
              <Footer />
            </Grid>
          );
        })}
        {/* {images.map((o,i)=>{
              $('#loader').css({display:'none'})
              return(
              <Grid container spacing={3} style={{ width: '750px' }}>
                  <Header />
                  <div className="contain-wrapper">
                      <Grid item xs={12} style={{ padding: '20px' }}>
                          <div className="hbname">{floorOptions.floorplan[i].name}</div>
                          <div style={{ textAlign: 'center' }}> 
                              <img className="floorplan-img" src={o} style={{width:'100%'}}/>
                          </div>
                      </Grid>
                  </div>
                  <Footer />
              </Grid>)
          })} */}

        <Grid
          container
          spacing={3}
          style={{ width: "750px" }}
          className={"page-break"}
        >
          <Header />
          <div className="contain-wrapper">
            <Grid item xs={12} style={{ padding: "20px" }}>
              <div className="hbname">Options Selected</div>
              {/* {console.log('options',floorOptions.floorplan)} */}

              {options.map((o, index) => {
                return (
                  <>
                    <h2>{floorOptions.floorplan[index].name}</h2>
                    {Object.keys(o).length > 0 &&
                      Object.entries(o).map((a, i) => {
                        if (a[1] == true) {
                          floorOptions.floorplan[index].options.map(
                            (obj, i) => {
                              {
                                console.log("opt", obj);
                              }
                            }
                          );
                          return (
                            <p>
                              {" "}
                              {floorOptions.floorplan[index].options[i].label}
                            </p>
                          );
                        }
                      })}
                  </>
                );
              })}
            </Grid>
          </div>
          <Footer />
        </Grid>
        {elevation.map((o, i) => {
          return (
            <Grid
              container
              spacing={3}
              style={{ width: "750px" }}
              className={"page-break"}
            >
              <Header />
              <div className="contain-wrapper">
                <Grid item xs={12} style={{ padding: "20px" }}>
                  <div className="hbname">{o.name}</div>
                  <div style={{ textAlign: "center" }}>
                    <img
                      className="floorplan-img"
                      src={config.baseURL + o.imagePath}
                      style={{ width: "100%" }}
                    />
                  </div>
                </Grid>
              </div>
              <Footer />
            </Grid>
          );
        })}
      </PDFExport>
    </>
  );
}

export default Printfloorplan;
