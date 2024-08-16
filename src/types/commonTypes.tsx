export interface IModalState {
  isOpen: boolean;
  photo: object | null;
}

export interface ITransformedData {
  id: string;
  alt: string;
  description: string;
  likes: number;
  thumbImg: string;
  fullImg: string;
  author: string;
  created_at: string;
}
