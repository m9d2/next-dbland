import { ConfigService } from '@/lib/sys/config';

export async function GET(request: Request) {
  try {
    const service = new ConfigService();
    const result = await service.getAll();
    return Response.json(result);
  } catch (error) {
    console.error('请求处理失败:', error);
    return Response.json({ error: '无效的JSON格式' }, { status: 400 });
  }
}
