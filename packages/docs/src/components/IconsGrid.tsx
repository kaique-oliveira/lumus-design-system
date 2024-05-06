import { colectionIcons, useNotification } from "@lumus-ui/react";
import useTimeoutEffect from "@lumus-ui/react/src/hooks/useTimeoutEffect";
import { colors, fontSizes } from "@lumus-ui/tokens";

export function IconsGrid() {
  const noti = useNotification();

  function copyName(name: string) {
    navigator.clipboard.writeText(name);

    noti.showNotification({
      type: "success",
      message: `'${name}' copiado.`,
      timeout: 5000,
    });
  }

  function countIcons(): number {
    let count = 0;

    Object.keys(colectionIcons).forEach((colectionName) => {
      const colection = colectionIcons[colectionName];

      Object.entries(colection.icons).forEach(() => {
        count += 1;
      });
    });

    return count;
  }

  useTimeoutEffect(
    () => {
      console.log(countIcons());
    },
    [],
    1000
  );

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",

        gap: "16px",
      }}
    >
      {Object.keys(colectionIcons).map((colectionName, indice) => {
        const colection = colectionIcons[colectionName];

        return (
          <div
            key={indice}
            style={{
              background: colors.gray100,
              borderRadius: "10px",
              width: "100%",
              height: "max-content",
              padding: "16px",
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "column",
              alignItems: "flex-start",
              flexWrap: "wrap",

              gap: "4px",
            }}
          >
            <h5 style={{ textTransform: "capitalize" }}>{colectionName}</h5>
            <div
              style={{
                borderRadius: "10px",
                width: "100%",
                height: "max-content",
                display: "flex",
                justifyContent: "flex-start",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "16px",
              }}
            >
              {Object.entries(colection.icons).map((icon) => {
                const Icon = icon[1];

                return (
                  <div
                    onClick={() => copyName(Icon.name)}
                    key={Icon.name}
                    style={{
                      width: "100px",
                      height: "100px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      padding: "2px 8px",
                      gap: "16px",
                      background: colors.main100,
                      borderRadius: "10px",
                      cursor: "pointer",
                    }}
                  >
                    {Icon.svg}
                    <span style={{ fontSize: fontSizes.xxs }}>{Icon.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
