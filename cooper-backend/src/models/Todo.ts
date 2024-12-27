class TodoModel {
    id: string;
    userId: string;
    text: string;
    completed: boolean;
  
    constructor(id: string, userId: string, text: string, completed: boolean) {
      this.id = id;
      this.userId = userId;
      this.text = text;
      this.completed = completed;
    }
  }
  
  export { TodoModel };