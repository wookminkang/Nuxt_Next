const SubFooter = () => {
  return (
    <footer className="bg-[#1a1a1a] py-12 text-white ml-[280px]">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">UNI VALLEY CC</h3>
            <p className="text-sm text-gray-400">
              경기도 용인시 처인구 ... <br />
              대표번호: 031-000-0000
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">사이트 맵</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>클럽안내</li>
              <li>코스안내</li>
              <li>이용안내</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">고객지원</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>공지사항</li>
              <li>문의하기</li>
              <li>오시는 길</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">약관 및 정책</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>이용약관</li>
              <li>개인정보처리방침</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-xs text-gray-500">
          © 2026 UNI VALLEY CC. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export { SubFooter };

