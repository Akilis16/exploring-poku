export function formatUserName(name: string): string {
    const nameTrimmed = name.trim();
    
    if (!nameTrimmed) return 'Usuário Anônimo';
    return nameTrimmed.toUpperCase();
}