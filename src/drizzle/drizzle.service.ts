import { Injectable } from '@nestjs/common';
import { LibSQLDatabase } from 'drizzle-orm/libsql';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './../db/schema';

@Injectable()
export class DrizzleService {
  db: LibSQLDatabase<typeof schema>;
  constructor() {
    this.db = drizzle(`file:${process.env.DB_URL!}`, { schema });
  }
}
