import React from "react";
export function captureFP() {
  alert("Hello");
  CallSGIFPGetData(SuccessFunc, ErrorFunc);
}
var fpobject;
function SuccessFunc(result) {
  if (result.ErrorCode === 0) {
    if (result != null && result.BMPBase64.length > 0) {
      document.getElementById("FPImage1").src =
        "data:image/bmp;base64," + result.BMPBase64;
    }
    var tbl = "<table border=1>";
    tbl += "<tr>";
    tbl += "<td> Serial Number of device </td>";
    tbl += "<td> <b>" + result.SerialNumber + "</b> </td>";
    tbl += "</tr>";
    tbl += "<tr>";
    tbl += "<td> Image Height</td>";
    tbl += "<td> <b>" + result.ImageHeight + "</b> </td>";
    tbl += "</tr>";
    tbl += "<tr>";
    tbl += "<td> Image Width</td>";
    tbl += "<td> <b>" + result.ImageWidth + "</b> </td>";
    tbl += "</tr>";
    tbl += "<tr>";
    tbl += "<td> Image Resolution</td>";
    tbl += "<td> <b>" + result.ImageDPI + "</b> </td>";
    tbl += "</tr>";
    tbl += "<tr>";
    tbl += "<td> Image Quality (1-100)</td>";
    tbl += "<td> <b>" + result.ImageQuality + "</b> </td>";
    tbl += "</tr>";
    tbl += "<tr>";
    tbl += "<td> NFIQ (1-5)</td>";
    tbl += "<td> <b>" + result.NFIQ + "</b> </td>";
    tbl += "</tr>";
    tbl += "<tr>";
    tbl += "<td> Template(base64)</td>";
    tbl +=
      "<td> <b> <textarea rows=8 cols=50 name=figcode onChange={this.handleInputChange}>" +
      result.TemplateBase64 +
      "</textarea></b> </td>";
    tbl += "</tr>";
    tbl += "<tr>";
    tbl += "<td> Image WSQ Size</td>";
    tbl += "<td> <b>" + result.WSQImageSize + "</b> </td>";
    tbl += "</tr>";
    tbl += "<tr>";
    tbl += "<td> EncodeWSQ(base64)</td>";
    tbl +=
      "<td> <b> <textarea rows=8 cols=50>" +
      result.WSQImage +
      "</textarea></b> </td>";
    tbl += "</tr>";
    tbl += "</table>";
    document.getElementById("result").innerHTML = tbl;
  } else {
    alert(
      "Fingerprint Capture Error Code:  " +
        result.ErrorCode +
        ".\nDescription:  " +
        ErrorCodeToString(result.ErrorCode) +
        "."
    );
  }
}

function ErrorFunc(status) {
  alert("Check if SGIBIOSRV is running; Status = " + status + ":");
}

function CallSGIFPGetData(successCall, failCall) {
  // 8.16.2017 - At this time, only SSL client will be supported.
  const uri = "https://localhost:8443/SGIFPCapture";

  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      fpobject = JSON.parse(xmlhttp.responseText);
      successCall(fpobject);
    } else if (xmlhttp.status === 404) {
      failCall(xmlhttp.status);
    }
  };
  var params = "Timeout=" + "10000";
  params += "&Quality=" + "50";
  params += "&licstr=" + encodeURIComponent(secugen_lic);
  params += "&templateFormat=" + "ISO";
  params += "&imageWSQRate=" + "0.75";
  xmlhttp.open("POST", uri, true);
  xmlhttp.send(params);

  xmlhttp.onerror = function() {
    failCall(xmlhttp.statusText);
  };
}

// nice global area, so that only 1 location, contains this information
// const secugen_lic = "hE/78I5oOUJnm5fa5zDDRrEJb5tdqU71AVe+/Jc2RK0=";   // webapi.secugen.com
const secugen_lic = "";

function ErrorCodeToString(ErrorCode) {
  var Description;
  switch (ErrorCode) {
    // 0 - 999 - Comes from SgFplib.h
    // 1,000 - 9,999 - SGIBioSrv errors
    // 10,000 - 99,999 license errors
    case 51:
      Description = "System file load failure";
      break;
    case 52:
      Description = "Sensor chip initialization failed";
      break;
    case 53:
      Description = "Device not found";
      break;
    case 54:
      Description = "Fingerprint image capture timeout";
      break;
    case 55:
      Description = "No device available";
      break;
    case 56:
      Description = "Driver load failed";
      break;
    case 57:
      Description = "Wrong Image";
      break;
    case 58:
      Description = "Lack of bandwidth";
      break;
    case 59:
      Description = "Device Busy";
      break;
    case 60:
      Description = "Cannot get serial number of the device";
      break;
    case 61:
      Description = "Unsupported device";
      break;
    case 63:
      Description = "SgiBioSrv didn't start; Try image capture again";
      break;
    default:
      Description =
        "Unknown error code or Update code to reflect latest result";
      break;
  }
  return Description;
}
