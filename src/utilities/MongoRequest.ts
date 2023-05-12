import { API_URL } from "../constants/api";
import { apiPost } from "./ApiRequest";

const addDoc = async (collection: any, doc: any, token: string) => {
   try {
      return await apiPost(API_URL + "/doc_add", { collection, doc }, token);
   } catch (error) {
      console.error(error);
      return [];
   }
};

const getDocs = async (collection: any, token: string) => {
   try {
      return await apiPost(API_URL + "/doc_get_all", { collection }, token);
   } catch (error) {
      console.error(error);
      return [];
   }
};
const getDocsByObj = async (collection: any, obj: any, token: string) => {
   try {
      return await apiPost(
         API_URL + "/doc_get_by_obj_match",
         { collection, obj },
         token
      );
   } catch (error) {
      console.error(error);
      return [];
   }
};

// get document by matching attribute with valye
const getDocByAttribute = async (
   collection: any,
   attribute: any,
   value: any,
   token: string
) => {
   try {
      return await apiPost(
         API_URL + "/doc_get_by_attribute",
         { collection, attribute, value },
         token
      );
      //return await apiPost(API_URL + "/doc_add", { collection, doc }, token);
   } catch (error) {
      console.error(error);
      return [];
   }
};

const updateDoc = async (
   collection: any,
   _id: any,
   data: any,
   token: string
) => {
   try {
      return await apiPost(
         API_URL + "/doc_edit",
         { collection, _id, data },
         token
      );
   } catch (error) {
      console.error(error);
      return [];
   }
};

// example changeObj = {name: "John", address: "Highway 71"}
const updateDocById = async (
   collection: any,
   id: any,
   changeObj: any,
   token: string
) => {
   try {
      return await apiPost(
         API_URL + "/doc_edit_by_id",
         { collection, id, changeObj },
         token
      );
   } catch (error) {
      console.error(error);
      return [];
   }
};

const deleteDoc = async (collection: any, id: any, token: string) => {
   try {
      return await apiPost(API_URL + "/doc_delete", { collection, id }, token);
   } catch (error) {
      console.error(error);
      return [];
   }
};

export {
   addDoc,
   getDocs,
   getDocsByObj,
   getDocByAttribute,
   updateDoc,
   updateDocById,
   deleteDoc,
};
