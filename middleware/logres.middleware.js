const fs = require('fs');
let LOG_FILE = './log/res.log';

const logres = (req, res, next) => {
    res.status = (code) => {
        if(code >299){
            LOG_FILE = './log/error.log';
        }
        let logString = [(new Date()).toLocaleString()];
        logString.push(req.method);
        logString.push(req.path);
        logString.push(req.ip);
        logString.push("\n Content-Type:", req.headers["content-type"]);
        logString.push(code);
        fs.appendFileSync(LOG_FILE,logString.join(" ") + "\n");
        this.status(code);
    }
    next();
}

module.exports = logres;