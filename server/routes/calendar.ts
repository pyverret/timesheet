import {Router} from "express";
import fs from "fs";

const router = Router();

async function exists (filePath: string) {
    try {
        fs.existsSync(filePath)
        return true
    } catch {
        return false
    }
}

router.get("/:year/:month", (req, res) => {
    try {
        const file = `./data/${req.params.year}-${req.params.month}.txt`;
        const doesFileExist = fs.existsSync(file);
        let data = JSON.stringify([]);

        if (doesFileExist) {
            data = fs.readFileSync(file, 'utf8')
        }

        res.statusCode = 200;
        res.json(JSON.parse(data));
    } catch (error) {
        console.error(error);
    }
});

router.post("/:year/:month", (req, res) => {
    try {
        const file = `./data/${req.params.year}-${req.params.month}.txt`;
        const data = {
            date: req.body.date,
            description: req.body.description || '',
            startAm: req.body.startAm || '',
            endAm: req.body.endAm || '',
            startPm: req.body.startPm || '',
            endPm: req.body.endPm || '',
            total: req.body.total || ''
        };

        const doesFileExist = fs.existsSync(file);

        if (doesFileExist) {
            const fileData = fs.readFileSync(file, 'utf8');
            const fileArray = JSON.parse(fileData);
            const itemIndex = fileArray.findIndex((item: any) => item.date === data.date);

            if (itemIndex === -1) {
                fileArray.push(data);
            } else {
                fileArray[itemIndex] = data;
            }

            fs.writeFileSync(file, JSON.stringify(fileArray));
        } else {
            fs.writeFileSync(file, JSON.stringify([data]));
        }

        res.statusCode = 204;
        res.send({});
    } catch (error) {
        console.error(error);
    }
});

export default router;