import { fn } from '../Utils/Utils';

export type PageInfo = {
  id: string;
  url: string;
  animated?: boolean;
  params?: any
  closeSelf?:boolean;
};
