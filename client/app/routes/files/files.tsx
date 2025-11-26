import { Link } from 'react-router';
import { ArrowLeftIcon } from 'lucide-react';
import { Card, CardDescription, CardTitle } from '~/components/ui/card';
import {
  Item,
  ItemContent,
  ItemTitle,
  ItemActions,
  ItemMedia,
} from '~/components/ui/item';
import type { Route } from './+types/files';
import { API_BASE_URL } from '~/lib/base-url';
import { Button } from '~/components/ui/button';

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const files = (await (
    await fetch(`${API_BASE_URL}/repo/${params.repoId}/files`)
  ).json()) as {
    path: string;
    coverage: number;
  }[];
  return { files };
}
export default function Files({ loaderData }: Route.ComponentProps) {
  const { files } = loaderData;
  return (
    <Card className="p-8">
      <CardTitle className="flex items-center gap-2">
        <Link to="/">
          <ArrowLeftIcon />
        </Link>{' '}
        Files
      </CardTitle>
      <CardDescription>{`Files with <=80% coverage`}</CardDescription>
      {files.map((f) => (
        <Item
          variant="outline"
          size="sm"
          key={f.path}
          className="min-w-[400px]"
        >
          <ItemContent>
            <ItemTitle>{f.path}</ItemTitle>
          </ItemContent>
          <div className="mx-4"></div>
          <ItemActions>
            <ItemMedia>{f.coverage}%</ItemMedia>
            <Button variant="outline">Generate</Button>
          </ItemActions>
        </Item>
      ))}
    </Card>
  );
}
