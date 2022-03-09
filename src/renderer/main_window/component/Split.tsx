import { styled } from "@mui/system";
import Split from "react-split";

const SplitStyled = styled(Split)({
  display: "flex",
  height: "100%",
  width: "100%",
  "& .gutter": {
    backgroundColor: "#1f1f1f1f",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "50%",
  },
  "& .gutter.gutter-horizontal": {
    backgroundImage:
      "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==');",
  },
});
export default SplitStyled;
