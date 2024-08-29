import { fn } from '../../Utils/Utils';

export type AlertDialogData = {
  msg:string;
  btnText:string;
  callback?:fn
}

export type LoadingDialogData = {
  msg:string;
}

export type ConfirmDialogData = {
  title?:string;
  msg:string;
  okBtnText:string;
  cancelBtnText:string;
  okCallback?:fn
  cancelCallback?:fn
}