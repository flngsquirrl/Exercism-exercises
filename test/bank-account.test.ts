import {
  BankAccount,
  BankAccountStatus,
  ValueError
} from '../src/bank-account';

describe('Bank Account', () => {
  let account: BankAccount;

  beforeEach(async () => {
    account = new BankAccount();
    await account.open();
  });

  describe('standard operations sequence', () => {
    test('newly open account balance is 0', async () => {
      const status = await account.status();
      expect(status).toBe<BankAccountStatus>('open');

      const balance = await account.balance();
      expect(balance).toBe(0);
    });

    test('depositing on a new account adds to the balance', async () => {
      const sum = 50;
      account.deposit(50);
      const balance = await account.balance();
      expect(balance).toBe(sum);
    });

    test('depositing multiple times adds up to the balance', async () => {
      const sums = [50, 10, 30];
      sums.forEach(sum => account.deposit(sum));
      const balance = await account.balance();
      expect(balance).toBe(90);
    });

    test('withdrawing subtracts from the balance', async () => {
      account.deposit(50);
      account.withdraw(30);
      const balance = await account.balance();
      expect(balance).toBe(20);
    });

    test('withdrawing all the money resets the balance', async () => {
      await account.deposit(50);
      await account.withdraw();
      const balance = await account.balance();
      expect(balance).toBe(0);
    });

    test('depositing and withdrawing multiple times leaves the balance correct', async () => {
      const sums = [50, 10, 30, 20, 40];
      sums.forEach((sum, index) =>
        index % 2 ? account.withdraw(sum) : account.deposit(sum)
      );
      const balance = await account.balance();
      expect(balance).toBe(90);
    });

    test('closing the account with non-empty balance is possible', () => {
      expect(() => account.close()).not.toThrow();
    });
  });

  describe('edge cases', () => {
    test('opening open account throws', async () => {
      // expect.assertions(1);
      // try {
      //   await account.open();
      // } catch (error) {
      //   expect(error).toEqual(new ValueError());
      // }
      await expect(account.open()).rejects.toEqual(new ValueError());
    });

    test('closing closed account throws', async () => {
      await account.close();
      await expect(account.close()).rejects.toEqual(new ValueError());
    });

    test('depositing a negative sum throws', async () => {
      await expect(account.deposit(-20)).rejects.toEqual(new ValueError());
    });

    test('reading balance for a closed account throws', async () => {
      await account.close();
      await expect(account.balance()).rejects.toEqual(new ValueError());
    });
  });
});
