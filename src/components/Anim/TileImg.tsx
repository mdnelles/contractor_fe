import React from "react";

export default function (props: { img: any; txt: string }): JSX.Element {
  const { img, txt } = props;

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        color: "#fff !important",
        backgroundImage: `url(${img})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        padding: 20,
        opacity: 0.85,
      }}
    >
      {txt}
    </div>
  );
}
