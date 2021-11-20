<script>
    import { moveToPage } from "./navigator";
    import { localLog } from "./stores";
    import { jsonToCSV, CSVDownloader } from "svelte-csv";
    import { BasicTable } from "csv2table";
    let logs_ids = Object.keys($localLog).reverse();
    let showTableById = {};
    let showDataById = {};
    function showCSVData(jsonDataStr) {
        return jsonToCSV(jsonDataStr);
    }
    function optionsString(lineData) {
        let res = `${lineData.C_0 == lineData["S+"] ? "*" : ""}${lineData.C_0}`;
        for (let index = 1; index < 5; index++) {
            const element = lineData[`C_${index}`];
            if (element) {
                res = `${res}, ${
                    element == lineData["S+"] ? "*" : ""
                }${element}`;
            }
        }
        return res;
    }

    function jsonToHuman(jsonString) {
        let data = JSON.parse(jsonString);
        let res = [];
        data.forEach((line, i) => {
            let options = optionsString(line);
            res.push(
                `[${line.Date}] [${line.TestName}] [${i + 1}]/[${
                    data.length
                }]: (${line.R}) [${line.Learner}] chose [${
                    line.PC_name
                }] over [${options}] in a time of [${line["TimeR"]} s]`
            );
        });
        return res;
    }

    function toggleTable(id) {
        showTableById[id] = showTableById[id] ? false : true;
    }

    function toggleData(id) {
        showDataById[id] = showDataById[id] ? false : true;
    }

    function parseLogsToJSON() {
        let allDataJSON = [
            {
                "Test #": "",
                TestName: "",
                "S+": "",
                CardAudioMsg: "",
                Learner: "",
                CG: "",
                C_0: "",
                C_1: "",
                C_2: "",
                C_3: "",
                C_4: "",
                PC_name: "",
                PC: "",
                R: "",
                Date: "",
                TimeR: "",
                BgColor: "",
                CardBg: "",
                FbDelay: "",
                CardText: "",
                Voice: "",
                FbMsg: "",
                CardH: "",
                CardW: "",
                CardSeparation: "",
                Annotations: "",
            },
        ];
        logs_ids.forEach((id) => {
            let settings_data = JSON.parse($localLog[id][2] || "{}");
            let data = JSON.parse($localLog[id][0]);
            data.forEach((line) => {
                line = Object.assign(line, settings_data);
            });
            allDataJSON.push(data);
        });
        return allDataJSON.flat(1);
    }
    function showAllTables() {
        let allDataJSON = parseLogsToJSON();
        let data = JSON.stringify(allDataJSON);
        return showCSVData(data);
    }
</script>

<center><h1>Local Logs</h1></center>
<div>
    <!-- <div>
        <BasicTable csv={showAllTables()} csvColumnDelimiter="," />
    </div> -->
    <center
        ><button on:click={() => moveToPage("menu")}>Go Back</button>
        <CSVDownloader
            data={parseLogsToJSON()}
            filename={"filename"}
            bom={true}
            type={"button"}
        >
            Download All Data in CSV
        </CSVDownloader></center
    >
    {#each logs_ids as id}
        <div class="color">
            Test #{id}
            <p>{$localLog[id][1]}</p>
            <div class="toggle-buttons">
                <button on:click={() => toggleTable(id)}
                    >{showTableById[id] ? "Hide" : "Show"} Summary Table</button
                >
                <button on:click={() => toggleData(id)}
                    >{showDataById[id] ? "Hide" : "Show"} Summary Data</button
                >
            </div>
            {#if showTableById[id]}
                <div>
                    <BasicTable
                        csv={showCSVData($localLog[id][0])}
                        csvColumnDelimiter=","
                    />
                </div>
            {/if}
            {#if showDataById[id]}
                {#each jsonToHuman($localLog[id][0]) as data_line}
                    <p>{data_line}</p>
                {/each}
            {/if}
        </div>
    {/each}
    <center><button on:click={() => moveToPage("menu")}>Go Back</button></center
    >
</div>

<style>
    .color {
        background-color: rgb(195, 207, 207);
        display: grid;
        place-items: center;
        margin-left: 10%;
        margin-right: 10%;
        margin-top: 5%;
    }

    .toggle-buttons {
        display: flex;
    }
</style>
