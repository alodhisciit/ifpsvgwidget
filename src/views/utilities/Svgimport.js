import React from "react";
import SVG from "react-inlinesvg";
import config from "./../../config.js";
import $ from "jquery";

//===============================|| UI COLOR ||===============================//

const SvgImport = ({
  style,
  url,
  ids = undefined,
  setSVGarray,
  index,
  optionsChecked,
  draggedFurnitures,
}) => {
  // var textGroups = $('.frame svg').find('g[id^=Text]');
  // var optionGroups = $('.frame svg').find('g[id^=Opt]');

  const optionsload = () => {
    var textGroups = $(".frame svg").find("g[id^=Text]");
    // console.log('text groups: ', textGroups);
    var optionGroups = $(".frame svg").find("g[id^=Opt]");
    var optionstag = "";
    optionGroups.each(function (o, i) {
      if (optionsChecked[index][i.id]) {
        $("#" + i.id).css("visibility", "visible");
      } else {
        $("#" + i.id).css("visibility", "hidden");
      }
      if (i.id) {
        optionstag += i.id + ",";
      }
    });

    // $('.frame svg').append();
    // const arr = optionstag.split(',');
    // console.log('hidden options: ', arr);
    // setoptionsarray(arr);

    // optionGroups.each(function(o,i){
    // 	$('#' + i.id).css('opacity','0');
    // 	if(i.id){
    // 		optionstag += `<p><input
    // 		type="checkbox"
    // 		class="form-check-input optionlist"
    // 		onClick={visibledisplay(${i.id})}
    // 	  />
    // 	  <label class="form-check-label"
    // 		>${i.id.split('_')[1]}</label
    // 	  ></p>`
    // 	}
    // })
    // $('#options-data').append(`<p>${optionstag}<p>`)
  };
  return (
    <>
      <SVG
        style={{ width: "100%", height: "100%" }}
        className="imported-svg"
        src={`${config.baseURL}${url}`}
        cacheRequests={true}
        loader={<span>Loading...</span>}
        // preProcessor={(code) => {
        //     // console.log('svg code: ', code);
        //     // var svgids = document.getElementsByTagName('svg');
        //     // console.log('svg ids: ', svgids);
        //     code.replace(/fill=".*?"/g, 'fill="red"');
        // }}
        onLoad={(src, hasCache) => {
          console.log("svg loaded: ", ids);
          if (ids !== undefined) {
            // const s = Snap(`# ${document.querySelector('svg.imported-svg').id}`);
            // var bigSquare = s.rect(100, 100, 100, 100);
            const importedSvg = document.querySelector("svg.imported-svg");
            // console.log('id: ', ids);
            // console.log('svg classes: ', document.getElementsByClassName('imported-svg'));
            document.getElementsByClassName("imported-svg")[index].id = ids;
            setSVGarray((prev) => {
              prev[index] = ids;
              return prev;
            });
            optionsload();
            // var s = Snap(`.imported-svg`);
            // console.log('snapped svg: ', s);
            // var myTexture = s.circle(150, 150, 100);

            // myTexture.attr({
            //     fill: '#4682B4',
            //     stroke: '#000',
            //     strokeWidth: 2
            // });
            // myTexture.drag();
            // console.log('imported svg element: ', importedSvg);
          }
        }}
        // uniqueHash="a1f8d1"
        // uniquifyIDs={true}
      />
    </>
  );
};

export default SvgImport;
