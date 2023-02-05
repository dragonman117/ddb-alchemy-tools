import {UrlTools} from "./urlTools";
import {GetTokenResponse} from "../models/authModels";

export async function authTools(urlTool: UrlTools): Promise<any> {
    const [authUrl, authHeader] = urlTool.getAuthUrl();
    const res = await fetch(authUrl, { method: "POST", headers: authHeader as HeadersInit });
    return await res.json() as GetTokenResponse;
}
