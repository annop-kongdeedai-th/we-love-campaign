import { COLORS } from '.';
import { FONTSIZE, ICONSIZE } from './SIZE';

export enum colorSet {
  default = COLORS.darkGrey as any,
  primary = COLORS.black as any,
  secondary = COLORS.lightGrey as any, // เทาอ่อน (#90A4B7)
  fourth = COLORS.lightGreyShade2 as any,
  danger = COLORS.red as any, // แดง (#E8374F)
  warning = COLORS.yellow as any, // เหลือง
  success = COLORS.green as any, // เขียว (#37C5AB)
  info = COLORS.blue as any, // น้ำเงิน (#4186E0)
  facebook = COLORS.facebook as any,
  twitter = COLORS.twitter as any,
  line = COLORS.line as any,
  transparent = COLORS.transparent as any,
  white = COLORS.white as any
}

export enum sizeSet {
  xs = FONTSIZE.xs,
  s = FONTSIZE.s,
  m = FONTSIZE.m,
  l = FONTSIZE.l,
  xl = FONTSIZE.xl,
  xxl = FONTSIZE.xxl,
  xxxl = FONTSIZE.xxxl
}

export enum sizeIconSet {
  xs = ICONSIZE.xs,
  s = ICONSIZE.s,
  m = ICONSIZE.m,
  l = ICONSIZE.l,
  xl = ICONSIZE.xl
}

export enum imagePickerSet {
  picture,
  camera
}
