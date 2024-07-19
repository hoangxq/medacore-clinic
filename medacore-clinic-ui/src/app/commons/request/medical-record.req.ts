export class MedicalRecordReq {
    patientId!: number;
    staffId!: number;
}

export class MedicalRecordInfoReq {
    weight!: number;
    height!: number;
    bodyTemperature!: number;
    heartbeat!: number;
    bloodPressure!: number;
    detailMedical!: string;
    diagnose!: string;
    solution!: string;
    medicalRecordId!: number;
}