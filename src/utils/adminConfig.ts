// 🔧 CONFIGURAÇÃO DE ADMINISTRADORES
// Adicione os e-mails dos administradores aqui

export const ADMIN_EMAILS = [
  'admin@teacherpoli.com',
  'suporte@teacherpoli.com',
  'manu@teacherpoli.com',
  'poli@teacherpoli.com',
  // Adicione mais e-mails de administradores conforme necessário
];

export const ADMIN_PERMISSIONS = {
  SUPER_ADMIN: ['edit_content', 'add_lessons', 'manage_users', 'edit_bonuses', 'manage_settings'],
  CONTENT_ADMIN: ['edit_content', 'add_lessons', 'edit_bonuses'],
  SUPPORT_ADMIN: ['edit_content', 'manage_users']
};

export function isAdmin(email: string): boolean {
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

export function getAdminPermissions(email: string): string[] {
  if (!isAdmin(email)) return [];
  
  // Por padrão, todos os admins têm permissões completas
  // Você pode personalizar isso conforme necessário
  return ADMIN_PERMISSIONS.SUPER_ADMIN;
}

export function hasPermission(email: string, permission: string): boolean {
  const permissions = getAdminPermissions(email);
  return permissions.includes(permission);
}