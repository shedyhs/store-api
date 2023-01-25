import { User } from './domain/users/entities/user';

const user = new User({ email: 'shedyhs@gmail.com', password: 'Pas$w0rd' });

console.log(user.toOutput());
