import express from "express";
import cors from "cors";
import news from "./routes/news";
import calendar from "./routes/calendar";

const app = express();
// TODO: Move to .env
const port = 8080; // default port to listen

const clientPath = __dirname + '/../dist/';

const allowedOrigins = ['http://localhost:8080', 'http://localhost:5173'];
app.use(cors({
    origin: function(origin: any, callback: any){
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

app.use(express.json());
app.use(express.static(clientPath));
app.use('/api/news', news)
app.use('/api/calendar', calendar)

// Redirect all route not starting with API
app.all("*", (req, res, next) => {
    if (!req.path.startsWith("/api")) {
        return res.redirect("/");
    }
})

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );