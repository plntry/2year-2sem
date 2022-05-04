let input_box = document.getElementById("fieldToCalculate");
let historyData = [];
let expressionData = "";
let resultData = "";

function UserClickButton(input) {
    let oldinput = input_box.value;
    let newinput = oldinput + input;
    expressionData = newinput;
    input_box.value = newinput;
}
function CalculateValue() {
    let input = input_box.value;

    try {
        let result = eval(input);
        resultData = result;
        historyData.push( {"expression": expressionData,"result": resultData} );
        showLogData();
        resultData = "";
        expressionData = "";
        input_box.value = result;
    }
    catch (error) {
        resultData = "";
        expressionData = "";
        input_box.value = "Please try again";
    }
}
function ClearData() {
    input_box.value = "";
}

function showLogData() {
    let log = document.getElementById("history_log");
    let line = "";
    for(let i in historyData){
        line += "" + historyData[i]["expression"] + " = " + historyData[i]["result"] + "<br>";
    }

    log.innerHTML = line;
}