import crypto from 'crypto';
import { IIdGeneratorProvider } from '@/shared/infra/providers/id-generator/id-generator.provider.interface';

export class IdGeneratorProvider implements IIdGeneratorProvider {
  uuid(): string {
    return crypto.randomUUID();
  }
}
