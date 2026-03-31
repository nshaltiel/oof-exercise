export type BinType = 'cant_do' | 'need_help' | 'can_change';

export const BIN_CONFIG: Record<BinType, { label: string; icon: string; color: string; bgColor: string }> = {
  cant_do: {
    label: '0% השפעה (אין לי יכולת להשפיע על זה, נותר לי רק להסתגל)',
    icon: '🚫',
    color: '#e74c3c',
    bgColor: '#fdecea',
  },
  need_help: {
    label: '1%-99% השפעה (דברים שאני יכול.ה להשפיע עליהם)',
    icon: '🤝',
    color: '#f39c12',
    bgColor: '#fef9e7',
  },
  can_change: {
    label: '100% - שליטה מלאה (יש לי שליטה מלאה על הדבר)',
    icon: '✨',
    color: '#27ae60',
    bgColor: '#eafaf1',
  },
};

export const BIN_ORDER: BinType[] = ['cant_do', 'need_help', 'can_change'];
