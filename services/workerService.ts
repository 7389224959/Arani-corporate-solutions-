import { Client } from "../types";

export const getClients = async (): Promise<Client[]> => {
  return [
    {
      id: "client-1",
      business_name: "Acme Finance",
      category: "Banking",
      services: "Retail Banking, Credit Loans",
      offer: "Signing Bonus $5k",
      owner_name: "John Doe",
    }
  ];
};
