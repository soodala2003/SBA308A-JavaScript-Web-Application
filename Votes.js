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
        document.getElementById("main-div").style.display = "none";
        document.getElementById("vote-options").style.display = "block";
        //let results = 
        getVotesByUserId(subId).then((data) => {
            data.map(function(voteData) {
                const imageData = voteData.image;
                let image = document.createElement("img");
                image.src = imageData.url;

                let gridCell = document.createElement("div");
                if (voteData.value < 0) {
                    gridCell.classList.add("red");
                } else {
                    gridCell.classList.add("green");
                }

                gridCell.classList.add("col-lg");
                gridCell.appendChild(image);
                document.getElementById("grid").appendChild(gridCell);
            });
        }).catch(error => {
            console.log(error);
        });
    });

    //return vote;
}
