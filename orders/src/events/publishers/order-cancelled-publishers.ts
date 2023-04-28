import { Subjects, Publisher, OrderCancelledEvent } from '@adnan-edu-tickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
