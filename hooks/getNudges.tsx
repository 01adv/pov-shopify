// a fetch function to get data from the API

export const getNudges = async ({ productName, sessionId }: { productName: string, sessionId: string }) => {
    console.log('productName', productName, sessionId);
    if (!sessionId) {
        console.warn('No session id provided');
        return;
    }
    try {
        const response = await fetch(
            `https://textagentpov.onrender.com/nudge/${sessionId}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ product_name: productName, sessionId }),
            }
        );
        console.log('response ndudges', response);
        const data = await response.json();
        return data.nudge;
    } catch (error) {
        console.error(error);
    }
}