import { UUID } from 'crypto';

export interface Repo {
  id: UUID;
  url: string;
}
