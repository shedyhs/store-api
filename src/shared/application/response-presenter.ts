import { ApplicationErrors } from '../errors/application-error';
import { HttpRequest } from '../interfaces/http';
import { IPaginateResponse } from '../interfaces/pagination.interface';

type ActionsType = 'POST' | 'PUT' | 'GET' | 'PATCH' | 'DELETE';

type LinkType = {
  rel: string;
  href: string;
  action: ActionsType[];
};

export class ResponsePresenter {
  private received: object;
  private embedded: any;
  private links: LinkType[];
  private _baseUrl: string;

  constructor(request: HttpRequest, response: object) {
    this.embedded = response;
    this.links = [];
    const [protocol, , host] = request.url.split('/');
    this._baseUrl = `${protocol}//${host}`;
    this.received = {
      params: request.params,
      query: request.query,
      body: request.body,
      user: request.user,
      file: request.file,
    };
  }

  addLink(link: LinkType): void {
    link.href = this._baseUrl + link.href;
    this.links.push(link);
  }

  get present(): object {
    return {
      _received: this.received,
      _embedded: this.embedded,
      _links: this.links,
    };
  }
}
