import {
  ContextMenuContainer,
  ContextMenuWrapper,
  FooterContainer,
  Row,
  Header,
  Table,
  TBody,
  THead,
} from "./styles";
import { Text } from "../Text";
import { Button } from "../Button";

import { getPositionComponent } from "../../utils/getPositionComponent";
import { ArrowDown } from "../../assets/icons/ArrowDown";
import { useEffect, useRef, useState } from "react";
import { IconsProps } from "../../assets/icons";
import { DotsThreeOutlineVertical } from "phosphor-react";
import { TextInput } from "../TextInput";

export type TableHeader<T> = {
  key: keyof T;
  label: string;
  width: string;
};

export type OptionsOfActionType = {
  label?: string;
  icon?: IconsProps;
  action: Function;
};

type RowObject<T> = {
  valor: T | null;
};

type SearchTable<T> = {
  key: keyof T;
};

export interface DataTableTypeProps<T> {
  headers: TableHeader<T>[];
  itemsPerPage: number;
  totalItens: number;
  data: T[];
  keySearchBar: SearchTable<T>;
  searchPlaceholder?: string;
  optionsOfAction?: OptionsOfActionType[];
}

export function DataTable<T>({
  data,
  headers,
  itemsPerPage,
  totalItens,
  keySearchBar,
  optionsOfAction,
  searchPlaceholder,
}: DataTableTypeProps<T>) {
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [positionMenu, sePositionMenu] = useState<{
    top: string;
    left: string;
  } | null>(null);
  const [currentRow, setcurrentRow] = useState<RowObject<T> | null>(null);

  const totalPages = Math.ceil(totalItens / itemsPerPage);
  const heightTabe = 36 * itemsPerPage;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const refContexMenu = useRef<HTMLDivElement>(null);
  const [searchTable, setSearchTable] = useState("");

  function showMenu(
    event: React.MouseEvent<HTMLButtonElement>,
    obj: RowObject<T>
  ) {
    const react = getPositionComponent(event);
    react.left = Number(react.left.replace("px", "")) - 7 + "px";
    react.top = Number(react.top.replace("px", "")) - 8 + "px";

    setVisible(true);
    setShow(true);
    sePositionMenu(react);
    setcurrentRow(obj);
  }

  function hideMenu() {
    setVisible(false);
    setShow(false);
    setcurrentRow(null);
  }

  function handleOpenMenu(
    event: React.MouseEvent<HTMLButtonElement>,
    obj: RowObject<T>
  ) {
    if (!!currentRow && currentRow === obj) {
      hideMenu();
    } else {
      showMenu(event, obj);
    }
  }

  const handleNextPage = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    function handleCliqueFora(event: MouseEvent) {
      if (
        refContexMenu.current &&
        !refContexMenu.current.contains(event.target as Node)
      ) {
        hideMenu();
      } else {
        hideMenu();
      }
    }

    document.addEventListener("mousedown", handleCliqueFora);

    return () => {
      document.removeEventListener("mousedown", handleCliqueFora);
    };
  }, []);

  return (
    <Table>
      <Header>
        <Text>Usuários</Text>
        <TextInput
          // icon="search"
          placeholder={searchPlaceholder}
          value={searchTable}
          keyId={"search-table"}
          onChangeValue={setSearchTable}
        />
      </Header>

      <THead>
        {headers.map((t) => (
          <Text style={{ width: t.width }} key={t.key.toString()} sizeText="sm">
            {t.label}
          </Text>
        ))}

        <div style={{ width: "18px" }}></div>
      </THead>

      <TBody css={{ "--height": heightTabe + "px" }}>
        {data
          .filter((x) =>
            searchTable
              ? (x[keySearchBar.key] as string)
                  .toLowerCase()
                  .includes(searchTable.toLowerCase())
              : x
          )
          .slice(indexOfFirstItem, indexOfLastItem)
          .map((row, rowIndex) => (
            <Row key={rowIndex}>
              {headers.map((header) => (
                <Text
                  style={{ width: header.width }}
                  sizeText="sm"
                  key={header.key.toString()}
                >
                  {row[header.key] as string}
                </Text>
              ))}
              <Button
                icon={<DotsThreeOutlineVertical size={16} weight="fill" />}
                variant="text"
                onClick={(e) => handleOpenMenu(e, row as RowObject<T>)}
              />
            </Row>
          ))}
      </TBody>

      <FooterContainer>
        <span>
          Exibindo {data.slice(indexOfFirstItem, indexOfLastItem).length} de{" "}
          {totalItens}
        </span>

        <Button
          variant="text"
          icon="arrow_left"
          disabled={currentPage === 1 && true}
          onClick={() => handleNextPage(currentPage - 1)}
        />

        <Button
          variant="text"
          icon="arrow_right"
          disabled={currentPage === totalPages && true}
          onClick={() => handleNextPage(currentPage + 1)}
        />
      </FooterContainer>

      {visible && (
        <ContextMenuWrapper
          visible={show}
          css={{
            "--left": !!positionMenu ? positionMenu.left : "-100px",
            "--top": !!positionMenu && positionMenu.top,
          }}
        >
          <ContextMenuContainer ref={refContexMenu}>
            <div>
              <ArrowDown />
            </div>

            {!!optionsOfAction &&
              optionsOfAction?.length > 0 &&
              optionsOfAction.map((option, indice) => (
                <Button
                  key={indice}
                  icon={option.icon}
                  label={option.label}
                  variant="text"
                  onClick={() => option.action(currentRow)}
                />
              ))}
          </ContextMenuContainer>
        </ContextMenuWrapper>
      )}
    </Table>
  );
}
