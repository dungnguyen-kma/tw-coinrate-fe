import { Button, FormControl, Grid2, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import { setRate } from "../api/api";
import { FormDataType } from "../assets/types";

export default function InputForm() {
  const [formData, setFormData] = useState<FormDataType>({
    usdt_vnd_rate: 0,
    krw_vnd_rate: 0,
  });
  const queryClient = useQueryClient();

  const ratesMutation = useMutation({
    mutationKey: ["rates"],
    mutationFn: (inputData: FormDataType) => setRate(inputData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["rates"],
      });
    },
  });

  const handleScanCoin = () => {
    ratesMutation.mutate(formData);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFormData((prev: any) => ({ ...prev, [name]: Number(value) }));
  };
  return (
    <>
      <FormControl className="flex flex-col gap-4" sx={{ width: "100%" }}>      
        <Grid2 size={12}>
          <TextField
            id="USDT/VND"
            name="usdt_vnd_rate"
            variant="outlined"
            label="USDT/VND rate"
            type="number"
            value={formData?.usdt_vnd_rate || ""}
            fullWidth
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 size={12}>
          <TextField
            id="TWD/VND"
            name="twd_vnd_rate"
            variant="outlined"
            label="TWD/VND rate"
            type="number"
            value={formData?.krw_vnd_rate || ""}
            fullWidth
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 size={12}>
          <TextField
            id="EXCHANGE_FEE"
            name="exchange_fee"
            variant="outlined"
            label="Exchange Fee"
            type="number"
            fullWidth
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 container size={12} sx={{ gap: 2, justifyContent: "center" }}>
          <Grid2 size={{ sm: 12, xs: 12, md: 5, lg: 5 }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => {
                handleScanCoin();
              }}
            >
              Quét coin
            </Button>
          </Grid2>
        </Grid2>
      </FormControl>
    </>
  );
}
