import { voteUp, voteDown } from "./main.js";

export async function voteImage(imgId, subId) {
    const upBtn = document.getElementById("voteUpBtn");
    const downBtn = document.getElementById("voteDownBtn"); 
    
    upBtn.addEventListener("click", () => {
        voteUp(imgId, subId);
    });

    downBtn.addEventListener("click", () => {
        voteDown(imgId, subId);
    });

    //return vote;
}
