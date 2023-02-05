
let token = null;


console.log("Beginning D&D Beyond Monster Importer");
console.log("======================================");
console.log(" ");

//On Form Submit run to submit fn
document.getElementById("submit").addEventListener("click", submitForm);


async function submitForm(e){
    e.preventDefault();
    console.log('Form Submitted');
    //Get the value of the input field
    var cobaltId = document.getElementById("cobalt").value;
    var campaignId = document.getElementById("ddbLink").value;

    if (token == null) {
        //Get the token
        const raw = await fetch("/auth/token", {
            method: "POST",
            body: JSON.stringify({
                "cobalt": cobaltId,
            }),
            headers: {
                "Content-type": "application/json"
            }
        });
        const data = await raw.json();
        token = data.token;
    }

    const monsterId = campaignId.split("/").slice(-1)[0].split("-")[0];
    const result = await fetch(`/monster/id`, {
        method: "POST",
        body: JSON.stringify({
            "id": monsterId,
            "token": token
        }),
        headers: {
            "Content-type": "application/json"
        }
    });
    const resJson = await result.json();
    //Download Result
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(resJson));
    var dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute("href",     dataStr     );
    dlAnchorElem.setAttribute("download", `monster-${monsterId}.json`);
    dlAnchorElem.click();
    
    //Run the function to get the monsters
    console.log("final: ", resJson);
}