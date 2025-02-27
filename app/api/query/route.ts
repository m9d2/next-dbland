// 处理POST请求
import DatabaseFactory from '@/lib/database-factory';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = DatabaseFactory.getDatabase(body.cid);
    const result = await db.query({ sql: 'select * from mysql.user' });
    console.log(result);
    return Response.json({ data: { message: '操作成功' } });
  } catch (error) {
    console.error('请求处理失败:', error);
    return Response.json({ error: '无效的JSON格式' }, { status: 400 });
  }
}
