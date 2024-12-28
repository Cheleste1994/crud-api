import { v4 as uuidv4 } from 'uuid';

export interface User {
  id: string;
  uuid: string;
  username: string;
  age: number;
  hobbies: string[];
}

export const users: User[] = [
  {
    id: '1',
    uuid: uuidv4(),
    username: 'Ivan',
    age: 29,
    hobbies: ['racing'],
  },
  {
    id: '2',
    uuid: uuidv4(),
    username: 'Andrei',
    age: 12,
    hobbies: ['sky', 'music'],
  },
];
