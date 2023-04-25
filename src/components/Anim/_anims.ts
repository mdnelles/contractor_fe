export const noAnim = {
   border: "",
   degreesHi: 0,
   degreesLow: 0,
   delay: 0,
   direction: "normal",
   duration: 0,
   fillMode: "forward",
   iterationCount: "infinite",
   name: "",
   timing: "ease-in-out",
};
export const testAnim = {
   border: "",
   degreesHi: -45, // degrees if spin
   degreesLow: 45, // degrees if spin
   delay: 0,
   direction: "normal", //normal altenating reverse
   duration: 8,
   fillMode: "forward", // node forward backward both
   iterationCount: "infinite",
   name: "Y360",
   timing: "linear", // linear ease ease-in-out
};

// horizontal / verticle spin 90 degree increments
export const hor90 = ["fwdy09", "fwdy918", "fwdy1827", "fwdy2736"];
export const ver90 = ["fwdx09", "fwdx918", "fwdx1827", "fwdx2736"];

export const hor180 = ["fwdy018", "fwdy1836"];
export const ver180 = ["fwdx018", "fwdx1836"];

export const animBuild = (
   name?: string,
   duration?: number,
   delay?: number,
   direction?: string,
   fillMode?: string,
   iterationCount?: string | number | undefined,
   timing?: string,
   degreesHi?: number,
   degreesLow?: number,
   border?: string
) => {
   const ret = {
      border: border || "",
      degreesHi: degreesHi || 0,
      degreesLow: degreesLow || 0,
      delay: delay || 0,
      direction: direction || "normal",
      duration: duration || 1,
      fillMode: fillMode || "forwards",
      iterationCount: iterationCount || 1,
      name: name || "noAnim",
      timing: timing || "ease-in",
   };
   return ret;
};
