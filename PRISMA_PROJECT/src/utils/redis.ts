import { createClient } from 'redis';

const redisClient = createClient({
  url: 'redis://redis:6379',
});

console.log(redisClient);

redisClient.on('error', err => console.error('Redis Client Error', err));

(async () => {
  await redisClient.connect();
})();

export default redisClient;
