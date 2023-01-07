import { gql } from 'apollo-angular';

export const AppointmentsMuproQuery = gql`
  query AppoinmentParticipations ($id: UUID) {
    appointments(
      where: {id: { equals: $id}}
    ) {
    items
    {id}
