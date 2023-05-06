import { Subjects, Publisher, PaymentCreatedEvent } from '@adnan-edu-tickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
