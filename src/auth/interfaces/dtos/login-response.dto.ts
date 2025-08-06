import { UserEntity } from 'src/auth/domain/entities/user.entity';
export interface LoginResponse {
  user: UserEntity;
  token: string;
}
