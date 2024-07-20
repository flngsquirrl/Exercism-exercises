import { Mutex } from 'async-mutex';

export class ValueError extends Error {
  constructor() {
    super('Bank account error');
  }
}

export type BankAccountStatus = 'created' | 'open' | 'closed';

export class BankAccount {
  mutex = new Mutex();

  #balance: number = 0;
  #status: BankAccountStatus = 'created';

  async open(): Promise<void> {
    const release = await this.mutex.acquire();
    try {
      this.validateStatusIsNot('open');
      this.#status = 'open';
    } finally {
      release();
    }
  }

  async close(): Promise<void> {
    const release = await this.mutex.acquire();
    try {
      this.validateStatusIs('open');
      if (this.#balance) {
        this.withdraw();
      }

      this.#status = 'closed';
      this.#balance = 0;
    } finally {
      release();
    }
  }

  validateStatusIsNot(checkStatus: BankAccountStatus) {
    if (this.#status === checkStatus) {
      throw new ValueError();
    }
  }

  validateStatusIs(checkStatus: BankAccountStatus) {
    if (this.#status !== checkStatus) {
      throw new ValueError();
    }
  }

  async deposit(sum: number): Promise<void> {
    BankAccount.validateSum(sum);

    const release = await this.mutex.acquire();
    try {
      this.validateStatusIs('open');
      this.#balance += sum;
    } finally {
      release();
    }
  }

  async withdraw(sum?: number): Promise<void> {
    const sumToWithdraw = sum ? sum : this.#balance;
    BankAccount.validateSum(sumToWithdraw);

    const release = await this.mutex.acquire();
    try {
      if (this.#balance < sumToWithdraw) {
        throw new ValueError();
      }
      this.#balance -= sumToWithdraw;
    } finally {
      release();
    }
  }

  private static validateSum(sum: number) {
    if (sum < 0) {
      throw new ValueError();
    }
  }

  async balance(): Promise<number> {
    const release = await this.mutex.acquire();
    try {
      if (this.#status === 'closed') {
        throw new ValueError();
      }
      return this.#balance;
    } finally {
      release();
    }
  }

  async status(): Promise<BankAccountStatus> {
    const release = await this.mutex.acquire();
    try {
      return this.#status;
    } finally {
      release();
    }
  }
}
