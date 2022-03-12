import { styled } from "@mui/system";
import SplitPane from "react-split-pane";

const SplitStyled = styled(SplitPane)({
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
  "& .Resizer.vertical": {
    width: "5px",

    margin: "0 -2px",
    cursor: "col-resize",
    borderRight: "2px solid rgba(255, 255, 255, 0)",
    borderLeft: "2px solid rgba(255, 255, 255, 0)",
  },
});
export default SplitStyled;
