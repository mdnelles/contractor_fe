import Obj from "anim-3d-obj/dist/cjs/components/Obj";
import { useState } from "react";

interface SwingProps {
  width?: number;
  height?: number;
  depth?: number;
  perspectiveOrigin?: string;
  css?: string;
  duration?: number;
  iterationCount?: number | string;
  delay?: number;
  body?: any;
  color?: string;
  background?: string;
  border?: string;
}

export default (props: SwingProps): JSX.Element => {
  const {
    width = 300,
    height = 50,
    depth = 1,
    perspectiveOrigin = "50% 50%",
    css = `
        border: ${props.border};
        background:${props.background};
        color:${props.color || "black"};
        text-align:center;
        line-height:1.3;
        font-weight:800;
        font-size:50px;
        letter-spacing: -2px;
        white-space: nowrap;
        backface-visibility: visible;
        font-family: Arial, Helvetica, sans-serif;`,
    duration = 5,
    iterationCount = 1,
    delay = 0,
    body = "TEXT",
  } = props;

  const faceprops = { front: true };

  const [visible, setVisible] = useState(delay === 0 ? true : false);

  if (!visible) {
    setTimeout(() => {
      setVisible(true);
    }, (delay / 2) * 990 + 1000);
  }

  const global = {};
  const anim1 = {
    duration,
    iterationCount,
    fillMode: "forwards",
    name: "swingDecay",
    timing: "ease-in-out",
  };
  const anim2 = {};

  const custom: object = { front: { css, body } };

  return (
    <div>
      {!visible ? (
        <></>
      ) : (
        <Obj
          width={width}
          height={height}
          depth={depth}
          perspectiveOrigin={perspectiveOrigin}
          zIndex={10}
          anim1={anim1}
          anim2={anim2}
          custom={custom}
          faces={faceprops}
          global={global}
        />
      )}

      <div style={{ padding: 5 }} />
    </div>
  );
};
