"use client";
import { useState } from "react";
import {
    Stack,
    Typography,
    IconButton,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from "@mui/material";
import IOSSwitch from '@/components/IOSSwitch';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import EditIcon from '@mui/icons-material/Edit';
import { PatientModel } from "@/models";
import { useQuery } from "@tanstack/react-query";
import { DiseaseService, AttendanceService, PaymentHistoryService } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import DiseaseUpdateModal from "./disease-update-modal";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

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
    const [openDialog, setOpenDialog] = useState(false);
    const [openConfirmPayment, setOpenConfirmPayment] = useState(false);

    const paymentMutation = useMutation({
        mutationFn: (payload: { amount: string; note: string }) => {
            return PaymentHistoryService.create(row.id || "", payload);
        },
        onSuccess: (resp) => {
            if (resp.success) {
                toast.success(resp.message);
                queryClient.invalidateQueries({ queryKey: ["attendance", date] });
                setOpenConfirmPayment(false);
            } else {
                toast.error(resp.message);
            }
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || 'Operation failed');
        },
    });

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
            // check here if resp.data.total_attendance_count id multiple of 15 or multiple of 15 - 1 then queryKey notification
            const count = resp.data.total_attendance_count;
            if (count % 15 === 0 || count % 15 === 14) {
                queryClient.invalidateQueries({ queryKey: ["notifications"] });
            }
        },
        onError: () => {
            toast.error("Operation failed");
            setIsPresent(initialIsPresent);
        },
    });

    return (
        <ListItem
            divider
            sx={{ width: "100%" }}
            secondaryAction={
                <IOSSwitch
                    edge="end"
                    checked={isPresent}
                    sx={{ mr: 0 }}
                    disabled={mutation.isPending}
                    onChange={(e) => {
                        const next = e.target.checked;
                        if (next === true) {
                            if (!disease || !amount) {
                                setShowError(true);
                                setOpenDialog(true);
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
            }
        >
            <ListItemText
                primary={
                    <Typography variant="subtitle1" fontSize='1.1rem' component="span">
                        {row.name || 'Not Available'}
                    </Typography>
                }
                slotProps={{ secondary: { component: 'div' } }}
                sx={{ mr: 2 }}
                secondary={
                    <Stack spacing={0}>
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ width: '100%' }} justifyContent="space-between">
                            <Typography variant="body2" component="span">
                                {disease ? `${disease} - ₹${amount || '0'}` : "No Disease Selected"}
                            </Typography>
                            <IconButton
                                size="small"
                                disabled={isPresent}
                                onClick={() => setOpenDialog(true)}
                                color="primary"
                            >
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </Stack>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={3}>
                            <Button
                                variant="outlined"
                                startIcon={<CurrencyRupeeIcon sx={{ height: 14, width: 14 }} />}
                                size="small"
                                color="success"
                                onClick={() => setOpenConfirmPayment(true)}
                                disabled={!isPresent}
                                sx={{
                                    borderRadius: 3,
                                    textTransform: 'none',
                                    minWidth: 'auto',
                                    height: 24,
                                }}
                            >
                                Add Payment
                            </Button>
                            <Typography variant="body1" component="span" sx={{ color: 'green', fontWeight: 600 }}>
                                ₹{row?.today_payment || '0'}
                            </Typography>
                        </Stack>
                    </Stack>
                }

            />

            <DiseaseUpdateModal
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                diseaseList={diseaseList}
                disease={disease}
                amount={amount}
                setDisease={setDisease}
                setAmount={setAmount}
                showError={showError}
                setShowError={setShowError}
                row={row}
            />

            <Dialog
                open={openConfirmPayment}
                onClose={() => setOpenConfirmPayment(false)}
            >
                <DialogTitle>Confirm Payment</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to paid <strong>₹{row.attendance?.amount || "0"}</strong> for <strong>{row.name}</strong>?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenConfirmPayment(false)} color="error">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            paymentMutation.mutate({
                                amount: row.attendance?.amount || "0",
                                note: "Attendance Payment : " + date
                            });
                        }}
                        autoFocus
                        disabled={paymentMutation.isPending}
                        color="primary"
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </ListItem>
    );
};
export default AttendanceListRow;