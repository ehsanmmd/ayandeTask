import type { Filters } from "./FilterModal";

type Connection = "متصل" | "غیر متصل";

export interface Account {
  key: string;
  accountTitle: string;
  accountCode: string;
  accountNumber: string;
  ShebaNumber: string;
  cardNumber: string;
  bankPortStatus: Connection;
  posStatus: Connection;
}

const generateRandomNumericString = (length: number): string => {
  const characters = "0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

function westernToPersianDigits(input: string): string {
  const westernDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  return input
    .split("")
    .map(char => {
      const index = westernDigits.indexOf(char);
      return index !== -1 ? persianDigits[index] : char;
    })
    .join("");
}

export const generateAccounts = (): Account[] => {
  const storedAccounts = localStorage.getItem("accounts");
  if (storedAccounts) {
    return JSON.parse(storedAccounts);
  } else {
    const accounts: Account[] = Array.from({ length: 30 }, () => {
      const phrases = ["ملی", "صادرات", "ملت"];
      const selectedPhrase =
        phrases[Math.floor(Math.random() * phrases.length)];
      let accountNumber = westernToPersianDigits(
        generateRandomNumericString(16),
      );
      if (Math.random() < 0.5) {
        const additionalCharacters = 16 - accountNumber.length;
        accountNumber += westernToPersianDigits(
          generateRandomNumericString(additionalCharacters),
        );
      } else {
        accountNumber = accountNumber.slice(0, 24);
      }

      const accountCode = westernToPersianDigits(
        String(Math.floor(Math.random() * 10000)).padStart(4, "0"),
      );

      let cardNumber = westernToPersianDigits(generateRandomNumericString(16));
      cardNumber = cardNumber.match(/.{1,4}/g)?.join("-") ?? "";

      return {
        key: accountNumber,
        accountTitle: `بانک ${selectedPhrase} شعبه ${String(
          Math.floor(Math.random() * 1000),
        ).padStart(3, "0")}`,
        accountCode,
        accountNumber,
        ShebaNumber: westernToPersianDigits(generateRandomNumericString(24)),
        cardNumber,
        bankPortStatus: Math.random() < 0.5 ? "متصل" : "غیر متصل",
        posStatus: Math.random() < 0.5 ? "متصل" : "غیر متصل",
      };
    });

    localStorage.setItem("accounts", JSON.stringify(accounts));
    return accounts;
  }
};

export const filteredAccounts = (filters: Filters): Account[] => {
  return generateAccounts().filter(account => {
    if (
      filters.portFilter !== "همه" &&
      account.bankPortStatus !== filters.portFilter
    ) {
      return false;
    }
    if (
      filters.posFilter !== "همه" &&
      account.posStatus !== filters.posFilter
    ) {
      return false;
    }
    return true;
  });
};

export const deleteAccounts = (keysToDelete: string[]): void => {
  const storedAccounts = localStorage.getItem("accounts");
  if (storedAccounts) {
    let accounts: Account[] = JSON.parse(storedAccounts);
    accounts = accounts.filter(account => !keysToDelete.includes(account.key));
    localStorage.setItem("accounts", JSON.stringify(accounts));
  }
};
