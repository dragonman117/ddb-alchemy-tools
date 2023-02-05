import express, {Express, Request, Response} from 'express';
import authRouter from "./routes/authRoutes";
import monsterRouter from "./routes/monsterRoutes";


const app: Express = express();
const port = 3000;

app.use('/', express.static('public'));
app.use(express.json());
app.use('/auth', authRouter);
app.use('/monster', monsterRouter);

app.listen(port, ()=> {
    console.log(`[Server]: I am running at https://localhost:${port}`);
});