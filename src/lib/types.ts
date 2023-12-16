export interface IExercise {
  id: string;
  title: string;
  isDone: boolean;
  isNotSynced?: boolean;
}

export interface UpdateExercisePayload {
  id: string;
  isDone: boolean;
}
