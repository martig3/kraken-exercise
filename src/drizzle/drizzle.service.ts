import { Injectable } from '@nestjs/common';
import { LibSQLDatabase } from 'drizzle-orm/libsql';
import { drizzle } from 'drizzle-orm/libsql';

@Injectable()
export class DrizzleService {
  db: LibSQLDatabase;
  constructor() {
    this.db = drizzle('./app.db');
  }
}
