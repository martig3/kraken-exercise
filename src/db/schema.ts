import { text, sqliteTable, int } from 'drizzle-orm/sqlite-core';

export const repos = sqliteTable('repos', {
  name: text('name').notNull(),
  description: text('description'),
  url: text('url'),
});

export const files = sqliteTable('files', {
  path: text('path').notNull(),
  coverage: int('coverage').notNull(),
});
