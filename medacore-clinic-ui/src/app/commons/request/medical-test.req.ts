export class ServicesOfMedicalTestReq {
    serviceId!: number;
    quantity!: number;
}

export class MedicalTestReq {
    medicalRecordId!: number;
    services!: ServicesOfMedicalTestReq[];
}