import { Entity } from '@/shared/domain/entity';
import { EntityError } from '@/shared/errors/entity-error';
import { PartialObject } from 'lodash';
import { UserDAO } from '../dao/user.dao';
import { Email } from './value-objects/email.vo';
import { Password } from './value-objects/password.vo';

export interface UserProperties {
  email: string;
  username: string;
  password: Password;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DomainUserProperties
  extends Omit<UserProperties, 'createdAt' | 'updatedAt' | 'password'> {
  id?: string;
  password: string;
}

export interface UpdateUserProperties
  extends PartialObject<Omit<UserProperties, 'password'>> {
  password?: string;
}

export interface OutputUser {
  id: string;
  email: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

export class User extends Entity {
  private _email: Email;
  private _username: string;
  private _password: Password;
  private _createdAt: Date;
  private _updatedAt: Date;
  constructor(props: UserProperties, id?: string) {
    super(id);
    this._email = new Email(props.email);
    this._username = props.username;
    this._password = props.password;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
    this.validate();
  }

  validate() {
    if (this._email.hasErrors()) {
      this.addError(this._email.errors);
    }
    if (!this._username) {
      this.addError({ field: 'username', messages: ['Required at username'] });
    }
    if (this._password.hasErrors()) {
      this.addError(this._password.errors);
    }
    if (this.hasError()) {
      throw new EntityError(this.errors);
    }
  }

  update(props: UpdateUserProperties): void {
    if (props.username) {
      this._username = props.username;
    }
    if (props.email) {
      this._email = new Email(props.email);
    }
    if (props.password) {
      this._password = new Password(props.password);
    }
    this._updatedAt = new Date();
    this.validate();
  }

  toOutput(): OutputUser {
    return {
      id: this.id,
      email: this.email,
      username: this.username,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  toDAO(): UserDAO {
    return {
      id: this.id,
      email: this.email,
      username: this.username,
      password: this.password.value,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    };
  }

  public static fromDAO(user: UserDAO): User {
    return new User(
      {
        email: user.email,
        password: new Password(user.password, true),
        username: user.username,
        createdAt: user.created_at,
        updatedAt: user.updated_at,
      },
      user.id,
    );
  }

  public static fromDomain(input: DomainUserProperties): User {
    return new User(
      {
        email: input.email,
        username: input.username,
        password: new Password(input.password),
      },
      input.id,
    );
  }

  get email(): string {
    return this._email.value;
  }

  get username(): string {
    return this._username;
  }

  get password(): Password {
    return this._password;
  }

  get createdAt(): Date {
    return this._createdAt;
  }
  get updatedAt(): Date {
    return this._updatedAt;
  }
}
