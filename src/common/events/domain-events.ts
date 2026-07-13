export interface DomainEvent<TPayload = unknown> {
  eventName: string;
  occurredAt: string;
  payload: TPayload;
}

export interface ClubCreatedEvent {
  id: string;
  assignmentId: string;
  name: string;
  sport?: string;
}

export interface ClubUpdatedEvent {
  id: string;
  assignmentId?: string;
  name?: string;
  sport?: string;
}
