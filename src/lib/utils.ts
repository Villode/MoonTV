import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 合并Tailwind CSS类名
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 检查URL是否需要代理
 * @param url 图片URL
 * @returns 是否需要代理
 */
const needsProxy = (url: string): boolean => {
  // 如果已经是相对URL或者数据URL，不需要代理
  if (!url || url.startsWith('/') || url.startsWith('data:')) {
    return false;
  }

  // 已知的需要代理的域名列表
  const domainsNeedingProxy = [
    'vip.dytt-img.com',
    'img.dytt-img.com',
    'dytt-img.com',
    'img9.doubanio.com',
    'img3.doubanio.com',
    'img1.doubanio.com',
    'doubanio.com',
  ];

  try {
    const urlObj = new URL(url);
    return domainsNeedingProxy.some((domain) =>
      urlObj.hostname.includes(domain)
    );
  } catch (e) {
    // 无效URL，不代理
    return false;
  }
};

/**
 * 处理图片URL，如果需要代理则返回代理URL
 * @param url 原始图片URL
 * @returns 处理后的URL
 */
export function getProxiedImageUrl(url: string): string {
  if (!url) return '';

  // 如果URL需要代理，返回代理URL
  if (needsProxy(url)) {
    // 确保URL被正确编码
    const encodedUrl = encodeURIComponent(url);
    return `/api/image-proxy?url=${encodedUrl}`;
  }

  // 否则返回原始URL
  return url;
}

export function cleanHtmlTags(text: string): string {
  if (!text) return '';
  return text
    .replace(/<[^>]+>/g, '\n') // 将 HTML 标签替换为换行
    .replace(/\n+/g, '\n') // 将多个连续换行合并为一个
    .replace(/[ \t]+/g, ' ') // 将多个连续空格和制表符合并为一个空格，但保留换行符
    .replace(/^\n+|\n+$/g, '') // 去掉首尾换行
    .replace(/&nbsp;/g, ' ') // 将 &nbsp; 替换为空格
    .trim(); // 去掉首尾空格
}
