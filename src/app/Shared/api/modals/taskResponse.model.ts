export interface TaskResponse {
  code: number;
  isSuccess: boolean;
  result: PostTask[];
}

export interface PostTask {
  _id: string;
  description: string;
  completed: boolean;
  owner: string;
  createdAt: string;
  updatedAt: string;
}
