import { NextRequest, NextResponse } from 'next/server';

// next.config.ts의 hosts와 동일하게 설정
const TARGET_HOST = 'https://erpqahpb.smartscore.kr:20000';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, params, 'GET');
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, params, 'POST');
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, params, 'PUT');
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, params, 'DELETE');
}

async function proxyRequest(
  request: NextRequest,
  params: Promise<{ path: string[] }>,
  method: string
) {
  try {
    const resolvedParams = await params;
    const path = resolvedParams.path.join('/');
    const url = new URL(request.url);
    const searchParams = url.searchParams.toString();
    const targetUrl = `${TARGET_HOST}/hp/${path}${searchParams ? `?${searchParams}` : ''}`;

    const body = method !== 'GET' && method !== 'DELETE' 
      ? await request.text() 
      : undefined;

    console.log(`[Proxy] ${method} ${targetUrl}`);
    console.log(`[Proxy] Body:`, body);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30초 타임아웃

    try {
      const response = await fetch(targetUrl, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      console.log(`[Proxy] Response status:`, response.status);

      const data = await response.text();
      
      return new NextResponse(data, {
        status: response.status,
        statusText: response.statusText,
        headers: {
          'Content-Type': response.headers.get('Content-Type') || 'application/json',
        },
      });
    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      if (fetchError.name === 'AbortError') {
        console.error('[Proxy] Request timeout');
        return NextResponse.json(
          { error: 'Request timeout - 서버 응답 시간이 초과되었습니다.' },
          { status: 504 }
        );
      }
      throw fetchError;
    }
  } catch (error: any) {
    console.error('Proxy error:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      cause: error.cause,
    });
    return NextResponse.json(
      { 
        error: 'Proxy request failed',
        message: error.message || '알 수 없는 오류가 발생했습니다.',
        code: error.code,
      },
      { status: 500 }
    );
  }
}

