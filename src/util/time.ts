export const wait = (millis: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, millis));
