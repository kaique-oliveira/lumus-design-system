import { Meta, StoryObj } from "@storybook/react";
import {
  Box,
  Button,
  ButtonTypeProps,
  Modal,
  TextInput,
} from "@lumus-ui/react";
import { useState } from "react";

export default {
  title: "Form/Modal",
  component: Button,

  decorators: [
    (Story) => {
      const [showModal, setShowModal] = useState(false);

      return (
        <Box
          style={{
            width: "max-content",
            flexDirection: "row",
            background: "transparent",
          }}
        >
          <Story
            args={{
              label: "Novo usuário",
              onClick: () => setShowModal(true),
            }}
          />

          <Modal
            title="Cadastrar usuário"
            visible={showModal}
            onHideModal={setShowModal}
            buttons={
              <>
                <Button
                  label="Cancelar"
                  variant="outlined"
                  onClick={() => setShowModal(false)}
                />
                <Button
                  label="Salvar"
                  onClick={() => {
                    setShowModal(false);
                  }}
                />
              </>
            }
          >
            <>
              <TextInput
                keyId="nome"
                label="Nome"
                placeholder="ex: João Oliveira"
                caption={{ value: "Obrigatório.", state: "warning" }}
                onChangeValue={() => {}}
              />
              <TextInput
                keyId="cpf"
                label="CPF"
                mask={"cpf"}
                placeholder="Apenas números"
                caption={{ value: "Digite apenas números.", state: "info" }}
                onChangeValue={() => {}}
              />
            </>
          </Modal>
        </Box>
      );
    },
  ],
} as Meta<ButtonTypeProps>;

export const Primary: StoryObj<ButtonTypeProps> = {};
