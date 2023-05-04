import Queue from "bull";
import { ExpirationCompletePublisher } from "../events/publishers/expiration-complete-publisher";
import { natsWrapper } from "../nats-wrapper";
interface Payload{
    orderId: string;
}

const expirationQueue = new Queue<Payload>('order-expiration', {
    redis: {
        host: process.env.REDIS_HOST
    }
});
//What we want do to whenever we receive a job here
expirationQueue.process(async (job)=>{
    new ExpirationCompletePublisher(natsWrapper.client).publish({
        orderId: job.data.orderId
    })
});

export { expirationQueue } ;