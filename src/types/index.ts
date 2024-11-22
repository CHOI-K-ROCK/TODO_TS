export interface ITodo {
  id: string;
  done: boolean;
  content: string;
}

export interface INote {
  id: string;
  title: string;
  keywords: string[];
  content: string;
}

export interface IModal {
  isOpen: boolean;
  msg: 'string' | null;
  type: 'double' | 'single' | null;
  applyFn: () => void;
  dismissFn?: () => void;
}
