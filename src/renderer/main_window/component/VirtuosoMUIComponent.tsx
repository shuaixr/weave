import { List, ListItem } from "@mui/material";
import React from "react";
import { ListProps, ItemProps } from "react-virtuoso";
export const VirtuosoMUIComponents = {
  List: React.forwardRef<HTMLDivElement, ListProps>(function VList(
    // eslint-disable-next-line react/prop-types
    { style, children },
    listRef
  ) {
    return (
      <List style={style} component="div" ref={listRef}>
        {children}
      </List>
    );
  }),

  Item: ({ ...props }: ItemProps) => {
    return (
      <ListItem
        component="div"
        sx={{
          "& + &": {
            borderTop: "1px solid #0000001f",
          },
        }}
        {...props}
        style={{ padding: 0 }}
      />
    );
  },
};
