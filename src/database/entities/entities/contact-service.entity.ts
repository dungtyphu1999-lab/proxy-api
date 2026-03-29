import { ContactServiceStatus } from '@/modules/admin/contact-services/dto/get-contact-services-query.dto';

export interface ContactService {
  id: string;
  service_name: string;
  icon?: string;
  url: string;
  status: ContactServiceStatus;
  created_at: Date;
  updated_at: Date;
}
