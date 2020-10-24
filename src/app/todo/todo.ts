export class Todo {
  constructor(public Id: number, public Title: string, public Status: string) {}
}

export interface Todo1 {
  Id: number;
  Title: string;
  Status: string;
}
