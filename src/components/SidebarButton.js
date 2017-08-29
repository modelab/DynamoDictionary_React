import React from "react";

import NodeIcon from "./NodeIcon";
import { lineageToRoute } from "../util/lineageRouter";

function SidebarButton(props) {
  return (
    <button
      onClick={() =>
        props.routePush(`/${lineageToRoute(props.ob)}`, props.iteration)}
      className={props.classes}
      style={{
        paddingLeft: "20px",
        paddingRight: "20px",
        whiteSpace: "nowrap"
      }}
    >
      {!props.ob.Arr ? <NodeIcon node={props.ob} width="20px" /> : null}
      {props.ob.Name}
    </button>
  );
}
export default SidebarButton;
