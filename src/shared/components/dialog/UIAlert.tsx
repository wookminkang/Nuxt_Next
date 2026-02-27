'use client';
import { useDialogStore } from '@/shared/store/dialogStore';
import { getImageUrl } from '@/utils/getimgurl';

// ─── Icon 파일명 매핑 (Nuxt dialogIconMap과 동일) ─────────────────────────────

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

export const UIAlert = () => {
  const { alert, closeAlert } = useDialogStore();

  if (!alert.isShow) return null;

  const [iconName] = alert.icon.split(',');

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
        {alert.title && (
          <p
            className="mb-0.5 text-base font-bold leading-[22px] tracking-[-0.32px] text-[#3e4354] text-center"
            dangerouslySetInnerHTML={{ __html: alert.title }}
          />
        )}

        {/* 메시지 */}
        <p
          className={`text-base font-normal leading-[22px] tracking-[-0.32px] text-[#3e4354] ${
            alert.align === 'left' ? 'text-left self-start' : 'text-center'
          }`}
          dangerouslySetInnerHTML={{ __html: alert.msg }}
        />

        {/* 에러 강조 텍스트 */}
        {alert.errorHighlightMsg && (
          <p className="mt-2 text-base font-bold leading-[22px] tracking-[-0.32px] text-[#f84d3a]">
            {alert.errorHighlightMsg}
          </p>
        )}

        {/* 확인 버튼 */}
        <button
          onClick={closeAlert}
          autoFocus
          className="mt-6 min-w-[120px] h-[44px] px-8 bg-[#10182b] text-white text-sm font-medium rounded-[4px] hover:bg-[#1e2a3d] transition-colors cursor-pointer"
        >
          {alert.button}
        </button>
      </div>
    </div>
  );
};
