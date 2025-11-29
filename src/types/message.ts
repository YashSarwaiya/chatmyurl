export interface Message {
  id: string;
  url: string;
  userId: string;
  username: string;
  message: string;
  createdAt: string;
  owner?: string;
}

export interface CreateMessageInput {
  url: string;
  userId: string;
  username: string;
  message: string;
  createdAt: string;
}
