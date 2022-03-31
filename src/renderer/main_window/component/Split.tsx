import { styled } from "@mui/system";
import React from "react";
import SplitPane, { SplitPaneProps } from "react-split-pane";
function OverridesStyleSplit(props: SplitPaneProps) {
  return <SplitPane {...props} style={{ position: "relative" }} />;
}

const Split = styled(OverridesStyleSplit)({
  "& .Resizer": {
    backgroundColor: "#000",

    backgroundClip: "padding-box",
    opacity: ".2",
    boxSizing: "border-box",
    zIndex: 1,
  },
  "& .Pane": {
    display: "flex",
  },
  " & .Resizer.horizontal": {
    height: "6px",
    margin: "0 -2px",
    cursor: "row-resize",
    borderTop: "2px solid rgba(255, 255, 255, 0)",
    borderBottom: "2px solid rgba(255, 255, 255, 0)",
  },
  "& .Resizer.vertical": {
    width: "6px",
    margin: "0 -2px",
    cursor: "col-resize",
    borderRight: "2px solid rgba(255, 255, 255, 0)",
    borderLeft: "2px solid rgba(255, 255, 255, 0)",
  },
});
export default Split;
