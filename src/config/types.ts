export interface MenuItem {
  title: string;
  key: string;
  path: string;
  icon: string;
  children?: MenuItem[];
}
