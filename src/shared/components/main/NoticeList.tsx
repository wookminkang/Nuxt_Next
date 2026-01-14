export const NoticeList = async () => {
  const API_HOST = process.env.NEXT_PUBLIC_BASE_URL;
  const clubCode = process.env.NEXT_PUBLIC_G_CODE || '';
  
  try {
    const response = await fetch(`${API_HOST}/hp/api/notice?clubCode=${clubCode}&post=true`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data } = await response.json();
    console.log(`noticeList data =>`, data);

    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">공지사항</h2>
        <ul className="space-y-2">
          {data?.map((notice: any) => (
            <li key={notice.id} className="border-b pb-2">
              <span className="font-medium">{notice.title}</span>
              <span className="text-sm text-gray-500 ml-2">{notice.regDate}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    console.error("NoticeList fetch failed:", error);
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">공지사항</h2>
        <div className="text-red-500">공지사항을 불러오는 중 오류가 발생했습니다.</div>
      </div>
    );
  }
}