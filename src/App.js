import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";

import "regenerator-runtime/runtime";
import "./App.css";
import "./jquery-global.js";
import $ from "jquery";
import "jquery-ui";
import "jquery-ui-bundle";
import "jquery-ui-bundle/jquery-ui.min.css";
import introJs from "intro.js";
import "intro.js/introjs.css";
import html2canvas from "html2canvas";
// import {
//   Print,
//   Download,
//   Email,
//   Help,
//   ZoomIn,
//   ZoomOut,
//   Flip,
//   RestartAlt,
// } from "@mui/icons-material";
import Print from "@mui/icons-material/Print";
import Download from "@mui/icons-material/Download";
import Email from "@mui/icons-material/Email";
import Help from "@mui/icons-material/Help";
import ZoomIn from "@mui/icons-material/ZoomIn";
import ZoomOut from "@mui/icons-material/ZoomOut";
import RestartAlt from "@mui/icons-material/RestartAlt";
import Flip from "@mui/icons-material/Flip";

import { getSingleHomebuilder } from "./services/homebuildersService";
import { getCommunitiesByHomebuilder } from "./services/communitiesService";
import { getHomesByCommunities } from "./services/homesService";
import { getSvgFloorPlansByHome } from "./services/svgFloorPlansService";
import { getElevationsByHome } from "./services/elevationsService";
import {
  Container,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  Grid,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  IconButton,
  Slider,
  FormControlLabel,
  InputLabel,
  Box,
  CircularProgress,
  Dialog,
  AppBar,
  Toolbar,
  Button,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import { pluralize } from "./helpers/helpers";
import millredlogo from "./assets/images/millred-logo.png";
import SvgImport from "./views/utilities/Svgimport";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import config from "./config";
import useFurnitures from "./hooks/useFurnitures";
import "./optionaccordian.css";

//icons
import fliphorizental from "./assets/icons/widget/flip_horizental.svg";
import reseticon from "./assets/icons/widget/reset.svg";
import printingicon from "./assets/icons/widget/printing.svg";
import saveicon from "./assets/icons/widget/save.svg";
import helpicon from "./assets/icons/widget/help.svg";
import deleteicon from "./assets/icons/widget/delete.svg";
import Printfloorplan from "./printmillred";

const App = ({ domElement }) => {
  // getting homebuilderId from dom through widget script properties
  console.log("dom element: ", domElement.dataset.widget.split("/"));

  //   const homebuilderId = domElement.props.data && domElement.props.data;
  const widgteParams =
    domElement.dataset.widget && domElement.dataset.widget.split("/");

  const homebuilderId = widgteParams[0];
  const communityId = widgteParams[1];

  const homeId = widgteParams[2];

  // state to store and change communities data
  const [communities, setCommunities] = React.useState([]);

  // state to store and change homes data
  const [homes, setHomes] = React.useState([]);

  // state to store and change elevations data
  const [elevations, setElevations] = React.useState([]);

  // state to store and change floorplans data
  const [floorPlans, setFloorPlans] = React.useState([]);
  const [initialInactiveOptions, setInitialInactiveOptions] = React.useState(
    []
  );
  const [inactiveOptions, setInactiveOptions] = React.useState([]);

  // state to store and change floor options data
  const [floorOptions, setFloorOptions] = React.useState([]);

  const [selectedFurnitures, setSelectedFurnitures] = React.useState({});

  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const [refresh, setRefresh] = React.useState(false);

  const [openprint, setOpenprint] = React.useState(false);

  const [openLoader, setopenLoader] = React.useState(false);
  // state to store and change selected values from different inputs of widget data
  const [selectedValues, setSelectedValues] = React.useState({
    homebuilder: [],
    community: communityId,
    home: homeId,
    elevation: "",
    floorPlan: "",
    floorOption: [],
    optionRules: [],
    canvasImages: [],
  });

  const [selectedIndexes, setSelectedIndexes] = React.useState({
    elevation: 0,
    floorPlan: 0,
  });

  const [zoomvalue, setZoomvalue] = React.useState(1);
  const [SVGarray, setSVGarray] = React.useState([]);
  const [optionsarray, setoptionsarray] = React.useState("");
  const [accordianExpanded, setAccordianExpanded] = React.useState(false);
  const nodeRef = React.useRef(null);
  const [draggedFurnitures, setDraggedFurnitures] = React.useState({});
  const [printLoader, setPrintLoader] = React.useState(false);
  const [tabValue, setTabValue] = React.useState(0);
  const [canvasimg, setCanvasimg] = React.useState([]);

  var optionGroups = $(".frame svg").find("g[id^=Opt]");

  // homebuilder service
  const homebuilder = async () => {
    const homebuilder = await getSingleHomebuilder(homebuilderId);
    if (homebuilder.status === 200) {
      // set selected homebuilderId with persistance of other values in the object
      setSelectedValues((prev) => {
        prev.homebuilder = homebuilder.data;
        return prev;
      });
      setSelectedFurnitures(homebuilder.data.furnitures);

      setError(null);
    } else {
      setError("Homebuilders could not be loaded!");
    }
  };

  const [furnitureSize, setFurnitureSize] = React.useState({
    width: 25,
    height: 25,
  });

  const tabRef = React.useRef(null);

  const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);

  const [optionsChecked, setOptionsChecked] = React.useState([]);

  // On top layout
  const onResize = (event, { element, size, handle }) => {
    setFurnitureSize({ width: size.width, height: size.height });
  };

  // communities service
  const getCommunities = async () => {
    const response = await getCommunitiesByHomebuilder(homebuilderId);
    if (response.status === 200) {
      setCommunities(response.data);
      setError(null);
    } else {
      setError("Communities could not be loaded!");
    }
  };

  // homes service
  const getHomes = async () => {
    const response = await getHomesByCommunities(selectedValues.community);
    if (response.status === 200) {
      setHomes(response.data);
      setError(null);
      setIsLoading(false);
    } else {
      setError("Homes could not be loaded!");
    }
  };

  // elevations service
  const getElevations = async () => {
    const response = await getElevationsByHome(selectedValues.home);
    const firstElevation = response.data[0];
    if (response) {
      setElevations(response.data);
      setSelectedValues((prev) => {
        prev.elevation = firstElevation._id;
        return prev;
      });

      setError(null);
    } else {
      setError("Elevations could not be loaded!");
    }
  };

  // floorPlans service
  const getFloorPlans = async () => {
    const response = await getSvgFloorPlansByHome(selectedValues.home);
    if (response.status === 200) {
      const floorPlansData = response.data;
      setFloorPlans(floorPlansData);
      let currentInactiveOptions = [];
      let newOptionChecked = [];
      floorPlansData.map((floorPlan, index) => {
        currentInactiveOptions[index] = [].concat(
          floorPlan.options[0].inactives
        );
        // const floorPlanId = floorPlan.id;
        // let obj = { [floorPlanId]: true };
        newOptionChecked[index] = {};
        floorPlan.options.forEach(
          (option, i) => (newOptionChecked[index][option.id] = false)
        );
        setDraggedFurnitures((prev) => {
          prev[floorPlan._id] = [];
          return prev;
        });
        // newInactiveOptions[index].;
        // console.log(`optiona ${index} inactives: `, floorPlan.options[0]);
      });
      console.log("initial dragged furnitures: ", draggedFurnitures);
      setOptionsChecked(newOptionChecked);
      console.log("initial inactive options: ", currentInactiveOptions);
      // console.log('inactive options: ', newInactiveOptions);
      setInactiveOptions(currentInactiveOptions);
      setInitialInactiveOptions(currentInactiveOptions);
      // console.log('floor plan res: ', floorPlansData);
      const firstFloorPlanId = response["data"][0]["_id"];
      // getAllFloorOptionRules(floorPlansData);

      setSelectedValues((prev) => {
        prev.floorPlan = response["data"][0]["_id"];
        return prev;
      });
      // console.log('selected floorplan: ', selectedValues.floorPlan);

      setError(null);
      // framecolwidth();
      // framecolheight();
      // console.log('the helll: ', floorOptions);
    } else {
      setError("Floorplans could not be loaded!");
    }
  };
  const furnituresForHomebuilder = () => {
    setSelectedFurnitures(selectedValues.homebuilder.furnitures);
  };
  // get single homebuilder object
  React.useEffect(() => {
    // setoptionsarray(optionGroups)
    homebuilder();
    var dragFurn = $("#gallery");
    var dropArea = $("#zoom");

    // furnidrag()
    // console.log('selected indexes: ', selectedIndexes);
  }, []);

  function furnidrag() {
    var ImmagineDrag = null;
    var currentImageX = "";
    var currentImageY = "";
    // console.log('dragged1: ', draggedFurnitures);
    let currentDraggedFurnitures =
      Object.keys(draggedFurnitures).length > 0
        ? draggedFurnitures[floorPlans[selectedIndexes.floorPlan]["_id"]]
        : {};

    //delete Furniture
    $(".dragged").click(function () {
      var atr = $(this).attr("style");
      $(this).addClass("delete");
      if ($(this).hasClass("delete")) {
        $(".furnidelete").remove();
      } else {
        $(this).append(
          `<img class='furnidelete' src=${
            config.baseURL + "uploads/2022-03-04T05-57-54.654Z-delete.svg"
          }'/>`
        );
      }
      $(this).append(
        `<img class='furnidelete' src='${
          config.baseURL + "uploads/2022-03-04T05-57-54.654Z-delete.svg"
        }'/>`
      );
      $(".furnidelete").click(function () {
        // console.log('deleted furniture: ', $(this).parent()[0]['dataset']['draggedindex']);
        const draggedFurnitureIndex =
          $(this).parent()[0]["dataset"]["draggedindex"];
        currentDraggedFurnitures.pop(draggedFurnitureIndex);
        setDraggedFurnitures({
          ...draggedFurnitures,
          currentDraggedFurnitures,
        });

        $(this).parent().remove();
      });
    });
    // $('.furnidelete').click(function () {
    //     console.log('deleted furniture: ', $(this).parent());
    //     $(this).parent().remove();
    // });
    // $('svg').click(function(){
    //     $('.furnidelete').remove()
    // })
    //End delete Furniture
    $(".zoom").draggable();
    $(".furniture-drag").draggable({
      cursor: "move",
      helper: "clone",
      appendTo: ".frame",
    });
    $(".frame").droppable({
      accept: `.furniture-drag`,
      classes: {
        "ui-droppable-active": "ui-state-highlight",
      },
      end: () => {
        setRefresh(!refresh);
      },
      drop: function (e, ui) {
        console.log("furniture dropped");

        // console.log('drooped:', $(ui.draggable)[0].dataset.furnitureid);
        $(".frame").append(
          $(ui.draggable)
            .clone()
            .css({
              position: "absolute",
              left: ui.position.left,
              top: ui.position.top,
            })
            .removeClass("furniture-drag")
            .addClass(`dragged`)
            .attr("data-draggedindex", currentDraggedFurnitures.length)
        );
        setDraggedFurnitures((prev) => {
          prev[floorPlans[selectedIndexes.floorPlan]._id] = [
            ...currentDraggedFurnitures,
            $(ui.draggable)
              .clone()
              .css({
                position: "absolute",
                left: ui.position.left,
                top: ui.position.top,
              })
              .removeClass("furniture-drag")
              .addClass("dragged"),
          ];
          return prev;
        });

        // console.log('asd',ui.position)
        furnidrag();
      },
    });
    $(".dragged").draggable();
    $(".dragged").resizable({
      animate: true,
      autoHide: true,
      ghost: true,
      aspectRatio: true,
    });
    $(".dragged").blur(function () {
      console.log("Focusedout");
    });
  }

  // get single homebuilder object
  React.useEffect(() => {
    if (selectedValues.homebuilder !== "" && selectedValues.community !== "") {
      furnituresForHomebuilder();
    }
  }, [
    selectedValues.homebuilder,
    selectedValues.community,
    selectedValues.home,
    selectedValues.elevation,
    selectedFurnitures,
  ]);

  // React.useEffect(() => {
  //     if (Object.keys(draggedFurnitures).length > 0) {
  //         var d1 = $(`#frame-${floorPlans[selectedIndexes.floorPlan]['_id']} svg`);

  //         draggedFurnitures[floorPlans[selectedIndexes.floorPlan]['_id']].map((furniture) => {
  //             const newEl = <SvgImport url={furniture} />;
  //             d1.append(newEl);
  //         });
  //     }
  // }, [selectedIndexes.floorPlan, draggedFurnitures]);

  // get all communities of the homebuilder id if default community data not available
  React.useEffect(() => {
    getCommunities();
  }, [homebuilderId]);

  // get all homes of the community id if default home data not available
  React.useEffect(() => {
    getHomes();
  }, [selectedValues.community]);

  // get all elevations of the home id
  React.useEffect(() => {
    getElevations();
    getFloorPlans();
  }, [selectedValues.home]);

  // state to store and change floor options data
  const { furnitures } = useFurnitures(selectedFurnitures);

  furnidrag();

  // React.useEffect(() => {
  //     optionsload();
  // }, [selectedValues.floorPlan]);

  // Handling change of input values like dropdown
  const handleInputChange = (e) => {
    // console.log('data index: ', index);
    const { name, value } = e.target;
    // console.log('plural: ', pluralize(name));
    if (pluralize(name) === "communities") {
      const index = communities.map((item) => item._id).indexOf(e.target.value);
    }
    if (pluralize(name) === "homes") {
      const index = homes.map((item) => item._id).indexOf(e.target.value);
    }

    if (pluralize(name) === "elevations") {
      const index = elevations.map((item) => item._id).indexOf(e.target.value);
      setSelectedIndexes({ ...selectedIndexes, elevation: index });
    }
    if (pluralize(name) === "floorPlans") {
      const index = floorPlans.map((item) => item._id).indexOf(e.target.value);
      setSelectedIndexes({ ...selectedIndexes, floorPlan: index });
    }

    setSelectedValues(
      (prev) =>
        (prev = {
          ...selectedValues,
          [name]: value,
        })
    );
    setRefresh(!refresh);
  };

  const visibledisplay = (a, e, i) => {
    let newInactiveOptions = inactiveOptions[selectedIndexes.floorPlan];
    // console.log('option checked: ', e);

    if (e.target.checked) {
      setInactiveOptions((prev) => {
        // newInactiveOptions.push(a.inactives);
        // console.log(`option ${selectedIndexes.floorPlan} : `, newInactiveOptions);

        newInactiveOptions = newInactiveOptions.concat(a.inactives);
        newInactiveOptions.map((inactive) => {
          $("#" + inactive).css("visibility", "hidden");
          $("input#" + inactive).prop("checked", false);
          // $('input#' + inactive).removeAttr('checked');

          // $('.option-' + inactive).removeAttr('checked');
        });

        prev[selectedIndexes.floorPlan] = [...new Set(newInactiveOptions)];
        return prev;
      });
    } else {
      // setOptionsChecked((prev) => {
      //     prev[selectedIndexes.floorPlan][a.id] = false;

      //     return prev;
      // });
      setInactiveOptions((prev) => {
        // newInactiveOptions.push(a.inactives);
        // console.log(`option ${selectedIndexes.floorPlan} : `, newInactiveOptions);

        // let newNewInactiveOptions = inactiveOptions[selectedIndexes.floorPlan];
        let inactiveElements = a.inactives;
        // newNewInactiveOptions.every((newInactive) => {
        //     let elementExists = newNewInactiveOptions.indexOf(newInactive);
        //     if (elementExists > -1) {
        //         newNewInactiveOptions.splice(elementExists, 1);
        //     }
        // });
        let newNewInactiveOptions = newInactiveOptions.filter((inactive) => {
          if (inactiveElements.indexOf(inactive) > -1) {
            // $('#' + inactive).prop('checked', false);
            setOptionsChecked((prev) => {
              prev[selectedIndexes.floorPlan][inactive] = false;
              return prev;
            });
            return;
          } else {
            return inactive;
          }
        });
        newInactiveOptions = newNewInactiveOptions;

        prev[selectedIndexes.floorPlan] = [...new Set(newInactiveOptions)];
        return prev;
      });
    }
    setOptionsChecked((prev) => {
      prev[selectedIndexes.floorPlan][a.id] = e.target.checked;

      return prev;
    });

    // console.log('checked options: ', optionsChecked);
    // const checkedOptions = optionsChecked[selectedIndexes.floorPlan];
    // const arrCheckedOptions = Object.entries(checkedOptions);
    // arrCheckedOptions.map((option) => {
    //     if (checkedOptions[option[0]]) {
    //         $('#' + option[0]).css('visibility', 'visible');
    //     } else {
    //         $('#' + option[0]).css('visibility', 'hidden');
    //     }
    // });
    // console.log('checked options: ', checkedOptions);
    setRefresh(!refresh);
    // console.log('floor options: ', $(input[id='name']))

    // console.log('option index: ', e.target.data-svgId);

    // var val = a.id;
    // if ($('#' + val).css('visibility') == 'hidden') {
    //     $('#' + val).css('visibility', 'visible');
    // } else {
    //     $('#' + val).css('visibility', 'hidden');
    // }
    // console.log('options: ', optionsChecked);
    // const checkedOptions = optionsChecked[selectedIndexes.floorPlan];
    // console.log('visible options: ', checkedOptions);
    // checkedOptions.map((option) => {
    //     // const [key, val] = Object.entries(option);
    //     console.log('option: ', option);
    //     if (Object.values(option)[0]) {
    //         $('#' + Object.keys(option)[0]).css('visibility', 'visible');
    //     } else {
    //         $('#' + Object.keys(option)[0]).css('visibility', 'hidden');
    //     }
    // });
    // if (e.target.checked) {
    //     $('#' + e.target.id).css('visibility', 'visible');
    // } else {
    //     $('#' + e.target.id).css('visibility', 'hidden');
    // }

    // const newInactives = inactiveOptions[selectedIndexes.floorPlan];
    // const newOptions = floorPlans[selectedIndexes.floorPlan];
    // optionChecked.map((checked, checkedIndex) => {
    //     if (checked && !newInactives.includes(e.target.id)) {
    //         $('#' + e.target.id).css('visibility', 'visible');
    //     } else {
    //         $('#' + e.target.id).css('visibility', 'hidden');
    //     }
    // });
  };

  React.useEffect(() => {
    if (optionsChecked.length > 0) {
      const checkedOptions = optionsChecked[selectedIndexes.floorPlan];
      const arrCheckedOptions = Object.entries(checkedOptions);
      arrCheckedOptions.map((option) => {
        if (checkedOptions[option[0]]) {
          $("#" + option[0]).css("visibility", "visible");
        } else {
          $("#" + option[0]).css("visibility", "hidden");
        }
      });
      console.log("checked options: ", checkedOptions);
    }
  }, [selectedIndexes.floorPlan, optionsChecked, refresh]);

  // React.useEffect(() => {
  //     const newInactives = inactiveOptions[selectedIndexes.floorPlan];
  //     const newOptions = floorPlans[selectedIndexes.floorPlan];
  // }, [inactiveOptions, optionChecked]);

  const transform = () => {
    var textGroups = $(".frame svg").find("g[id^=Text]");
    var st = 458;
    var itemleft;
    var itemwith;
    if ($(".frame").hasClass("rotated")) {
      $(".frame").removeClass("rotated");
      $(".frame").css("transform", "rotateY(190deg)");
      $(".label").each(function () {
        $(this).attr(
          "transform",
          "translate(" + 0 + ", " + 0 + ") scale(" + 1 + "," + 1 + ")"
        );
      });
      textGroups.each(function (o, i) {
        $("#" + i.id).attr(
          "transform",
          "translate(" + 0 + ", " + 0 + ") scale(" + 1 + "," + 1 + ")"
        );
      });
      $(".dragged").each(function () {
        itemleft = $(this).offset().left - $(".frame").offset().left - 5;
        itemwith = $(this)[0].offsetWidth;
        // console.log('ele', itemleft, itemwith);
        $(this).css({ left: itemleft });
      });
      $(".frame, .elevation-img").css("transform", "rotateY(0deg)");
      $("svg").css("transform", "rotateY(0deg)");
      $(".dragged img").each(function () {
        $(this).css("transform", "rotateY(0deg)");
      });
    } else {
      textGroups.each(function (o, i) {
        var element = $("#" + i.id)[0].getBBox();
        var svgWidth = st;
        var translateX =
          (element.x - svgWidth / 2) * 2 + svgWidth + element.width;
        if (translateX !== 0) {
          translateX = Math.round(translateX * 100) / 100;
        }
        var translateY = 0;
        $("#" + i.id).attr(
          "transform",
          "translate(" +
            translateX +
            ", " +
            translateY +
            ") scale(" +
            -1 +
            "," +
            1 +
            ")"
        );
      });
      $(".frame, .elevation-img").css("transform", "rotateY(190deg)");
      $(".dragged").each(function () {
        itemleft = $(this).offset().left - $(".frame").offset().left + 6;
        itemwith = $(this)[0].offsetWidth;
        $(this).css({ left: itemleft });
      });
      $(".frame").css("transform", "rotateY(0deg)");
      $("svg").css("transform", "rotateY(190deg)");
      $(".dragged img").each(function () {
        $(this).css("transform", "rotateY(190deg)");
      });
      // $('.dragged').draggable('disable')
      $(".frame").addClass("rotated");
    }
  };

  const reset = () => {
    var textGroups = $(".frame svg").find("g[id^=Text]");
    $(".zoom").css("transform", `scale(1,1)`);
    $("svg").css("transform", "rotateY(0deg)");
    $(".zoom").css({ left: "", top: "" });
    textGroups.each(function (o, i) {
      var translateY = 0;
      $("#" + i.id).attr(
        "transform",
        "translate(" + 0 + ", " + 0 + ") scale(" + 1 + "," + 1 + ")"
      );
    });
    // let newOptionsChecked = optionsChecked[selectedIndexes.floorPlan];
    // newOptionsChecked.pop(selectedIndexes.floorPlan)
    setOptionsChecked((prev) => {
      prev[selectedIndexes.floorPlan] = [];
      return prev;
    });
    console.log("initial inactive options: ", initialInactiveOptions);
    setInactiveOptions((prev) => {
      prev[selectedIndexes.floorPlan] =
        floorPlans[selectedIndexes.floorPlan]["options"][0]["inactives"];
      return prev;
    });

    setRefresh(!refresh);

    $(".dragged").each(function () {
      $(this).remove();
    });

    var optionGroups = $(".frame svg").find("g[id^=Opt]");
    var optionstag = "";
    optionGroups.each(function (o, i) {
      if (optionsChecked[selectedIndexes.floorPlan][i.id]) {
        $("#" + i.id).css("visibility", "visible");
      } else {
        $("#" + i.id).css("visibility", "hidden");
      }
      if (i.id) {
        optionstag += i.id + ",";
      }
    });

    // setOptionsChecked(prev => {
    //     prev[selectedIndexes.floorPlan] = floorPlans[selectedIndexes.floorPlan]['options']
    // })
  };

  const Downloadpdf = () => {
    setopenLoader(true);
    $(".zoom-box, .furnidelete").css("visibility", "hidden");
    $(".zoom").css({ left: "", top: "" });
    var initialindex = selectedIndexes.floorPlan;
    let imgarr = [];
    $(".print-sec").css("display", "block");
    $("#loader").css("display", "block");

    if (openLoader) {
    }

    floorPlans.map((o, i) => {
      setSelectedIndexes({ ...selectedIndexes, floorPlan: i });
      console.log(`printing ${i}`);
      // HTML2 canvas
      // setTimeout(() => {
      //     html2canvas(document.querySelector(`#print-div-${i}`))
      //     .then((canvas) => {
      //          var floorPlan = canvas.toDataURL();

      //         setCanvasimg((prev) => [...prev, floorPlan]);
      //     })
      //     .catch((error) => console.log(`htmt2Canvas error:file ${i}` , error ));}, 500);
    });
    canvasimg && setOpenprint(true) && setRefresh(!refresh);

    $(".print-sec").css("display", "none");
    $(`.print-sec#print${initialindex}`).css("display", "block");
    setPrintLoader(false);
    setSelectedIndexes({ ...selectedIndexes, floorPlan: initialindex });
    $(".zoom-box, .furnidelete").css("visibility", "visible");
  };

  const print = (e) => {
    setPrintLoader(true);

    // const code = document.querySelector('#print-div');
    $(".zoom-box, .furnidelete").css("visibility", "hidden");
    $(".zoom").css({ left: "", top: "" });
    html2canvas(document.querySelector("#print-div"))
      .then((canvas) => {
        var floorPlan = canvas.toDataURL();
        let windowContent = `<!DOCTYPE html>
               <html>
                 <head>
                   <title>Print canvas</title>
                 </head>
                 <style>
                     .header{
                         border-bottom: 2px solid #000;
                     }
                     .text-center{
                         text-align: center;
                     }
                 </style>
                 <body>
                     <div class="header">
                     <img src="${
                       config.baseURL + selectedValues.homebuilder.brandImage
                     }" style="height:60px;" />
                     </div>
                     <div class="text-center">
                       <img src="${floorPlan}" />
                     </div>
                     <div class="options">
                       <h4>Options</h4>
                       ${floorPlans[selectedIndexes.floorPlan]["options"].map(
                         (o, i) => {
                           return o.label + "<br/>";
                         }
                       )}
                       
                       
                     </div>
                 </body>
               </html>
               
               `;

        // windowContent += `<html> <head><title>Print canvas</title></head><body><img src="${floorPlan}"></body></html>`;

        const printWin = window.open("", "", "width=" + 650 + ",height=" + 900);
        printWin.document.open();
        printWin.document.write(windowContent);

        printWin.document.addEventListener(
          "load",
          function () {
            printWin.focus();
            printWin.print();
            printWin.document.close(() => {
              alert("closed");
            });
            printWin.close(() => {
              alert("closed");
            });
            setPrintLoader(false);
          },
          true
        );
        $(".zoom-box, .furnidelete").css("visibility", "visible");
      })
      .catch((error) => console.log("htmt2Canvas error: ", error));
    // console.log('code',code)
  };
  const help = () => {
    introJs().start();
    // let chardin = new Chardin(document.querySelector('body'));
    // chardin.start();
  };
  const sliderchange = (e) => {
    let finalval = 1;
    if (e.target.value > 0) {
      let val = e.target.value / 10;
      finalval = "1." + val;
      if (val == 10) {
        finalval = 2;
      }
    }
    $(".zoom").css("transform", `scale(${finalval},${finalval})`);
  };

  const handleAccordianChange = (panel) => (event, isExpanded) => {
    setAccordianExpanded(isExpanded ? panel : false);
  };

  const getMouseCoordinates = (e) => {
    // Get the target
    const target = e.target;

    // Get the bounding rectangle of target
    const rect = target.getBoundingClientRect();

    // Mouse position
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // console.log('x: ', x);
    // console.log('y: ', y);
  };
  function valuetext(value) {
    return `${value} %`;
  }
  const tabContent = (index) => {
    return <h1>{index}</h1>;
  };
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  return error === null ? (
    <>
      {/* Widget main grid start */}
      {/* <Grid container spacing={2}>
               <Grid item>
                   <Typography variant="h5">{selectedValues.homebuilder.name}</Typography>
               </Grid>
           </Grid> */}
      {/* Main widget start */}
      {isLoading === false ? (
        <div>
          {selectedValues.home !== "" && (
            <Grid
              style={{
                display: "-webkit-inline-box",
              }}
              container
            >
              {/* Widget main grid right panel start */}
              <Grid item xs={9} className="framecol">
                <Grid
                  item
                  style={{
                    position: "relative",
                    zIndex: "999",
                    background: "#efefef",
                    borderBottom: "2px solid #dadada",
                  }}
                >
                  <Grid
                    container
                    data-title="Customise Bar"
                    data-intro="Helps to Customise the floorplan with reverse and print"
                  >
                    <Grid
                      item
                      xs={3}
                      style={{ textAlign: "center" }}
                      className="br"
                    >
                      <img
                        src={
                          config.baseURL + selectedValues.homebuilder.brandImage
                        }
                        style={{ height: "37px" }}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={2}
                      style={{ textAlign: "center" }}
                      className="br"
                    >
                      <FormControl
                        variant="standard"
                        size="small"
                        className="floor-select"
                      >
                        <Select
                          labelId="floorplan-select-label"
                          id="floorplan-select"
                          name="floorPlan"
                          value={selectedValues.floorPlan}
                          label="Floors"
                          onChange={handleInputChange}
                        >
                          {floorPlans.map((floorPlan) => {
                            return (
                              <MenuItem
                                key={floorPlan._id}
                                value={floorPlan._id}
                                id={floorPlan._id}
                              >
                                {floorPlan.name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={7}>
                      <Tooltip title="Reverse">
                        <span className="cust-icons" onClick={transform}>
                          <img
                            src={
                              config.baseURL +
                              "uploads/2022-03-04T05-57-54.665Z-flip_horizental.svg"
                            }
                          />
                        </span>
                      </Tooltip>
                      <Tooltip title="Reset">
                        <span className="cust-icons" onClick={reset}>
                          <img
                            src={
                              config.baseURL +
                              "uploads/2022-03-04T05-57-54.678Z-reset.svg"
                            }
                          />
                        </span>
                      </Tooltip>
                      {/* <Tooltip title="Print">
                                               <span className="cust-icons" onClick={(e) => print(e)}>
                                                   <img src={config.baseURL + 'uploads/2022-03-04T05-57-54.676Z-printing.svg'} />
                                               </span>
                                           </Tooltip> */}
                      <Tooltip title="Print">
                        <span
                          className="cust-icons"
                          onClick={() => Downloadpdf()}
                        >
                          <img
                            src={
                              config.baseURL +
                              "uploads/2022-03-04T05-57-54.676Z-printing.svg"
                            }
                          />
                        </span>
                      </Tooltip>
                      <Tooltip
                        title="Save"
                        onClick={() =>
                          $("#6218aead2f728945187adde2").trigger("click")
                        }
                      >
                        <span className="cust-icons">
                          <img
                            src={
                              config.baseURL +
                              "uploads/2022-03-04T05-57-54.680Z-save.svg"
                            }
                          />
                        </span>
                      </Tooltip>
                      <Tooltip title="Help">
                        <span className="cust-icons" onClick={help}>
                          <img
                            src={
                              config.baseURL +
                              "uploads/2022-03-04T05-57-54.673Z-help.svg"
                            }
                          />
                        </span>
                      </Tooltip>
                      {printLoader && (
                        <CircularProgress
                          sx={{
                            color: "inherit",
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            marginTop: "0",
                            marginLeft: "-12px",
                          }}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                {floorPlans.length > 0 && (
                  <>
                    <Box sx={{ width: "100%", typography: "body1" }}>
                      <TabContext value={selectedIndexes.floorPlan}>
                        {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                   <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                                                       {floorPlans.map((floor, floorIndex) => (
                                                           <Tab label={`Floor ${floorIndex}`} value={floorIndex} />
                                                       ))}
                                                   </TabList>
                                               </Box> */}
                        {floorPlans.map((floor, floorIndex) => (
                          <>
                            {/* <div value={floorIndex} id={`print${floorIndex}`} className="print-sec" style={{display: floorIndex == selectedIndexes.floorPlan ? 'block' : 'none'}}> */}
                            <TabPanel value={floorIndex}>
                              <Grid
                                item
                                style={{
                                  overflow: "hidden",
                                  textAlign: "center",
                                }}
                                data-position="right"
                                id={`print-div-${floorIndex}`}
                                data-title="Widget window"
                                data-intro="View customise widget"
                              >
                                <div
                                  className="zoom"
                                  style={{ width: "60%", margin: "20px auto" }}
                                >
                                  <div
                                    className="frame"
                                    id={`frame-${
                                      floorPlans[selectedIndexes.floorPlan][
                                        "_id"
                                      ]
                                    }`}
                                    style={{ position: "relative" }}
                                  >
                                    <SvgImport
                                      url={floorPlans[floorIndex]["imagePath"]}
                                      ids={floorPlans[floorIndex]["_id"]}
                                      setSVGarray={setSVGarray}
                                      index={floorIndex}
                                      optionsChecked={optionsChecked}
                                      draggedFurnitures={draggedFurnitures}
                                    />
                                  </div>
                                </div>
                                <span
                                  className="zoom-box"
                                  style={{
                                    background: "#fff",
                                    padding: "5px",
                                    display: "inline-block",
                                    borderRadius: "15px",
                                    boxShadow:
                                      "1px 3px 7px 0px rgb(0 0 0 / 19%)",
                                    marginBottom: "5px",
                                  }}
                                >
                                  <ZoomOut />
                                  <Slider
                                    style={{ width: "250px", margin: "0 20px" }}
                                    aria-label="Temperature"
                                    defaultValue={0}
                                    getAriaValueText={valuetext}
                                    valueLabelFormat={valuetext}
                                    valueLabelDisplay="auto"
                                    step={10}
                                    marks
                                    min={0}
                                    max={100}
                                    onChange={(e) => sliderchange(e)}
                                  />
                                  <ZoomIn />
                                </span>
                              </Grid>
                            </TabPanel>

                            {/* </div> */}
                          </>
                        ))}
                      </TabContext>
                    </Box>
                  </>
                )}
              </Grid>
              {/* Widget main grid right panel end */}
              {/* Widget main grid left panel start */}
              <Grid item xs={3} spacing={2}>
                {/* Elevation display with selection dropdown start */}
                {elevations.length > 0 && (
                  <Grid item>
                    <Paper
                      square
                      elevation={0}
                      sx={(theme) => ({
                        display: "flex",
                        alignItems: "center",
                        height: 43,
                        paddingLeft: theme.spacing(3),
                        backgroundColor: "#3b3b3b",
                        // backgroundColor: selectedValues.homebuilder.brandColor,
                        color: "#fff",
                      })}
                    >
                      <Typography>
                        {elevations[selectedIndexes.elevation].name}
                      </Typography>
                    </Paper>
                    <div
                      className="elevation-img"
                      data-title="Elevation"
                      data-intro="To view selected elevation"
                    >
                      <img
                        style={{ maxWidth: "100%" }}
                        src={
                          config.baseURL +
                          elevations[selectedIndexes.elevation].imagePath
                        }
                        alt={elevations[selectedIndexes.elevation].name}
                      />
                    </div>
                    <FormControl
                      fullWidth
                      size="small"
                      style={{ margin: "10px 0px" }}
                      data-title="Select Elevation"
                      data-intro="Change elevation"
                    >
                      <InputLabel id="elevation-select-label">
                        Elevations
                      </InputLabel>
                      <Select
                        labelId="elevation-select-label"
                        id="elevation-select"
                        name="elevation"
                        value={selectedValues.elevation}
                        label="Elevations"
                        onChange={handleInputChange}
                      >
                        {elevations.map((elevation) => {
                          return (
                            <MenuItem key={elevation._id} value={elevation._id}>
                              {elevation.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                )}

                {/* Elevation display with selection dropdown end */}
                {/* Floor options and furnitures tabpanel start */}
                {floorPlans.length > 0 && (
                  <Grid item>
                    <Accordion
                      key="options"
                      expanded={accordianExpanded === "options"}
                      onChange={handleAccordianChange("options")}
                      data-title="Options"
                      data-intro="Select the required option to make changes in floorplan"
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel2a-header"
                      >
                        <Typography>Options</Typography>
                      </AccordionSummary>
                      <AccordionDetails className="widget-accordian">
                        <div id="options-data">
                          {floorPlans[selectedIndexes.floorPlan]["options"]
                            ? floorPlans[selectedIndexes.floorPlan][
                                "options"
                              ].map((o, i) => {
                                var optname = o.label.toLowerCase();
                                if (o.id != "" && o.id !== "0") {
                                  return (
                                    <span className="option-list">
                                      <input
                                        type="checkbox"
                                        checked={
                                          optionsChecked.length > 0 &&
                                          optionsChecked[
                                            selectedIndexes.floorPlan
                                          ][o.id]
                                        }
                                        name="floorOption"
                                        id={`option-${o.id}`}
                                        data-svgid={o.id}
                                        className={`option-checkbox option-${o.id}`}
                                        value={o.id}
                                        disabled={
                                          inactiveOptions.length > 0 &&
                                          inactiveOptions[
                                            selectedIndexes.floorPlan
                                          ].length > 0 &&
                                          inactiveOptions[
                                            selectedIndexes.floorPlan
                                          ].indexOf(o.id) > -1
                                        }
                                        onClick={(e) => visibledisplay(o, e, i)}
                                      />

                                      <label for={o.id}>{optname}</label>
                                    </span>
                                    //   <FormControlLabel
                                    //       disabled={
                                    //           inactiveOptions.length > 0 &&
                                    //           inactiveOptions[selectedIndexes.floorPlan].length > 0 &&
                                    //           inactiveOptions[selectedIndexes.floorPlan].indexOf(o.id) >
                                    //               -1
                                    //       }
                                    //       control={
                                    //           <Checkbox
                                    //               id={o.id}
                                    //               data-index={i}
                                    //               checked={
                                    //                   optionChecked[i] &&
                                    //                   inactiveOptions.length > 0 &&
                                    //                   inactiveOptions[selectedIndexes.floorPlan]
                                    //                       .length > 0 &&
                                    //                   inactiveOptions[
                                    //                       selectedIndexes.floorPlan
                                    //                   ].indexOf(o.id) == -1
                                    //               }
                                    //               onChange={(e) => visibledisplay(o, i, e)}
                                    //               size="small"
                                    //               style={{ padding: '7px' }}
                                    //           />
                                    //       }
                                    //       label={optname}
                                    //   />
                                  );
                                }
                              })
                            : ""}
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                )}
                <Grid item>
                  <Accordion
                    key="furnitures"
                    expanded={accordianExpanded === "furnitures"}
                    onChange={handleAccordianChange("furnitures")}
                    data-title="Furniture Box"
                    data-intro="Select diffent furniture by drag and drop into widget"
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>Furnitures</Typography>
                    </AccordionSummary>
                    <AccordionDetails className="widget-accordian">
                      {Object.entries(furnitures).map(([key, value]) => (
                        <Accordion key={key}>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                          >
                            <Typography>{key}</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <List
                              sx={{
                                width: "100%",
                                maxWidth: 360,
                                bgcolor: "background.paper",
                              }}
                            >
                              {value.map((furniture, index) => (
                                <>
                                  <ListItem>
                                    <ListItemAvatar
                                      id={`furniture-image-${index}-${furniture._id}`}
                                    >
                                      <div
                                        id="gallery"
                                        className="furniture-drag"
                                        data-furnitureimage={
                                          furniture.imagePath
                                        }
                                        onDragStart={(e) => {
                                          var ImmagineDrag = null;
                                          var currentImageX = "";
                                          var currentImageY = "";
                                        }}
                                        onDragEnd={(e) => {}}
                                        // draggable="true"
                                      >
                                        <span>
                                          {/* <img
                                                                                       style={{ position: 'relative', zIndex: 2 }}
                                                                                       className="furniture-image"
                                                                                       id={`furniture-image-${index}-${furniture._id}`}
                                                                                       src={config.baseURL + furniture.imagePath}
                                                                                       alt={furniture.name}
                                                                                   /> */}
                                          <SvgImport
                                            url={furniture.imagePath}
                                            draggedFurnitures={
                                              draggedFurnitures
                                            }
                                          />
                                        </span>
                                      </div>
                                      {/* </Draggable> */}

                                      {/* </Avatar> */}
                                    </ListItemAvatar>
                                    <ListItemText
                                      primary={furniture.name}
                                      secondary={
                                        furniture.width + "x" + furniture.height
                                      }
                                    />
                                  </ListItem>
                                </>
                              ))}
                            </List>
                          </AccordionDetails>
                        </Accordion>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                </Grid>

                {/* Floor options and furnitures tabpanel end */}
              </Grid>
              {/* Modal Preview */}

              <Dialog
                fullScreen
                open={openprint}
                onClose={() => setOpenprint(false)}
              >
                <AppBar sx={{ position: "relative" }}>
                  <Toolbar>
                    <Button
                      autoFocus
                      color="inherit"
                      onClick={() => setOpenprint(false)}
                    >
                      Close
                    </Button>
                  </Toolbar>
                </AppBar>
                {optionsChecked.length > 0 &&
                  Object.keys(optionsChecked[selectedIndexes.floorPlan])
                    .length > 0 && (
                    <Printfloorplan
                      floorOptions={{
                        options: optionsChecked,
                        floorplan: floorPlans,
                      }}
                      setFloorOptions={setFloorOptions}
                      // rules={rules}
                      setSelectedValues={setSelectedValues}
                      canvasimg={canvasimg}
                      selectedvalue={selectedValues}
                      elevation={elevations}
                      setopenLoader={setopenLoader}
                      setSVGarray={setSVGarray}
                      optionsChecked={optionsChecked}
                      draggedFurnitures={draggedFurnitures}
                    />
                  )}

                {/* {console.log('asd',optionsChecked)} */}
              </Dialog>
              {/* Modal Preview */}
            </Grid>
          )}

          {/* Widget main grid end */}
        </div>
      ) : (
        <h4>Loading...</h4>
      )}
      {/* Main widget end */}
      {/* Widget main grid end */}
    </>
  ) : (
    <>
      <Typography>{error}</Typography>
    </>
  );
};

export default App;
