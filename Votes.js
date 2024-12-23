import { voteUp, voteDown, getVotesByUserId, deleteVote } from "./main.js";
import { clear } from "./main.js";

export async function voteImage(imgId, subId) {
    const upBtn = document.getElementById("voteUpBtn");
    const downBtn = document.getElementById("voteDownBtn"); 
    const resultsBtn = document.getElementById("voteResultsBtn");
    const deleteBtn = document.getElementById("deleteVoteBtn");
    
    upBtn.addEventListener("click", (e) => {
        e.preventDefault();
        voteUp(imgId, subId);
        const element = "grid";
        clear(element);
    });

    downBtn.addEventListener("click", (e) => {
        e.preventDefault();
        voteDown(imgId, subId);
        const element = "grid";
        clear(element);
    });

    resultsBtn.addEventListener("click", (e) => {
        e.preventDefault();

        const element = "grid";
        clear(element);
        
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
                    gridCell.style.backgroundColor = "rgb(233, 144, 212)";
                    
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

    deleteBtn.addEventListener("click", (e) => {
        e.preventDefault();
        getVotesByUserId(subId).then((data) => {
            const index = data.length - 1;
            const id = data[index].id;
            deleteVote(imgId, subId, id);

            const element = "grid";
            clear(element);
        });        
    }); 
} 