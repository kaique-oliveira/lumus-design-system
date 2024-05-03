import type { StoryObj, Meta } from "@storybook/react";
import {
  Box,
  DataTable,
  DataTableTypeProps,
  TableHeader,
} from "@lumus-ui/react";
import { useState } from "react";

interface User {
  id: number;
  nome: string;
  email: string;
  telefone: number;
}

export default {
  title: "Data Display/Data Table",
  component: DataTable,

  decorators: [
    (Story) => {
      const headers = [
        { key: "id", label: "ID", width: "20px" },
        { key: "nome", label: "Nome", width: "100px" },
        { key: "email", label: "Email", width: "200px" },
        { key: "telefone", label: "Telefone", width: "60px" },
      ] as TableHeader<User>[];

      const [users] = useState<User[]>([
        {
          id: 1,
          nome: "Kaique",
          email: "kaique@gmail.com",
          telefone: 123234,
        },
        {
          id: 2,
          nome: "Airon",
          email: "airon@gmail.com",
          telefone: 123234,
        },
        {
          id: 3,
          nome: "Rodrigo",
          email: "kaique@gmail.com",
          telefone: 123234,
        },
        {
          id: 4,
          nome: "Rafa",
          email: "airon@gmail.com",
          telefone: 123234,
        },
        {
          id: 5,
          nome: "João",
          email: "airon@gmail.com",
          telefone: 123234,
        },
      ]);

      return (
        <Box style={{ width: "max-content", background: "transparent" }}>
          <Story
            args={{
              keySearchBar: { key: "nome" },
              searchPlaceholder: "Filter por nome",
              itemsPerPage: 3,
              totalItens: users.length,
              data: users,
              headers: headers,
              optionsOfAction: [
                {
                  label: "Deletar",
                  action: () => {},
                },
                {
                  label: "Exibir",
                  action: (obj: User) => {
                    console.log(obj);
                  },
                },
              ],
            }}
          />
        </Box>
      );
    },
  ],
} as Meta<DataTableTypeProps<User>>;

export const Default: StoryObj<DataTableTypeProps<User>> = {};
