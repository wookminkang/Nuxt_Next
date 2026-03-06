export interface MenuChild {
  idx: number;
  code: string;
  name: string;
  sortOrder: number;
  isVisible: boolean;
  type: string;
  seoSlug: string | null;
  isTargetBlank: boolean;
  children: MenuChild[];
}

export interface MenuItem {
  idx: number;
  code: string;
  name: string;
  sortOrder: number;
  isVisible: boolean;
  type: string;
  seoSlug: string | null;
  isMainPage: boolean;
  isTargetBlank: boolean;
  children: MenuChild[];
}

export interface MenuResponse {
  result: boolean;
  data: MenuItem[];
}
