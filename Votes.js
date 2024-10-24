import { voteImage } from "./main.js";

export async function getVotesByUserId(userId) {
    const URL = `${API_URL}votes?sub_id=${userId}`;
    try {
        const response = await fetch(URL);

        /* {
            headers: {"x-api-key": API_KEY,
                "Cotent-Type": "application/json"
            }
        }); */

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }
        const votes = await response.json();
        return votes;
    } catch (error) {
        console.log("Error fetching votes:", error);
    }
}