/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataGrid } from "@mui/x-data-grid";
import { columns } from "./TableColumn";
import { useQuery } from "@tanstack/react-query";
import { getAllCoin, getRate } from "../api/api";

export default function TableData() {
  const { data: coins } = useQuery({
    queryKey: ["coins"],
    queryFn: () => getAllCoin(),
    refetchInterval: 20000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  const { data: rates } = useQuery({
    queryKey: ["rates"],
    queryFn: () => getRate(),
  });

  const renderCell = (params: any) => (
    <span
      className={`text-[10px] md:text-base ${
        rates?.twd_vnd_rate > params.value ? "text-red-500" : "text-blue-600"
      }`}
    >
      {params.value}
    </span>
  );

  const updatedColumns = columns.map((col) => {
    if (col.field === "bitopro_rate") {
      return {
        ...col,
        renderCell: (params: any) => renderCell(params),
      };
    }
    return { ...col };
  });

  const rows = Object.entries(coins?.message || {}).map(
    ([, data]: [string, any]) => ({
      token: data?.coin_symbol || "no data",
      bnb: data?.price_at_binance_usdt || "no data",
      bitopro: data?.price_at_bitopro_twd || "no data",
      bitopro_rate:
        Number(data?.bitopro_rate_twd_with_fee.toFixed(3)) || "no data",
    })
  );

  return (
    <>
      <DataGrid
        columns={updatedColumns}
        rows={rows}
        hideFooter
        disableColumnResize
        getRowId={(row) => row.token}
        sx={{
          "& .MuiDataGrid-cell": {
            padding: "0px",
          },
          "& .MuiDataGrid-columnHeader": {
            padding: "0px",
          },
          border: "none",
        }}
      ></DataGrid>
    </>
  );
}
