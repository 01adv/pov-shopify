// a fetch function to get data from the API

// export const getNudges = async ({ productName, sessionId }: { productName: string, sessionId: string }) => {
//     console.log('productName', productName, sessionId);
//     if (!sessionId) {
//         console.warn('No session id provided');
//         return;
//     }
//     try {
//         const response = await fetch(
//             `https://textagentpov.onrender.com/nudge/${sessionId}`,
//             {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ product_name: productName, sessionId }),
//             }
//         );
//         const data = await response.json();
//         console.log('data', data);
//         return data.nudge;
//     } catch (error) {
//         console.error(error);
//     }
// }


export const getNudges = async ({
    productName,
    sessionId,
}: {
    productName: string;
    sessionId: string;
}): Promise<string | undefined> => {
    console.log('productName', productName, sessionId);
    if (!sessionId) {
        console.warn('No session id provided');
        return;
    }

    try {
        const response = await fetch(
            `https://textagentpov.onrender.com/nudge/${sessionId}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ product_name: productName, sessionId }),
            }
        );

        const data = await response.json();
        console.log('raw nudge data', data);

        const rawNudge = data.nudge;
        if (!rawNudge) return;
        console.log('raw nudge', rawNudge);
        console.log('cleaned nudge', getRandomNudgeCleaned(rawNudge));
        return getRandomNudgeCleaned(rawNudge);
    } catch (error) {
        console.error(error);
    }
};

// Utility to pick a cleaned random line from nudge block
function getRandomNudgeCleaned(rawNudge: string): string {
    // Normalize input by removing extra whitespace and ensuring single line breaks
    const normalizedNudge = rawNudge.replace(/\n+/g, '\n').trim();

    // Regex to match only tips and benefits, capturing the text after the prefix
    const matches = [
        ...normalizedNudge.matchAll(
            /(?:\*\*)?(Tip|Benefit)\s*\d*:?\s*(.*?)$/gim
        ),
    ];

    // Extract the text (group 2), trim, and filter out empty or irrelevant lines
    const lines = matches
        .map(match => match[2].trim())
        .filter(line => line && !line.match(/^[^\w]*$/)); // Exclude lines with only punctuation/emojis

    if (lines.length === 0) {
        console.warn('No valid tips or benefits found in nudge');
        return '';
    }

    console.log('nudge lines', lines);
    // Select a random line
    let selected = lines[Math.floor(Math.random() * lines.length)];
    // Remove any `**` from the selected text
    selected = selected.replace(/\*\*/g, '').trim();
    console.log('Selected cleaned nudge:', selected);
    return selected;
}
