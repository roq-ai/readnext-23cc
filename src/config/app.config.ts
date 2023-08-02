interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Content Provider'],
  customerRoles: ['Reader'],
  tenantRoles: ['Content Provider'],
  tenantName: 'Publisher',
  applicationName: 'Readnext',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
};
