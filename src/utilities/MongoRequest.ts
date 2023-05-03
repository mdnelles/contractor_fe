import { API_URL } from "../constants/api";
import {  apiPost } from "./ApiRequest";

const addDoc = async (collection: any, doc: any, token: string) => {
    try {
        return await apiPost(API_URL + "/doc_add", { collection, doc },token);
    } catch(error) {
        console.error(error);
        return [];
    }
};

const getDocs = async (collection: any, token: string ) => {
    try {
        return await apiPost(API_URL + "/doc_get_all", { collection },token);
    } catch(error) {
        console.error(error);
        return [];
    }
}

// get document by matching attribute with valye
const getDoc = async (collection: any, attribute: any, value: any, token: string) => {
    try {
        return await apiPost(API_URL + "/doc_get", { collection, attribute, value },token);
    } catch(error) {
        console.error(error);
        return [];
    }
}

const updateDoc = async (collection: any, id: any, data: any, token: string) => {
    try {
        return await apiPost(API_URL + "/doc_update", { collection, id, data },token);
    } catch(error) {
        console.error(error);
        return [];
    }
}

const deleteDoc = async (collection: any, id: any, token: string) => {
    try {
        return await apiPost(API_URL + "/doc_delete", { collection, id },token);
    } catch(error) {
        console.error(error);
        return [];
    }
}

export {
    addDoc,
    getDocs,
    getDoc,
    updateDoc,
    deleteDoc,
};