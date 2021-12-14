<script>
    import { moveToPage } from "utils/navigator.js";
    import { localLog } from "stores/stores.js";
    import { jsonToCSV, CSVDownloader } from "svelte-csv";
    import { BasicTable } from "csv2table";
    import Footer from "components/Footer.svelte";
    import Header from "components/Header.svelte";
    import Button from "components/Utils/Button.svelte";
    import MenuButton from "components/Utils/MenuButton.svelte";
    import { Col } from "sveltestrap";
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
                "Session #": "",
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
                CardFg: "",
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
    function dateInOrgmodeFormat() {
        let d = new Date();
        return d.toLocaleString("sv").replace(" ", "T").replaceAll(":", "-");
    }
    function filename() {
        return `InCA-BAT-Logs-${dateInOrgmodeFormat()}`;
    }
</script>

<center><Header title="Local Logs" /></center>
<div>
    <!-- <div>
        <BasicTable csv={showAllTables()} csvColumnDelimiter="," />
    </div> -->
    <center />
    {#each logs_ids as id}
        <div class="color">
            Test #{id}
            <p>{$localLog[id][1]}</p>
            <div class="toggle-buttons">
                <Button on:click={() => toggleTable(id)}
                    >{showTableById[id] ? "Hide" : "Show"} Summary Table
                </Button>
                <Button on:click={() => toggleData(id)}>
                    {showDataById[id] ? "Hide" : "Show"} Summary Data
                </Button>
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
</div>

<Footer rows="2">
    <Col>
        <MenuButton />
    </Col>
    <Col>
        <div class="parent">
            <CSVDownloader
                data={parseLogsToJSON()}
                filename={filename()}
                bom={true}
                type={"link"}
            >
                <Button>Download All Data in CSV</Button>
            </CSVDownloader>
        </div>
    </Col>
</Footer>

<style>
    .color {
        background-color: #a0c9c0;
        place-items: center;
        margin-left: 10%;
        margin-right: 10%;
        margin-top: 5%;
        text-align: center;
        padding-left: 3vw;
        padding-right: 3vw;
        padding-top: 1vh;
        padding-bottom: 1vh;
        border-radius: 10px;
    }

    .toggle-buttons {
        display: flex;
    }
</style>
