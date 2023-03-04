import express from "express";
import {UrlTools} from "../lib/urlTools";
import {getMonsterRequest, getMonsterSearch, MonsterPage} from "../models/monsterModels";
import {monsterTools, monsterParse, searchMonsters} from "../lib/monsterTools";

const monsterRouter = express.Router();

monsterRouter.post('/id', async (req, res) => {
    const urlTools = new UrlTools();
    const rawReq = req.body as getMonsterRequest;
    urlTools.setAuthToken(rawReq.token);
    const fetchRes = await monsterTools(rawReq.id, urlTools);
    const converted = monsterParse(fetchRes);
    res.json(converted);
});

monsterRouter.post('/search', async (req, res) => {
    const urlTools = new UrlTools();
    const rawReq = req.body as getMonsterSearch;
    urlTools.setAuthToken(rawReq.token);
    const fetchRes = await searchMonsters(rawReq.search, rawReq.skip, rawReq.take, urlTools);
    res.json({
        pagination: fetchRes.pagination,
        data: fetchRes.data,
    } as MonsterPage);
});

export default monsterRouter;
