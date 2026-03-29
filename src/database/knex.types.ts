import { Role } from './entities/role.entity';
import { UserProfile } from './entities/user-profile.entity';
import { SupportContact } from './entities/support-contact.entity';

export interface DatabaseTables {
  roles: Role;
  user_profiles: UserProfile;
  support_contacts: SupportContact;
}
