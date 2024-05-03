type resultType = {
  value: string;
  size: number;
};

export const generateMask = {
  cpf: (value: string) => {
    const size = "XXX.XXX.XXX-XX".length;
    value = value.replace(/\D/g, "");

    // Aplica a máscara de CPF (XXX.XXX.XXX-XX)
    value = value.replace(/^(\d{3})(\d)/, "$1.$2");
    value = value.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
    value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})/, "$1.$2.$3-$4");

    return { value, size: size } as resultType;
  },
  telefone: (value: string) => {
    const size = "(XX) X XXXX-XXXX".length;
    value = value.replace(/\D/g, "");

    // Aplica a máscara de telefone ((XX) X XXXX-XXXX)
    if (value.length <= 2) {
      value = `(${value}`;
    } else if (value.length <= 3) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length <= 7) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 3)} ${value.slice(3)}`;
    } else if (value.length <= 8) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 3)} ${value.slice(3, 7)}-${value.slice(7)}`;
    } else {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 3)} ${value.slice(3, 7)}-${value.slice(7, 11)}`;
    }

    return { value, size } as resultType;
  },
  cep: (value: string) => {
    const size = "XXXXXX-XXX".length;
    value = value.replace(/\D/g, "");

    // Aplica a máscara de número
    if (value.length > 5) {
      value = `${value.slice(0, 5)}-${value.slice(5, 8)}`;
    }

    return { value, size } as resultType;
  },
  cnpj: (value: string) => {
    const size = "XX.XXX.XXX/XXXX-XX".length;
    value = value.replace(/\D/g, "");

    // Aplica a máscara de CNPJ (XX.XXX.XXX/XXXX-XX)
    value = value.replace(/^(\d{2})(\d)/, "$1.$2");
    value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
    value = value.replace(/(\d{4})(\d)/, "$1-$2");

    return { value, size } as resultType;
  },
  number: (value: string) => {
    value = value.replace(/[^\d.,]/g, "");

    // Remove múltiplos pontos e vírgulas e garante que haja apenas um separador decimal
    value = value.replace(/([.,])(?=.*[.,])/g, "");

    // // Substitui vírgulas por ponto se houver mais de um separador decimal
    // value = value.replace(",", ".");

    return { value, size: 20 } as resultType;
  },
};

export type GenerateMaskProps = keyof typeof generateMask;
