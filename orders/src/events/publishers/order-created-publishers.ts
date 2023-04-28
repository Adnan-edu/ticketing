import { Publisher, OrderCreatedEvent, Subjects } from '@adnan-edu-tickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
