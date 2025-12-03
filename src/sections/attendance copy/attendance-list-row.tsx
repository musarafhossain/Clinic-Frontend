"use client";
import { useState, useEffect } from "react";
import {
    ListItem,
    ListItemText,
    Switch,
    TextField,
    Stack,
    ListItemAvatar,
    Avatar,
    Typography,
    Autocomplete,
} from "@mui/material";
import { PatientModel } from "@/models";
import { Attendance } from "@/models/Patient.Models";
import { useQuery } from "@tanstack/react-query";
import { DiseaseService } from "@/services";

interface Props {
    row: PatientModel;
    attendance?: Attendance;
    onToggle: (patientId: string, updatedData: Attendance) => void;
}

const AttendanceListRow = ({ row, attendance, onToggle }: Props) => {

    // Fetch disease list
    const { data: diseaseList = [] } = useQuery({
        queryKey: ["diseases"],
        queryFn: () => DiseaseService.getList(),
        select: (resp) => resp.data?.items || [],
    });

    const [isPresent, setIsPresent] = useState<boolean>(
        attendance?.is_present ?? false
    );

    const [disease, setDisease] = useState<string>(
        attendance?.disease ?? row.disease?.name ?? ""
    );

    const [amount, setAmount] = useState<string>(
        attendance?.amount ?? row.disease?.amount ?? ""
    );

    // error states
    const [diseaseError, setDiseaseError] = useState(false);
    const [amountError, setAmountError] = useState(false);

    useEffect(() => {
        setIsPresent(attendance?.is_present ?? false);
        setDisease(attendance?.disease ?? "");
        setAmount(attendance?.amount ?? "");
    }, [attendance]);

    const safeId = row.id ?? "";

    const validateFields = () => {
        const dErr = disease.trim() === "";
        const aErr = amount === "";

        setDiseaseError(dErr);
        setAmountError(aErr);

        return !(dErr || aErr);
    };

    const handleToggle = (checked: boolean) => {
        if (checked) {
            if (!validateFields()) return;
        }

        setIsPresent(checked);
        onToggle(safeId, {
            patient_id: safeId,
            is_present: checked,
            disease: disease,
            amount: amount,
        });
    };

    const handleDiseaseChange = (val: string) => {
        console.log(val)
        setDisease(val);
        onToggle(safeId, {
            patient_id: safeId,
            is_present: isPresent,
            disease: val,
            amount,
        });
    };

    const handleAmountChange = (val: string) => {
        setAmount(val);
        onToggle(safeId, {
            patient_id: safeId,
            is_present: isPresent,
            disease,
            amount: val,
        });
    };

    return (
        <ListItem
            divider
            sx={{ width: '100%' }}
        >
            <Stack spacing={0.5} width='100%'>
                <Stack direction="row" spacing={1} alignItems="center" justifyContent='space-between'>
                    <Typography variant="body1" fontSize="1.05rem">
                        {row.name}
                    </Typography>
                    <Switch
                        edge="end"
                        checked={isPresent}
                        onChange={(e) => handleToggle(e.target.checked)}
                    />
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center" width='100%'>

                    <Autocomplete
                        size="small"
                        fullWidth
                        options={diseaseList}
                        getOptionLabel={(opt) => opt?.name || ""}
                        value={diseaseList.find((d) => d.name == disease) || null}
                        inputValue={disease}
                        onChange={(e, newValue) => {
                            if (newValue) {
                                console.log(newValue)
                                handleDiseaseChange(newValue.name);
                                handleAmountChange(newValue.amount);
                                console.log(disease)
                            }
                        }}
                        onInputChange={(e, newInputValue) => {
                            handleDiseaseChange(newInputValue);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Disease"
                                error={diseaseError}
                                helperText={diseaseError ? "Required" : ""}
                            />
                        )}
                    />

                    <TextField
                        size="small"
                        label="Amount"
                        type="number"
                        value={amount}
                        onChange={(e) => handleAmountChange(e.target.value)}
                        error={amountError}
                        helperText={amountError ? "Required" : ""}
                    />
                </Stack>

            </Stack>
        </ListItem>
    );
};

export default AttendanceListRow;
