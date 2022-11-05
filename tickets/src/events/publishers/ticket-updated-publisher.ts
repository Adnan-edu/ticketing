import { Publisher, Subjects, TicketUpdatedEvent } from '@adnan-edu-tickets/common'

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
