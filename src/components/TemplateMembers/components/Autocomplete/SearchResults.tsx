import Button from "@mui/material/Button";
import { useState } from "react";
import { useAppSelector } from "../../../../app/hooks";
import { rand } from "../../../../utilities/gen";
import { SearchEdit } from "../dialogs/SearchEdit";

interface TitleType {
   id: number;
   title: string;
   date1: string;
   code: string;
}

interface SearchResultsProp {
   suggest: any;
}

const entryWrapper = {
   width: "100%",
   marginTop: 10,
   border: "1px solid #bbb",
   borderRadius: 3,
   color: "#333",
   background:
      "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(227,227,227,1) 100%)",
   overlow: "hidden",
};

const entryTitle = {
   width: "100%",
   padding: 10,
   backgroundColor: "#bbb",
   cursor: "pointer",
};

const entryBody = {
   width: "100%",
   padding: 10,
   display: "none",
};

const tog = (id: number) => {
   const e = document.getElementById("b-" + id);
   if (!!e) {
      e.style.display = e.style.display === "none" ? "block" : "none";
   }
};

export const SearchResults = (props: SearchResultsProp): any => {
   const { suggest = [] } = props;

   const [open, openSet] = useState(false);
   const [idEdit, idEditSet] = useState<number>(0);
   const [selectedValue, setSelectedValue] = useState("");

   const Display = (obj: TitleType | any) => {
      const { name, body, code } = obj.entry;
      return (
         <div key={"i-" + code}>
            <div style={entryWrapper}>
               <div style={entryTitle} onClick={() => tog(code)}>
                  {name}
               </div>
               <div style={entryBody} id={"b-" + code}>
                  <pre>{body}</pre>
                  <Button
                     onClick={() => {
                        idEditSet(code);
                        openSet(true);
                     }}
                  >
                     Edit
                  </Button>
               </div>
            </div>
         </div>
      );
   };

   const handleClickOpen = () => {
      openSet(true);
   };

   const handleClose = (value: string) => {
      openSet(false);
      setSelectedValue(value);
   };

   return (
      <>
         <b>Search Results</b>
         {!suggest || !suggest.arr
            ? null
            : suggest.arr.map((t: any) => (
                 <Display entry={t} key={"kk-" + rand()} />
              ))}
         {idEdit === 0 ? null : (
            <SearchEdit
               selectedValue={selectedValue}
               open={open}
               onClose={handleClose}
               id={idEdit}
               key={rand()}
            />
         )}
      </>
   );
};
