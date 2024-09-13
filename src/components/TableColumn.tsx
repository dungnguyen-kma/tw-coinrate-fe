import { GridColDef } from "@mui/x-data-grid";

const createColumn = (
  field: string,
  headerName: string,
  align: "left" | "right" = "right",
  maxWidth?: number
): GridColDef => ({
  field,
  headerAlign: align,
  align,
  flex: 1,
  maxWidth,
  type: field === "token" ? "string" : "number",
  disableColumnMenu: true,
  sortable: false,
  renderHeader: () => (
    <span className="text-[10px] md:text-base">{headerName}</span>
  ),
  renderCell: (params) => (
    <span className="text-[10px] md:text-base">{params.value}</span>
  ),
});

export const columns: GridColDef[] = [
  createColumn("token", "Token", "left", 50),
  createColumn("bnb", "BNB"),
  createColumn("bitopro", "Bitopro"),
  createColumn("bitopro_rate", "Bitopro rate"),
];
