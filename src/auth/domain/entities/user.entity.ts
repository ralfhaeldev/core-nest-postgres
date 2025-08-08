import { Exclude } from 'class-transformer';
import { Role } from 'src/common/enums/roles.enum';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  email: string;

  @Exclude()
  @Column('text', { select: false })
  pawssowrd: string;

  @Column('text')
  fullName: string;

  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  @Column('text', { array: true, default: [Role.USER] })
  roles: Role[];

  @BeforeInsert()
  checkFieldInsert() {
    this.email = this.email.toLocaleLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldUpdate() {
    this.checkFieldInsert();
  }

  json() {
    return {
      id: this.id,
      fullName: this.fullName,
      roles: this.roles,
    };
  }
}
