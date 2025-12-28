'use client'
import { Dialog, DialogContent, DialogTitle, IconButton, Stack, TextField, Autocomplete, Button, DialogActions } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { PatientModel } from "@/models";
import { useState, useEffect } from "react";

interface Props {
    openDialog: boolean;
    setOpenDialog: (open: boolean) => void;
    diseaseList: any[];
    disease: string;
    amount: string;
    setDisease: (disease: string) => void;
    setAmount: (amount: string) => void;
    showError: boolean;
    setShowError: (showError: boolean) => void;
    row: PatientModel;
}

const DiseaseUpdateModal = (props: Props) => {
    const { openDialog, setOpenDialog, diseaseList, disease, amount, setDisease, setAmount, showError, setShowError, row } = props;
    const [selectedDisease, setSelectedDisease] = useState(disease);
    const [selectedAmount, setSelectedAmount] = useState(amount);

    useEffect(() => {
        if (openDialog) {
            setSelectedDisease(disease);
            setSelectedAmount(amount);
        }
    }, [openDialog, disease, amount]);

    return (
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="xs" fullWidth>
            <DialogTitle sx={{ m: 0, py: 1, px: 2 }} justifyContent="space-between" display="flex" alignItems="center">
                Update Disease
                <IconButton
                    aria-label="close"
                    onClick={() => setOpenDialog(false)}
                    sx={{
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Stack spacing={2} sx={{ mt: 1 }}>
                    <Autocomplete
                        size="small"
                        fullWidth
                        freeSolo
                        autoHighlight
                        options={diseaseList}
                        getOptionLabel={(opt: any) => opt?.name || ""}
                        value={diseaseList.find((d) => d.name === selectedDisease) || null}
                        inputValue={selectedDisease}
                        onInputChange={(e, v) => setSelectedDisease(v)}
                        onChange={(e, newValue: any) => {
                            if (newValue && typeof newValue === "object") {
                                setSelectedDisease(newValue.name);
                                setSelectedAmount(newValue.amount);
                            }
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Disease"
                                error={showError && !selectedDisease}
                                helperText={showError && !selectedDisease ? "Required" : ""}
                            />
                        )}
                    />
                    <TextField
                        size="small"
                        label="Amount"
                        type="number"
                        fullWidth
                        value={selectedAmount}
                        onChange={(e) => setSelectedAmount(e.target.value)}
                        error={showError && !selectedAmount}
                        helperText={showError && !selectedAmount ? "Required" : ""}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    onClick={() => {
                        const defaultDisease = row.attendance?.disease ?? row.disease?.name ?? "";
                        const defaultAmount = row.attendance?.amount ?? row.disease?.amount ?? "";
                        setDisease(defaultDisease);
                        setAmount(defaultAmount);
                        setSelectedDisease(defaultDisease);
                        setSelectedAmount(defaultAmount);
                        setShowError(false);
                    }} color="error">
                    Reset
                </Button>
                <Button
                    variant="contained"
                    onClick={() => {
                        if (!selectedDisease || !selectedAmount) {
                            setShowError(true);
                            return;
                        }
                        setDisease(selectedDisease);
                        setAmount(selectedAmount);
                        setOpenDialog(false);
                        setShowError(false);
                    }}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DiseaseUpdateModal;