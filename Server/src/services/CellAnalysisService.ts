import { PythonShell } from "python-shell";

export class CellAnalysisService {

    constructor() {
    }

    async cellSizeAnalyzer() {
        /*let installoptions = {
            args: ["opencv-python"],
            scriptPath: 'src/services/pythonScripts'
        }
        PythonShell.run('install_package.py', installoptions, function (err, results) {
            if (err) throw err;
            else console.log(results);
        });*/
        let options = {
            scriptPath: 'src/services/pythonScripts'
        }
        PythonShell.run('cellsizeanalyzer.py', options, function (err, results) {
            if (err) {
                console.log(err);
            }
            console.log(results);
        })

        return "testing finished";
    }

}