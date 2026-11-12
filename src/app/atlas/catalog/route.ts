import { projects } from '@/data/projects';

export const dynamic = 'force-static';

export function GET() {
  return Response.json(projects);
}
