import { useState } from "react";
import { useAppSelector } from "../../../../app/hooks";
import { AutoComplete } from "./AutoComplete";

interface TitleType {
   id: number | never;
   title: string;
   date: string;
   code: string;
}

interface OptionsType {
   name: string;
   code: number | never;
   body: string;
}

export const SearchBox = (): any => {
   const [options, optionsSet] = useState<OptionsType[] | []>([
      { name: "1", code: 1, body: "1" },
   ]);
   let tmp: OptionsType[] = [];

   //titles.map((t) => {
   //   const { id, title, code } = t;
   //   tmp.push({ name: title, code: id, body: code });
   //});

   try {
      if (tmp.length !== options.length) optionsSet(tmp);
   } catch (error) {
      console.log(error);
   }
   return (
      <>
         <AutoComplete
            inputStyle={{ backgroundColor: "#eee" }}
            optionsStyle={{ backgroundColor: "#ddd" }}
            data={options}
            iconColor='#555'
         />
      </>
   );
};
