declare module "react-palm" {
  export type Task = any; // Replace `any` with specific types if available
  export function createTask<T>(
    func: (...args: any[]) => T,
    ...args: any[]
  ): Task;
  export function executeTask<T>(task: Task): T;
  export function cancelTask(task: Task): void;

  // Add other exports based on your usage of `react-palm`
}
