export interface Exercise {
  id: string;
  name: string;
  duration: number;
  date?: Date;
  state?: 'completed' | 'cancelled' | null;
}