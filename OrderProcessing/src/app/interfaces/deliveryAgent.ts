export interface DeliveryAgentDetails {
    statusCode: number;
    success: boolean;
    data?: {
        id?: number;
        agentId?: number;
        fullName?: string;
        countryCode?: string;
        phoneNumber?: string;
        email?: string;
        gender?: string;
        dateOfBirth?: string;
        address?: string;
        profileImage?: string;
        isProfileCompleted?: boolean,
        agentStatus?: number;
        verificationStatus?: number;
    };
    message: string;
}