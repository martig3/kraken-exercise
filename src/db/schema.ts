import { text, sqliteTable, int, index } from 'drizzle-orm/sqlite-core';
import { UUID } from 'node:crypto';

export const repos = sqliteTable('repos', {
  id: text('id', { length: 36 })
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey()
    .$type<UUID>(),
  url: text('url').notNull(),
});

export const files = sqliteTable(
  'files',
  {
    path: text('path').notNull().primaryKey(),
    coverage: int('coverage').notNull(),
    repoId: text('repo_id', { length: 36 }).notNull(),
  },
  (table) => [index('repo_id').on(table.repoId)],
);
