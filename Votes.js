//import { vote } from "./main.js";

export async function voteImage(imgId, subId, vote) {
    const URL = `${API_URL}votes/`;
    const body = {
        "image_id": imgId,
        "sub_id": subId,
        "value": vote 
    };
    
    fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY
        },
        body: JSON.stringify(body)
    }).then(response => {
        if (!response.ok) {
            throw new Error("Failed to favorite image");
        }
        
        return response.json();
    }).then(data => {
        alert(data.message);
        console.log(data)
    }).catch(error => {
        console.error('Error:', error);
    });
}