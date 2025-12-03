"use client";
import { useState } from "react";
import {
    ListItem,
    Switch,
    TextField,
    Stack,
    Typography,
    Autocomplete,
} from "@mui/material";
import { PatientModel } from "@/models";
import { useQuery } from "@tanstack/react-query";
import { DiseaseService, AttendanceService } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface AttendanceParams {
    patient_id: string;
    disease_name: string;
    disease_amount: string;
    date: string;
    is_present: boolean;
}

interface Props {
    row: PatientModel;
    date: string;
}

const AttendanceListRow = ({ row, date }: Props) => {
    const queryClient = useQueryClient();

    const { data: diseaseList = [] } = useQuery({
        queryKey: ["diseases"],
        queryFn: () => DiseaseService.getList(),
        select: (resp) => resp.data?.items || [],
    });
    const initialIsPresent = row.attendance?.is_present ?? false;
    const [isPresent, setIsPresent] = useState(initialIsPresent);
    const [disease, setDisease] = useState(row.attendance?.disease ?? row.disease?.name ?? "");
    const [amount, setAmount] = useState(row.attendance?.amount ?? row.disease?.amount ?? "");
    const [showError, setShowError] = useState(false);

    const mutation = useMutation({
        mutationFn: (params: AttendanceParams) =>
            AttendanceService.markAttendance(params),
        onSuccess: (resp, vars) => {
            if (!resp.success) {
                toast.error(resp.message || "Operation failed");
                setIsPresent(initialIsPresent);
                return;
            }
            queryClient.invalidateQueries({ queryKey: ["attendance", vars.date] });
        },
        onError: () => {
            toast.error("Operation failed");
            setIsPresent(initialIsPresent);
        },
    });

    return (
        <ListItem divider sx={{ width: "100%" }}>
            <Stack spacing={0.5} width="100%">
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <AccountCircleIcon fontSize="small" />
                        <Typography variant="body1" fontSize="1.05rem">
                            {row.name}
                        </Typography>
                    </Stack>
                    <Switch
                        edge="end"
                        checked={isPresent}
                        disabled={mutation.isPending}
                        onChange={(e) => {
                            const next = e.target.checked;
                            if (next === true) {
                                if (!disease || !amount) {
                                    setShowError(true);
                                    setIsPresent(initialIsPresent);
                                    return;
                                }
                            }
                            setIsPresent(next);
                            mutation.mutate({
                                patient_id: row.id || "",
                                disease_name: disease,
                                disease_amount: amount,
                                date,
                                is_present: next,
                            });
                        }}
                    />
                </Stack>
                <Stack direction="row" spacing={1}>
                    <Autocomplete
                        size="small"
                        fullWidth
                        freeSolo
                        disabled={isPresent}
                        getOptionLabel={(opt: any) => opt?.name || ""}
                        options={diseaseList}
                        value={diseaseList.find((d) => d.name === disease) || null}
                        inputValue={disease}
                        onInputChange={(e, v) => setDisease(v)}
                        onChange={(e, newValue: any) => {
                            if (newValue && typeof newValue === "object") {
                                setDisease(newValue.name);
                                setAmount(newValue.amount);
                            }
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Disease"
                                error={showError && !disease}
                                helperText={showError && !disease ? "Required" : ""}
                            />
                        )}
                    />
                    <TextField
                        size="small"
                        label="Amount"
                        type="number"
                        disabled={isPresent}
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        error={showError && !amount}
                        helperText={showError && !amount ? "Required" : ""}
                    />
                </Stack>
            </Stack>
        </ListItem>
    );
};
export default AttendanceListRow;