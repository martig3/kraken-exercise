import { UUID } from 'crypto';

// just alias this here since it doesn't differ from the DTO, perhaps it would in the future
export interface Repo {
  id: UUID;
  url: string;
}
