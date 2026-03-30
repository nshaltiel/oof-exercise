export type BinType = 'cant_do' | 'need_help' | 'can_change';

export const BIN_CONFIG: Record<BinType, { label: string; icon: string; color: string; bgColor: string }> = {
  cant_do: {
    label: 'אין לי יכולת להשפיע על זה',
    icon: '🚫',
    color: '#e74c3c',
    bgColor: '#fdecea',
  },
  need_help: {
    label: 'צריך עזרה',
    icon: '🤝',
    color: '#f39c12',
    bgColor: '#fef9e7',
  },
  can_change: {
    label: 'אפשר לשנות',
    icon: '✨',
    color: '#27ae60',
    bgColor: '#eafaf1',
  },
};

export const BIN_ORDER: BinType[] = ['cant_do', 'need_help', 'can_change'];
