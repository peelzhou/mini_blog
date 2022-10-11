import 'reflect-metadata';
import {} from 'typeorm';

let connectionReadyPromise: Promise<Connection> | null = null;

export const prepareConnection = () => {
  if (!connectionReadyPromise) {
    connectionReadyPromise = (async () => {
      try {
        const staleConnection = getConnection();
        await staleConnection.close();
      } catch (error) {
        console.log(error);
      }
    })();
  }
  return;
};
