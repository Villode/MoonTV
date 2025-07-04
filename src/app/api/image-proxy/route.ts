import { NextRequest, NextResponse } from 'next/server';

// 指定使用Edge Runtime
export const runtime = 'edge';

/**
 * 图片代理API - 用于解决CORS问题
 *
 * 使用方法: /api/image-proxy?url=图片URL
 *
 * @param request NextRequest对象
 * @returns 代理后的图片响应
 */
export async function GET(request: NextRequest) {
  try {
    // 获取URL参数
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get('url');

    // 验证URL参数
    if (!imageUrl) {
      return new NextResponse('Missing url parameter', { status: 400 });
    }

    // 解码URL（处理双重编码的情况）
    const decodedUrl = decodeURIComponent(imageUrl);

    // 获取图片
    const imageResponse = await fetch(decodedUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        Referer: new URL(decodedUrl).origin,
      },
    });

    // 如果图片获取失败，返回错误
    if (!imageResponse.ok) {
      return new NextResponse(
        `Failed to fetch image: ${imageResponse.statusText}`,
        { status: imageResponse.status }
      );
    }

    // 获取图片数据
    const imageData = await imageResponse.arrayBuffer();

    // 获取原始Content-Type
    const contentType =
      imageResponse.headers.get('Content-Type') || 'image/jpeg';

    // 返回图片，并设置正确的CORS头
    return new NextResponse(imageData, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400', // 缓存24小时
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    // 记录错误但不使用console.error
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    return new NextResponse(`Error proxying image: ${errorMessage}`, {
      status: 500,
    });
  }
}
