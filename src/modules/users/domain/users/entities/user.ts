import { IOutputUserDTO } from '@/modules/users/application/users/usecases/dtos/output-user.dto';
import { Entity } from '@/shared/domain/entity';
import { EntityError } from '@/shared/errors/entity-error';
import { PartialObject } from 'lodash';
import { Email } from './value-objects/email.vo';
import { Password } from './value-objects/password.vo';

export type UserProperties = {
  email: string;
  username: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
};

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
    this._password = new Password(props.password);
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
    this.validate();
  }

  validate() {
    if (this._email.hasErrors()) {
      this.addError(this._email.errors);
    }
    if (this._password.hasErrors()) {
      this.addError(this._password.errors);
    }
    if (this.hasError()) {
      throw new EntityError(this.errors);
    }
  }

  update(props: PartialObject<UserProperties>) {
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
  }

  public toOutput(): IOutputUserDTO {
    return {
      id: this.id,
      email: this.email,
      username: this.username,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  public toRepository() {
    return {
      id: this.id,
      email: this.email,
      username: this.username,
      password: this.password,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    };
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
