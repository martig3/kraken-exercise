import { type RouteConfig, index } from '@react-router/dev/routes';

export default [
  index('routes/repos.tsx'),
  { path: '/repo/:repoId/files', file: 'routes/files/files.tsx' },
] satisfies RouteConfig;
