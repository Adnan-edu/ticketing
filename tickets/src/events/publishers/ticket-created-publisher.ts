import { Publisher, Subjects, TicketCreatedEvent } from '@adnan-edu-tickets/common'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
