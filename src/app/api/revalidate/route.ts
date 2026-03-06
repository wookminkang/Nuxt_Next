import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * 관리자에서 공지사항/이벤트 수정·삭제 후 캐시 무효화
 *
 * POST /api/revalidate
 * Body: { "tag": "hotel-notice" }
 * Header: { "x-revalidate-secret": <REVALIDATE_SECRET> }
 */
export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-revalidate-secret');

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { tag } = await request.json();

  if (!tag) {
    return NextResponse.json({ message: 'tag is required' }, { status: 400 });
  }

  revalidateTag(tag);

  return NextResponse.json({ revalidated: true, tag });
}
