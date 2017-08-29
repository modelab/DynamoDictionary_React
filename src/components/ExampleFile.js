import React from "react";
import { IMAGE_FALSE_AVP_TRUE } from "../constants";
import DownloadButton from "./DownloadButton";
import EditButtonFiles from "./EditButton_Files";
import ExampleImage from "./ExampleImage";
import loadAVP from "../util/avp";

export default class ExampleFile extends React.Component {
  componentDidMount() {
    if (IMAGE_FALSE_AVP_TRUE) {
      loadAVP();
    }
  }
  render() {
    const props = this.props;
    let node = props.node;
    let index = props.index;
    let dynName =
      typeof node.dynFile[index] === "object"
        ? node.dynFile[index].original
        : node.dynFile[index];
    let dyn = props.dynPaths[index];
    return (
      <div
        className="exSample"
        style={{
          display: "inline-block",
          width: "100%"
        }}
      >
        <div className="exIcons">
          <text
            style={{
              opacity: "0.45",
              paddingRight: "20px"
            }}
          >
            {dynName}
          </text>
          <EditButtonFiles
            node={node}
            turnOnModal={props.turnOnModal}
            index={index}
          />
          <DownloadButton node={node} dynPath={dyn} />
        </div>
        {IMAGE_FALSE_AVP_TRUE
          ? <div>
              <div
                id="component1"
                style={{
                  width: "100%",
                  height: "50vh",
                  top: "0px,",
                  position: "relative",
                  clear: "both"
                }}
              />
              <div
                id="component2"
                style={{
                  height: "50vh",
                  top: "0px,",
                  width: "100%",
                  position: "relative"
                }}
              />
            </div>
          : <ExampleImage
              imageSrc={props.imgPaths[index]}
              index={index}
              handleClick={props.openLightbox}
            />}
      </div>
    );
  }
}
