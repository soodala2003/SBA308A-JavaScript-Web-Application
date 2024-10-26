import { voteUp, voteDown, getVotesByUserId } from "./main.js";

export async function voteImage(imgId, subId) {
    const upBtn = document.getElementById("voteUpBtn");
    const downBtn = document.getElementById("voteDownBtn"); 
    const resultsBtn= document.getElementById("voteResultsBtn");
    
    upBtn.addEventListener("click", () => {
        voteUp(imgId, subId);
    });

    downBtn.addEventListener("click", () => {
        voteDown(imgId, subId);
    });

    resultsBtn.addEventListener("click", () => {
        document.getElementById("main-div").style.visibility = "hidden";
        document.getElementById("vote-options").style.display = "block";
        
        getVotesByUserId(subId).then((data) => {
            data.map(function(voteData) {
                const imageData = voteData.image;
                let image = document.createElement("img");
                image.style.width = "250px";
                image.style.height = "200px";
                image.style.padding = "10px";
                image.src = imageData.url;

                let gridCell = document.createElement("div");
                gridCell.style.width = "270px";
                gridCell.style.height = "220px";
                gridCell.style.margin = "20px";

                if (voteData.value < 0) {
                    gridCell.classList.add("red");
                    
                } else {
                    gridCell.classList.add("green");
                    gridCell.style.backgroundColor = "rgb(179, 244, 207)";
                }

                gridCell.classList.add("col-lg");
                gridCell.appendChild(image);
                document.getElementById("grid").appendChild(gridCell);
            });
        }).catch(error => {
            console.log(error);
        });
    });
}
