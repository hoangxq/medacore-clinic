export class PrescriptionReq {
    medicalRecordId!: number;
    medicinesReq!: MedicineOdPrescriptionReq[];
}

export class MedicineOdPrescriptionReq {
    medicineId!: number;
    quantity!: number;
}