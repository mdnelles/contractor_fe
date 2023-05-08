import { apiPost } from "./ApiRequest";

export const sqlPrep = ({ s }: { s: any }): string => {
   s = s.replace(/'/gi, "`");
   s = s.replace(/"/gi, '\\"');
   s = s.replace(/</g, "&lt;"); //for <
   s = s.replace(/>/g, "&gt;"); //for >

   return s;
};

export const rand = (): string => {
   const length = 20;
   let s = "";
   for (let i = 0; i < 20; i++) {
      s +=
         "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".charAt(
            (Math.random() * 62) | 0
         );
   }
   return s;
};

export const msg = (msg: string | any, severity: string) => {
   return {
      msg,
      severity,
   };
};
export const dia = (
   open: boolean,
   title: string,
   content: string,
   params: any
) => {
   return {
      open,
      title,
      content,
      params,
   };
};

export const fetcher = async (
   obj: any,
   setFunction: any,
   postUrl: string,
   token: any,
   dis: any
) => {
   if (!obj.init) {
      const res = await apiPost(postUrl, { token });
      if (!res.data.err && !obj.init) {
         dis(setFunction({ arr: res.data.data, init: true }));
      }
   }
};

export const buildData = (labels: string[], datas: number[]) => {
   return {
      labels,
      datasets: [
         {
            label: "# of Votes",
            data: datas,
            backgroundColor: [
               "rgba(255, 99, 132, 0.2)",
               "rgba(54, 162, 235, 0.2)",
               "rgba(255, 206, 86, 0.2)",
               "rgba(75, 192, 192, 0.2)",
               "rgba(153, 102, 255, 0.2)",
               "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
               "rgba(255, 99, 132, 1)",
               "rgba(54, 162, 235, 1)",
               "rgba(255, 206, 86, 1)",
               "rgba(75, 192, 192, 1)",
               "rgba(153, 102, 255, 1)",
               "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
         },
      ],
   };
};

export const txtValid = (txt: string | any) => {
   try {
      return txt.toString().length > 1 ? true : false;
   } catch {
      return false;
   }
};

interface NestedObject {
   [key: string]: any | NestedObject | NestedObject[];
}

export function findDataArray(obj: NestedObject): any[] | null {
   // Iterate over each element in the object until you find an array named "data" and return it
   for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
         const element = obj[key];
         if (Array.isArray(element) && key === "arr") {
            return element;
         } else if (typeof element === "object" && element !== null) {
            const dataArr = findDataArray(element);
            if (dataArr) {
               return dataArr;
            }
         }
      }
   }

   // If "data" array was not found, return null
   return null;
}

export function epochToDate(epoch: any) {
   const date = new Date(epoch);
   const year = date.getFullYear();
   const month = String(date.getMonth() + 1).padStart(2, "0");
   const day = String(date.getDate()).padStart(2, "0");
   return `${year}/${month}/${day}`;
}
