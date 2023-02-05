import express from "express";
import {GetTokenRequest} from "../models/authModels";
import {UrlTools} from "../lib/urlTools";
import {authTools} from "../lib/authTools";

const authRouter = express.Router();

authRouter.post('/token', async (req, res) => {
    const reqBody = req.body as GetTokenRequest;
    const urlTools = new UrlTools();
    urlTools.setCobaltToken(reqBody.cobalt);
    const response = await authTools(urlTools);
    console.log(await response);
    res.json(response);
});

export default authRouter;