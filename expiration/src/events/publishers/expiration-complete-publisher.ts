import { Subjects, Publisher, ExpirationCompleteEvent } from "@adnan-edu-tickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
  }