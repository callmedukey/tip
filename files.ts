import fs from "fs";
import path from "path";


const files = fs.readdirSync(path.join(process.cwd(), "./public/partners"));

files.forEach((file, index) => {
    const filename = file.split(".")[0];
    const extension = file.split(".")[1];
    //rename file
    fs.renameSync(
        path.join(process.cwd(), "./public/partners", file),
        path.join(process.cwd(), "./public/partners", `${index + 1}.${extension}`)
    );
});

