import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import DashboardTemplate from "../../../components/TemplateMembers/DashboardTemplate";
import List from "@mui/material/List";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import { apiPost } from "../../../utilities/ApiRequest";
import { setSnackbar } from "../../../features/snackbar/snackbarSlice";
import { setTodo } from "../../../features/todo/todoSlice";
import Typography from "@mui/material/Typography";
import { rand } from "../../../utilities/gen";

const Demo = styled("div")(({ theme }) => ({
   backgroundColor: theme.palette.background.paper,
}));

interface TodoType {
   id: number;
   title: string;
   details: string;
   createdAt: string;
   updatedAt: string;
   due: string;
}

export default function Todo(): JSX.Element {
   const dispatch = useAppDispatch();
   const todo: any = useAppSelector((state) => state.todo);
   const token: string = useAppSelector((state) => state.session.user.token);
   const [title, titleSet] = useState<string>(" ");
   const [details, detailsSet] = useState<string>(" ");
   const [due, dueSet] = useState<string>(" ");

   const delTodo = (id: number): void => {
      if (window.confirm("Are you sure?") === true) {
         const tmp: [] = todo.arr.filter((t: { id: number }) => t.id !== id);

         dispatch(setTodo({ ...todo, arr: tmp }));
         dispatch(
            setSnackbar({
               msg: `Removing todo...`,
               severity: "info",
            })
         );
         apiPost("/sv-todo/del_entry", { token, id });
      }
   };

   const addTodo = async () => {
      dispatch(
         setSnackbar({
            msg: `Uploading new Todo`,
            severity: "info",
         })
      );
      //title, details, due
      /*const resp = await apiPost("/sv-todo/add_entry", {
         token,
         title,
         details,
         due,
      });*/
      let tmp = todo.arr;
      tmp = [...tmp, { id: rand(), title, details, due }];

      dispatch(setTodo({ ...todo, arr: tmp }));
      titleSet(" ");
      detailsSet(" ");
      dueSet(" ");
   };

   return (
      <>
         <b>Project Tasks</b>
         <div style={{ padding: 5 }} />
         <TextField
            size='small'
            label='title'
            value={title}
            fullWidth
            onChange={(e) => titleSet(e.target.value)}
         />{" "}
         <div style={{ padding: 5 }} />
         <TextField
            size='small'
            label='details'
            value={details}
            fullWidth
            onChange={(e) => detailsSet(e.target.value)}
         />{" "}
         <div style={{ padding: 5 }} />
         <TextField
            size='small'
            label='due'
            value={due}
            fullWidth
            onChange={(e) => dueSet(e.target.value)}
         />
         <div style={{ padding: 2 }} />
         <Button variant='contained' fullWidth onClick={() => addTodo()}>
            Add Todo
         </Button>
         <div style={{ padding: 5 }} />
         <Demo>
            <List dense={true}>
               {!todo || !todo.arr
                  ? null
                  : todo.arr.map((t: TodoType) => (
                       <ListItem
                          style={{ border: "1px solid:#ddd" }}
                          key={"i-" + t.id}
                          secondaryAction={
                             <IconButton
                                edge='end'
                                aria-label='delete'
                                onClick={() => delTodo(t.id)}
                             >
                                <DeleteIcon />
                             </IconButton>
                          }
                       >
                          <ListItemText
                             primary={t.title}
                             secondary={
                                <React.Fragment>
                                   <Typography
                                      sx={{ display: "inline" }}
                                      component='span'
                                      variant='body2'
                                      color='text.primary'
                                   >
                                      {t.details}
                                   </Typography>
                                   <br />
                                   DUE: {t.due}
                                </React.Fragment>
                             }
                          />
                       </ListItem>
                    ))}
            </List>
         </Demo>
      </>
   );
}
