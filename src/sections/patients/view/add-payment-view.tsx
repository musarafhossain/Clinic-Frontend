import AddPaymentForm from "../add-payment-form"
import { Box } from "@mui/material"

const AddPaymentView = (patientId: string) => {
    return (
        <Box sx={{ maxWidth: 500, mx: 'auto', mt: 2, p: 2 }}>
            <AddPaymentForm patientId={patientId} />
        </Box>
    )
}

export default AddPaymentView