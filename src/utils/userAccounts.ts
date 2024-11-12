import { promises as fs } from 'fs';

interface UserAccount {
  id: string;
  username: string;
  password: string;
}

const ACCOUNTS_FILE = 'secret.txt';

export const readUserAccounts = async (): Promise<UserAccount[]> => {
  try {
    const data = await fs.readFile(ACCOUNTS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, return empty array
    return [];
  }
};

export const addUserAccount = async (account: UserAccount): Promise<void> => {
  const accounts = await readUserAccounts();
  accounts.push(account);
  await fs.writeFile(ACCOUNTS_FILE, JSON.stringify(accounts, null, 2));
};