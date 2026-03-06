'use client';
import { useDialogStore } from '@/store/dialogStore';
import { getImageUrl } from '@/utils/getimgurl';

// ─── Icon 파일명 매핑 (UIAlert과 동일) ───────────────────────────────────────

const ICON_FILE_MAP: Record<string, string> = {
  error:    'ico_error_caution_alert',
  id:       'ico_id_caution_alert',
  idCfm:    'ico_id_confirm_alert',
  login:    'ico_login_alert',
  logout:   'ico_logout_alert',
  pwCfm:    'ico_password_confirm_alert',
  pw:       'ico_pw_caution_alert',
  rsv:      'ico_reservation_caution_alert',
  rsvCfm:   'ico_reservation_confirm_alert',
  user:     'ico_user_caution_alert',
  userCfm:  'ico_user_confirm_alert',
  write:    'ico_write_caution_alert',
  writeCfm: 'ico_write_confirm_alert',
  file:     'ico_file_caution_alert',
  idPw:     'ico_idpw_caution_alert',
  delete:   'ico_delete_caution_alert',
  emailCfm: 'ico_email_confirm_alert',
};

const gCode = process.env.NEXT_PUBLIC_G_CODE?.toLowerCase();

const getIconUrl = (iconName: string) => {
  const fileName = ICON_FILE_MAP[iconName] ?? ICON_FILE_MAP.error;
  return getImageUrl(`ico/${fileName}.svg`, gCode);
};

// ─── Component ────────────────────────────────────────────────────────────────

export const UIConfirm = () => {
  const { confirm, closeConfirm } = useDialogStore();

  if (!confirm.isShow) return null;

  const [iconName] = confirm.icon.split(',');

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40">
      <div className="flex flex-col items-center w-[404px] max-w-[90vw] bg-white rounded-[8px] px-10 pt-[44px] pb-10">
        {/* 아이콘 */}
        <img
          src={getIconUrl(iconName)}
          alt=""
          className="w-[120px] h-[120px] mb-2 object-contain"
        />

        {/* 타이틀 */}
        {confirm.title && (
          <p
            className="mb-0.5 text-base font-bold leading-[22px] tracking-[-0.32px] text-[#3e4354] text-center"
            dangerouslySetInnerHTML={{ __html: confirm.title }}
          />
        )}

        {/* 메시지 */}
        <p
          className={`text-base font-normal leading-[22px] tracking-[-0.32px] text-[#3e4354] ${
            confirm.align === 'left' ? 'text-left self-start' : 'text-center'
          }`}
          dangerouslySetInnerHTML={{ __html: confirm.msg }}
        />

        {/* 예/아니요 버튼 */}
        <div className="flex gap-5 mt-6">
          <button
            onClick={() => closeConfirm(true)}
            autoFocus
            className="min-w-[100px] h-[40px] px-6 bg-[#10182b] text-white text-sm font-medium rounded-[4px] hover:bg-[#1e2a3d] transition-colors cursor-pointer"
          >
            {confirm.yesTxt}
          </button>
          <button
            onClick={() => closeConfirm(false)}
            className="min-w-[100px] h-[40px] px-6 border border-[#10182b] text-[#10182b] text-sm font-medium rounded-[4px] hover:bg-gray-50 transition-colors cursor-pointer"
          >
            {confirm.noTxt}
          </button>
        </div>
      </div>
    </div>
  );
};
