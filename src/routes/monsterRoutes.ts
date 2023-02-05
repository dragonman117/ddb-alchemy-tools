import express from "express";
import {UrlTools} from "../lib/urlTools";
import {getMonsterRequest} from "../models/monsterModels";
import {monsterTools, monsterParse} from "../lib/monsterTools";

const monsterRouter = express.Router();

monsterRouter.post('/id', async (req, res) => {
    const urlTools = new UrlTools();
    const rawReq = req.body as getMonsterRequest;
    urlTools.setAuthToken(rawReq.token);
    const fetchRes = await monsterTools(rawReq.id, urlTools);
    const converted = monsterParse(fetchRes);
    res.json(converted);
});

export default monsterRouter;
