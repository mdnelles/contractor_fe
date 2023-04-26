import React from "react";

export default function (props: {
  children: any;
  padding?: number;
}): JSX.Element {
  const { children, padding = 10 } = props;

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        color: "#fff",
        fontSize: 15,
        padding,
      }}
    >
      {children}
    </div>
  );
}
