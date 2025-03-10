import DatabaseFactory from '@/lib/database-factory';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = DatabaseFactory.getDatabase(body.cid);
    const result = await db.getTables(body.database);
    return Response.json(result);
  } catch (error) {
    console.error('请求处理失败:', error);
    return Response.json({ error: '无效的JSON格式' }, { status: 400 });
  }
}
