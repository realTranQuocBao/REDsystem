// import express from "express";
import { RequestHandler } from "express";

/**
 * [C]reate
 */
const createBase: RequestHandler = (req, res, next) => {
    try {
        //
    } catch (error) {
        next(error);
    }
}

/**
 * [R]ead
 */
// Read (all items, excluding soft-deleted)
const getAllBase: RequestHandler = (req, res, next) => {
    try {
        //
    } catch (error) {
        next(error);
    }
}
// Read (single item, including soft - deleted)
const getByIdBase: RequestHandler = (req, res, next) => {
    try {
        //
    } catch (error) {
        next(error);
    }
}
// Read (all items soft-deleted)
const getAllDeletedBase: RequestHandler = (req, res, next) => {
    try {
        //
    } catch (error) {
        next(error);
    }
}

/**
 * [U]pdate
 */
const updateBase: RequestHandler = (req, res, next) => {
    try {
        //
    } catch (error) {
        next(error);
    }
}

/**
 * [D]elete
 */
// a
const softDeleteBase: RequestHandler = (req, res, next) => {
    try {
        //
    } catch (error) {
        next(error);
    }
}
const deleteBase: RequestHandler = (req, res, next) => {
    try {
        //
    } catch (error) {
        next(error);
    }
}


const BaseController = {
    createBase,
    getAllBase,
    getByIdBase,
    getAllDeletedBase,
    updateBase,
    softDeleteBase,
    deleteBase
}

export default BaseController; 