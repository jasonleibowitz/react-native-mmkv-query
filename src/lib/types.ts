export interface IExercise {
  id: string;
  title: string;
  isDone: boolean;
  isNotSynced?: boolean;
  userId: string;
}

export interface IUser {
  user_id: string;
  createdAt: string;
  updatedAt: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface UpdateExercisePayload {
  id: string;
  isDone: boolean;
}

export interface UpdateUsernamePayload {
  id: string;
  username: string;
}
